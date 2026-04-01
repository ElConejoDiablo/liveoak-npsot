"use server";

import { Resend } from "resend";

import {
  contactCountyOptions,
  contactTopics,
  type ContactCountyOption,
  type ContactTopicValue,
} from "@/data/contact";
import { siteConfig } from "@/data/site";

export type ContactFormState = {
  status: "idle" | "error" | "success";
  message?: string;
};

const VALID_TOPICS = new Set(contactTopics.map((topic) => topic.value));
const VALID_COUNTIES = new Set(contactCountyOptions);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeTextField(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isValidTopic(value: string): value is ContactTopicValue {
  return VALID_TOPICS.has(value as ContactTopicValue);
}

function isValidCounty(value: string): value is ContactCountyOption {
  return VALID_COUNTIES.has(value as ContactCountyOption);
}

function getTopicLabel(value: ContactTopicValue) {
  return contactTopics.find((topic) => topic.value === value)?.label ?? value;
}

function errorState(message: string): ContactFormState {
  return { status: "error", message };
}

function successState(message: string): ContactFormState {
  return { status: "success", message };
}

export async function sendContactMessageAction(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const honeypot = normalizeTextField(formData.get("website"));

  if (honeypot) {
    return successState("Thanks for reaching out. Your note is on its way.");
  }

  const name = normalizeTextField(formData.get("name"));
  const email = normalizeTextField(formData.get("email")).toLowerCase();
  const countyValue = normalizeTextField(formData.get("county"));
  const topicValue = normalizeTextField(formData.get("topic"));
  const subject = normalizeTextField(formData.get("subject"));
  const message = normalizeTextField(formData.get("message"));
  const updatesRequested = formData.get("updatesRequested") === "on";

  if (name.length < 2) {
    return errorState("Please add your name so the chapter knows how to respond.");
  }

  if (!EMAIL_PATTERN.test(email)) {
    return errorState("Please enter a valid email address.");
  }

  if (!isValidTopic(topicValue)) {
    return errorState("Please choose the topic that best matches your message.");
  }

  if (countyValue && !isValidCounty(countyValue)) {
    return errorState("Please choose a county from the list provided.");
  }

  if (subject.length < 4 || subject.length > 120) {
    return errorState("Please add a short subject line between 4 and 120 characters.");
  }

  if (message.length < 20 || message.length > 3000) {
    return errorState("Please add a message between 20 and 3000 characters.");
  }

  const resendApiKey = process.env.AUTH_RESEND_API_KEY?.trim();
  const emailFrom = process.env.AUTH_EMAIL_FROM?.trim();

  if (!resendApiKey || !emailFrom) {
    return errorState(
      `The contact form is unavailable right now. Please email ${siteConfig.contactEmail} directly.`,
    );
  }

  const county = countyValue || "Not provided";
  const topicLabel = getTopicLabel(topicValue);
  const safeMessageHtml = escapeHtml(message).replaceAll("\n", "<br />");
  const subjectLine = `[Live Oak Chapter Contact] ${subject}`;
  const resend = new Resend(resendApiKey);

  const textBody = [
    "A new message was sent through the Live Oak Chapter contact form.",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `County: ${county}`,
    `Topic: ${topicLabel}`,
    `Requested chapter updates: ${updatesRequested ? "Yes" : "No"}`,
    "",
    "Message:",
    message,
  ].join("\n");

  try {
    const response = await resend.emails.send({
      from: emailFrom,
      to: siteConfig.contactEmail,
      replyTo: email,
      subject: subjectLine,
      text: textBody,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #223226;">
          <h1 style="font-size: 22px; margin-bottom: 16px;">Live Oak Chapter contact form</h1>
          <p>A new message was sent through the chapter website.</p>
          <table style="margin: 20px 0; border-collapse: collapse;">
            <tr><td style="padding: 4px 12px 4px 0; font-weight: 700;">Name</td><td>${escapeHtml(name)}</td></tr>
            <tr><td style="padding: 4px 12px 4px 0; font-weight: 700;">Email</td><td>${escapeHtml(email)}</td></tr>
            <tr><td style="padding: 4px 12px 4px 0; font-weight: 700;">County</td><td>${escapeHtml(county)}</td></tr>
            <tr><td style="padding: 4px 12px 4px 0; font-weight: 700;">Topic</td><td>${escapeHtml(topicLabel)}</td></tr>
            <tr><td style="padding: 4px 12px 4px 0; font-weight: 700;">Requested chapter updates</td><td>${updatesRequested ? "Yes" : "No"}</td></tr>
          </table>
          <h2 style="font-size: 18px; margin: 24px 0 8px;">Subject</h2>
          <p>${escapeHtml(subject)}</p>
          <h2 style="font-size: 18px; margin: 24px 0 8px;">Message</h2>
          <p>${safeMessageHtml}</p>
        </div>
      `,
    });

    if ("error" in response && response.error) {
      throw new Error(response.error.message);
    }

    return successState(
      updatesRequested
        ? "Thanks for reaching out. Your note and request for chapter updates are on the way."
        : "Thanks for reaching out. Your note is on the way to the chapter inbox.",
    );
  } catch (error) {
    console.error("[contact-form] send failed", error);
    return errorState(
      `That message could not be sent right now. Please email ${siteConfig.contactEmail} directly.`,
    );
  }
}
