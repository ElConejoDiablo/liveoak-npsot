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
    "Learn about the Live Oak Chapter, the counties it serves, the chapter mission, and how people can participate.",
  path: "/about",
  eyebrow: "About the Chapter",
});

export default function AboutPage() {
  const participationPaths = [
    {
      title: "Attend an event",
      description:
        "Start with a meeting, walk, or seasonal program to see the chapter in action and get a feel for the community.",
      href: "/events",
      label: "Browse events",
    },
    {
      title: "Volunteer locally",
      description:
        "If you want to help with outreach, hospitality, stewardship, or chapter support, the volunteer page shows the clearest entry points.",
      href: "/volunteer",
      label: "See volunteer paths",
    },
    {
      title: "Reach out or join",
      description:
        "Use the contact page for questions and introductions, or join NPSOT when you are ready to connect more deeply with the chapter.",
      href: "/contact",
      label: "Contact the chapter",
    },
  ] as const;

  return (
    <>
      <PageHero
        eyebrow="About the chapter"
        title="A chapter shaped around practical native-plant education and regional participation"
        description="The Live Oak Chapter exists to help native plants feel relevant, understandable, and actionable in everyday life. The chapter serves Fayette, Colorado, and Lavaca Counties with programs, outreach, and opportunities to learn alongside neighbors."
        serviceArea={siteConfig.serviceAreaLabel}
        variant="savanna"
        visualTitle="Learning together across the chapter region"
        visualNote="Programs, conversations, and local stewardship help this chapter feel grounded in everyday life."
        actions={[
          { href: "/events", label: "View events" },
          { href: "/leadership", label: "Meet leadership", variant: "secondary" },
        ]}
      />

      <SectionShell
        eyebrow="Who we serve"
        title="A local chapter for Fayette, Colorado, and Lavaca Counties"
        intro="The Live Oak Chapter is meant to be useful on the ground: local in scope, welcoming in tone, and rooted in the landscapes, plant communities, and habitat questions that matter across the three-county service area."
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
        title="Education, field-based learning, and practical chapter participation"
        intro="The chapter does not exist only to share information. It exists to help people connect that information to local landscapes, seasonal observation, and the work of caring for habitat."
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
        eyebrow="How to participate"
        title="Choose the next step that fits your time, interest, and confidence"
        intro="This page should help you orient quickly, then send you to the page built for the task you actually want to do."
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
        intro="About only needs a quick snapshot here. The dedicated leadership page can carry the fuller bios and contact context."
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
              A small officer team keeps the chapter welcoming, organized, and moving forward.
            </h3>
            <p className="mt-4 text-base leading-7 text-foreground/74">
              Chapter leadership helps guide programs, communication, partnerships,
              and the dependable behind-the-scenes work that makes local
              participation easier.
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
          title="Follow local chapter activity and connect with statewide resources"
          description="The chapter site is designed to be a useful front door, while still connecting visitors to NPSOT membership, education, and wider native-plant resources."
          primaryAction={{ href: "/resources", label: "Explore resources" }}
          secondaryAction={{ href: siteConfig.npsot.homeUrl, label: "Visit NPSOT.org" }}
          variant="community"
        />
      </Container>
    </>
  );
}
