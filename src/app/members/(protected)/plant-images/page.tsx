import { SmartLink } from "@/components/shared/smart-link";
import { requireAdminMemberContext } from "@/lib/auth";
import { plantLibraryItems } from "@/data/plant-library-index";
import { getPlantImageAdminRecords } from "@/lib/plants/images";

export const dynamic = "force-dynamic";

export default async function PlantImagesAdminIndexPage() {
  await requireAdminMemberContext();

  const plants = await Promise.all(
    plantLibraryItems.map(async (plant) => {
      const images = await getPlantImageAdminRecords(plant.slug);
      return {
        plant,
        total: images.length,
        approved: images.filter((image) => image.approvedForWebPublication).length,
      };
    }),
  );

  return (
    <div className="space-y-8">
      <section className="rounded-[1.9rem] border border-primary/10 bg-white/82 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)] sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/72">
          Admin-only
        </p>
        <h1 className="mt-3 font-heading text-3xl text-foreground sm:text-4xl">
          Plant image management
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-foreground/72">
          Upload, approve, order, and publish chapter-managed plant photos from one place.
          Public pages only show images that are explicitly approved for web publication.
        </p>
      </section>

      <section className="rounded-[1.8rem] border border-primary/10 bg-white/82 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)]">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {plants.map(({ plant, total, approved }) => (
            <SmartLink
              key={plant.slug}
              href={`/members/plant-images/${plant.slug}`}
              className="rounded-[1.3rem] border border-primary/10 bg-[#F7F4E8] p-4 transition hover:border-primary/20 hover:bg-white"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/72">
                {plant.groupTitle}
              </p>
              <h2 className="mt-2 text-lg font-semibold text-foreground">{plant.commonName}</h2>
              <p className="mt-1 text-sm text-foreground/64">{plant.scientificName}</p>
              <p className="mt-3 text-sm leading-6 text-foreground/72">
                {approved} approved of {total} total image{total === 1 ? "" : "s"}
              </p>
            </SmartLink>
          ))}
        </div>
      </section>
    </div>
  );
}
