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
        title="Chapter leadership should feel visible, approachable, and easy to contact"
        description="This page gives the chapter a straightforward way to publish officer information now and expand it later with biographies, committees, or board responsibilities if needed."
        serviceArea={siteConfig.serviceAreaLabel}
        variant="community"
        actions={[
          { href: "/contact", label: "Contact the chapter" },
          { href: "/documents", label: "See documents", variant: "secondary" },
        ]}
      />

      <SectionShell
        eyebrow="Current officers"
        title="Leadership cards are powered by editable site data"
        intro="Names, roles, and short descriptions can be updated in the central config without redesigning the page."
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
          title="Use the chapter inbox for leadership questions, partnerships, and introductions"
          description="A shared chapter contact path keeps communication simple while the chapter decides how much board-specific contact detail to publish later."
          primaryAction={{ href: siteConfig.contactUrl, label: "Email the chapter" }}
          secondaryAction={{ href: "/about", label: "Read about the chapter" }}
          variant="pollinator"
        />
      </div>
    </>
  );
}
