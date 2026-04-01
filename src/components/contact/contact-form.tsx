"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { Mail, Send } from "lucide-react";

import {
  contactCountyOptions,
  contactTopics,
} from "@/data/contact";
import {
  sendContactMessageAction,
  type ContactFormState,
} from "@/lib/contact/actions";
import { siteConfig } from "@/data/site";
import { buttonVariants } from "@/components/ui/button-styles";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const initialState: ContactFormState = {
  status: "idle",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        buttonVariants({ variant: "default", size: "lg" }),
        "h-12 rounded-full px-5",
      )}
    >
      <Send className="mr-2 h-4 w-4" />
      {pending ? "Sending message..." : "Send message"}
    </button>
  );
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(
    sendContactMessageAction,
    initialState,
  );

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form
      ref={formRef}
      action={formAction}
      id="contact-form"
      className="space-y-5"
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-foreground/74">
            Full name
          </span>
          <Input
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className="h-12 rounded-full border-primary/12 bg-white"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-foreground/74">
            Email address
          </span>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/45" />
            <Input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="h-12 rounded-full border-primary/12 bg-white pl-11"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-foreground/74">
            County
          </span>
          <select
            name="county"
            defaultValue=""
            className="h-12 w-full rounded-full border border-primary/12 bg-white px-4 text-sm text-foreground shadow-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="">Choose a county</option>
            {contactCountyOptions.map((county) => (
              <option key={county} value={county}>
                {county}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-foreground/74">
            Topic
          </span>
          <select
            name="topic"
            required
            defaultValue=""
            className="h-12 w-full rounded-full border border-primary/12 bg-white px-4 text-sm text-foreground shadow-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="" disabled>
              Choose a topic
            </option>
            {contactTopics.map((topic) => (
              <option key={topic.value} value={topic.value}>
                {topic.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-foreground/74">
          Subject
        </span>
        <Input
          name="subject"
          required
          maxLength={120}
          placeholder="How can the chapter help?"
          className="h-12 rounded-full border-primary/12 bg-white"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-foreground/74">
          Message
        </span>
        <Textarea
          name="message"
          required
          rows={7}
          maxLength={3000}
          placeholder="Share your question, introduction, volunteer interest, or request for chapter updates."
          className="border-primary/12 bg-white"
        />
      </label>

      <label className="flex gap-3 rounded-[1.4rem] border border-primary/10 bg-white/76 px-4 py-4 text-sm leading-7 text-foreground/74">
        <input
          type="checkbox"
          name="updatesRequested"
          className="mt-1 h-4 w-4 shrink-0 rounded border-primary/20 accent-primary"
        />
        <span>
          I would also like to hear about chapter updates, meetings, walks, and
          other upcoming programming by email.
        </span>
      </label>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-7 text-foreground/66">
          Messages from this form go to{" "}
          <a
            href={siteConfig.contactUrl}
            className="font-semibold text-primary underline decoration-primary/30 underline-offset-4"
          >
            {siteConfig.contactEmail}
          </a>
          .
        </p>
        <SubmitButton />
      </div>

      {state.message ? (
        <p
          aria-live="polite"
          className={cn(
            "rounded-[1.4rem] px-4 py-3 text-sm leading-7",
            state.status === "success"
              ? "border border-primary/12 bg-[#F7F4E8] text-foreground/74"
              : "border border-amber-300/40 bg-amber-50 text-amber-950",
          )}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
