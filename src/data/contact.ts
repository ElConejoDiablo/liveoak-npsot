import { siteConfig } from "@/data/site";

export const contactTopics = [
  {
    value: "events",
    label: "Event question",
    description: "Meeting details, walks, talks, and calendar questions.",
  },
  {
    value: "volunteer",
    label: "Volunteer interest",
    description: "Outreach, hospitality, stewardship, or chapter support.",
  },
  {
    value: "membership",
    label: "Membership help",
    description: "Joining NPSOT, chapter connection, or member access questions.",
  },
  {
    value: "native-plants",
    label: "Native plant question",
    description: "Regional planting, habitat, seed, and pollinator questions.",
  },
  {
    value: "updates",
    label: "Chapter updates",
    description: "Requests to hear about chapter programs and announcements.",
  },
  {
    value: "general",
    label: "General question",
    description: "Anything else you would like to share with the chapter.",
  },
] as const;

export type ContactTopicValue = (typeof contactTopics)[number]["value"];

export const contactCountyOptions = [
  ...siteConfig.serviceArea,
  "Outside the chapter service area",
  "Not sure yet",
] as const;

export type ContactCountyOption = (typeof contactCountyOptions)[number];
