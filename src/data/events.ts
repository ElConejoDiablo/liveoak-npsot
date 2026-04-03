import { compareAsc } from "date-fns";

import type { PublicImageryKey } from "@/data/public-imagery";
import { siteConfig } from "@/data/site";

export type EventType =
  | "Chapter Meeting"
  | "Plant Walk"
  | "Workshop"
  | "Talk"
  | "Volunteer Day"
  | "Webinar"
  | "Field Trip"
  | "Symposium";

export type EventDelivery = "In person" | "Hybrid" | "Virtual";
export type EventSourceKind = "chapter" | "statewide";
export type EventSourceFilter = "All sources" | "Chapter" | "Statewide";

export type EventSource = {
  kind: EventSourceKind;
  label: string;
  href?: string;
};

type EventSharedFields = {
  id: string;
  title: string;
  type: EventType;
  delivery: EventDelivery;
  source: EventSource;
  startDateTime: string;
  endDateTime: string;
  summary: string;
  description: string;
  locationName: string;
  locationAddress?: string;
  city: string;
  county?: string;
  speakerName?: string;
};

export type ChapterEventItem = EventSharedFields & {
  slug: string;
  source: {
    kind: "chapter";
    label: "Live Oak Chapter";
  };
  county: string;
  audience: string;
  attendanceNote?: string;
  accessibilityNotes?: string;
  weatherNote?: string;
  whatToBring?: string[];
  details: string[];
};

export type StatewideEventItem = EventSharedFields & {
  source: {
    kind: "statewide";
    label: string;
    href?: string;
  };
  externalUrl: string;
  audience?: string;
};

export type UpcomingEventItem = ChapterEventItem | StatewideEventItem;

export type PastEventResource = {
  label: string;
  href: string;
  kind: "Recap" | "YouTube" | "Materials" | "Reference";
};

export type PastEventMinutesLink = {
  label: string;
  href: string;
  status: "Members only";
};

/**
 * Past-event entries are intentionally flexible because real recap material
 * often arrives in pieces. Keep `startDateTime` present for sorting.
 *
 * Authoring notes:
 * - If only the calendar date is known, set `startDateTime` to local midnight
 *   and add a human-facing `dateLabel`.
 * - Add `endDateTime` only when the public event time is verified.
 * - Keep `meetingMinutes.href` inside the existing `/members` area.
 * - Omit optional fields rather than guessing.
 */
export type PastEventItem = {
  id: string;
  title: string;
  startDateTime: string;
  endDateTime?: string;
  dateLabel?: string;
  summary: string;
  description: string;
  sourceLabel: "Live Oak Chapter";
  locationName?: string;
  city?: string;
  county?: string;
  speakerName?: string;
  image?: PublicImageryKey;
  recapUrl?: string;
  youtubeUrl?: string;
  supplementalLinks?: PastEventResource[];
  meetingMinutes?: PastEventMinutesLink;
};

type PastEventDraft = Omit<PastEventItem, "sourceLabel" | "supplementalLinks"> & {
  supplementalLinks?: PastEventResource[];
};

function createPastEventResource(resource: PastEventResource): PastEventResource {
  return resource;
}

function createPastEventMinutesLink(
  minutes: PastEventMinutesLink,
): PastEventMinutesLink {
  if (!minutes.href.startsWith("/members")) {
    throw new Error(
      `Past event minutes must stay in the members area. Received: ${minutes.href}`,
    );
  }

  return minutes;
}

function createPastEvent(event: PastEventDraft): PastEventItem {
  return {
    ...event,
    sourceLabel: "Live Oak Chapter",
    supplementalLinks: event.supplementalLinks?.length
      ? event.supplementalLinks.map(createPastEventResource)
      : undefined,
    meetingMinutes: event.meetingMinutes
      ? createPastEventMinutesLink(event.meetingMinutes)
      : undefined,
  };
}

function sortByStart<T extends { startDateTime: string }>(items: T[]) {
  return [...items].sort((left, right) =>
    compareAsc(new Date(left.startDateTime), new Date(right.startDateTime)),
  );
}

function isUpcoming(startDateTime: string, now = new Date()) {
  return new Date(startDateTime).getTime() >= now.getTime();
}

function isPast(startDateTime: string, now = new Date()) {
  return new Date(startDateTime).getTime() < now.getTime();
}

export const chapterEvents: ChapterEventItem[] = [
  {
    id: "spring-chapter-gathering-native-grasses",
    slug: "spring-chapter-gathering-native-grasses",
    title: "Spring Chapter Meeting: Native Grasses for Everyday Landscapes",
    type: "Chapter Meeting",
    delivery: "In person",
    source: {
      kind: "chapter",
      label: "Live Oak Chapter",
    },
    county: "Fayette County",
    locationName: "Schulenburg Public Library meeting room",
    locationAddress: "310 Simpson Street",
    city: "Schulenburg, Texas",
    startDateTime: "2026-04-16T18:30:00-05:00",
    endDateTime: "2026-04-16T20:00:00-05:00",
    description:
      "An evening chapter meeting on how native grasses support habitat, hold a planting together, and add season-long texture in south-central Texas landscapes.",
    summary:
      "A practical spring chapter meeting on native grasses that belong in home landscapes, shared plantings, and habitat-minded gardens.",
    audience:
      "Open to members, prospective members, gardeners, and anyone curious about getting started with Texas natives.",
    attendanceNote:
      "Contact the chapter if you would like the latest room details before attending.",
    accessibilityNotes:
      "Indoor meeting room with seating, restrooms, and nearby parking.",
    details: [
      "Arrive a little early for chapter news, introductions, and time to visit before the program starts.",
      "The presentation will focus on grasses that fit home landscapes without sacrificing wildlife value.",
      "Questions about local growing conditions and plant selection are welcome.",
    ],
  },
  {
    id: "prairie-edge-plant-walk-la-grange",
    slug: "prairie-edge-plant-walk-la-grange",
    title: "Prairie Edge Plant Walk",
    type: "Plant Walk",
    delivery: "In person",
    source: {
      kind: "chapter",
      label: "Live Oak Chapter",
    },
    county: "Fayette County",
    locationName: "Public greenspace near La Grange",
    locationAddress: "Location shared by the chapter before the walk",
    city: "La Grange, Texas",
    startDateTime: "2026-04-25T09:00:00-05:00",
    endDateTime: "2026-04-25T11:00:00-05:00",
    description:
      "A slow-paced morning walk for observing spring bloom timing, grass structure, and pollinator activity in a local field setting.",
    summary:
      "A beginner-friendly field walk built around observation, habitat context, and practical plant identification.",
    audience:
      "Suitable for beginners, families with older children, and anyone interested in seeing native plants in the field.",
    attendanceNote:
      "Contact the chapter for the latest location and parking details before the walk.",
    accessibilityNotes: "This outing will involve uneven ground.",
    weatherNote:
      "Outdoor events may shift in the event of heavy rain or severe weather.",
    whatToBring: ["Water", "Hat", "Walking shoes", "Notebook or field guide"],
    details: [
      "Expect a conversational plant walk rather than a fast hike.",
      "The chapter will use the outing to connect habitat observation with garden and stewardship decisions back home.",
      "Bring water, sturdy shoes, and anything you like to use for plant notes or field sketches.",
    ],
  },
  {
    id: "pollinator-garden-talk-weimar",
    slug: "pollinator-garden-talk-weimar",
    title: "Pollinator Garden Talk: Plants That Carry Summer Into Fall",
    type: "Talk",
    delivery: "In person",
    source: {
      kind: "chapter",
      label: "Live Oak Chapter",
    },
    county: "Colorado County",
    locationName: "Community room in Weimar",
    locationAddress: "Venue shared by the chapter before the talk",
    city: "Weimar, Texas",
    startDateTime: "2026-05-14T18:30:00-05:00",
    endDateTime: "2026-05-14T20:00:00-05:00",
    description:
      "A practical talk centered on Turk's cap, American beautyberry, goldenrod, and the kind of planting sequence that helps carry pollinators from summer into fall.",
    summary:
      "An evening talk on native plants that help keep pollinator habitat active past spring.",
    audience:
      "Useful for gardeners, teachers, land stewards, and local residents looking for native plants with wildlife value.",
    attendanceNote:
      "Contact the chapter for the latest venue details before attending.",
    accessibilityNotes: "Indoor presentation with seating.",
    details: [
      "The talk will compare bloom timing, structure, and wildlife value across several plants suited to the chapter service area.",
      "Plenty of time is planned for local planting questions and conversation.",
      "This is a good event for people deciding what to plant next in a new or established native garden.",
    ],
  },
  {
    id: "seed-stewardship-morning-hallettsville",
    slug: "seed-stewardship-morning-hallettsville",
    title: "Seed Stewardship Morning: Collection, Cleaning, and Storage Basics",
    type: "Workshop",
    delivery: "In person",
    source: {
      kind: "chapter",
      label: "Live Oak Chapter",
    },
    county: "Lavaca County",
    locationName: "Demonstration garden in Hallettsville",
    locationAddress: "Site shared by the chapter before the workshop",
    city: "Hallettsville, Texas",
    startDateTime: "2026-06-06T08:30:00-05:00",
    endDateTime: "2026-06-06T10:30:00-05:00",
    description:
      "A hands-on introduction to responsible seed collecting, drying, labeling, and storage practices for chapter members and curious community gardeners.",
    summary:
      "A practical morning workshop on seed stewardship and the ethics of collecting native seed with care.",
    audience:
      "Best suited to gardeners, volunteers, and chapter participants interested in native seed handling and seasonal stewardship.",
    attendanceNote:
      "Contact the chapter for the latest site details before attending.",
    accessibilityNotes: "Outdoor demonstration with some standing and walking.",
    weatherNote:
      "Outdoor workshop timing may be adjusted if weather conditions are unsafe or unusually wet.",
    whatToBring: ["Water", "Sun protection", "Notebook", "Work gloves if preferred"],
    details: [
      "The workshop will cover permission, timing, restraint, and basic handling practices for native seed.",
      "Expect practical demonstrations and time for questions about collecting and storing native seed.",
      "The chapter will share examples that translate directly to home gardens and small stewardship projects.",
    ],
  },
];

export const statewideEvents: StatewideEventItem[] = [
  {
    id: "dogwood-trail-big-thicket-field-trip",
    title: "Dogwood Trail, Big Thicket Field Trip",
    type: "Field Trip",
    delivery: "In person",
    source: {
      kind: "statewide",
      label: "Pines and Prairies Chapter",
      href: "https://www.npsot.org/chapters/pines-and-prairies/",
    },
    locationName: "Dogwood Trail",
    city: "Woodville, Texas",
    county: "Tyler County",
    startDateTime: "2026-04-04T09:00:00-05:00",
    endDateTime: "2026-04-04T12:00:00-05:00",
    description:
      "Near Woodville, this Big Thicket outing follows a mile-long trail beneath mature beech, magnolia, and white oak with spring ephemerals and dogwood bloom along the way.",
    summary:
      "A statewide field trip into Big Thicket habitat for spring dogwoods, trout lilies, and forest-floor wildflowers.",
    externalUrl: "https://www.npsot.org/event/dogwood-trail-big-thicket-field-trip/",
    audience:
      "Best for visitors who want a longer field outing and are comfortable on a natural trail.",
  },
  {
    id: "jane-duke-north-central-hybrid-meeting",
    title: "Managing Soil as an Ecosystem",
    type: "Chapter Meeting",
    delivery: "Hybrid",
    source: {
      kind: "statewide",
      label: "North Central Chapter",
      href: "https://www.npsot.org/chapters/north-central/calendar-north-central/",
    },
    locationName: "North Central Chapter meeting and Zoom",
    city: "North Richland Hills, Texas",
    startDateTime: "2026-04-09T18:30:00-05:00",
    endDateTime: "2026-04-09T20:30:00-05:00",
    speakerName: "Jane Duke",
    description:
      "Jane Duke will speak about the soil food web, water retention, and how living soil systems shape healthier, more resilient landscapes.",
    summary:
      "A hybrid statewide chapter meeting on soil biology, restoration, and ecology-minded land care.",
    externalUrl:
      "https://www.npsot.org/event/jane-duke-trinity-forks-managing-soil-as-an-ecosystem-north-central-chapter-meeting/",
  },
  {
    id: "cell-phone-video-production-webinar",
    title: "Cell Phone Video Production Webinar",
    type: "Webinar",
    delivery: "Virtual",
    source: {
      kind: "statewide",
      label: "NPSOT Virtual Events",
      href: siteConfig.npsot.virtualEventsUrl,
    },
    locationName: "Online webinar",
    city: "Virtual",
    startDateTime: "2026-04-17T12:00:00-05:00",
    endDateTime: "2026-04-17T13:00:00-05:00",
    speakerName: "Lee Smith",
    description:
      "Lee Smith will cover phone settings, composition, simple accessories, and editing basics for recording stronger nature and chapter stories on a cell phone.",
    summary:
      "A statewide webinar on shooting and editing better video with the phone already in your pocket.",
    externalUrl: "https://www.npsot.org/event/cell-phone-video-production-webinar/",
  },
];

export const pastEvents: PastEventItem[] = [
  createPastEvent({
    id: "early-spring-chapter-gathering-2026",
    title: "Early spring chapter gathering",
    startDateTime: "2026-03-14T00:00:00-05:00",
    dateLabel: "March 14, 2026",
    summary:
      "The chapter's early spring gathering drew a strong regional turnout, practical questions, and early momentum for local native-plant learning.",
    description:
      "Visitors came ready to talk about pollinator habitat, plant selection, seed stewardship, and how native plants can feel manageable close to home. The evening worked as both a public introduction and a useful first chapter conversation.",
    image: "eventspastspring",
    recapUrl: "/news/early-community-turnout-builds-momentum-for-the-live-oak-chapter",
    meetingMinutes: {
      label: "March 2026 meeting minutes",
      href: "/members/documents",
      status: "Members only",
    },
  }),
];

export const statewideEventDestinations = [
  {
    title: "Full NPSOT calendar",
    href: siteConfig.npsot.calendarUrl,
    description:
      "See chapter meetings, field trips, classes, and statewide programs across Texas.",
  },
  {
    title: "Virtual events",
    href: siteConfig.npsot.virtualEventsUrl,
    description:
      "Find hybrid and online programs, webinars, and selected chapter meetings from across the state.",
  },
  {
    title: "Annual symposia",
    href: siteConfig.npsot.symposiumUrl,
    description:
      "Watch for statewide symposium details, schedules, and registration when the next session opens.",
  },
] as const;

export const upcomingEventsIntro =
  "Browse Live Oak Chapter gatherings first, then selected statewide NPSOT events that may be worth the trip or screen time.";

export const calendarIntro =
  "Switch between month and week views to see chapter dates alongside a small set of selected statewide NPSOT events.";

export const pastEventsIntro =
  "Past events can hold recaps, speaker notes, recordings, public materials, and members-only minutes when they are available.";

export const upcomingEventsEmptyState = {
  title: "More events are on the way",
  description:
    "New chapter meetings, walks, workshops, and selected statewide events will appear here as they are scheduled.",
};

export const pastEventsEmptyState = {
  title: "Past event recaps will collect here",
  description:
    "As the chapter posts more recaps, recordings, and follow-up materials, they will be added to this archive.",
};

export function getEventBadges(event: UpcomingEventItem) {
  const sourceBadge = event.source.kind === "chapter" ? "Chapter" : "Statewide";
  const badges = [sourceBadge, event.type];

  if (event.delivery !== "In person") {
    badges.push(event.delivery);
  }

  return badges;
}

export function getUpcomingChapterEvents(now = new Date()) {
  return sortByStart(chapterEvents.filter((event) => isUpcoming(event.startDateTime, now)));
}

export function getUpcomingStatewideEvents(now = new Date()) {
  return sortByStart(
    statewideEvents.filter((event) => isUpcoming(event.startDateTime, now)),
  );
}

export function getUpcomingEvents(now = new Date()) {
  return sortByStart([
    ...getUpcomingChapterEvents(now),
    ...getUpcomingStatewideEvents(now),
  ]);
}

export function getPastEvents(now = new Date()) {
  return [...pastEvents]
    .filter((event) => isPast(event.startDateTime, now))
    .sort((left, right) =>
      compareAsc(new Date(right.startDateTime), new Date(left.startDateTime)),
    );
}

export function getUpcomingEventTypes(now = new Date()) {
  return Array.from(new Set(getUpcomingEvents(now).map((event) => event.type)));
}

export function getNextChapterMeeting(now = new Date()) {
  const nextMeeting = getUpcomingChapterEvents(now).find(
    (event) => event.type === "Chapter Meeting",
  );

  return nextMeeting ?? getUpcomingChapterEvents(now)[0];
}

export function getChapterEventBySlug(slug: string) {
  return chapterEvents.find((event) => event.slug === slug);
}

export function getOtherUpcomingChapterEvents(slug: string, now = new Date()) {
  return getUpcomingChapterEvents(now).filter((event) => event.slug !== slug);
}

export function getEventLink(event: UpcomingEventItem) {
  return "slug" in event ? `/events/${event.slug}` : event.externalUrl;
}

export function getEventActionLabel(event: UpcomingEventItem) {
  return "slug" in event ? "View event details" : "View on NPSOT.org";
}

export const eventSourceFilters = ["All sources", "Chapter", "Statewide"] as const;
