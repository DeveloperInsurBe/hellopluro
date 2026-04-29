import ServicesFeatures from "@/components/servicesComponents/ServicesFeatures";
import ServicesHero from "@/components/servicesComponents/ServicesHero";
import StudentBenefits from "@/components/servicesComponents/StudentBenefits";
import StudentBlockedInfo from "@/components/servicesComponents/StudentBlockedInfo";

export default function Services() {
  return (
    <div className="flex flex-col bg-white overflow-hidden ">
      <ServicesHero />
      <ServicesFeatures />
      <StudentBenefits />
      <StudentBlockedInfo />
    </div>
  );
}
