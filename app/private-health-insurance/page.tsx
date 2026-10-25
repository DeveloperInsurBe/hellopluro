import type { Metadata } from "next";
import PrivateInsurancePage from "@/components/serviceInfo/PrivateInsurancePage";

export const metadata: Metadata = {
  title: "Private Health Insurance - Pluro",
  description:
    "Private health insurance in Germany for students and professionals who are not eligible for, or exempt from, statutory health insurance.",
};

export default function PrivateHealthInsurancePage() {
  return <PrivateInsurancePage />;
}
