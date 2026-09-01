import type { Metadata } from "next";
import LegalNotice from "@/components/LegalNotice";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  robots: { index: false },
};

export default function Page() {
  return <LegalNotice title="Accessibility Statement" />;
}
