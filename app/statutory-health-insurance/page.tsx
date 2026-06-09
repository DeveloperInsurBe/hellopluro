import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  FileCheck,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";

const standOutPoints = [
  "Tailor-made insurance solutions designed around your study or training plan",
  "24/7 multilingual customer support for fast issue resolution",
  "Electronic notification (M10) and membership confirmation for enrollment and visa application",
  "Application support even before you finalize your German address",
];

const coverageItems = [
  "Doctor visits and specialist consultations",
  "Hospital treatment and emergency care",
  "Prescription medication support",
  "Preventive checkups and vaccinations",
];

const eligibilityItems = [
  "Students with direct university admission",
  "Trainees in vocational training programs",
  "Employees beginning work in Germany",
];

const highlights = [
  {
    title: "Health checkups for young members",
    body: "HPV vaccination : Women and men can get vaccinated from their 18th birthday up to and including the age of 26. This is really important for young people.",
  },
  {
    title: "Professional dental cleaning support",
    body: "DAK will reimburse you up to €60 per year for your professional dental cleaning as an additional benefit.",
  },
  {
    title: "Bonus and optional tariff programs",
    body: "Optional tariffs and bonus programs: Enjoy cash bonuses and subsidies for health measures.",
  },
];

export default function StatutoryHealthInsurancePage() {
  return (
    <div className="bg-[#f7fbff]">
      <section className="max-w-7xl mx-auto px-5 md:px-6 py-10 md:py-10">
        <div className="grid gap-7 xl:grid-cols-12">
          <div className="xl:col-span-8 space-y-6">
            <article className="bg-white rounded-2xl border border-[#d9e8ff] shadow-[0_10px_30px_rgba(0,63,140,0.06)] p-6 md:p-8">
              <h1 className="text-3xl md:text-[2.7rem] leading-tight  text-[#0b2c6b]">
                Statutory Health Insurance
              </h1>
              <div className="h-px bg-[#d6e5ff] my-5" />
              <div className="space-y-5 text-[#1e3562] text-lg leading-relaxed">
                <p>
                  Health insurance is mandatory if you live in Germany and
                  enroll at a university or begin vocational training. For most
                  students, a combination of travel health insurance (for visa
                  entry) and statutory health insurance (for stay in Germany) is
                  recommended.
                </p>
                <p>
                  Statutory health insurance covers essential medical services
                  and gives you card-based access to care across Germany.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {coverageItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-[#dbebff] bg-[#f8fcff] px-4 py-3 flex items-start gap-3"
                  >
                    <HeartPulse className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <p className="text-[#1f3f74] font-medium">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7">
                <h2 className="text-2xl font-semibold text-[#0f3570]">
                  Who Can Apply
                </h2>
                <ul className="mt-4 space-y-2">
                  {eligibilityItems.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[#1f3f74] text-lg"
                    >
                      <span className="text-primary mt-1">-</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 bg-[#eaf6ff] border border-[#cbe6ff] rounded-xl p-4 md:p-5 text-[#1d3e77] text-lg">
                If you are above 30, a language student, or have conditional
                admission, private health insurance can be a better fit for visa
                timelines.
                <Link
                  href="#"
                  className="text-primary font-semibold underline ml-1"
                >
                  Check private health insurance
                </Link>
                .
              </div>
            </article>

            <article className="bg-white rounded-2xl border border-[#8fd5ff] shadow-[0_10px_30px_rgba(0,63,140,0.06)] ">
              <div className="  p-6 md:p-8 -m-2 md:-m-3 overflow-hidden">
                <div className="flex items-start justify-between gap-4 flex-wrap relative">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0b2c6b]">
                      Highlights of DAK-Health
                    </h2>
                    <span className="inline-flex mt-2 rounded-full bg-[#22d4a5] text-[#0a3f51] text-sm font-semibold px-4 py-1.5">
                      Recommended for students & vocational trainees
                    </span>
                  </div>
                  <Image
                    src="/partners_assets/dak_logo.jpeg"
                    alt="DAK Health"
                    width={140}
                    height={40}
                    className="w-auto h-14 object-contain  px-2 py-1 z-10"
                  />
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-[1fr_0.48fr]">
                  <div className="space-y-3">
                    {highlights.map((item, index) => {
                      const Icon = [HeartPulse, FileCheck, ShieldCheck][index];
                      return (
                        <div
                          key={item.title}
                          className="rounded-2xl border border-[#dbe9ff] bg-white/90 px-4 py-4 flex gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(0,63,140,0.10)]"
                        >
                          <span className="h-10 w-10 rounded-xl bg-[#e9f4ff] border border-[#cae3ff] flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5 text-primary" />
                          </span>
                          <p className="text-[#1f3f74] text-base leading-relaxed">
                            <span className="font-semibold text-[#0b2c6b]">
                              {item.title}:
                            </span>{" "}
                            {item.body}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-[#87cdfb] bg-[#ddf5ff] p-5 text-[#1f3f74] text-base">
                      <ul className="space-y-3">
                        <li className="flex gap-3">
                          <FileCheck className="w-5 h-5 mt-1 shrink-0 text-primary" />
                          <span>
                            Become a DAK member, stay insured for the next three
                            years and collect 120 premiums with the deductible
                            guarantee tariff.
                          </span>
                        </li>
                        <li className="flex gap-3">
                          <ShieldCheck className="w-5 h-5 mt-1 shrink-0 text-primary" />
                          <span>
                            Read the most important information about the DAK
                            Guarantee Tariff 120 tariff model.
                          </span>
                        </li>
                      </ul>
                    </div>
                 
                  </div>
                </div>

                <div className="mt-7 pt-6 border-t border-[#d9e8ff] flex justify-end">
                  <Link
                    href="/statutory-health-insurance/book/pre-check?product=DAK"
                    className="inline-flex items-center gap-2 rounded-xl border border-[#4e8dff] text-[#0b2c6b] font-semibold px-5 py-3 hover:bg-[#edf4ff] transition"
                  >
                    Apply for Membership
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          </div>

          <aside className="xl:col-span-4 xl:sticky xl:top-24 self-start space-y-4">
            <div className="bg-white rounded-2xl border border-[#d9e8ff] shadow-[0_10px_28px_rgba(0,63,140,0.08)] p-6">
              <h3 className="text-2xl md:text-3xl leading-tight  text-[#0b2c6b]">
                What makes Pluro stand out
              </h3>
              <ul className="mt-4 space-y-2">
                {standOutPoints.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-[#1f3f74]/90 text-md leading-snug"
                  >
                    <Check className="w-5 h-5 mt-1 text-[#0000FF] shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className=" ">
              <p className="rounded-xl bg-[#eaf7ff] border border-[#cde8ff] p-4 text-sm text-[#2472ad] leading-relaxed">
                By clicking on &quot;Apply for membership&quot;, you agree to
                the forwarding of your application data to the respective health
                insurance company and confirm that you have read and understood
                their privacy policy. For questions regarding data protection at
                DAK, please contact datenschutz@dak.de. For questions regarding
                data protection at AOK, please contact datenschutz@by.aok.de.
              </p>
              <Link
                href="/statutory-health-insurance/book/pre-check?product=DAK"
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-primary text-white font-semibold px-5 py-3 hover:bg-primary-dark transition"
              >
                Book now
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-[#dff4ff] border-t border-[#c8e9ff]">
        <div className="max-w-7xl mx-auto px-5 md:px-6 py-14 md:py-16 grid gap-9 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#05457f] leading-tight">
              Contact Pluro and get everything you need for your move.
            </h2>
            <p className="mt-5 text-[#05518f] text-lg md:text-2xl leading-relaxed">
              We provide clear guidance for each visa step, from health
              insurance to blocked account setup, so you can focus on your
              studies.
            </p>
            <Link
              href="/learn-more"
              className="mt-8 inline-flex items-center rounded-2xl border-2 border-[#02569d] text-[#02569d] font-bold px-6 py-3 text-lg hover:bg-[#ebf7ff] transition"
            >
              GET IN TOUCH NOW
            </Link>
          </div>
          <div className="relative min-h-[250px] rounded-3xl overflow-hidden shadow-[0_12px_30px_rgba(0,86,157,0.14)]">
            <Image
              src="/images_assets/pluro.png"
              alt="Pluro support"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
