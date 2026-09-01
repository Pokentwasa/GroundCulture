import type { GcLocation } from "@/lib/types";
import { site } from "@/lib/site";

// The Ground Culture location ecosystem, from the live site. Observatory is
// the HQ (day cafe / night comedy club). The rest are food-truck sites, so
// the template renders different services per location rather than cloning
// one page four times.
export const locations: GcLocation[] = [
  {
    name: "Observatory",
    slug: "observatory",
    type: "cafe-venue",
    tagline: "The mothership",
    neighbourhood: "Lower Main Road",
    address: site.hq.address,
    services: ["Cafe", "Comedy Club", "Live Events", "Kitchen"],
    description:
      "170 Lower Main Road. Coffee shop, laptop-friendly workspace and kitchen by day; South Africa's fastest-growing comedy club by night. This is where Ground Culture started and where the programme lives.",
    mood: "hq",
    isHq: true,
    hours: [
      { day: "Mon", hours: "08:00 \u2013 late (Quiz Night)" },
      { day: "Tue \u2013 Thu", hours: "08:00 \u2013 late" },
      { day: "Fri \u2013 Sat", hours: "08:00 \u2013 late (Shows)" },
      { day: "Sun", hours: "Check What's On" },
    ],
    directionsUrl: site.directionsUrl,
    orderUrl: site.ordering.uberEats,
    image:
      "https://static.wixstatic.com/media/207811_73fd8300ba984a9ebca83c2bdcc8ead5~mv2.jpg/v1/fill/w_980,h_653,al_c,q_85,enc_avif,quality_auto/207811_73fd8300ba984a9ebca83c2bdcc8ead5~mv2.jpg",
  },
  {
    name: "Blouberg",
    slug: "blouberg",
    type: "food-truck",
    tagline: "Burgers with a view",
    neighbourhood: "Bloubergstrand",
    services: ["Food Truck", "Smash Burgers", "Takeaway"],
    description:
      "Table Mountain on the horizon, a smash burger in hand. The Blouberg truck brings Ground Culture flavour to the coast.",
    mood: "coastal",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=Ground+Culture+Blouberg",
  },
  {
    name: "Prom Park",
    slug: "prom-park",
    type: "food-truck",
    tagline: "On the promenade",
    neighbourhood: "Promenade",
    services: ["Food Truck", "Smash Burgers", "Takeaway"],
    description:
      "Parked on the prom for walkers, runners and everyone in between. Grab a burger, keep it moving.",
    mood: "coastal",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=Ground+Culture+Prom+Park",
  },
  {
    name: "Claremont",
    slug: "claremont",
    type: "food-truck",
    tagline: "Southern suburbs smash",
    neighbourhood: "Claremont",
    services: ["Food Truck", "Smash Burgers", "Takeaway", "Uber Eats"],
    description:
      "The southern suburbs' shortcut to a proper smash burger. Order in person or on Uber Eats.",
    mood: "suburban",
    orderUrl: site.ordering.uberEats,
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=Ground+Culture+Claremont",
  },
  {
    name: "Sea Point",
    slug: "sea-point",
    type: "food-truck",
    tagline: "Atlantic seaboard",
    neighbourhood: "Sea Point",
    services: ["Food Truck", "Smash Burgers", "Takeaway"],
    description:
      "Sea Point energy, Ground Culture burgers. Sunset-adjacent and always busy.",
    mood: "coastal",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=Ground+Culture+Sea+Point",
  },
];

export function getLocation(slug: string): GcLocation | undefined {
  return locations.find((l) => l.slug === slug);
}

export const hqLocation = locations.find((l) => l.isHq)!;
