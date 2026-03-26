export type EventItem = {
  title: string;
  date: string;
  time: string;
  location: string;
  county: string;
  category: string;
  format: string;
  description: string;
  details: string[];
  sample: boolean;
};

export const eventScheduleNote =
  "These upcoming dates are polished sample content to help launch the site while the chapter finalizes its public calendar.";

export const participationNotes = [
  "Meetings and public programs are intended to be welcoming to newcomers as well as experienced native-plant advocates.",
  "Field outings and volunteer workdays are easiest when you bring water, sun protection, sturdy shoes, and weather-appropriate layers.",
  "Final event details, accessibility notes, and RSVP instructions can be added later in one place without changing the page structure.",
];

export const upcomingEvents: EventItem[] = [
  {
    title: "Spring Chapter Gathering: Native Grasses for Everyday Landscapes",
    date: "2026-04-16",
    time: "6:30 PM to 8:00 PM",
    location: "Sample community room in Schulenburg, Texas",
    county: "Fayette County",
    category: "Chapter Meeting",
    format: "In person with future virtual option possible",
    description:
      "A welcoming evening program focused on how native grasses anchor resilient planting design, support habitat, and hold up through south-central Texas weather swings.",
    details: [
      "Arrive early for introductions, plant questions, and chapter updates.",
      "Program content is written for both new gardeners and long-time native-plant advocates.",
      "This sample listing is ready to swap with finalized venue details later.",
    ],
    sample: true,
  },
  {
    title: "Plant Walk and Prairie Edge Observation Morning",
    date: "2026-04-25",
    time: "9:00 AM to 11:00 AM",
    location: "Sample public greenspace near La Grange, Texas",
    county: "Fayette County",
    category: "Field Trip",
    format: "Outdoor group walk",
    description:
      "A slow-paced plant walk designed for noticing bloom timing, grass structure, pollinator activity, and what healthy spring habitat can look like in the field.",
    details: [
      "Bring water, a hat, and shoes suitable for uneven ground.",
      "Expect beginner-friendly plant ID conversation rather than a fast hike.",
      "Site and parking details can be replaced once the chapter confirms the final stop.",
    ],
    sample: true,
  },
  {
    title: "Pollinator Garden Talk: Plants That Carry Summer Into Fall",
    date: "2026-05-14",
    time: "6:30 PM to 8:00 PM",
    location: "Sample library or civic room in Weimar, Texas",
    county: "Colorado County",
    category: "Educational Talk",
    format: "Indoor presentation and discussion",
    description:
      "A practical chapter talk centered on Turk’s cap, American beautyberry, goldenrod, and the kind of planting succession that helps pollinators beyond a single season.",
    details: [
      "Ideal for home gardeners, teachers, and land stewards looking for useful plant choices.",
      "Content pairs native plant ecology with regionally grounded garden decisions.",
      "This listing is marked as sample content until the public calendar is posted.",
    ],
    sample: true,
  },
  {
    title: "Seed Stewardship Morning: Collection, Cleaning, and Storage Basics",
    date: "2026-06-06",
    time: "8:30 AM to 10:30 AM",
    location: "Sample demonstration garden in Hallettsville, Texas",
    county: "Lavaca County",
    category: "Hands-on Workshop",
    format: "Outdoor demonstration with small-group conversation",
    description:
      "A hands-on introduction to responsible seed collecting, drying, labeling, and storage practices for chapter members and curious community gardeners.",
    details: [
      "The session is built to be practical, seasonal, and easy to update as the chapter refines its seed activities.",
      "Responsible harvesting and landowner permission are core parts of the conversation.",
      "Location details are intentionally flexible until the chapter confirms the final site.",
    ],
    sample: true,
  },
];

