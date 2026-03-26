"use client";

import type { LucideIcon } from "lucide-react";
import { signOut } from "next-auth/react";

import { buttonVariants } from "@/components/ui/button-styles";
import { cn } from "@/lib/utils";

type MemberSignOutButtonProps = {
  className?: string;
  icon?: LucideIcon;
};

export function MemberSignOutButton({
  className,
  icon: Icon,
}: MemberSignOutButtonProps) {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className={cn(
        buttonVariants({ variant: "outline", size: "lg" }),
        "h-auto border-primary/15 bg-white/80 px-4 py-3 text-sm",
        className,
      )}
    >
      {Icon ? <Icon className="mr-2 h-4 w-4" /> : null}
      Sign out
    </button>
  );
}
