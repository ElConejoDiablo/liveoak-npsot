import { BoardMemberCard } from "@/components/cards/board-member-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { SectionShell } from "@/components/sections/section-shell";
import { Container } from "@/components/shared/container";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { siteConfig } from "@/data/site";
import { volunteerPaths } from "@/data/programs";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "About the Chapter",
  description:
    "Learn about the Live Oak Chapter, the counties it serves, the chapter mission, and how people can participate.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the chapter"
        title="A chapter shaped around practical native-plant education and regional participation"
        description="The Live Oak Chapter exists to help native plants feel relevant, understandable, and actionable in everyday life. The chapter serves Fayette, Colorado, and Lavaca Counties with programs, outreach, and opportunities to learn alongside neighbors."
        serviceArea={siteConfig.serviceAreaLabel}
        variant="savanna"
        actions={[
          { href: "/events", label: "View events" },
          { href: "/leadership", label: "Meet leadership", variant: "secondary" },
        ]}
      />

      <SectionShell
        eyebrow="Who we serve"
        title="Regional relevance matters"
        intro="A chapter website should immediately answer who it is for and why it exists. The Live Oak Chapter is built around the landscapes, communities, and habitat questions that matter in Fayette, Colorado, and Lavaca Counties."
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <MotionReveal className="rounded-[1.8rem] border border-primary/10 bg-white/78 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)] sm:p-8">
            <h2 className="font-heading text-3xl text-foreground">Chapter summary</h2>
            <p className="mt-4 text-lg leading-8 text-foreground/74">
              The chapter provides a local home for education, outreach, and
              conservation-minded action. That can include public talks, field
              outings, seed stewardship, restoration-minded volunteer work, and
              simple help for people trying to make better native-plant choices.
            </p>
            <p className="mt-4 text-lg leading-8 text-foreground/74">
              It is intentionally welcoming to gardeners, land stewards,
              families, teachers, and anyone who wants to understand how native
              plants support Texas habitats.
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
        eyebrow="How to participate"
        title="There are multiple ways to plug in, even if you are just getting started"
        intro="A healthy chapter makes room for people with different levels of time, knowledge, and confidence."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {volunteerPaths.map((path, index) => (
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
              <ul className="mt-5 space-y-2 text-sm leading-7 text-foreground/68">
                {path.examples.map((example) => (
                  <li key={example} className="flex gap-2">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/65" />
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </MotionReveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Leadership snapshot"
        title="Current chapter leadership"
        intro="Leadership details live in the site's editable data layer so officer names can be updated without touching layout code."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {siteConfig.leadership.map((member, index) => (
            <MotionReveal key={member.role} delay={index * 0.05}>
              <BoardMemberCard member={member} />
            </MotionReveal>
          ))}
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
