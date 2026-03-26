import { ExchangeCategory } from "@prisma/client";

import { CreateExchangePostForm } from "@/components/members/create-exchange-post-form";
import { createMetadata } from "@/lib/metadata";
import { exchangeCategoryLabels } from "@/lib/members/exchange";

export const metadata = createMetadata({
  title: "Create Member Post",
  description:
    "Create a protected member exchange or help post for the Live Oak Chapter.",
  path: "/members/exchange/new",
  eyebrow: "Members",
});

export const dynamic = "force-dynamic";

export default function NewExchangePostPage() {
  return (
    <div className="mx-auto max-w-4xl rounded-[1.9rem] border border-primary/10 bg-white/82 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)] sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/72">
        New member post
      </p>
      <h1 className="mt-3 font-heading text-3xl text-foreground sm:text-4xl">
        Create a practical exchange or help post
      </h1>
      <p className="mt-4 text-lg leading-8 text-foreground/72">
        Use this form for seeds, plants, trees, tools, giveaways, help requests,
        or help offered. Add photos when they make the post clearer.
      </p>

      <div className="mt-8">
        <CreateExchangePostForm
          counties={["Fayette County", "Colorado County", "Lavaca County"]}
          categoryOptions={Object.values(ExchangeCategory).map((value) => ({
            value,
            label: exchangeCategoryLabels[value],
          }))}
        />
      </div>
    </div>
  );
}
