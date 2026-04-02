import { cn } from "@/lib/utils";

type EventLabelsProps = {
  labels: string[];
  className?: string;
};

export function EventLabels({ labels, className }: EventLabelsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {labels.map((label, index) => (
        <span
          key={label}
          className={cn(
            "rounded-full px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em]",
            index === 0
              ? "bg-primary text-primary-foreground"
              : "border border-primary/12 bg-white/85 text-primary/78",
          )}
        >
          {label}
        </span>
      ))}
    </div>
  );
}
