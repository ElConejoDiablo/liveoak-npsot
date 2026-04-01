"use client";

import Link from "next/link";
import { Menu, Sprout } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { buttonVariants } from "@/components/ui/button-styles";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Container } from "@/components/shared/container";
import { SiteLogo } from "@/components/icons/site-logo";
import { SmartLink } from "@/components/shared/smart-link";
import {
  headerNavigation,
  mobilePrimaryNavigation,
  secondaryNavigation,
  siteConfig,
} from "@/data/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const { status } = useSession();
  const memberSessionActive = status === "authenticated";
  const sessionResolved = status !== "loading";
  const showJoinCta = sessionResolved && !memberSessionActive;
  const membersHref = memberSessionActive ? "/members" : "/members/sign-in";

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-[rgba(250,245,236,0.92)] backdrop-blur-md">
      <Container className="flex min-h-20 items-center justify-between gap-3 py-3">
        <Link href="/" className="flex items-center gap-3 text-left">
          <SiteLogo />
          <div className="min-w-0">
            <p className="truncate font-heading text-xl leading-none text-foreground sm:text-2xl">
              {siteConfig.shortName}
            </p>
            <p className="mt-1 hidden text-sm text-foreground/64 sm:block">
              Serving Fayette, Colorado, and Lavaca Counties
            </p>
          </div>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-0.5 lg:flex" aria-label="Primary">
          {headerNavigation.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <SmartLink
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-foreground/74 transition hover:bg-white hover:text-foreground xl:px-4",
                  active && "bg-white text-foreground shadow-sm",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </SmartLink>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <SmartLink
            href={membersHref}
            className="rounded-full px-3 py-2 text-sm font-medium text-foreground/74 transition hover:bg-white hover:text-foreground"
          >
            Members
          </SmartLink>
          {showJoinCta ? (
            <SmartLink
              href={siteConfig.joinUrl}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-auto rounded-full border-primary/15 bg-white px-4 py-2.5 text-sm",
              )}
            >
              Join NPSOT
            </SmartLink>
          ) : null}
          <SmartLink
            href="/events"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "h-auto rounded-full px-4 py-2.5 text-sm",
            )}
          >
            View Events
          </SmartLink>
        </div>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  className="h-11 rounded-full border-primary/15 bg-white px-4"
                />
              }
            >
              <Menu className="h-5 w-5" />
              <span>Menu</span>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[86vw] max-w-sm border-l border-primary/10 bg-[#F8F3E8]"
            >
              <SheetHeader className="border-b border-primary/10 pb-4">
                <SheetTitle className="flex items-center gap-3 text-left font-heading text-2xl">
                  <SiteLogo className="h-10 w-10" />
                  <span>{siteConfig.shortName}</span>
                </SheetTitle>
                <SheetDescription className="text-left leading-7">
                  Native plant education, outreach, and local habitat care for
                  Fayette, Colorado, and Lavaca Counties.
                </SheetDescription>
              </SheetHeader>

              <nav className="flex flex-1 flex-col gap-2 p-4" aria-label="Mobile">
                <div>
                  <p className="px-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary/60">
                    Start here
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    {mobilePrimaryNavigation.map((item) => {
                      const active = isActive(pathname, item.href);

                      return (
                        <SmartLink
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "rounded-2xl border border-transparent bg-white/70 px-4 py-3 text-base font-medium text-foreground/78 transition hover:border-primary/10 hover:bg-white",
                            active && "border-primary/10 bg-white text-foreground",
                          )}
                        >
                          {item.label}
                        </SmartLink>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-3">
                  <p className="px-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary/60">
                    More chapter links
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    {secondaryNavigation.map((item) => {
                      const active = isActive(pathname, item.href);

                      return (
                        <SmartLink
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "rounded-2xl border border-transparent bg-white/70 px-4 py-3 text-base font-medium text-foreground/78 transition hover:border-primary/10 hover:bg-white",
                            active && "border-primary/10 bg-white text-foreground",
                          )}
                        >
                          {item.label}
                        </SmartLink>
                      );
                    })}
                  </div>
                </div>
              </nav>

              <div className="space-y-3 border-t border-primary/10 p-4">
                <SmartLink
                  href={membersHref}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "flex h-auto w-full items-center justify-center rounded-full border-primary/15 bg-white px-4 py-3",
                  )}
                >
                  Members
                </SmartLink>
                {showJoinCta ? (
                  <SmartLink
                    href={siteConfig.joinUrl}
                    className={cn(
                      buttonVariants({ variant: "default", size: "lg" }),
                      "flex h-auto w-full items-center justify-center rounded-full px-4 py-3",
                    )}
                  >
                    <Sprout className="mr-2 h-4 w-4" />
                    Join NPSOT
                  </SmartLink>
                ) : null}
                <SmartLink
                  href={siteConfig.contactUrl}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "flex h-auto w-full items-center justify-center rounded-full border-primary/15 bg-white px-4 py-3",
                  )}
                >
                  Email the chapter
                </SmartLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
