"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Package } from "lucide-react";
import ContactModal from "@/components/ContactModal";

const plans = [
  {
    name: "Visa Essentials",
    tagline: "The documents you need for your visa appointment.",
    features: ["Blocked account", "Visa-ready confirmation", "Travel health insurance", "Email support"],
    featured: false,
  },
  {
    name: "Study Start",
    tagline: "Everything for your visa and university enrollment.",
    features: ["Everything in Visa Essentials", "Statutory or private health insurance", "Enrollment insurance certificate", "Priority support"],
    featured: true,
  },
  {
    name: "Complete Care",
    tagline: "Personal guidance from application to arrival.",
    features: ["Everything in Study Start", "Dedicated personal advisor", "Arrival checklist & guidance", "Help with follow-up documents"],
    featured: false,
  },
];

const steps = [
  { title: "Choose your package", body: "Pick the bundle that matches your study plans." },
  { title: "Apply once", body: "One application covers your blocked account and insurance." },
  { title: "Receive your documents", body: "Get all confirmations ready for your visa appointment." },
];

export default function PackagesPage() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="bg-white">
      {/* CENTERED HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#eef0ff] to-white">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-primary/10 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl mx-auto px-5 md:px-6 pt-16 md:pt-24 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white border border-primary/20 px-4 py-1.5 text-sm font-semibold text-primary shadow-sm">
            <Package size={15} /> Our packages
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight text-gray-900">
            One package. <span className="text-primary">Every visa document.</span>
          </h1>
          <p className="mt-5 text-lg text-gray-600">
            Blocked account and health insurance bundled together - one
            application, one point of contact, one clear overview.
          </p>
        </motion.div>

        {/* IMAGE STRIP */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative max-w-5xl mx-auto px-5 md:px-6 mt-12"
        >
          <div className="relative h-[220px] md:h-[380px] rounded-3xl overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,255,0.3)]">
            <Image
              src="/images_assets/students2.jpg"
              alt="Two international students walking on campus"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1000px"
              className="object-cover object-[center_35%]"
            />
          </div>
        </motion.div>
      </section>

      {/* PLANS */}
      <section className="max-w-7xl mx-auto px-5 md:px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">Pick the package that fits</h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-3 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative flex flex-col rounded-3xl p-8 transition hover:-translate-y-1 ${
                plan.featured
                  ? "bg-primary text-white shadow-[0_30px_60px_-20px_rgba(0,0,255,0.5)] lg:scale-[1.04]"
                  : "bg-white border border-gray-200 text-gray-900 hover:border-primary/40"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className={`mt-2 ${plan.featured ? "text-white/80" : "text-gray-600"}`}>{plan.tagline}</p>
              <div className={`my-6 h-px ${plan.featured ? "bg-white/20" : "bg-gray-200"}`} />
              <ul className="space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        plan.featured ? "bg-white text-primary" : "bg-primary-light text-primary"
                      }`}
                    >
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setOpenModal(true)}
                className={`mt-8 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold transition cursor-pointer ${
                  plan.featured
                    ? "bg-white text-primary hover:bg-gray-100"
                    : "bg-gray-900 text-white hover:bg-primary"
                }`}
              >
                Request this package <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#f5f7ff] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-6 grid gap-12 lg:grid-cols-2 items-center">
          <div className="relative h-[300px] md:h-[440px] rounded-3xl overflow-hidden order-2 lg:order-1">
            <Image
              src="/images_assets/students6.jpg"
              alt="Students discussing their documents"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How it works</h2>
            <div className="mt-8 space-y-6">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="flex gap-5"
                >
                  <span className="text-5xl font-bold text-primary/20 leading-none w-12 shrink-0">{i + 1}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{s.title}</h3>
                    <p className="mt-1 text-gray-600">{s.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setOpenModal(true)}
              className="mt-10 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-4 font-semibold text-white shadow-md transition hover:bg-primary-dark cursor-pointer"
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
