import { notFound } from "next/navigation";

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
    <main className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
      <StarterCollectionPage collection={collection} />
    </main>
  );
}
