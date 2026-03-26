import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
};

export function SiteLogo({ className }: SiteLogoProps) {
  return (
    <div
      className={cn(
        "relative flex h-12 w-12 items-center justify-center rounded-full border border-primary/15 bg-[radial-gradient(circle_at_top,_rgba(242,214,127,0.9),_rgba(242,214,127,0.25)_40%,_rgba(255,255,255,0.9)_75%)] shadow-[0_10px_30px_rgba(32,59,33,0.12)]",
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-[5px] rounded-full border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(240,232,214,0.65))]" />
      <svg
        viewBox="0 0 48 48"
        className="relative h-8 w-8 text-primary"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 9C18 13 14.5 19.5 14.5 26.5C14.5 33 18.9 38 24 39C29.1 38 33.5 33 33.5 26.5C33.5 19.5 30 13 24 9Z"
          fill="currentColor"
          opacity="0.92"
        />
        <path
          d="M24 13.5V36.5"
          stroke="#F7F4E8"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M24 20.5C20.5 19.5 18.2 17.4 16.8 14.8"
          stroke="#F7F4E8"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M24 25.5C27.4 24.5 29.8 22.4 31.2 19.8"
          stroke="#F7F4E8"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

