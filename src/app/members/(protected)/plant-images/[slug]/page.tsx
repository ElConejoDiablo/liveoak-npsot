import { notFound } from "next/navigation";

import { SmartLink } from "@/components/shared/smart-link";
import { buttonVariants } from "@/components/ui/button-styles";
import { Input } from "@/components/ui/input";
import { requireAdminMemberContext } from "@/lib/auth";
import { getPlantBySlug } from "@/data/plant-library-index";
import {
  deletePlantImageAction,
  updatePlantImageAction,
  uploadPlantImagesAction,
} from "@/lib/plants/actions";
import { getPlantImageAdminRecords } from "@/lib/plants/images";
import { cn } from "@/lib/utils";

type PlantImagesAdminPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function PlantImagesAdminPage({ params }: PlantImagesAdminPageProps) {
  await requireAdminMemberContext();
  const { slug } = await params;
  const plant = getPlantBySlug(slug);

  if (!plant) {
    notFound();
  }

  const images = await getPlantImageAdminRecords(slug);

  return (
    <div className="space-y-8">
      <section className="rounded-[1.9rem] border border-primary/10 bg-white/82 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)] sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/72">
              Admin-only
            </p>
            <h1 className="mt-3 font-heading text-3xl text-foreground sm:text-4xl">
              {plant.commonName}
            </h1>
            <p className="mt-2 text-lg italic text-foreground/68">{plant.scientificName}</p>
          </div>
          <SmartLink href="/members/plant-images" className="text-sm font-semibold text-primary">
            Back to plant list
          </SmartLink>
        </div>
      </section>

      <section className="rounded-[1.8rem] border border-primary/10 bg-white/82 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)]">
        <h2 className="font-heading text-2xl text-foreground">Upload images</h2>
        <form action={uploadPlantImagesAction} encType="multipart/form-data" className="mt-5 space-y-4">
          <input type="hidden" name="plantSlug" value={slug} />
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
                Files
              </label>
              <Input name="images" type="file" accept="image/*" multiple className="mt-3 h-12 px-4" />
            </div>
            <div>
              <label className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
                Alt text
              </label>
              <Input name="altText" className="mt-3 h-12 px-4" placeholder="Describe the image for accessibility" />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
                Caption
              </label>
              <Input name="caption" className="mt-3 h-12 px-4" placeholder="Short caption" />
            </div>
            <div>
              <label className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
                Photographer credit
              </label>
              <Input name="photographerCredit" className="mt-3 h-12 px-4" placeholder="Name as it should appear" />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
                Credit URL
              </label>
              <Input name="photographerCreditUrl" className="mt-3 h-12 px-4" placeholder="Optional link" />
            </div>
            <div>
              <label className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
                Location
              </label>
              <Input name="location" className="mt-3 h-12 px-4" placeholder="Schulenburg, Fayette County" />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
                License note
              </label>
              <Input name="licenseNote" className="mt-3 h-12 px-4" placeholder="Used with permission" />
            </div>
            <div>
              <label className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
                Sort order
              </label>
              <Input name="sortOrder" type="number" defaultValue={0} className="mt-3 h-12 px-4" />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-foreground/72">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="approvedForWebPublication" />
              Approved for web publication
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="isPrimary" />
              Mark first uploaded image as primary
            </label>
          </div>
          <div>
            <label className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
              Source type
            </label>
            <select
              name="sourceType"
              defaultValue="none"
              className="mt-3 h-12 w-full rounded-2xl border border-primary/12 bg-white/82 px-4 text-base text-foreground outline-none transition focus:border-primary/30 focus:ring-4 focus:ring-primary/10"
            >
              <option value="owned">Owned</option>
              <option value="licensed_approved_external">Licensed approved external</option>
              <option value="unapproved_external">Unapproved external</option>
              <option value="none">No image</option>
            </select>
          </div>
          <button
            type="submit"
            className={cn(buttonVariants({ variant: "default", size: "lg" }), "h-11 rounded-full px-5")}
          >
            Upload image(s)
          </button>
        </form>
      </section>

      <section className="rounded-[1.8rem] border border-primary/10 bg-white/82 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)]">
        <h2 className="font-heading text-2xl text-foreground">Current images</h2>
        <div className="mt-5 space-y-5">
          {images.length ? (
            images.map((image) => (
              <div key={image.id} className="space-y-3">
                <form
                  action={updatePlantImageAction}
                  className="rounded-[1.4rem] border border-primary/10 bg-[#F7F4E8] p-4"
                >
                  <input type="hidden" name="imageId" value={image.id} />
                  <input type="hidden" name="plantSlug" value={slug} />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={image.imageUrl} alt={image.altText || plant.commonName} className="aspect-[4/3] w-full rounded-[1rem] object-cover" />
                    </div>
                    <div className="space-y-3">
                      <Input name="altText" defaultValue={image.altText} placeholder="Alt text" />
                      <Input name="caption" defaultValue={image.caption ?? ""} placeholder="Caption" />
                      <Input name="photographerCredit" defaultValue={image.photographerCredit ?? ""} placeholder="Photographer credit" />
                      <Input name="photographerCreditUrl" defaultValue={image.photographerCreditUrl ?? ""} placeholder="Credit URL" />
                      <Input name="location" defaultValue={image.location ?? ""} placeholder="Location" />
                      <Input name="licenseNote" defaultValue={image.licenseNote ?? ""} placeholder="License note" />
                      <div className="grid gap-3 sm:grid-cols-2">
                        <label className="flex items-center gap-2 text-sm text-foreground/72">
                          <input type="checkbox" name="approvedForWebPublication" defaultChecked={image.approvedForWebPublication} />
                          Approved
                        </label>
                        <label className="flex items-center gap-2 text-sm text-foreground/72">
                          <input type="checkbox" name="isPrimary" defaultChecked={image.isPrimary} />
                          Primary
                        </label>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Input name="sortOrder" type="number" defaultValue={image.sortOrder} />
                        <select
                          name="sourceType"
                          defaultValue={image.sourceType}
                          className="h-12 rounded-2xl border border-primary/12 bg-white/82 px-4 text-base text-foreground outline-none transition focus:border-primary/30 focus:ring-4 focus:ring-primary/10"
                        >
                          <option value="owned">Owned</option>
                          <option value="licensed_approved_external">Licensed approved external</option>
                          <option value="unapproved_external">Unapproved external</option>
                          <option value="none">No image</option>
                        </select>
                      </div>
                      <div className="flex flex-wrap gap-3 pt-2">
                        <button
                          type="submit"
                          className={cn(buttonVariants({ variant: "default", size: "sm" }), "rounded-full px-4")}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <form action={deletePlantImageAction}>
                  <input type="hidden" name="imageId" value={image.id} />
                  <input type="hidden" name="plantSlug" value={slug} />
                  <button
                    type="submit"
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full border-primary/15 bg-white/85 px-4")}
                  >
                    Delete image record
                  </button>
                </form>
              </div>
            ))
          ) : (
            <p className="text-sm leading-7 text-foreground/68">
              No images have been uploaded for this plant yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
