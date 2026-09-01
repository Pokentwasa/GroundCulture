// Single source of truth for business-wide facts. Pulled from the live
// Ground Culture site so nothing is invented and nothing is scattered
// across twenty components.

export const site = {
  name: "Ground Culture",
  legalName: "Ground Culture",
  tagline: "Cape Town food, comedy & culture under one roof.",
  shortPitch: "Coffee by day. Culture by night.",
  url: "https://www.groundculture.co.za",

  hq: {
    label: "Ground Culture Cafe",
    address: "170 Lower Main Road, Observatory",
    city: "Cape Town",
    country: "South Africa",
    coords: { lat: -33.9375, lng: 18.4653 },
  },

  contact: {
    phone: "078 448 0839",
    phoneHref: "tel:+27784480839",
    email: "Hello@groundculture.co.za",
    emailHref: "mailto:Hello@groundculture.co.za",
    // WhatsApp deep-link (same number). Message pre-fills on open.
    whatsapp: "https://wa.me/27784480839",
    whatsappOrder:
      "https://wa.me/27784480839?text=Hi%20Ground%20Culture%2C%20I'd%20like%20to%20place%20an%20order",
  },

  ordering: {
    uberEats:
      "https://www.ubereats.com/za/store/ground-culture-lower-main/Lx9xdEqIR5id7Mit7YdPGg",
  },

  social: {
    instagram: "https://www.instagram.com/groundculture_/",
    instagramHandle: "@groundculture_",
    facebook: "https://www.facebook.com/groundcultures/",
    tiktok: "https://www.tiktok.com/@groundculture_",
  },

  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=170+Lower+Main+Road+Observatory+Cape+Town",

  legal: {
    privacy: "/privacy",
    terms: "/terms",
    refund: "/refund",
    accessibility: "/accessibility",
  },
} as const;
