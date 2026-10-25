import type { Metadata } from "next";
import TravelInsurancePage from "@/components/serviceInfo/TravelInsurancePage";

export const metadata: Metadata = {
  title: "Travel Health Insurance for Visa - Pluro",
  description:
    "Visa-compliant travel health insurance for your entry to Germany, from your arrival until your long-term insurance starts.",
};

export default function TravelHealthInsurancePage() {
  return <TravelInsurancePage />;
}
