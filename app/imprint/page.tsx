export default function ImprintPage() {
  return (
    <main className="min-h-screen bg-[#f5f7f6] py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
          Imprint
        </h1>

        <div className="space-y-10 text-gray-700 text-sm md:text-base leading-relaxed">
          
          {/* INTRO */}
          <p className="text-gray-600">
            Information in accordance with § 5 German Telemedia Act (TMG) and § 18 para. 1 German State Media Treaty (MStV)
          </p>

          {/* COMPANY */}
          <Section title="Company">
            <p>InsurBe GmbH</p>
            <p>Großgörschener Straße 15</p>
            <p>06686 Lützen</p>
            <p>Germany</p>
          </Section>

          {/* CONTACT */}
          <Section title="Contact">
            <p>
              Email:{" "}
              <a
                href="mailto:enquiries@insurbe.com"
                className="text-teal-600 hover:underline"
              >
                enquiries@insurbe.com
              </a>
            </p>
          </Section>

          {/* DIRECTOR */}
          <Section title="Authorized Managing Director">
            <p>Marvin Fürst</p>
            <p className="text-gray-500">
              (Responsible Managing Director for insurance mediation activities)
            </p>
          </Section>

          {/* REGISTER */}
          <Section title="Commercial Register Entry">
            <p>Registered at: Stendal Local Court</p>
            <p>Commercial Register No.: HRB 35151</p>
          </Section>

          {/* AUTHORITY */}
          <Section title="Supervisory Authority">
            <p>Industry and Commerce Chamber Halle-Dessau (IHK Halle-Dessau)</p>
            <p>Franckestraße 5</p>
            <p>06110 Halle (Saale)</p>
            <p>Saxony-Anhalt, Germany</p>
          </Section>

          {/* VAT */}
          <Section title="VAT Identification Number">
            <p>VAT ID No.: DE369874296</p>
            <p className="text-gray-500">
              (in accordance with § 27a of the German VAT Act)
            </p>
          </Section>

          {/* PROFESSIONAL INFO */}
          <Section title="Professional Information (Insurance Intermediation)">
            <p>
              Insurance broker with permission pursuant to Section 34d paragraph 1
              of the German Trade Regulation Act (GewO)
            </p>
          </Section>

          {/* REGISTER DETAILS */}
          <Section title="Intermediary Register">
            <p>
              Register:{" "}
              <a
                href="https://www.vermittlerregister.info"
                target="_blank"
                className="text-teal-600 hover:underline"
              >
                www.vermittlerregister.info
              </a>
            </p>
            <p>Registration Number: D-6ATG-SW8HB-44</p>
          </Section>

          {/* REGISTER AUTHORITY */}
          <Section title="Register Authority">
            <p>Industry and Commerce Chamber Halle-Dessau</p>
            <p>Franckestraße 5</p>
            <p>06110 Halle (Saale)</p>
            <p>Germany</p>
          </Section>

          {/* REGULATIONS */}
          <Section title="Professional Regulations">
            <p>Section 34d of the German Trade Regulation Act (GewO)</p>
            <p>Sections 59–68 of the German Insurance Contract Act (VVG)</p>
            <p>Ordinance on Insurance Mediation and Consulting (VersVermV)</p>
            <p>
              Regulations available at{" "}
              <a
                href="https://www.gesetze-im-internet.de"
                target="_blank"
                className="text-teal-600 hover:underline"
              >
                www.gesetze-im-internet.de
              </a>
            </p>
          </Section>

          {/* OMBUDSMAN */}
          <Section title="Ombudsman">
            <p>Insurance Ombudsman e.V.</p>
            <p>P.O. Box 08 06 32</p>
            <p>10006 Berlin</p>
            <p>Germany</p>
            <p>Phone: +49 (0)1802 22 44 24</p>
            <p>
              Website:{" "}
              <a
                href="https://www.versicherungsombudsmann.de"
                target="_blank"
                className="text-teal-600 hover:underline"
              >
                www.versicherungsombudsmann.de
              </a>
            </p>
          </Section>

          {/* HEALTH OMBUDSMAN */}
          <Section title="Ombudsman for Private Health and Long-Term Care Insurance">
            <a
              href="https://www.pkv-ombudsmann.de"
              target="_blank"
              className="text-teal-600 hover:underline"
            >
              www.pkv-ombudsmann.de
            </a>
          </Section>

          {/* ODR */}
          <Section title="Online Dispute Resolution">
            <p>
              The European Commission provides a platform for online dispute
              resolution (ODR):{" "}
              <a
                href="http://ec.europa.eu/consumers/odr/"
                target="_blank"
                className="text-teal-600 hover:underline"
              >
                ec.europa.eu/consumers/odr/
              </a>
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}

/* 🔹 Reusable Section Component */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
        {title}
      </h2>
      <div className="space-y-1">{children}</div>
    </div>
  );
}