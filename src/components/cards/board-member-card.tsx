import type { LeadershipMember } from "@/data/site";

type BoardMemberCardProps = {
  member: LeadershipMember;
};

export function BoardMemberCard({ member }: BoardMemberCardProps) {
  return (
    <article className="rounded-[1.8rem] border border-primary/10 bg-white/78 p-6 shadow-[0_18px_60px_rgba(37,58,40,0.08)]">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/76">
        {member.role}
      </p>
      <h3 className="mt-3 font-heading text-3xl leading-tight text-foreground">
        {member.name}
      </h3>
      <p className="mt-4 text-base leading-7 text-foreground/74">{member.bio}</p>
      <dl className="mt-5 space-y-3 text-sm text-foreground/70">
        <div>
          <dt className="font-semibold text-foreground">Focus</dt>
          <dd className="mt-1 text-foreground/72">{member.focus}</dd>
        </div>
        <div>
          <dt className="font-semibold text-foreground">Connection</dt>
          <dd className="mt-1 text-foreground/72">{member.countyConnection}</dd>
        </div>
        {member.participationNote ? (
          <div>
            <dt className="font-semibold text-foreground">Best for</dt>
            <dd className="mt-1 text-foreground/72">{member.participationNote}</dd>
          </div>
        ) : null}
      </dl>
    </article>
  );
}
