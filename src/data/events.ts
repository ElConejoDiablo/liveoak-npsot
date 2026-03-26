export type EventType =
  | "Chapter Meeting"
  | "Plant Walk"
  | "Workshop"
  | "Talk"
  | "Volunteer Day";

export type EventStatus = "Upcoming" | "Check back for updates";

export type EventItem = {
  slug: string;
  title: string;
  type: EventType;
  county: string;
  locationName: string;
  locationAddress: string;
  city: string;
  startDateTime: string;
  endDateTime: string;
  description: string;
  summary: string;
  status: EventStatus;
  audience: string;
  attendanceNote?: string;
  accessibilityNotes?: string;
  weatherNote?: string;
  whatToBring?: string[];
  details: string[];
};

export const eventPageIntro =
  "Check this page for upcoming meetings, walks, talks, and hands-on chapter programming across Fayette, Colorado, and Lavaca Counties.";

export const participationNotes = [
  "Chapter gatherings are intended to be welcoming to newcomers as well as experienced native-plant advocates.",
  "Outdoor events are easiest when participants bring water, sun protection, sturdy shoes, and weather-appropriate layers.",
  "Accessibility notes, RSVP details, and weather guidance are listed on each event as they apply.",
];

export const eventsEmptyState = {
  title: "Upcoming chapter programming will appear here",
  description:
    "Additional chapter meetings, walks, and volunteer opportunities will be posted here as they are scheduled.",
};

export const allEvents: EventItem[] = [
  {
    slug: "spring-chapter-gathering-native-grasses",
    title: "Spring Chapter Gathering: Native Grasses for Everyday Landscapes",
    type: "Chapter Meeting",
    county: "Fayette County",
    locationName: "Schulenburg Public Library meeting room",
    locationAddress: "310 Simpson Street",
    city: "Schulenburg, Texas",
    startDateTime: "2026-04-16T18:30:00-05:00",
    endDateTime: "2026-04-16T20:00:00-05:00",
    description:
      "A welcoming evening program on how native grasses support habitat, anchor resilient plantings, and add year-round structure in south-central Texas landscapes.",
    summary:
      "An early-season chapter gathering focused on practical native grass choices for home landscapes and community plantings.",
    status: "Check back for updates",
    audience:
      "Open to members, prospective members, gardeners, and anyone curious about getting started with Texas natives.",
    attendanceNote:
      "Contact the chapter if you would like the latest room details before attending.",
    accessibilityNotes:
      "Indoor meeting room with seating, restrooms, and nearby parking.",
    details: [
      "Arrive early for introductions, chapter updates, and native plant conversation.",
      "The presentation is designed to be useful for both beginners and long-time native-plant advocates.",
      "Contact the chapter for the latest room and parking details.",
    ],
  },
  {
    slug: "prairie-edge-plant-walk-la-grange",
    title: "Prairie Edge Plant Walk",
    type: "Plant Walk",
    county: "Fayette County",
    locationName: "Public greenspace near La Grange",
    locationAddress: "Location shared in chapter updates and by email",
    city: "La Grange, Texas",
    startDateTime: "2026-04-25T09:00:00-05:00",
    endDateTime: "2026-04-25T11:00:00-05:00",
    description:
      "A slow-paced morning walk for observing spring bloom timing, grass structure, and pollinator activity in a local field setting.",
    summary:
      "A beginner-friendly field walk built around observation, habitat context, and practical plant ID conversation.",
    status: "Check back for updates",
    audience:
      "Suitable for beginners, families with older children, and anyone interested in seeing native plants in the field.",
    attendanceNote:
      "Contact the chapter for the latest location and parking details before the walk.",
    accessibilityNotes:
      "This outing will involve uneven ground.",
    weatherNote:
      "Outdoor programming may shift in the event of heavy rain or severe weather.",
    whatToBring: ["Water", "Hat", "Walking shoes", "Notebook or field guide"],
    details: [
      "Expect a conversational plant walk rather than a fast hike.",
      "The chapter will use the outing to connect habitat observation with garden and stewardship decisions back home.",
      "Contact the chapter for the latest location and parking details before attending.",
    ],
  },
  {
    slug: "pollinator-garden-talk-weimar",
    title: "Pollinator Garden Talk: Plants That Carry Summer Into Fall",
    type: "Talk",
    county: "Colorado County",
    locationName: "Community room in Weimar",
    locationAddress: "Venue shared in chapter updates and by email",
    city: "Weimar, Texas",
    startDateTime: "2026-05-14T18:30:00-05:00",
    endDateTime: "2026-05-14T20:00:00-05:00",
    description:
      "A practical chapter talk centered on Turk’s cap, American beautyberry, goldenrod, and the kind of planting sequence that supports pollinators across changing seasons.",
    summary:
      "A regionally grounded evening talk on long-season pollinator value in home landscapes and community plantings.",
    status: "Check back for updates",
    audience:
      "Useful for gardeners, teachers, land stewards, and local residents looking for native plants with ecological value.",
    attendanceNote:
      "Contact the chapter for the latest venue details before attending.",
    accessibilityNotes:
      "Indoor presentation with seating.",
    details: [
      "The program will compare bloom timing, structure, and wildlife value across several native plants useful in the chapter service area.",
      "Plenty of time is planned for questions and local planting discussion.",
      "Contact the chapter for the latest venue details before attending.",
    ],
  },
  {
    slug: "seed-stewardship-morning-hallettsville",
    title: "Seed Stewardship Morning: Collection, Cleaning, and Storage Basics",
    type: "Workshop",
    county: "Lavaca County",
    locationName: "Demonstration garden in Hallettsville",
    locationAddress: "Site shared in chapter updates and by email",
    city: "Hallettsville, Texas",
    startDateTime: "2026-06-06T08:30:00-05:00",
    endDateTime: "2026-06-06T10:30:00-05:00",
    description:
      "A hands-on introduction to responsible seed collecting, drying, labeling, and storage practices for chapter members and curious community gardeners.",
    summary:
      "A practical workshop on seed stewardship and the ethics of collecting native seed with care.",
    status: "Check back for updates",
    audience:
      "Best suited to gardeners, volunteers, and chapter participants interested in native seed handling and seasonal stewardship.",
    attendanceNote:
      "Contact the chapter for the latest site details before attending.",
    accessibilityNotes:
      "Outdoor demonstration with some standing and walking.",
    weatherNote:
      "Outdoor workshop timing may be adjusted if weather conditions are unsafe or unusually wet.",
    whatToBring: ["Water", "Sun protection", "Notebook", "Work gloves if preferred"],
    details: [
      "The workshop will cover permission, timing, restraint, and basic handling practices for native seed.",
      "Chapter organizers can build from this format later for seed swaps, workdays, or educational demos.",
      "Contact the chapter for the latest site details before attending.",
    ],
  },
];

export const upcomingEvents = allEvents.filter(
  (event) => new Date(event.startDateTime).getTime() >= Date.now(),
);

export const pastEvents = allEvents.filter(
  (event) => new Date(event.startDateTime).getTime() < Date.now(),
);

export const eventTypes = Array.from(
  new Set(allEvents.map((event) => event.type)),
) as EventType[];
