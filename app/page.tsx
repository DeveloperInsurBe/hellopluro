"use client";

import BlockedAccountSection from "@/components/BlockedAccountSection";
import DashboardFeaturesSection from "@/components/DashboardFeaturesSection";
import FAQSection from "@/components/FAQSection";
import HealthInsuranceSection from "@/components/HealthInsuranceSection";
import HeroSectionHome from "@/components/HeroSectionHome";
import StepsSection from "@/components/StepsSection";
import SupportSection from "@/components/SupportSection";
import TrustFeaturesStrip from "@/components/TrustBlockedaccountstrip";

export default function Home() {
  return (
    <div className="flex flex-col bg-white overflow-hidden ">
      <HeroSectionHome/>
      <TrustFeaturesStrip/>
      {/* <PartnersSection/> */}
      <BlockedAccountSection/>
      <StepsSection/>
      <DashboardFeaturesSection/>
      <HealthInsuranceSection/>
      <SupportSection/>
      <FAQSection/>
    </div>
  );
}
