import { FileText, LayoutGrid, Sprout } from "lucide-react";

import { Container } from "@/components/shared/container";
import { SmartLink } from "@/components/shared/smart-link";
import { buttonVariants } from "@/components/ui/button-styles";
import { cn } from "@/lib/utils";

import { MemberSignOutButton } from "@/components/members/member-signout-button";

type MemberShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  pointsTotal?: number;
  memberName?: string | null;
};

const memberNav = [
  { href: "/members", label: "Overview", icon: LayoutGrid },
  { href: "/members/documents", label: "Documents", icon: FileText },
  { href: "/members/exchange", label: "Exchange", icon: Sprout },
];

export function MemberShell({
  title,
  description,
  children,
  pointsTotal,
  memberName,
}: MemberShellProps) {
  return (
    <div className="pb-20">
      <section className="border-b border-primary/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.88),rgba(241,235,220,0.9)_42%,rgba(229,220,199,0.98)_100%)]">
        <Container className="py-10 sm:py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/74">
                Members portal
              </p>
              <h1 className="mt-4 font-heading text-4xl leading-tight text-foreground sm:text-5xl">
                {title}
              </h1>
              <p className="mt-4 text-lg leading-8 text-foreground/72">
                {description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {memberNav.map((item) => {
                  const Icon = item.icon;

                  return (
                    <SmartLink
                      key={item.href}
                      href={item.href}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "h-auto rounded-full border-primary/15 bg-white/80 px-4 py-3 text-sm",
                      )}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </SmartLink>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
              <div className="rounded-[1.6rem] border border-primary/10 bg-white/78 px-5 py-4 shadow-[0_18px_60px_rgba(39,59,42,0.08)]">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
                  Signed in
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  {memberName ?? "Active chapter member"}
                </p>
                <p className="mt-1 text-sm text-foreground/64">
                  Member-only access is active for this session.
                </p>
                {typeof pointsTotal === "number" ? (
                  <p className="mt-3 text-sm font-medium text-foreground/72">
                    Points earned: <span className="font-semibold text-foreground">{pointsTotal}</span>
                  </p>
                ) : null}
              </div>

              <div className="self-start">
                <MemberSignOutButton className="rounded-full" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="pt-8">{children}</Container>
    </div>
  );
}
