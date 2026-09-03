import Hero from "@/components/Hero";
import WhatsOn from "@/components/WhatsOn";
import DayNight from "@/components/DayNight";
import Food from "@/components/Food";
import Manifesto from "@/components/Manifesto";
import Story from "@/components/Story";
import Moments from "@/components/Moments";
import Locations from "@/components/Locations";
import Comedy from "@/components/Comedy";
import FoodTruck from "@/components/FoodTruck";
import Hire from "@/components/Hire";
import FinalCta from "@/components/FinalCta";

// The homepage is a sequence of cultural moments, tuned to alternate loud
// and quiet: hero -> programme -> day/night -> food -> manifesto -> story ->
// locations -> comedy -> food truck -> hire -> come through.
export default function Home() {
  return (
    <>
      <Hero />
      <WhatsOn />
      <DayNight />
      <Food />
      <Manifesto />
      <Story />
      <Moments />
      <Locations />
      <Comedy />
      <FoodTruck />
      <Hire />
      <FinalCta />
    </>
  );
}
