import type { Metadata } from "next";
import HireDetail from "@/components/HireDetail";

export const metadata: Metadata = {
  title: "Food Truck Hire",
  description:
    "Bring the Ground Culture food truck to your Cape Town event: corporate functions, private parties, markets, festivals and celebrations. Smash burgers on site.",
  alternates: { canonical: "/hire/food-truck" },
};

export default function FoodTruckHire() {
  return (
    <HireDetail
      index="01"
      eyebrow="Food Truck Hire"
      title={
        <>
          Bring us
          <br />
          to you.
        </>
      }
      lead="Our food truck brings the same in-house smash burgers and Ground Culture energy straight to your event, anywhere in Cape Town."
      perfectFor={[
        "Corporate events",
        "Private parties",
        "Markets",
        "Festivals",
        "Celebrations",
      ]}
      how={[
        { t: "Tell us the details", d: "Date, location, rough headcount and the kind of event." },
        { t: "We build a menu", d: "A smash-burger set-up tuned to your crowd and space." },
        { t: "We roll up and cook", d: "Fresh, on site, made to order. You enjoy the party." },
      ]}
      enquirySubject="food truck hire"
      imageSlot="hire-food-truck"
    />
  );
}
