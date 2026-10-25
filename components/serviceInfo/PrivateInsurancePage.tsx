"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, GraduationCap, HeartPulse, Languages, Microscope, UserCheck } from "lucide-react";
import ContactModal from "@/components/ContactModal";

const audience = [
  { icon: Languages, title: "Language course students", body: "Preparing for your studies with a language or preparatory course." },
  { icon: GraduationCap, title: "Students over 30", body: "Often no longer eligible for statutory student insurance." },
  { icon: Microscope, title: "PhD & researchers", body: "Doctoral candidates and guest researchers without employment contract." },
  { icon: UserCheck, title: "Exempted students", body: "Students who chose exemption from statutory insurance." },
];

const comparison = [
  { label: "Who can join", priv: "Anyone not eligible for, or exempt from, statutory insurance", stat: "Most enrolled students, trainees and employees" },
  { label: "Cost basis", priv: "Depends on plan, age and coverage", stat: "Fixed student rate or income-based" },
  { label: "Coverage", priv: "Choose the plan and extras you need", stat: "Standard legal benefits for everyone" },
  { label: "Accepted for visa & enrollment", priv: "Yes, with suitable plans", stat: "Yes" },
];

export default function PrivateInsurancePage() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="bg-[#f7f8fc]">
      {/* SPLIT HERO */}
      <section className="max-w-7xl mx-auto px-5 md:px-6 py-12 md:py-20 grid gap-10 lg:grid-cols-2 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
            <HeartPulse size={18} /> Private health insurance
          </span>
          <h1 className="mt-4 text-4xl md:text-[3.4rem] font-bold leading-[1.1] text-gray-900">
            Flexible cover when statutory isn&apos;t an option
          </h1>
          <p className="mt-5 text-lg text-gray-600 max-w-lg">
            Not everyone can join the statutory system. We compare private plans
            for international students and professionals and guide you through
            the application - in English.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => setOpenModal(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-4 font-semibold text-white transition hover:bg-primary cursor-pointer"
            >
              Find my plan <ArrowRight size={16} />
            </button>
            <Link
              href="/statutory-health-insurance"
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-4 font-semibold text-gray-800 transition hover:border-primary hover:text-primary"
            >
              Check statutory first
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="relative h-[340px] md:h-[460px] rounded-[32px] rounded-tl-[120px] overflow-hidden shadow-[0_30px_60px_-20px_rgba(11,27,51,0.35)]">
            <Image
              src="/images_assets/student10.jpg"
              alt="Student comparing insurance plans on her laptop"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[55%_center]"
            />
          </div>
          <div className="absolute -bottom-6 left-4 md:-left-6 bg-white rounded-2xl px-5 py-4 shadow-xl border border-gray-100">
            <p className="text-xs text-gray-500">Proof of insurance for</p>
            <p className="font-semibold text-gray-900">University &amp; residence permit</p>
          </div>
        </motion.div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Is private insurance right for you?</h2>
              <p className="mt-4 text-gray-600 text-lg">
                Private health insurance is typically the right choice if one of
                these describes your situation.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {audience.map(({ icon: Icon, title, body }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="flex gap-4 rounded-2xl bg-[#f7f8fc] p-5"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-sm">
                    <Icon size={20} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="max-w-5xl mx-auto px-5 md:px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">Private vs. statutory at a glance</h2>
        <div className="mt-10 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="hidden md:grid grid-cols-3 bg-gray-900 text-white text-sm font-semibold">
            <span className="p-5" />
            <span className="p-5 bg-primary">Private</span>
            <span className="p-5">Statutory</span>
          </div>
          {comparison.map((row) => (
            <div key={row.label} className="grid md:grid-cols-3 border-t border-gray-100 first:border-t-0 md:first:border-t">
              <span className="px-5 pt-5 md:p-5 font-semibold text-gray-900">{row.label}</span>
              <span className="px-5 pt-3 md:p-5 md:bg-primary-light/50 text-gray-700 flex gap-2">
                <span className="md:hidden text-xs font-semibold text-primary w-16 shrink-0 pt-0.5">Private</span>
                <span className="inline-flex gap-2"><Check size={16} className="mt-1 shrink-0 text-primary" />{row.priv}</span>
              </span>
              <span className="px-5 pt-2 pb-5 md:p-5 text-gray-600 flex gap-2">
                <span className="md:hidden text-xs font-semibold text-gray-500 w-16 shrink-0 pt-0.5">Statutory</span>
                {row.stat}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-gray-500">
          Your eligibility depends on your personal situation - our team will check it for you.
        </p>
      </section>

      {/* CTA WITH IMAGE */}
      <section className="max-w-7xl mx-auto px-5 md:px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gray-900 grid md:grid-cols-2">
          <div className="p-8 md:p-12 text-white">
            <h2 className="text-2xl md:text-3xl font-bold">Not sure which insurance fits you?</h2>
            <p className="mt-3 text-white/75">
              Tell us about your plans in Germany and we&apos;ll recommend the
              right private or statutory option - free of charge.
            </p>
            <button
              type="button"
              onClick={() => setOpenModal(true)}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-4 font-semibold text-gray-900 transition hover:bg-primary hover:text-white cursor-pointer"
            >
              Get free advice <ArrowRight size={16} />
            </button>
          </div>
          <div className="relative min-h-[220px]">
            <Image
              src="/images_assets/students5.jpg"
              alt="Students reading together in a library"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/20 to-transparent md:block hidden" />
          </div>
        </div>
      </section>

      <ContactModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}
