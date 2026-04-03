import { ArrowRight } from "lucide-react";

import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { SectionShell } from "@/components/sections/section-shell";
import { Container } from "@/components/shared/container";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { SmartLink } from "@/components/shared/smart-link";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "About the Chapter",
  description:
    "Learn about the Live Oak Chapter, the counties it serves, and how to get involved.",
  path: "/about",
  eyebrow: "About the Chapter",
});

export default function AboutPage() {
  const chapterCards = [
    {
      title: "Learn native plants locally",
      description:
        "Field notes, seasonal blooms, and grounded regional knowledge",
    },
    {
      title: "Join walks, talks, and chapter events",
      description:
        "Gatherings that connect people with plants, habitat, and each other",
    },
    {
      title: "Support stewardship and outreach",
      description:
        "Practical work that strengthens native landscapes and local awareness",
    },
  ] as const;

  return (
    <>
      <PageHero
        eyebrow="About"
        title="About the Live Oak Chapter"
        description="Local native plant learning, chapter gatherings, and practical stewardship in the Tri-County Prairie Belt"
        serviceArea="Serving Fayette, Colorado, and Lavaca Counties"
        variant="aboutchapter"
        layout="banner"
        actions={[
          { href: "/events", label: "View events" },
          { href: "/contact", label: "Contact the chapter", variant: "secondary" },
        ]}
      />

      <SectionShell
        title="What the chapter makes possible close to home"
        intro="The Live Oak Chapter helps people learn native plants, join local events, and support healthier habitat across Fayette, Colorado, and Lavaca Counties. Whether you are just getting started or already working with native landscapes, the chapter creates practical ways to learn from place and from one another."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {chapterCards.map((card, index) => (
            <MotionReveal
              key={card.title}
              delay={index * 0.05}
              className="rounded-[1.7rem] border border-primary/10 bg-white/78 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)]"
            >
              <h2 className="font-heading text-2xl leading-tight text-foreground">
                {card.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-foreground/72">
                {card.description}
              </p>
            </MotionReveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        title="What we do"
        intro="Chapter activity includes meetings and talks, field walks, seasonal observation, native gardening, stewardship, and public outreach. Some events focus on learning and identification. Others focus on habitat, community, and helping people take the next step with native plants at home and in public spaces."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Meetings and talks that make local native plant learning easier to start and easier to keep going.",
            "Field walks and seasonal observation that connect what people notice outdoors to plants, habitat, and place.",
            "Stewardship, gardening, and outreach that turn interest into practical action across the region.",
          ].map((item, index) => (
            <MotionReveal
              key={item}
              delay={index * 0.05}
              className="rounded-[1.7rem] border border-primary/10 bg-white/78 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)]"
            >
              <p className="text-base leading-8 text-foreground/74">{item}</p>
            </MotionReveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        title="Leadership"
        intro="The chapter is led by local volunteers who help organize gatherings, learning opportunities, and chapter communication across the region."
        actions={
          <SmartLink
            href="/leadership"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            <span>Meet the chapter leadership</span>
            <ArrowRight className="h-4 w-4" />
          </SmartLink>
        }
      >
        <MotionReveal className="rounded-[1.8rem] border border-primary/10 bg-[#F5F0E1] p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)] sm:p-8">
          <h3 className="font-heading text-3xl leading-tight text-foreground">
            Local volunteers help keep the chapter welcoming, organized, and moving.
          </h3>
          <p className="mt-4 max-w-3xl text-base leading-7 text-foreground/74">
            Leadership supports events, communication, partnerships, and the
            practical behind-the-scenes work that helps people stay connected to
            chapter activity across the region.
          </p>
        </MotionReveal>
      </SectionShell>

      <Container className="pb-20">
        <CtaBanner
          eyebrow="Keep exploring"
          title="Keep exploring the chapter"
          description="Read chapter news, browse resources, or see what is coming up next."
          primaryAction={{ href: "/news", label: "Read chapter news" }}
          secondaryAction={{ href: "/events", label: "View events" }}
          variant="resourcehub"
        />
      </Container>
    </>
  );
}
