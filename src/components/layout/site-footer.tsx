"use client";

import { usePathname } from "next/navigation";

import { footerLinkGroups, siteConfig } from "@/data/site";

import { Container } from "@/components/shared/container";
import { SiteLogo } from "@/components/icons/site-logo";
import { SmartLink } from "@/components/shared/smart-link";
import { SocialLinks } from "@/components/shared/social-links";

function isActive(pathname: string, href: string) {
  if (!href.startsWith("/")) {
    return false;
  }

  if (href === "/") {
    return pathname === "/";
  }

  if (href === "/members/sign-in") {
    return pathname.startsWith("/members");
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
export function SiteFooter() {
  const pathname = usePathname();

  return (
    <footer className="mt-16 border-t border-primary/10 bg-[linear-gradient(180deg,rgba(246,240,228,0.7),rgba(233,223,201,0.92))]">
      <Container className="py-10 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.25fr)] lg:items-start">
          <div className="max-w-xl">
            <div className="flex items-start gap-4">
              <SiteLogo className="mt-1 h-14 w-14 shrink-0" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/68">
                  {siteConfig.shortName}
                </p>
                <h2 className="mt-2 font-heading text-3xl leading-tight text-foreground">
                  Native plants for Fayette, Colorado, and Lavaca Counties
                </h2>
              </div>
            </div>
            <p className="mt-5 max-w-2xl text-base leading-7 text-foreground/72">
              Local events, native-plant learning, and community around habitat
              care across south-central Texas.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
              <SmartLink
                href="/contact"
                className="inline-flex min-h-10 items-center rounded-full border border-primary/15 bg-white/78 px-4 py-2 font-medium text-foreground transition hover:bg-white"
              >
                Contact
              </SmartLink>
              <span className="text-foreground/58">{siteConfig.organization}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-foreground/58">
              Questions and requests for updates start on the contact page.
            </p>
            <SocialLinks className="mt-5 gap-2" includeEmail={false} compact />
          </div>

          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 xl:grid-cols-4">
            {footerLinkGroups.map((group) => (
              <nav key={group.title} className="border-t border-primary/10 pt-4">
                <h2 className="font-heading text-2xl text-foreground">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => {
                    const active = isActive(pathname, link.href);

                    return (
                      <li key={link.href}>
                        {active ? (
                          <span
                            aria-current="page"
                            className="text-sm font-semibold leading-6 text-foreground"
                          >
                            {link.label}
                          </span>
                        ) : (
                          <SmartLink
                            href={link.href}
                            className="text-sm leading-6 text-foreground/70 transition hover:text-primary"
                          >
                            {link.label}
                          </SmartLink>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-primary/10 pt-5 text-sm text-foreground/58 sm:flex-row sm:items-center sm:justify-between">
          <p>{siteConfig.serviceAreaSentence}</p>
          <p>&copy; {new Date().getFullYear()} Live Oak Chapter - NPSoT</p>
        </div>
      </Container>
    </footer>
  );
}
