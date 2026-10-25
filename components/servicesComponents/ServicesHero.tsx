"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, BadgeCheck, CalendarClock, Clock, Landmark, ShieldCheck, Wallet } from "lucide-react";

// 🔥 ANIMATION VARIANTS
const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const trustPoints = [
  { icon: ShieldCheck, label: "Visa-compliant" },
  { icon: Clock, label: "Set up in 10 minutes" },
  { icon: BadgeCheck, label: "Transparent fees" },
];

export default function ServicesHero() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-primary-light via-white to-white">
      {/* BACKGROUND DOTS */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0,0,255,0.08) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 md:px-6 py-14 md:py-20 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
        {/* 🔥 LEFT CONTENT */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-1.5 text-sm font-semibold text-primary shadow-sm"
          >
            <Landmark size={15} />
            Fast • Fully Digital • Best Value
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-4xl md:text-6xl font-extrabold text-[#0b2c6b] leading-[1.05]"
          >
            Your Blocked Account <br />
            <span className="text-primary">for Germany</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-gray-600 text-base md:text-lg max-w-lg"
          >
            Open your blocked account quickly and manage everything online —
            secure, simple, and built for international students.
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/blocked-account/application"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 font-semibold text-white shadow-[0_12px_28px_rgba(0,0,255,0.3)] transition hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              Open Now <ArrowRight size={18} />
            </Link>
            <Link
              href="/our-packages"
              className="inline-flex items-center justify-center rounded-2xl border border-[#0b2c6b]/15 bg-white px-8 py-4 font-semibold text-[#0b2c6b] transition hover:border-primary hover:text-primary"
            >
              Add health insurance
            </Link>
          </motion.div>

          {/* TRUST POINTS */}
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {trustPoints.map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary shadow-sm">
                  <Icon size={16} />
                </span>
                {label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* 🔥 RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative mx-auto w-full max-w-[520px]"
        >
          {/* GLOW */}
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -top-8 -right-8 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
          />

          <div className="relative h-[380px] md:h-[500px] rounded-[32px] overflow-hidden border-4 border-white shadow-[0_30px_60px_-20px_rgba(11,44,107,0.35)]">
            <Image
              src="/images_assets/student7.jpg"
              alt="Student happily opening her blocked account online"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 520px"
              className="object-cover object-[68%_center]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b2c6b]/40 via-transparent to-transparent" />
          </div>

          {/* FLOATING CARD — ACCOUNT STATUS */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-6 -left-2 sm:-left-8 rounded-2xl bg-white/95 backdrop-blur px-4 py-3 shadow-[0_12px_28px_rgba(0,0,255,0.15)] border border-primary/10"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-600">
                <BadgeCheck size={18} />
              </span>
              <div>
                <p className="text-xs text-gray-500">Account status</p>
                <p className="text-sm font-semibold text-gray-900">Visa confirmation ready</p>
              </div>
            </div>
          </motion.div>

          {/* FLOATING CARD — MONTHLY PAYOUT */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-6 -right-2 sm:-right-8 w-[230px] rounded-2xl bg-[#0b2c6b] p-4 text-white shadow-[0_20px_40px_rgba(11,44,107,0.4)]"
          >
            <div className="flex items-center justify-between text-xs text-white/70">
              <span className="inline-flex items-center gap-1.5"><Wallet size={14} /> Blocked amount</span>
              <span>12 months</span>
            </div>
            <p className="mt-1 text-2xl font-bold">EUR 11,904</p>
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs">
              <CalendarClock size={14} className="text-[#9DBBFF]" />
              <span>EUR 992 paid out monthly</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
