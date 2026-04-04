import { notFound } from "next/navigation";

import { PlantDetail } from "@/components/resources/plant-detail";
import { plantLibraryItems, slugifyPlantName } from "@/data/plant-library-index";
import { getCurrentMemberContext } from "@/lib/auth";
import { getApprovedPlantImagesBySlug } from "@/lib/plants/images";
import { createMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

type PlantPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return plantLibraryItems.map((plant) => ({ slug: plant.slug }));
}

export async function generateMetadata({ params }: PlantPageProps) {
  const { slug } = await params;
  const plant = plantLibraryItems.find((item) => item.slug === slug);

  if (!plant) {
    return createMetadata({
      title: "Plant not found",
      description: "The requested plant is not in the starter library.",
      path: `/resources/plants/${slug}`,
      eyebrow: "Resources",
    });
  }

  return createMetadata({
    title: plant.commonName,
    description: `${plant.commonName} (${plant.scientificName}) in the Live Oak Chapter starter library.`,
    path: `/resources/plants/${plant.slug}`,
    eyebrow: "Resources",
  });
}

export default async function PlantPage({ params }: PlantPageProps) {
  const { slug } = await params;
  const plant = plantLibraryItems.find((item) => item.slug === slug || slugifyPlantName(item.scientificName) === slug);

  if (!plant) {
    notFound();
  }

  const approvedImages = await getApprovedPlantImagesBySlug(plant.slug);
  const context = await getCurrentMemberContext();
  const canManageImages = context?.user.role === "admin";

  return (
    <main className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
      <PlantDetail
        plant={plant}
        approvedImages={approvedImages}
        canManageImages={canManageImages}
        manageImagesHref={canManageImages ? `/members/plant-images/${plant.slug}` : undefined}
      />
    </main>
  );
}
