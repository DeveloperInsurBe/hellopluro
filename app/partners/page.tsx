import ComplianceSection from "@/components/partnersComponents/ComplianceSection";
import KYCSection from "@/components/partnersComponents/KYCSection";
import PartnersCTA from "@/components/partnersComponents/PartnersCTA";
import PartnersHero from "@/components/partnersComponents/PartnersHero";
import PartnersList from "@/components/partnersComponents/PartnersList";
import SecurityPartners from "@/components/partnersComponents/SecurityPartners";
import WhyStudentsLove from "@/components/partnersComponents/WhyStudentsLove";


export default function Partners() {
  return (
    <div className="flex flex-col bg-white overflow-hidden ">
      <PartnersHero/>
      <PartnersList/>
      <SecurityPartners/>
      <WhyStudentsLove/>
      {/* <ComplianceSection/> */}
      <PartnersCTA/>
      {/* <KYCSection/> */}

    </div>
  );
}
