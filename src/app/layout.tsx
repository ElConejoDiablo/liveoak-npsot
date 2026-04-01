import type { Metadata, Viewport } from "next";
import { Fraunces, Geist_Mono, Source_Sans_3 } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AuthSessionProvider } from "@/components/providers/auth-session-provider";
import { siteConfig } from "@/data/site";
import { buildOgImageUrl } from "@/lib/og";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.chapterName,
  description: siteConfig.description,
  applicationName: siteConfig.chapterName,
  keywords: [...siteConfig.keywords],
  creator: siteConfig.chapterName,
  publisher: siteConfig.organization,
  category: "environment",
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  openGraph: {
    title: siteConfig.chapterName,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.chapterName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: buildOgImageUrl({
          title: "Native plant community for south-central Texas",
          subtitle: siteConfig.description,
          eyebrow: siteConfig.shortName,
        }),
        width: 1200,
        height: 630,
        alt: siteConfig.chapterName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.chapterName,
    description: siteConfig.description,
    images: [
      buildOgImageUrl({
        title: "Native plant community for south-central Texas",
        subtitle: siteConfig.description,
        eyebrow: siteConfig.shortName,
      }),
    ],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F4E8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${sourceSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full bg-background text-foreground antialiased">
        <AuthSessionProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
          >
            Skip to content
          </a>
          <div className="relative isolate flex min-h-screen flex-col">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.55),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(77,103,73,0.08),transparent_24%)]" />
            <SiteHeader />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
