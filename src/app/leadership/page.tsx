import { BoardMemberCard } from "@/components/cards/board-member-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { SectionShell } from "@/components/sections/section-shell";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { siteConfig } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Leadership",
  description:
    "Meet the current leadership of the Live Oak Chapter of the Native Plant Society of Texas.",
  path: "/leadership",
});

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="Meet the chapter officers"
        description="These are the current officers serving the Live Oak Chapter."
        serviceArea={siteConfig.serviceAreaLabel}
        layout="compact"
        highlightsTitle="At a glance"
        highlights={[
          "Current officers and their roles",
          "A shared chapter contact path for questions",
          "Links to chapter documents",
        ]}
        actions={[
          { href: "/contact", label: "Contact the chapter" },
          { href: "/documents", label: "See documents", variant: "secondary" },
        ]}
      />

      <SectionShell
        eyebrow="Current officers"
        title="Current chapter officers"
        intro="Meet the current officers of the Live Oak Chapter."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {siteConfig.leadership.map((member, index) => (
            <MotionReveal key={member.role} delay={index * 0.05}>
              <BoardMemberCard member={member} />
            </MotionReveal>
          ))}
        </div>
      </SectionShell>

      <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 lg:px-8">
        <CtaBanner
          eyebrow="Questions for the board?"
          title="Use the chapter contact page for leadership questions and introductions"
          description="The chapter contact page is the best place for board questions, partnerships, and general introductions."
          primaryAction={{ href: siteConfig.contactUrl, label: "Email the chapter" }}
          secondaryAction={{ href: "/about", label: "Read about the chapter" }}
          variant="pollinator"
        />
      </div>
    </>
  );
}
