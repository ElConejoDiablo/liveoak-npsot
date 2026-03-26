import {
  Camera,
  Mail,
  PlayCircle,
  Users,
} from "lucide-react";

import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

type SocialLinksProps = {
  className?: string;
  stacked?: boolean;
};

const links = [
  {
    label: "Facebook",
    href: siteConfig.social.facebook,
    icon: Users,
  },
  {
    label: "Instagram",
    href: siteConfig.social.instagram,
    icon: Camera,
  },
  {
    label: "YouTube",
    href: siteConfig.social.youtube,
    icon: PlayCircle,
  },
  {
    label: "Email",
    href: siteConfig.contactUrl,
    icon: Mail,
  },
];

export function SocialLinks({ className, stacked = false }: SocialLinksProps) {
  return (
    <ul
      className={cn(
        "flex flex-wrap gap-3",
        stacked && "flex-col items-start gap-2",
        className,
      )}
      aria-label="Chapter social links"
    >
      {links.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            className={cn(
              "inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/15 bg-white/70 px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/30 hover:bg-white",
              stacked && "w-full justify-between rounded-2xl px-4 py-3",
            )}
            aria-label={label === "Email" ? `Email ${siteConfig.contactEmail}` : label}
          >
            <span className="inline-flex items-center gap-2">
              <Icon className="h-4 w-4 text-primary" />
              <span>{label}</span>
            </span>
            {stacked ? (
              <span className="text-xs uppercase tracking-[0.16em] text-foreground/48">
                {label === "Email" ? "Direct contact" : "Social"}
              </span>
            ) : null}
          </a>
        </li>
      ))}
    </ul>
  );
}
