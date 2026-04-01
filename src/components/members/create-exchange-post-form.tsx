"use client";

import { useActionState, useMemo, useState } from "react";
import { ImagePlus } from "lucide-react";

import { createExchangePostAction, type MemberActionState } from "@/lib/members/actions";
import { buttonVariants } from "@/components/ui/button-styles";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const initialState: MemberActionState = { status: "idle" };

type CreateExchangePostFormProps = {
  counties: string[];
  categoryOptions: { value: string; label: string }[];
};

export function CreateExchangePostForm({
  counties,
  categoryOptions,
}: CreateExchangePostFormProps) {
  const [state, formAction, isPending] = useActionState(
    createExchangePostAction,
    initialState,
  );
  const [files, setFiles] = useState<File[]>([]);

  const previews = useMemo(
    () =>
      files.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      })),
    [files],
  );

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
            Title
          </label>
          <Input
            name="title"
            required
            className="mt-3 h-12 rounded-2xl border-primary/12 bg-white/82 px-4"
            placeholder="Extra native grass plugs available"
          />
        </div>
        <div>
          <label className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
            Category
          </label>
          <select
            name="category"
            required
            className="mt-3 h-12 w-full rounded-2xl border border-primary/12 bg-white/82 px-4 text-base text-foreground outline-none transition focus:border-primary/30 focus:ring-4 focus:ring-primary/10"
            defaultValue=""
          >
            <option value="" disabled>
              Choose a category
            </option>
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
          Description
        </label>
        <textarea
          name="description"
          required
          rows={6}
          className="mt-3 w-full rounded-[1.5rem] border border-primary/12 bg-white/82 px-4 py-3 text-base leading-7 text-foreground outline-none transition focus:border-primary/30 focus:ring-4 focus:ring-primary/10"
          placeholder="Share what you have available, what condition it is in, and how another member should respond."
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
            County
          </label>
          <select
            name="county"
            className="mt-3 h-12 w-full rounded-2xl border border-primary/12 bg-white/82 px-4 text-base text-foreground outline-none transition focus:border-primary/30 focus:ring-4 focus:ring-primary/10"
            defaultValue=""
          >
            <option value="">Optional</option>
            {counties.map((county) => (
              <option key={county} value={county}>
                {county}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
            Availability notes
          </label>
          <Input
            name="availabilityNotes"
            className="mt-3 h-12 rounded-2xl border-primary/12 bg-white/82 px-4"
            placeholder="Weekends, porch pickup, bring pots, etc."
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
          Swap preference
        </label>
        <Input
          name="swapPreference"
          className="mt-3 h-12 rounded-2xl border-primary/12 bg-white/82 px-4"
          placeholder="Optional: open to swap, giveaway only, tool return timing, and so on."
        />
      </div>

      <div className="rounded-[1.5rem] border border-primary/10 bg-[#F7F4E8] p-4">
        <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
          <ImagePlus className="h-4 w-4" />
          Add up to 5 images
          <input
            name="images"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            multiple
            className="sr-only"
            onChange={(event) => setFiles(Array.from(event.target.files ?? []))}
          />
        </label>
        <p className="mt-2 text-sm leading-6 text-foreground/66">
          JPG, PNG, WEBP, or GIF. Keep each image at 5MB or less.
        </p>
        <p className="mt-2 text-sm leading-6 text-foreground/66">
          Uploaded images stay inside the members portal unless an admin later marks one as a public teaser.
        </p>
        {previews.length ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {previews.map((preview) => (
              <div
                key={preview.url}
                className="overflow-hidden rounded-[1.2rem] border border-primary/10 bg-white/85"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview.url}
                  alt={preview.name}
                  className="aspect-[4/3] h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {state.status === "error" && state.message ? (
        <p className="rounded-[1.3rem] border border-amber-300/40 bg-amber-50 px-4 py-3 text-sm leading-7 text-amber-900">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className={cn(
          buttonVariants({ variant: "default", size: "lg" }),
          "h-12 rounded-full px-5",
        )}
      >
        {isPending ? "Posting..." : "Create member post"}
      </button>
    </form>
  );
}
