import type { Metadata } from "next";
import LegalNotice from "@/components/LegalNotice";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  robots: { index: false },
};

export default function Page() {
  return <LegalNotice title="Terms & Conditions" />;
}
