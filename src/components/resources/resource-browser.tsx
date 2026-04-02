"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import type { ResourceGroup } from "@/data/resources";
import { ResourceGrid } from "@/components/cards/resource-grid";
import { Input } from "@/components/ui/input";

type ResourceBrowserProps = {
  groups: ResourceGroup[];
};

export function ResourceBrowser({ groups }: ResourceBrowserProps) {
  const [query, setQuery] = useState("");

  const filteredGroups = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return groups;
    }

    return groups
      .map((group) => ({
        ...group,
        links: group.links.filter((link) =>
          [group.title, group.description, link.title, link.description]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery),
        ),
      }))
      .filter((group) => group.links.length > 0);
  }, [groups, query]);

  const resultCount = filteredGroups.reduce(
    (count, group) => count + group.links.length,
    0,
  );

  return (
    <div className="space-y-6">
      <div className="rounded-[1.7rem] border border-primary/10 bg-[#F5F0E1] p-5 shadow-[0_18px_60px_rgba(39,59,42,0.08)]">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
            Search resources
          </span>
          <div className="relative max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/45" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search NPSOT links, plant guides, and habitat resources"
              className="h-12 rounded-full border-primary/12 bg-white pl-11"
            />
          </div>
        </label>
        <p className="mt-4 text-sm leading-7 text-foreground/66">
          Showing {resultCount} resource link{resultCount === 1 ? "" : "s"}.
        </p>
      </div>

      {filteredGroups.length ? (
        <ResourceGrid groups={filteredGroups} />
      ) : (
        <div className="rounded-[1.7rem] border border-dashed border-primary/20 bg-[#F7F4E8] p-6">
          <h3 className="font-heading text-2xl text-foreground">
            No resources match that search
          </h3>
          <p className="mt-3 text-base leading-7 text-foreground/72">
            Try a broader term like native plants, monarchs, membership, or
            documents.
          </p>
        </div>
      )}
    </div>
  );
}
