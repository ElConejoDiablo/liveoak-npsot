import { ArrowUpRight, FileText, Mail } from "lucide-react";

import type { ResourceGroup } from "@/data/resources";

import { SmartLink } from "@/components/shared/smart-link";

type ResourceGridProps = {
  groups: ResourceGroup[];
};

export function ResourceGrid({ groups }: ResourceGridProps) {
  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <section key={group.title} className="space-y-5">
          <div className="max-w-3xl">
            <h3 className="font-heading text-3xl text-foreground">{group.title}</h3>
            <p className="mt-2 text-lg leading-8 text-foreground/74">
              {group.description}
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {group.links.map((link) => (
              <SmartLink
                key={link.title}
                href={link.href}
                className="group rounded-[1.6rem] border border-primary/10 bg-white/78 p-5 shadow-[0_18px_60px_rgba(37,58,40,0.08)] transition hover:-translate-y-0.5 hover:border-primary/20"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/8 text-primary">
                  {link.kind === "email" ? (
                    <Mail className="h-5 w-5" />
                  ) : link.kind === "internal" ? (
                    <FileText className="h-5 w-5" />
                  ) : (
                    <ArrowUpRight className="h-5 w-5" />
                  )}
                </div>
                <h4 className="font-heading text-2xl leading-tight text-foreground">
                  {link.title}
                </h4>
                <p className="mt-3 text-base leading-7 text-foreground/72">
                  {link.description}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  <span>
                    {link.kind === "internal"
                      ? "Open page"
                      : link.kind === "email"
                        ? "Send email"
                        : "Visit resource"}
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </SmartLink>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

