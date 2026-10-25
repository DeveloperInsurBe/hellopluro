"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  FileCheck,
  Globe2,
  ShieldCheck,
  UserPlus,
  Wallet,
  Zap,
} from "lucide-react";

// 🔥 ANIMATIONS
const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const reasons = [
  {
    icon: ShieldCheck,
    title: "Transparent pricing",
    body: "Transparent pricing with no hidden fees - you see every cost upfront.",
  },
  {
    icon: Zap,
    title: "Fully digital",
    body: "Fast and fully digital onboarding, from application to confirmation.",
  },
  {
    icon: Globe2,
    title: "Trusted worldwide",
    body: "Trusted by international students from all over the world.",
  },
];

const steps = [
  { icon: UserPlus, title: "Create your account", body: "Create your account online in a few minutes." },
  { icon: BadgeCheck, title: "Verify your identity", body: "Verify your identity securely and digitally." },
  { icon: FileCheck, title: "Get your confirmation", body: "Transfer funds and receive your confirmation for the visa." },
];

export default function LearnMore() {
  return (
    <div className="w-full bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-light via-white to-white">
        <div className="relative max-w-7xl mx-auto px-5 md:px-6 py-14 md:py-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* TEXT */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-1.5 text-sm font-semibold text-primary shadow-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              About Pluro
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="mt-6 text-4xl md:text-6xl font-bold leading-tight text-[#0b2c6b]"
            >
              Learn More About <span className="text-primary">Pluro</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-gray-700 text-lg max-w-lg"
            >
              Pluro is your trusted partner for managing your visa requirements in
              Germany — from blocked accounts to health insurance, all in one
              place.
            </motion.p>

            <motion.p variants={fadeUp} className="mt-4 text-gray-600 max-w-lg">
              We simplify complex financial processes so you can focus on your
              studies and your future.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/blocked-account/application"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-7 py-4 font-semibold text-white shadow-[0_12px_28px_rgba(0,0,255,0.3)] transition hover:-translate-y-0.5 hover:bg-primary-dark"
              >
                Open blocked account <ArrowRight size={18} />
              </Link>
              <Link
                href="/our-packages"
                className="inline-flex items-center justify-center rounded-2xl border border-[#0b2c6b]/15 bg-white px-7 py-4 font-semibold text-[#0b2c6b] transition hover:border-primary hover:text-primary"
              >
                Explore our services
              </Link>
            </motion.div>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-primary/15 rounded-full blur-3xl" />
            <div className="relative h-[320px] md:h-[440px] rounded-[32px] overflow-hidden border-4 border-white shadow-[0_30px_60px_-20px_rgba(11,44,107,0.35)]">
              <Image
                src="/images_assets/student4.jpg"
                alt="International students in Germany"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHAT IS BLOCKED ACCOUNT */}
      <section className="max-w-7xl mx-auto px-5 md:px-6 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative order-2 lg:order-1"
        >
          <div className="relative h-[300px] md:h-[420px] rounded-[32px] overflow-hidden shadow-lg">
            <Image
              src="/images_assets/student1.jpg"
              alt="Student managing her blocked account"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 right-4 md:-right-5 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl border border-primary/10">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
              <Wallet size={18} />
            </span>
            <div>
              <p className="text-xs text-gray-500">Released to you</p>
              <p className="text-sm font-semibold text-gray-900">Every month</p>
            </div>
          </div>
        </motion.div>

        {/* TEXT */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="order-1 lg:order-2"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-[#0b2c6b]"
          >
            What is a Blocked Account?
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-6 text-gray-700 text-lg">
            A blocked account is a special bank account required for
            international students in Germany. It ensures that you have
            sufficient financial resources to cover your living expenses.
          </motion.p>

          <motion.ul variants={fadeUp} className="mt-6 space-y-3">
            {[
              "Required proof of funds for your student visa",
              "A fixed amount is released to you each month",
              "Helps you manage your finances responsibly during your stay",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-gray-700">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </section>

      {/* WHY CHOOSE PLURO */}
      <section className="bg-[#f5f7ff] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-[#0b2c6b]"
          >
            Why Choose Pluro?
          </motion.h2>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 mt-12"
          >
            {reasons.map(({ icon: Icon, title, body }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group bg-white p-7 rounded-2xl border border-transparent shadow-sm transition hover:border-primary/30 hover:shadow-[0_16px_36px_rgba(0,0,255,0.12)]"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary transition group-hover:bg-primary group-hover:text-white">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-[#0b2c6b]">{title}</h3>
                <p className="mt-2 text-gray-600">{body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-5 md:px-6 py-16 md:py-24">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-[#0b2c6b]"
        >
          How It Works
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative grid md:grid-cols-3 gap-10 md:gap-8 mt-14"
        >
          <div className="hidden md:block absolute top-8 left-[17%] right-[17%] border-t-2 border-dashed border-primary/25" />
          {steps.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="relative flex flex-col items-center text-center"
            >
              <span className="relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_10px_24px_rgba(0,0,255,0.3)]">
                <Icon size={26} />
              </span>
              <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">
                Step {i + 1}
              </span>
              <h3 className="mt-1 text-lg font-semibold text-[#0b2c6b]">{title}</h3>
              <p className="mt-2 max-w-xs text-gray-600">{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* LOOKING AHEAD / CTA */}
      <section className="max-w-7xl mx-auto px-5 md:px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0b2c6b] to-primary px-6 py-14 md:px-16 md:py-16 text-center text-white"
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-white/10 blur-2xl" />

          <h2 className="relative text-3xl md:text-4xl font-bold">Looking Ahead</h2>
          <p className="relative mx-auto mt-5 max-w-2xl text-white/85 text-lg">
            We are building a future where international students can manage every
            financial requirement in one place — simple, fast, and secure.
          </p>

          <div className="relative mt-9 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/blocked-account/application"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 font-semibold text-primary transition hover:-translate-y-0.5"
            >
              Get started today <ArrowRight size={18} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-2xl border border-white/40 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              About us
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
