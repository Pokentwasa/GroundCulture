import type { MenuSection } from "@/lib/types";

// The live Ground Culture menu is published as image/PDF cards, so exact
// dish names and prices aren't machine-readable. What's captured here is
// real and verifiable: the categories, and the kitchen's actual story
// (smash burgers, patties made in-house daily from local Halaal butchers,
// locally sourced, proudly South African).
//
// Item rows below are a CONTENT MODEL, not invented menu copy. Every row is
// flagged `placeholder: true` so the UI marks it as a sample. Drop the real
// dishes + prices in here (or wire this array to a CMS) and remove the flag.

export const menuIntro =
  "We're known for our smash burgers. Patties are made in-house daily with fresh, high-quality meat from local Halaal butchers \u2014 flavourful, fresh and juicy. Every burger, wrap, panini and side starts with ingredients sourced from suppliers across Cape Town and South Africa.";

export const menuSections: MenuSection[] = [
  {
    title: "Breakfast & Lunch",
    note: "Served all day. Laptop-friendly, free Wi-Fi.",
    items: [
      { name: "All-day breakfast", placeholder: true, price: null },
      { name: "Wraps & paninis", placeholder: true, price: null },
      { name: "Light lunch plates", placeholder: true, price: null },
    ],
  },
  {
    title: "Starters & Burgers",
    note: "The house speciality. Smashed daily.",
    items: [
      {
        name: "Signature smash burger",
        description: "In-house patty, local Halaal beef.",
        tags: ["Halaal", "Smashed daily"],
        placeholder: true,
        price: null,
      },
      { name: "Chicken burger", placeholder: true, price: null },
      { name: "Loaded sides", placeholder: true, price: null },
    ],
  },
  {
    title: "Coffee & Non-Alcoholic",
    note: "The reason to come in before noon.",
    items: [
      { name: "Espresso bar", placeholder: true, price: null },
      { name: "Iced & specialty drinks", placeholder: true, price: null },
      { name: "Soft drinks & juices", placeholder: true, price: null },
    ],
  },
  {
    title: "Cocktails",
    note: "For when day tips into night.",
    items: [
      { name: "House cocktails", placeholder: true, price: null },
      { name: "Beers & wine", placeholder: true, price: null },
    ],
  },
];
