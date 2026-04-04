"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import type { PlantImageRecord } from "@/lib/plants/images";
import { cn } from "@/lib/utils";

type PlantImageGalleryProps = {
  plantName: string;
  images: PlantImageRecord[];
};

export function PlantImageGallery({ plantName, images }: PlantImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeImage = activeIndex == null ? null : images[activeIndex];
  const hasMultiple = images.length > 1;

  const cycleIndex = useCallback((delta: number) => {
    if (activeIndex == null) return;
    setActiveIndex((current) => {
      if (current == null) return current;
      const next = (current + delta + images.length) % images.length;
      return next;
    });
  }, [activeIndex, images.length]);

  useEffect(() => {
    if (activeIndex == null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
      if (event.key === "ArrowLeft" && hasMultiple) {
        cycleIndex(-1);
      }
      if (event.key === "ArrowRight" && hasMultiple) {
        cycleIndex(1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, hasMultiple, cycleIndex]);

  const captionLine = useMemo(() => {
    if (!activeImage?.caption) return null;
    return `Caption: ${activeImage.caption}`;
  }, [activeImage]);

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setActiveIndex(0)}
        className="block w-full overflow-hidden rounded-[1.5rem] border border-primary/10 bg-[#f4f0e3] text-left"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[0].imageUrl}
          alt={images[0].altText || plantName}
          className="h-auto w-full object-cover"
          loading="lazy"
        />
      </button>

      {images[0].caption || images[0].photographerCredit || images[0].location || images[0].licenseNote ? (
        <div className="space-y-1 rounded-[1.2rem] border border-primary/10 bg-[#fbf9f2] p-4 text-sm leading-6 text-foreground/72">
          {images[0].caption ? <p>Caption: {images[0].caption}</p> : null}
          {images[0].photographerCredit ? <p>Photo: {images[0].photographerCredit}</p> : null}
          {images[0].location ? <p>Location: {images[0].location}</p> : null}
          {images[0].licenseNote ? <p>{images[0].licenseNote}</p> : null}
        </div>
      ) : null}

      {hasMultiple ? (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "overflow-hidden rounded-[1rem] border border-primary/10 bg-[#f4f0e3]",
                index === 0 ? "ring-2 ring-primary/25" : "",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.imageUrl}
                alt={image.altText || plantName}
                className="aspect-[4/3] h-full w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      ) : null}

      {activeImage ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${plantName} image viewer`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative mx-auto flex w-full max-w-5xl flex-col gap-3"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-foreground shadow-lg"
                aria-label="Close image viewer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-hidden rounded-[1.5rem] bg-white shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeImage.imageUrl}
                alt={activeImage.altText || plantName}
                className="max-h-[75vh] w-full object-contain bg-black"
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => cycleIndex(-1)}
                disabled={!hasMultiple}
                className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-foreground shadow-lg disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>
              <div className="max-w-2xl rounded-[1.25rem] bg-white/95 px-4 py-3 text-sm leading-6 text-foreground/78 shadow-lg">
                {captionLine ? <p>{captionLine}</p> : null}
                {activeImage.photographerCredit ? <p>Photo: {activeImage.photographerCredit}</p> : null}
                {activeImage.location ? <p>Location: {activeImage.location}</p> : null}
                {activeImage.licenseNote ? <p>{activeImage.licenseNote}</p> : null}
              </div>
              <button
                type="button"
                onClick={() => cycleIndex(1)}
                disabled={!hasMultiple}
                className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-foreground shadow-lg disabled:opacity-50"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
