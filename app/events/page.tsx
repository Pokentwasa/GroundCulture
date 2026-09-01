import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import EventsIndex from "@/components/EventsIndex";
import JsonLd from "@/components/JsonLd";
import { sortedEvents } from "@/data/events";
import { eventSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "What's On",
  description:
    "Comedy nights, live music, quiz nights and screenings at Ground Culture, Observatory. See the full Cape Town programme and book tickets.",
  alternates: { canonical: "/events" },
};

export default function EventsPage() {
  const all = sortedEvents();
  return (
    <>
      {all.map((e) => (
        <JsonLd key={e.slug} data={eventSchema(e)} />
      ))}
      <PageHeader
        index="01"
        eyebrow="What's on"
        title={
          <>
            What&#39;s
            <br />
            happening?
          </>
        }
        lead="The full programme at Ground Culture, Observatory. Filter it, find your night, grab a ticket. Ticketing runs on our existing booking system."
      />
      <EventsIndex />
    </>
  );
}
