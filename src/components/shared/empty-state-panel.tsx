import { FileQuestion } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-styles";
import { SmartLink } from "@/components/shared/smart-link";
import { cn } from "@/lib/utils";

type EmptyStatePanelProps = {
  title: string;
  description: string;
  action?: {
    href: string;
    label: string;
  };
};

export function EmptyStatePanel({
  title,
  description,
  action,
}: EmptyStatePanelProps) {
  return (
    <div className="rounded-[2rem] border border-dashed border-primary/25 bg-white/65 p-8 text-center shadow-[0_18px_60px_rgba(39,60,42,0.06)]">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/8 text-primary">
        <FileQuestion className="h-7 w-7" />
      </div>
      <h3 className="mt-5 font-heading text-2xl text-foreground">{title}</h3>
      <p className="mx-auto mt-3 max-w-2xl text-lg leading-8 text-foreground/74">
        {description}
      </p>
      {action ? (
        <SmartLink
          href={action.href}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "mt-6 inline-flex h-auto rounded-full border-primary/20 bg-white px-5 py-3",
          )}
        >
          {action.label}
        </SmartLink>
      ) : null}
    </div>
  );
}
