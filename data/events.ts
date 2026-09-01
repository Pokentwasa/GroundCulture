import type { GcEvent } from "@/lib/types";

const BASE = "https://www.groundculture.co.za/event-details";

// A snapshot of the real Ground Culture programme (Sept-Oct 2026), taken
// from groundculture.co.za. Ticketing still runs on their existing Wix
// system, so `ticketUrl` links straight out to the real event page rather
// than faking an internal checkout. To update: edit this array, or point
// it at a CMS that returns the same shape.
export const events: GcEvent[] = [
  {
    title: "Keenan Scott \u2014 Folk & Blues Live",
    slug: "keenan-scott-folk-blues-live-at-ground-culture",
    category: "music",
    date: "2026-09-01T20:00",
    startTime: "8:00 PM",
    venue: "Ground Culture Cafe",
    location: "observatory",
    price: "R100",
    description:
      "Soulful acoustic folk & blues from rising star Keenan Scott, live at Ground Culture Cafe.",
    performer: "Keenan Scott",
    image:
      "https://static.wixstatic.com/media/207811_aba6cc12c2dc476cafbd996049ec760c~mv2.png/v1/fill/w_980,h_636,al_c,q_90,enc_auto/207811_aba6cc12c2dc476cafbd996049ec760c~mv2.png",
    ticketUrl: `${BASE}/keenan-scott-folk-blues-live-at-ground-culture`,
    isFeatured: true,
    cta: "tickets",
  },
  {
    title: "Jaryd Pillay Hosts Grounded Comedy Nights",
    slug: "jaryd-pillay-hosts-grounded-comedy-nights-2026-09-04-19-30",
    category: "comedy",
    date: "2026-09-04T19:30",
    startTime: "7:30 PM",
    venue: "Ground Culture Cafe",
    location: "observatory",
    description:
      "The weekly Grounded Comedy Nights, hosted by Jaryd Pillay. A rotating line-up of Cape Town's sharpest.",
    performer: "Jaryd Pillay",
    image:
      "https://static.wixstatic.com/media/207811_5324246b6b29495c92e73b395addd9a7~mv2.jpeg/v1/fill/w_980,h_980,al_c,q_85,enc_auto/207811_5324246b6b29495c92e73b395addd9a7~mv2.jpeg",
    ticketUrl: `${BASE}/jaryd-pillay-hosts-grounded-comedy-nights-2026-09-04-19-30`,
    isFeatured: true,
    cta: "tickets",
  },
  {
    title: "Springboks vs New Zealand",
    slug: "springboks-vs-new-zealand-2026-09-05-17-00",
    category: "sport",
    date: "2026-09-05T17:00",
    startTime: "5:00 PM",
    venue: "Ground Culture Cafe",
    location: "observatory",
    description:
      "Watch the Springboks with us at Ground Culture. Expect burgers, drinks specials and lekker vibes.",
    image:
      "https://static.wixstatic.com/media/207811_8d59eb8c936a462a93bcdc86e8d23359~mv2.png/v1/fill/w_800,h_800,al_c,q_90,enc_auto/207811_8d59eb8c936a462a93bcdc86e8d23359~mv2.png",
    ticketUrl: `${BASE}/springboks-vs-new-zealand-2026-09-05-17-00`,
    cta: "rsvp",
  },
  {
    title: "Headliners Only",
    slug: "headliners-only-2026-09-05-21-00",
    category: "comedy",
    date: "2026-09-05T21:00",
    startTime: "9:00 PM",
    venue: "Ground Culture Cafe",
    location: "observatory",
    description:
      "Grounded Comedy brings some of South Africa's top comedians to the stage for this exclusive late show \u2014 world-class comedy in an intimate Cape Town setting.",
    image:
      "https://static.wixstatic.com/media/207811_4f24dc6d129b43908e052ff3c5aebd9e~mv2.jpeg/v1/fill/w_960,h_1280,al_c,q_85,enc_auto/207811_4f24dc6d129b43908e052ff3c5aebd9e~mv2.jpeg",
    ticketUrl: `${BASE}/headliners-only-2026-09-05-21-00`,
    isFeatured: true,
    cta: "tickets",
  },
  {
    title: "Quiz Nights",
    slug: "quiz-nights-2026-09-07-19-00",
    category: "quiz",
    date: "2026-09-07T19:00",
    startTime: "7:00 PM",
    venue: "Ground Culture Cafe",
    location: "observatory",
    description:
      "Monday Quiz Nights: good laughs, great food and a little brain-teasing fun, hosted by the entertaining Inquizitorious Rex Quizzes.",
    performer: "Inquizitorious Rex Quizzes",
    image:
      "https://static.wixstatic.com/media/207811_41f9ee06fb1946608ce30e8019807add~mv2.png/v1/fill/w_800,h_800,al_c,q_90,enc_auto/207811_41f9ee06fb1946608ce30e8019807add~mv2.png",
    ticketUrl: `${BASE}/quiz-nights-2026-09-07-19-00`,
    cta: "tickets",
  },
  {
    title: "The Defence Rest \u2014 feat. Tashriq Ahmed",
    slug: "the-defence-rest-featuring-tashriq-ahmed-2026-09-09-20-00",
    category: "comedy",
    date: "2026-09-09T20:00",
    startTime: "8:00 PM",
    venue: "Ground Culture Cafe",
    location: "observatory",
    description:
      "Lawyer by day, comedian by night. A hilarious true-life comedy show based on the real experiences of attorney and comedian Tashriq Ahmed.",
    performer: "Tashriq Ahmed",
    image:
      "https://static.wixstatic.com/media/207811_290b6a7ab81848ccb41e6021df84bde8~mv2.png/v1/fill/w_980,h_636,al_c,q_90,enc_auto/207811_290b6a7ab81848ccb41e6021df84bde8~mv2.png",
    ticketUrl: `${BASE}/the-defence-rest-featuring-tashriq-ahmed-2026-09-09-20-00`,
    isFeatured: true,
    cta: "details",
  },
  {
    title: "Parody Night Volume 4",
    slug: "parody-night-volume-4",
    category: "comedy",
    date: "2026-09-12T20:00",
    startTime: "8:00 PM",
    doors: "6:30 PM",
    venue: "Ground Culture Cafe",
    location: "observatory",
    price: "From R120",
    description:
      "Say goodbye to the Cape Town winter with your favourite musical comedy variety show. Vol 4 brings some of Cape Town's funniest queers and allies, plus a feature from The Cape Town Sketchclub.",
    image:
      "https://static.wixstatic.com/media/207811_5a64a2888cc440679ae2157d8fffc261~mv2.png/v1/fill/w_800,h_800,al_c,q_90,enc_auto/207811_5a64a2888cc440679ae2157d8fffc261~mv2.png",
    ticketUrl: `${BASE}/parody-night-volume-4`,
    isFeatured: true,
    cta: "tickets",
  },
  {
    title: "Open Mic Night for Comedians",
    slug: "open-mic-night-for-comedians",
    category: "comedy",
    date: "2026-09-17T20:00",
    startTime: "8:00 PM",
    doors: "6:30 PM",
    venue: "Ground Culture Cafe",
    location: "observatory",
    description:
      "The stage for up-and-comers to test fresh material, hosted and curated by Jaryd Pillay. Raw, unfiltered comedy and big energy. Come support the next generation of Cape Town comedy.",
    performer: "Jaryd Pillay",
    ticketUrl: `${BASE}/open-mic-night-for-comedians`,
    cta: "tickets",
  },
  {
    title: "Headliners Only",
    slug: "headliners-only-2026-09-19-20-00",
    category: "comedy",
    date: "2026-09-19T20:00",
    startTime: "8:00 PM",
    venue: "Ground Culture Cafe",
    location: "observatory",
    description:
      "Grounded Comedy brings some of South Africa's top comedians to the stage. World-class comedy in an intimate Cape Town setting.",
    image:
      "https://static.wixstatic.com/media/207811_46e5dedbbafd4735aa4f333e7f52d06c~mv2.png/v1/fill/w_800,h_800,al_c,q_90,enc_auto/207811_46e5dedbbafd4735aa4f333e7f52d06c~mv2.png",
    ticketUrl: `${BASE}/headliners-only-2026-09-19-20-00`,
    cta: "tickets",
  },
  {
    title: "Public Disturbance by Mat Maluks",
    slug: "public-disturbance-by-mat-maluks",
    category: "comedy",
    date: "2026-09-23T20:00",
    startTime: "8:00 PM",
    venue: "Ground Culture Cafe",
    location: "observatory",
    description:
      "Mat has built a reputation for sharp, authentic comedy that keeps audiences laughing without crossing the line \u2014 clean, family-friendly material anyone can enjoy.",
    performer: "Mat Maluks",
    image:
      "https://static.wixstatic.com/media/207811_dfdad28a0e554126ac21263ba7c9f136~mv2.jpeg/v1/fill/w_828,h_1461,al_c,q_85,enc_auto/207811_dfdad28a0e554126ac21263ba7c9f136~mv2.jpeg",
    ticketUrl: `${BASE}/public-disturbance-by-mat-maluks`,
    isFeatured: true,
    cta: "tickets",
  },
  {
    title: "Open Mic Night for Comedians",
    slug: "open-mic-night-for-comedians-1",
    category: "comedy",
    date: "2026-09-24T20:00",
    startTime: "8:00 PM",
    doors: "6:30 PM",
    venue: "Ground Culture Cafe",
    location: "observatory",
    description:
      "Fresh material, first laughs, big energy. Hosted and curated by Jaryd Pillay. Come support the next generation of Cape Town comedy.",
    performer: "Jaryd Pillay",
    ticketUrl: `${BASE}/open-mic-night-for-comedians-1`,
    cta: "tickets",
  },
  {
    title: "Mel Jones: Unscripted, Unfiltered & Unbothered",
    slug: "mel-jones-unscripted-unfiltered-unbothered-comedy-show",
    category: "comedy",
    date: "2026-09-30T20:00",
    startTime: "8:00 PM",
    venue: "Ground Culture Cafe",
    location: "observatory",
    description:
      "Comedy with no script, no filter and no apologies. A brutally honest, wildly funny romp through life, love, ageing, awkward moments, questionable decisions \u2014 and also starring YOU.",
    performer: "Mel Jones",
    image:
      "https://static.wixstatic.com/media/207811_73448ef5538b4221a3586a2fd42e7448~mv2.jpg/v1/fill/w_980,h_980,al_c,q_85,enc_auto/207811_73448ef5538b4221a3586a2fd42e7448~mv2.jpg",
    ticketUrl: `${BASE}/mel-jones-unscripted-unfiltered-unbothered-comedy-show`,
    isFeatured: true,
    cta: "tickets",
  },
  {
    title: "Pius Xulu: MYSELF",
    slug: "pius-xulu-comedy-show",
    category: "comedy",
    date: "2026-10-24T20:00",
    startTime: "8:00 PM",
    venue: "Ground Culture Cafe",
    location: "observatory",
    description:
      "After the breakthrough of his debut The Delayed Response \u2014 decent reviews and sold-out nights \u2014 one-liner sensation Pius Xulu returns with his highly anticipated second act: MYSELF.",
    performer: "Pius Xulu",
    image:
      "https://static.wixstatic.com/media/207811_3927d497be5d4c6a902000205088f358~mv2.png/v1/fill/w_980,h_735,al_c,q_90,enc_auto/207811_3927d497be5d4c6a902000205088f358~mv2.png",
    ticketUrl: `${BASE}/pius-xulu-comedy-show`,
    isFeatured: true,
    cta: "tickets",
  },
];

// --- helpers -------------------------------------------------------------

const CATEGORY_LABELS: Record<string, string> = {
  comedy: "Comedy",
  music: "Live Music",
  quiz: "Quiz",
  sport: "Sport",
  special: "Special",
};

export function categoryLabel(c: string): string {
  return CATEGORY_LABELS[c] ?? c;
}

export function getEvent(slug: string): GcEvent | undefined {
  return events.find((e) => e.slug === slug);
}

// Sorted by date ascending. Pure on the data; date-relative labels are
// derived in lib/date so they stay correct whenever the page renders.
export function sortedEvents(): GcEvent[] {
  return [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
}

export function featuredEvents(): GcEvent[] {
  const f = sortedEvents().filter((e) => e.isFeatured);
  return f.length ? f : sortedEvents().slice(0, 6);
}
