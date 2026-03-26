import { footerLinkGroups, siteConfig } from "@/data/site";

import { Container } from "@/components/shared/container";
import { SiteLogo } from "@/components/icons/site-logo";
import { SmartLink } from "@/components/shared/smart-link";
import { SocialLinks } from "@/components/shared/social-links";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-primary/10 bg-[linear-gradient(180deg,rgba(246,240,228,0.7),rgba(233,223,201,0.92))]">
      <Container className="py-12 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1.85fr)]">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <SiteLogo />
              <div>
                <p className="font-heading text-2xl text-foreground">
                  {siteConfig.shortName}
                </p>
                <p className="text-sm text-foreground/64">
                  Native Plant Society of Texas
                </p>
              </div>
            </div>
            <p className="mt-5 text-lg leading-8 text-foreground/74">
              A welcoming chapter rooted in conservation, regional knowledge,
              and the everyday usefulness of native plants in Fayette, Colorado,
              and Lavaca Counties.
            </p>
            <p className="mt-5 max-w-xl text-sm leading-7 text-foreground/62">
              {siteConfig.mission}
            </p>
            <div className="mt-7 rounded-[1.7rem] border border-primary/10 bg-white/65 p-5 shadow-[0_14px_40px_rgba(39,59,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
                Contact and follow
              </p>
              <a
                href={siteConfig.contactUrl}
                className="mt-3 inline-block text-lg font-semibold text-primary underline decoration-primary/30 underline-offset-4"
              >
                {siteConfig.contactEmail}
              </a>
              <p className="mt-2 text-sm leading-6 text-foreground/64">
                Chapter email for questions, introductions, and newsletter
                requests.
              </p>
              <SocialLinks className="mt-5" />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-[repeat(3,minmax(0,1fr))]">
            {footerLinkGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-[1.6rem] border border-primary/10 bg-white/62 p-5 shadow-[0_14px_40px_rgba(39,59,42,0.05)]"
              >
                <h2 className="font-heading text-2xl text-foreground">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <SmartLink
                        href={link.href}
                        className="text-sm leading-6 text-foreground/72 transition hover:text-primary"
                      >
                        {link.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-primary/10 pt-6 text-sm text-foreground/58 sm:flex-row sm:items-center sm:justify-between">
          <p>{siteConfig.serviceAreaSentence}</p>
          <a
            className="inline-flex min-h-11 items-center rounded-full border border-primary/12 bg-white/72 px-4 py-2 font-medium text-foreground underline decoration-primary/30 underline-offset-4"
            href={siteConfig.contactUrl}
          >
            {siteConfig.contactEmail}
          </a>
        </div>
      </Container>
    </footer>
  );
}
