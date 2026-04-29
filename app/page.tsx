"use client";

import BlockedAccountSection from "@/components/BlockedAccountSection";
import DashboardFeaturesSection from "@/components/DashboardFeaturesSection";
import FAQSection from "@/components/FAQSection";
import HealthInsuranceSection from "@/components/HealthInsuranceSection";
import HeroSectionHome from "@/components/HeroSectionHome";
import PartnersSection from "@/components/PartnersSection";
import StepsSection from "@/components/StepsSection";
import SupportSection from "@/components/SupportSection";

export default function Home() {
  return (
    <div className="flex flex-col bg-white overflow-hidden ">
      <HeroSectionHome/>
      <PartnersSection/>
      <StepsSection/>
      <DashboardFeaturesSection/>
      <BlockedAccountSection/>
      <HealthInsuranceSection/>
      <SupportSection/>
      <FAQSection/>
    </div>
  );
}
