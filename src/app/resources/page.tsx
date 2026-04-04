import { ArrowRight } from "lucide-react";

import { CtaBanner } from "@/components/sections/cta-banner";
import { PhotographicHeroBanner } from "@/components/sections/photographic-hero-banner";
import { SectionShell } from "@/components/sections/section-shell";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { SmartLink } from "@/components/shared/smart-link";
import { siteConfig } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Resources",
  description:
    "Choose the chapter-owned plant library, statewide NPSOT guidance, or practical native plant sourcing information for Fayette, Colorado, and Lavaca Counties.",
  path: "/resources",
  eyebrow: "Resources",
});

export default function ResourcesPage() {
  const destinations = [
    {
      title: "Tri-County Native Plants",
      href: "/resources/plants",
      eyebrow: "Chapter-owned library",
      description:
        "Start here for the Live Oak Chapter plant library, starter collections, and local-first plant detail pages.",
      bullets: ["Plant index", "Starter collections", "Featured local plants"],
    },
    {
      title: "NPSOT Resources",
      href: "/resources/npsot",
      eyebrow: "Statewide guidance",
      description:
        "Go here for statewide NPSOT links, broader Texas-native references, and official member and learning resources.",
      bullets: ["NPSOT guidance", "Official links", "Texas-native references"],
    },
    {
      title: "Sourcing Native Plants",
      href: "/resources/sourcing-native-plants",
      eyebrow: "Local sourcing",
      description:
        "Use this for nurseries, seed sellers, and chapter-verified provenance notes when they are available.",
      bullets: ["Nursery cards", "Seed and plant sources", "Manual provenance notes"],
    },
  ] as const;

  return (
    <>
      <PhotographicHeroBanner
        variant="resourcehub"
        title="Resources for native plants in the Tri-County Prairie Belt"
        description="Start with the chapter for local guidance, trusted plant references, and practical help for Fayette, Colorado, and Lavaca Counties."
        serviceArea={siteConfig.serviceAreaLabel}
        contentClassName="max-w-[38rem]"
        overlayClassName="bg-[linear-gradient(180deg,rgba(18,25,19,0.38),rgba(18,25,19,0.58)_28%,rgba(18,25,19,0.76)_58%,rgba(18,25,19,0.92)_100%)] lg:bg-[linear-gradient(90deg,rgba(18,25,19,0.9)_0%,rgba(18,25,19,0.84)_34%,rgba(18,25,19,0.62)_56%,rgba(18,25,19,0.34)_76%,rgba(18,25,19,0.22)_100%),linear-gradient(180deg,rgba(18,25,19,0.28),rgba(18,25,19,0.16)_28%,rgba(18,25,19,0.54)_80%,rgba(18,25,19,0.84)_100%)]"
        imageClassName="object-[62%_center] sm:object-center"
      />

      <SectionShell
        eyebrow="Choose a destination"
        title="Resources split into three practical paths"
        intro="The chapter now separates the local plant library, statewide NPSOT guidance, and sourcing information so visitors can get to the right place faster."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {destinations.map((item, index) => (
            <MotionReveal
              key={item.title}
              delay={index * 0.05}
              className="rounded-[1.7rem] border border-primary/10 bg-white/78 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">
                {item.eyebrow}
              </p>
              <h2 className="mt-3 font-heading text-2xl leading-tight text-foreground">
                {item.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-foreground/72">
                {item.description}
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-foreground/70">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary/60" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <SmartLink
                  href={item.href}
                  className="inline-flex items-center rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary/20 hover:bg-primary/5"
                >
                  Open {item.title}
                </SmartLink>
              </div>
            </MotionReveal>
          ))}
        </div>
      </SectionShell>

      <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 lg:px-8">
        <CtaBanner
          eyebrow="Need help choosing the right path?"
          title="Need something specific?"
          description="Contact the chapter if you want help finding the right destination, plant reference, or local next step."
          primaryAction={{ href: "/contact", label: "Contact the chapter" }}
          variant="resourcesreferencehelp"
        />
      </div>
    </>
  );
}
