import { site } from "@/lib/site";
import type { GcEvent, GcLocation } from "@/lib/types";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "ComedyClub", "CafeOrCoffeeShop"],
    name: site.name,
    description: site.tagline,
    url: site.url,
    telephone: "+27784480839",
    email: site.contact.email,
    servesCuisine: ["Burgers", "Cafe", "South African"],
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "170 Lower Main Road",
      addressLocality: "Observatory",
      addressRegion: "Western Cape",
      addressCountry: "ZA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.hq.coords.lat,
      longitude: site.hq.coords.lng,
    },
    sameAs: [site.social.instagram, site.social.facebook, site.social.tiktok],
  };
}

export function eventSchema(e: GcEvent) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    startDate: e.date,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    description: e.description,
    image: e.image ? [e.image] : undefined,
    performer: e.performer
      ? { "@type": "Person", name: e.performer }
      : undefined,
    location: {
      "@type": "Place",
      name: e.venue,
      address: {
        "@type": "PostalAddress",
        streetAddress: "170 Lower Main Road",
        addressLocality: "Observatory",
        addressRegion: "Western Cape",
        addressCountry: "ZA",
      },
    },
    offers: {
      "@type": "Offer",
      url: e.ticketUrl,
      availability: e.isSoldOut
        ? "https://schema.org/SoldOut"
        : "https://schema.org/InStock",
      priceCurrency: "ZAR",
    },
    organizer: { "@type": "Organization", name: site.name, url: site.url },
  };
}

export function locationSchema(l: GcLocation) {
  return {
    "@context": "https://schema.org",
    "@type": l.type === "cafe-venue" ? "Restaurant" : "FoodEstablishment",
    name: `${site.name} ${l.name}`,
    description: l.description,
    url: `${site.url}/locations/${l.slug}`,
    servesCuisine: ["Burgers", "South African"],
    areaServed: `${l.neighbourhood}, Cape Town`,
    parentOrganization: { "@type": "Organization", name: site.name },
  };
}
