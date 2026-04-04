import { notFound } from "next/navigation";

import { PhotographicHeroBanner } from "@/components/sections/photographic-hero-banner";
import { StarterCollectionPage } from "@/components/resources/starter-collection-page";
import {
  getStarterCollectionBySlug,
  starterCollections,
} from "@/data/plant-library-collections";
import { createMetadata } from "@/lib/metadata";

type CollectionPageProps = {
  params: Promise<{
    collection: string;
  }>;
};

export function generateStaticParams() {
  return starterCollections.map((collection) => ({
    collection: collection.id,
  }));
}

export async function generateMetadata({ params }: CollectionPageProps) {
  const { collection: slug } = await params;
  const collection = getStarterCollectionBySlug(slug);

  if (!collection) {
    return createMetadata({
      title: "Collection not found",
      description: "The requested plant collection could not be found.",
      path: `/resources/plants/collections/${slug}`,
      eyebrow: "Tri-County Native Plants",
    });
  }

  return createMetadata({
    title: collection.title,
    description: collection.description,
    path: `/resources/plants/collections/${collection.id}`,
    eyebrow: "Tri-County Native Plants",
  });
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { collection: slug } = await params;
  const collection = getStarterCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  return (
    <>
      {collection.heroVariant ? (
        <PhotographicHeroBanner
          variant={collection.heroVariant}
          title={collection.title}
          description={collection.description}
          className="border-b-0"
          contentClassName="max-w-[42rem]"
          overlayClassName="bg-[linear-gradient(180deg,rgba(18,25,19,0.18),rgba(18,25,19,0.34)_26%,rgba(18,25,19,0.56)_58%,rgba(18,25,19,0.8)_100%)] lg:bg-[linear-gradient(90deg,rgba(18,25,19,0.82)_0%,rgba(18,25,19,0.72)_26%,rgba(18,25,19,0.48)_46%,rgba(18,25,19,0.24)_68%,rgba(18,25,19,0.12)_84%,rgba(18,25,19,0.08)_100%),linear-gradient(180deg,rgba(18,25,19,0.16),rgba(18,25,19,0.08)_30%,rgba(18,25,19,0.34)_82%,rgba(18,25,19,0.72)_100%)]"
          titleClassName="max-w-[14ch]"
          descriptionClassName="max-w-[30rem]"
          imageClassName="object-[58%_center] sm:object-center"
          actions={[
            { href: "/resources/plants", label: "Back to Tri-County Native Plants", variant: "secondary" },
          ]}
        />
      ) : null}
      <main className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <StarterCollectionPage collection={collection} />
      </main>
    </>
  );
}
