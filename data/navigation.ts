import type { NavLink } from "@/lib/types";

// Primary navigation. mobileLabel is the oversized verb used in the
// full-screen mobile takeover.
export const primaryNav: NavLink[] = [
  { label: "Eat", href: "/menu", mobileLabel: "Eat" },
  { label: "What's On", href: "/events", mobileLabel: "Laugh" },
  { label: "Locations", href: "/locations", mobileLabel: "Visit" },
  { label: "Our Story", href: "/about", mobileLabel: "About" },
  { label: "Hire", href: "/hire", mobileLabel: "Hire" },
];

// Secondary / footer links that don't belong in the top bar.
export const footerNav: NavLink[] = [
  { label: "What's On", href: "/events" },
  { label: "Menu", href: "/menu" },
  { label: "Locations", href: "/locations" },
  { label: "About", href: "/about" },
  { label: "Food Truck Hire", href: "/hire/food-truck" },
  { label: "Venue Hire", href: "/hire/venue" },
  { label: "Gallery", href: "/gallery" },
];
