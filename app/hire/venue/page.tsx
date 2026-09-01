import type { Metadata } from "next";
import HireDetail from "@/components/HireDetail";

export const metadata: Metadata = {
  title: "Venue Hire",
  description:
    "Hire the Ground Culture venue in Observatory for comedy shows, launches, birthdays, private events and community gatherings in Cape Town.",
  alternates: { canonical: "/hire/venue" },
};

export default function VenueHire() {
  return (
    <HireDetail
      index="02"
      eyebrow="Venue Hire"
      title={
        <>
          Bring your
          <br />
          people to us.
        </>
      }
      lead="The Observatory room is built for a crowd and a stage. Take it over for the night for your show, launch or celebration."
      perfectFor={[
        "Comedy",
        "Launches",
        "Birthdays",
        "Private events",
        "Shows",
        "Community gatherings",
      ]}
      how={[
        { t: "Pick your date", d: "Check it against the programme and lock it in." },
        { t: "Shape the night", d: "Stage, sound, food and drinks, set up around your plan." },
        { t: "Host it here", d: "You run the show. We handle the room, the kitchen and the bar." },
      ]}
      enquirySubject="venue hire"
      imageSlot="hire-venue"
    />
  );
}
