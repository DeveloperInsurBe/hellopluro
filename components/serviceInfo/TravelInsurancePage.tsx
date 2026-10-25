"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  Ambulance,
  ArrowRight,
  FileCheck,
  Hospital,
  Pill,
  Plane,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import ContactModal from "@/components/ContactModal";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const coverage = [
  { icon: Hospital, title: "Hospital & emergency care", body: "Treatment and hospital stays after an accident or sudden illness." },
  { icon: Stethoscope, title: "Doctor visits", body: "Consultations for acute illness or injury during your stay." },
  { icon: Pill, title: "Prescribed medication", body: "Medicine prescribed by a doctor for covered treatment." },
  { icon: Ambulance, title: "Medical repatriation", body: "Transport to your home country when medically necessary." },
];

const journey = [
  { step: "01", title: "Get your certificate", body: "Choose your start date and receive your insurance confirmation." },
  { step: "02", title: "Visa appointment", body: "Attach the certificate to your visa application at the embassy." },
  { step: "03", title: "Arrive in Germany", body: "You're covered from the day you land - no gaps." },
  { step: "04", title: "Switch when you enroll", body: "We help you move to statutory or private health insurance." },
];

export default function TravelInsurancePage() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="bg-white">
      {/* FULL-BLEED HERO */}
      <section className="relative min-h-[520px] md:min-h-[600px] flex items-end overflow-hidden">
        <Image
          src="/images_assets/travel2.jpg"
          alt="Group of young travellers laughing in the mountains"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[65%_45%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061533]/95 via-[#061533]/70 to-[#061533]/10" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="relative max-w-7xl mx-auto w-full px-5 md:px-6 pb-14 md:pb-20 pt-24"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur">
            <Plane size={14} /> Travel health insurance for visa
          </span>
          <h1 className="mt-5 max-w-2xl text-4xl md:text-6xl font-bold leading-tight text-white">
            Covered from the moment you land
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/80">
            Most German visa applications require proof of health insurance from
            your day of entry. Get an embassy-ready certificate in minutes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => setOpenModal(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-semibold text-white shadow-lg transition hover:bg-primary-dark cursor-pointer"
            >
              Get my certificate <ArrowRight size={16} />
            </button>
            <Link
              href="/our-packages"
              className="inline-flex items-center justify-center rounded-xl border border-white/40 px-6 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              Combine with blocked account
            </Link>
          </div>
        </motion.div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6 py-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm font-medium">
          {["Accepted for visa applications", "Cover from your first day", "Instant digital confirmation"].map((t) => (
            <span key={t} className="inline-flex items-center gap-2 justify-center sm:justify-start">
              <ShieldCheck size={18} className="text-white/80" /> {t}
            </span>
          ))}
        </div>
      </section>

      {/* COVERAGE GRID */}
      <section className="max-w-7xl mx-auto px-5 md:px-6 py-16 md:py-24">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">What&apos;s covered</h2>
          <p className="mt-3 text-gray-600 text-lg">
            Essential protection for the period between your arrival and the
            start of your long-term health insurance.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {coverage.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl border border-gray-200 p-6 transition hover:border-primary hover:shadow-[0_12px_30px_rgba(0,0,255,0.12)]"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary transition group-hover:bg-primary group-hover:text-white">
                <Icon size={22} />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-gray-800">{title}</h3>
              <p className="mt-2 text-gray-600">{body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* JOURNEY TIMELINE */}
      <section className="bg-[#f5f7ff] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
            Your journey, fully covered
          </h2>
          <div className="relative mt-12 grid gap-8 md:grid-cols-4">
            <div className="hidden md:block absolute top-7 left-[12%] right-[12%] border-t-2 border-dashed border-primary/30" />
            {journey.map((j, i) => (
              <motion.div
                key={j.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative flex md:flex-col items-start md:items-center gap-4 md:text-center"
              >
                <span className="relative z-10 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold shadow-[0_8px_20px_rgba(0,0,255,0.3)]">
                  {j.step}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{j.title}</h3>
                  <p className="mt-1 text-gray-600">{j.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-5 md:px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-2 overflow-hidden rounded-3xl border border-primary/20 bg-white shadow-[0_20px_60px_rgba(0,0,255,0.08)]">
          <div className="relative min-h-[260px] md:min-h-[340px]">
            <Image
              src="/images_assets/field-partner.jpg"
              alt="Student exploring her new city by bike"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-[50%_15%]"
            />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary">
              <FileCheck size={26} />
            </span>
            <h2 className="mt-5 text-2xl md:text-3xl font-bold text-gray-800">Visa appointment coming up?</h2>
            <p className="mt-2 text-gray-600">
              Our team will help you pick the right cover for your dates, so you
              can focus on exploring your new home.
            </p>
            <button
              type="button"
              onClick={() => setOpenModal(true)}
              className="mt-7 self-start inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-semibold text-white shadow-md transition hover:bg-primary-dark cursor-pointer"
            >
              Talk to our team <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <ContactModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}
