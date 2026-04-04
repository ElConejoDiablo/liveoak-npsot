import { MemberShell } from "@/components/members/member-shell";
import { requireMemberContext } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function ProtectedMembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { allowlistedMember, user } = await requireMemberContext();

  return (
    <MemberShell
      title="Members Portal"
      description="A protected chapter workspace for member documents, exchange posts, shared help, and simple follow-through on successful interactions."
      pointsTotal={user.pointsTotal}
      memberName={allowlistedMember.name}
    >
      {children}
    </MemberShell>
  );
}
