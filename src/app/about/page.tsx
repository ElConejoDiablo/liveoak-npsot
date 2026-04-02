import { ArrowRight } from "lucide-react";

import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { SectionShell } from "@/components/sections/section-shell";
import { Container } from "@/components/shared/container";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { SmartLink } from "@/components/shared/smart-link";
import { siteConfig } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "About the Chapter",
  description:
    "Learn about the Live Oak Chapter, the counties it serves, and how to get involved.",
  path: "/about",
  eyebrow: "About the Chapter",
});

export default function AboutPage() {
  const participationPaths = [
    {
      title: "Attend an event",
      description:
        "See upcoming meetings, walks, and public events around the chapter.",
      href: "/events",
      label: "View events",
    },
    {
      title: "Volunteer locally",
      description:
        "Help with outreach, hospitality, stewardship, and chapter support.",
      href: "/volunteer",
      label: "See volunteer options",
    },
    {
      title: "Reach out or join",
      description:
        "Contact the chapter with questions, or join NPSOT when you are ready.",
      href: "/contact",
      label: "Contact the chapter",
    },
  ] as const;

  return (
    <>
      <PageHero
        eyebrow="About the chapter"
        title="A local chapter for people who want to learn about native plants close to home"
        description="The Live Oak Chapter serves Fayette, Colorado, and Lavaca Counties with events, outreach, and opportunities to learn about native plants alongside neighbors."
        serviceArea={siteConfig.serviceAreaLabel}
        variant="savanna"
        visualTitle="Learning together across the chapter region"
        visualNote="Events, conversations, and local stewardship all help connect people to the landscapes around them."
        actions={[
          { href: "/events", label: "View events" },
          { href: "/leadership", label: "Meet leadership", variant: "secondary" },
        ]}
      />

      <SectionShell
        eyebrow="Who we serve"
        title="A local chapter for Fayette, Colorado, and Lavaca Counties"
        intro="The chapter is local in scope, welcoming in tone, and rooted in the landscapes, plant communities, and habitat questions that matter across the three-county service area."
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <MotionReveal className="rounded-[1.8rem] border border-primary/10 bg-white/78 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)] sm:p-8">
            <h2 className="font-heading text-3xl text-foreground">Chapter summary</h2>
            <p className="mt-4 text-lg leading-8 text-foreground/74">
              {siteConfig.about.overview}
            </p>
            <p className="mt-4 text-lg leading-8 text-foreground/74">
              {siteConfig.about.regionalContext}
            </p>
          </MotionReveal>

          <MotionReveal className="rounded-[1.8rem] border border-primary/10 bg-[#F5F0E1] p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)] sm:p-8">
            <h2 className="font-heading text-3xl text-foreground">Mission</h2>
            <p className="mt-4 text-lg leading-8 text-foreground/76">
              {siteConfig.mission}
            </p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-primary/72">
              Service counties
            </p>
            <ul className="mt-4 space-y-2 text-base leading-7 text-foreground/74">
              {siteConfig.serviceArea.map((county) => (
                <li key={county}>{county}</li>
              ))}
            </ul>
          </MotionReveal>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="What we do"
        title="Events, field learning, and practical native plant education"
        intro="The chapter helps people connect what they learn to local landscapes, seasonal observation, and the work of caring for habitat."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {siteConfig.about.whatWeDo.map((item, index) => (
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
        eyebrow="Get involved"
        title="Find a way to get involved that fits your time and interests"
        intro="Whether you want to attend an event, volunteer, or get in touch, these are good places to get involved."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {participationPaths.map((path, index) => (
            <MotionReveal
              key={path.title}
              delay={index * 0.05}
              className="rounded-[1.7rem] border border-primary/10 bg-white/78 p-5 shadow-[0_18px_60px_rgba(39,59,42,0.08)]"
            >
              <h3 className="font-heading text-2xl leading-tight text-foreground">
                {path.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-foreground/72">
                {path.description}
              </p>
              <SmartLink
                href={path.href}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                <span>{path.label}</span>
                <ArrowRight className="h-4 w-4" />
              </SmartLink>
            </MotionReveal>
          ))}
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {siteConfig.about.howToParticipate.map((item, index) => (
            <MotionReveal
              key={item}
              delay={index * 0.04}
              className="rounded-[1.5rem] border border-primary/10 bg-[#F7F4E8] p-5 text-base leading-7 text-foreground/74"
            >
              {item}
            </MotionReveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Leadership snapshot"
        title="A quick look at the team guiding chapter activity"
        intro="Meet the current officers, then visit the leadership page for more details."
        actions={
          <SmartLink
            href="/leadership"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            <span>Meet the full leadership team</span>
            <ArrowRight className="h-4 w-4" />
          </SmartLink>
        }
      >
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <MotionReveal className="rounded-[1.8rem] border border-primary/10 bg-[#F5F0E1] p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/72">
              Leadership overview
            </p>
            <h3 className="mt-4 font-heading text-3xl leading-tight text-foreground">
              A small officer team helps keep the chapter welcoming, organized, and moving forward.
            </h3>
            <p className="mt-4 text-base leading-7 text-foreground/74">
              Chapter leadership helps guide events, communication, partnerships,
              and the behind-the-scenes work that keeps the chapter running.
            </p>
          </MotionReveal>

          <div className="grid gap-4 md:grid-cols-3">
            {siteConfig.leadership.map((member, index) => (
              <MotionReveal
                key={member.role}
                delay={index * 0.05}
                className="rounded-[1.7rem] border border-primary/10 bg-white/78 p-5 shadow-[0_18px_60px_rgba(39,59,42,0.08)]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/72">
                  {member.role}
                </p>
                <h3 className="mt-3 font-heading text-2xl leading-tight text-foreground">
                  {member.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-foreground/72">
                  {member.focus}
                </p>
              </MotionReveal>
            ))}
          </div>
        </div>
      </SectionShell>

      <Container className="pb-20">
        <CtaBanner
          eyebrow="Keep exploring"
          title="Read chapter news and explore statewide resources"
          description="Find chapter news, NPSOT membership links, and trusted native plant resources."
          primaryAction={{ href: "/resources", label: "Explore resources" }}
          secondaryAction={{ href: siteConfig.npsot.homeUrl, label: "Visit NPSOT.org" }}
          variant="community"
        />
      </Container>
    </>
  );
}
