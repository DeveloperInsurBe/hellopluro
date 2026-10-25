import type { Metadata } from "next";
import PackagesPage from "@/components/serviceInfo/PackagesPage";

export const metadata: Metadata = {
  title: "Our Packages - Pluro",
  description:
    "Blocked account and health insurance bundled together - everything you need for your German visa from one trusted source.",
};

export default function OurPackagesPage() {
  return <PackagesPage />;
}
