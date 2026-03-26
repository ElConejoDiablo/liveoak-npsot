import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Route } from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { redirect } from "next/navigation";
import { Resend } from "resend";

import {
  getMemberByEmail,
  isAllowedMemberEmail,
  type ActiveMember,
} from "@/lib/members/allowlist";
import { prisma } from "@/lib/db";

export function isMembersPortalConfigured() {
  return Boolean(
    process.env.DATABASE_URL &&
      process.env.AUTH_SECRET &&
      process.env.AUTH_EMAIL_FROM &&
      process.env.AUTH_RESEND_API_KEY,
  );
}

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

async function sendMagicLinkEmail({
  identifier,
  url,
  provider,
}: {
  identifier: string;
  url: string;
  provider: { from?: string };
}) {
  const resend = new Resend(getRequiredEnv("AUTH_RESEND_API_KEY"));
  const siteName = "Live Oak Chapter members portal";

  await resend.emails.send({
    from: provider.from ?? getRequiredEnv("AUTH_EMAIL_FROM"),
    to: identifier,
    subject: `${siteName} sign-in link`,
    text: [
      `Use this secure sign-in link to access the ${siteName}:`,
      url,
      "",
      "If you did not request this email, you can safely ignore it.",
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #223226;">
        <h1 style="font-size: 22px; margin-bottom: 16px;">Live Oak Chapter members portal</h1>
        <p>Use the secure link below to sign in:</p>
        <p style="margin: 24px 0;">
          <a
            href="${url}"
            style="display: inline-block; padding: 12px 20px; border-radius: 999px; background: #2f5d3a; color: #ffffff; text-decoration: none; font-weight: 700;"
          >
            Sign in
          </a>
        </p>
        <p>If the button does not work, copy and paste this URL into your browser:</p>
        <p style="word-break: break-all;">${url}</p>
        <p>If you did not request this email, you can safely ignore it.</p>
      </div>
    `,
  });
}

async function syncAllowlistedUser(email: string): Promise<ActiveMember | null> {
  const member = await getMemberByEmail(email);

  if (!member) {
    return null;
  }

  await prisma.user.upsert({
    where: { email: member.email },
    update: {
      name: member.name,
      role: member.role,
    },
    create: {
      email: member.email,
      name: member.name,
      role: member.role,
    },
  });

  return member;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
  },
  pages: {
    signIn: "/members/sign-in",
    error: "/members/sign-in",
    verifyRequest: "/members/check-email",
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    EmailProvider({
      from: process.env.AUTH_EMAIL_FROM,
      server: {
        host: "localhost",
        port: 25,
        auth: {
          user: "",
          pass: "",
        },
      },
      async sendVerificationRequest(params) {
        await sendMagicLinkEmail({
          identifier: params.identifier,
          url: params.url,
          provider: params.provider,
        });
      },
      normalizeIdentifier(identifier) {
        return identifier.trim().toLowerCase();
      },
    }),
  ],
  callbacks: {
    async signIn({ user, email }) {
      const candidate = (user.email ?? "").trim().toLowerCase();

      if (!candidate) {
        return false;
      }

      const allowed = await isAllowedMemberEmail(candidate);

      if (!allowed) {
        return false;
      }

      if (!email?.verificationRequest) {
        await syncAllowlistedUser(candidate);
      }

      return true;
    },
    async session({ session, user }) {
      if (session.user?.email) {
        session.user.email = session.user.email.trim().toLowerCase();
      }

      if (session.user && session.user.name == null && user.name) {
        session.user.name = user.name;
      }

      return session;
    },
  },
};

export async function auth() {
  if (!isMembersPortalConfigured()) {
    return null;
  }

  return getServerSession(authOptions);
}

export async function getCurrentMemberContext() {
  const session = await auth();
  const sessionEmail = session?.user?.email?.trim().toLowerCase();

  if (!session || !sessionEmail) {
    return null;
  }

  const allowlistedMember = await syncAllowlistedUser(sessionEmail);

  if (!allowlistedMember) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email: sessionEmail },
  });

  if (!user) {
    return null;
  }

  return {
    session,
    allowlistedMember,
    user,
  };
}

export async function requireMemberContext() {
  const context = await getCurrentMemberContext();

  if (!context) {
    redirect("/members/sign-in" as Route);
  }

  return context;
}

export async function requireMemberActionContext() {
  const context = await getCurrentMemberContext();

  if (!context) {
    throw new Error("Unauthorized member action");
  }

  return context;
}
