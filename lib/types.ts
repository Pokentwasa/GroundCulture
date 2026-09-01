// Content model for Ground Culture.
// Everything the site renders is typed here so a future CMS (Sanity,
// Contentful, Wix Headless) can map straight onto these shapes.

export type EventCategory =
  | "comedy"
  | "music"
  | "quiz"
  | "sport"
  | "special";

export type EventCta = "tickets" | "rsvp" | "details";

export interface GcEvent {
  title: string;
  slug: string;
  category: EventCategory;
  /** ISO date, local Cape Town time, e.g. "2026-09-12T20:00" */
  date: string;
  startTime?: string;
  endTime?: string;
  doors?: string;
  venue: string;
  /** slug of a location in data/locations, when it maps to one */
  location?: string;
  /** Human price string as advertised, e.g. "R100", "From R120". Null when free / unlisted. */
  price?: string | null;
  description?: string;
  performer?: string;
  image?: string;
  /** External ticketing / detail URL (Ground Culture currently ticket via Wix). */
  ticketUrl: string;
  isFeatured?: boolean;
  isSoldOut?: boolean;
  cta: EventCta;
}

export type LocationType = "cafe-venue" | "food-truck" | "kiosk";

export interface OpeningHours {
  day: string;
  hours: string;
}

export interface GcLocation {
  name: string;
  slug: string;
  type: LocationType;
  /** Short tag shown on the explorer, e.g. "The mothership". */
  tagline: string;
  neighbourhood: string;
  address?: string;
  /** What actually happens here. Drives the metadata chips. */
  services: string[];
  description: string;
  mood: "hq" | "coastal" | "suburban" | "park";
  hours?: OpeningHours[];
  directionsUrl?: string;
  orderUrl?: string;
  image?: string;
  /** Only the Observatory HQ carries the full day/night programme. */
  isHq?: boolean;
}

export interface MenuItem {
  name: string;
  description?: string;
  price?: string | null;
  tags?: string[];
  /** True where the item still needs real copy/price from the team. */
  placeholder?: boolean;
}

export interface MenuSection {
  title: string;
  note?: string;
  items: MenuItem[];
}

export interface NavLink {
  label: string;
  href: string;
  /** Oversized word used in the mobile takeover. */
  mobileLabel?: string;
}
