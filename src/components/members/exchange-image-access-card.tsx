import { ExchangeImageVisibility } from "@prisma/client";

import { SmartLink } from "@/components/shared/smart-link";
import { buttonVariants } from "@/components/ui/button-styles";
import { updateExchangeImageVisibilityAction } from "@/lib/members/actions";
import {
  exchangeImageVisibilityLabels,
  getExchangeImageUrl,
} from "@/lib/members/exchange";
import { cn } from "@/lib/utils";

type ExchangeImageAccessCardProps = {
  imageId: string;
  visibility: ExchangeImageVisibility;
  returnTo: string;
  canManageVisibility: boolean;
};

export function ExchangeImageAccessCard({
  imageId,
  visibility,
  returnTo,
  canManageVisibility,
}: ExchangeImageAccessCardProps) {
  const isPublicTeaser = visibility === "public_teaser";
  const teaserHref = getExchangeImageUrl(imageId);

  return (
    <div className="border-t border-primary/10 bg-[#F7F4E8] px-4 py-4">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary/78">
            {exchangeImageVisibilityLabels[visibility]}
          </span>
          {isPublicTeaser ? (
            <span className="text-sm text-foreground/68">
              Anyone with the teaser link can view this image.
            </span>
          ) : (
            <span className="text-sm text-foreground/68">
              This image is available only inside the members portal.
            </span>
          )}
        </div>

        {isPublicTeaser ? (
          <SmartLink
            href={teaserHref}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-primary"
          >
            Open teaser image
          </SmartLink>
        ) : null}

        {canManageVisibility ? (
          <form action={updateExchangeImageVisibilityAction} className="flex flex-wrap gap-3">
            <input type="hidden" name="imageId" value={imageId} />
            <input type="hidden" name="returnTo" value={returnTo} />
            <input
              type="hidden"
              name="visibility"
              value={isPublicTeaser ? "member_only" : "public_teaser"}
            />
            <button
              type="submit"
              className={cn(
                buttonVariants({
                  variant: isPublicTeaser ? "outline" : "default",
                  size: "sm",
                }),
                "rounded-full px-4",
                isPublicTeaser
                  ? "border-primary/15 bg-white/85"
                  : "",
              )}
            >
              {isPublicTeaser ? "Return to members only" : "Make public teaser"}
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}
