"use client";

import { motion, Variants } from "framer-motion";
import { AlertCircle, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

const MONTH_OPTIONS = Array.from({ length: 12 }, (_, i) => i + 1);
const DEFAULT_MONTHLY_AMOUNT = 992;
const BUFFER_FEE = 70;
const SETUP_FEE = 99;
const ADMIN_FEE = 6;

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.16,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function formatEur(value: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function BlockedAccountCalculatorSection() {
  const [monthlyAmount, setMonthlyAmount] = useState(DEFAULT_MONTHLY_AMOUNT);
  const [duration, setDuration] = useState(1);

  const requiredBlockingAmount = useMemo(
    () => monthlyAmount * duration,
    [monthlyAmount, duration]
  );

  const totalBlockedAmount = useMemo(
    () => requiredBlockingAmount + BUFFER_FEE + SETUP_FEE + ADMIN_FEE,
    [requiredBlockingAmount]
  );

  return (
    <section className="relative w-full py-18 md:py-24 overflow-hidden bg-[radial-gradient(circle_at_10%_20%,#1842ff_0%,#041a9a_38%,#020f70_100%)]">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-16 w-72 h-72 rounded-full bg-cyan-300/20 blur-3xl"
        animate={{ x: [0, 24, 0], y: [0, 14, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-[-60px] w-96 h-96 rounded-full bg-primary-light/30 blur-3xl"
        animate={{ x: [0, -18, 0], y: [0, -16, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:76px_76px]"
      />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-[0.95fr_1.05fr] gap-10 xl:gap-14 items-start">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="text-white pt-2 lg:pt-8"
        >
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-sm font-medium tracking-wide"
          >
            Blocked Account Estimator
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-5 text-4xl md:text-6xl font-extrabold leading-[1.05] max-w-xl"
          >
            Smart visa budgeting, designed with clarity
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-base md:text-lg leading-relaxed text-blue-50/95 max-w-xl"
          >
            A blocked account lets you withdraw a fixed amount each month.
            Based on common Germany visa guidance, students usually plan with at
            least EUR 992 per month. Use this calculator to estimate your
            required amount including setup-related fees.
          </motion.p>

          <motion.div
            variants={container}
            className="mt-7 grid sm:grid-cols-3 gap-3 max-w-xl"
          >
            {["Visa-compliant", "Transparent fees", "Fast setup"].map((item) => (
              <motion.div
                key={item}
                variants={fadeUp}
                className="rounded-xl border border-white/25 bg-white/10 backdrop-blur-sm px-3 py-2 text-sm font-medium"
              >
                {item}
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            variants={fadeUp}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="mt-10 bg-cyan-300 hover:bg-cyan-200 text-[#03215e] font-bold px-8 py-4 rounded-2xl shadow-[0_14px_28px_rgba(10,227,255,0.28)] transition"
          >
            Book now
          </motion.button>
        </motion.div>

        <div className="relative">
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[2rem] border border-white/25 bg-white/5 backdrop-blur-sm"
            animate={{ y: [0, 8, 0], opacity: [0.35, 0.5, 0.35] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.98, rotate: -1 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-[2rem] bg-white/95 backdrop-blur border border-white/60 p-5 md:p-8 shadow-[0_28px_80px_rgba(0,10,66,0.45)]"
          >
            <div className="flex items-center justify-between pb-5 border-b border-slate-200/80">
              <p className="text-slate-500 text-sm md:text-base font-medium">
                Live estimate
              </p>
              <span className="text-xs md:text-sm px-3 py-1 rounded-full bg-primary-light text-primary font-semibold">
                Real-time total
              </span>
            </div>

            <div className="mt-5 grid sm:grid-cols-[1fr_auto_1fr] gap-3 sm:gap-4 items-end">
              <label className="block">
                <span className="text-sm md:text-base font-semibold text-[#18326b] flex items-center gap-2">
                  Monthly amount
                  <AlertCircle size={16} className="text-cyan-500" />
                </span>
                <div className="mt-3">
                  <input
                    type="number"
                    min={0}
                    value={monthlyAmount}
                    onChange={(event) => {
                      const value = Number(event.target.value);
                      setMonthlyAmount(
                        Number.isFinite(value) && value >= 0 ? value : 0
                      );
                    }}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-2xl text-slate-800 font-semibold outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                  />
                </div>
              </label>

              <div className="pb-3 text-center">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 text-2xl text-slate-700 bg-slate-50">
                  x
                </span>
              </div>

              <label className="block relative">
                <span className="text-sm md:text-base font-semibold text-[#18326b] flex items-center gap-2">
                  Duration of stay
                  <AlertCircle size={16} className="text-cyan-500" />
                </span>
                <div className="mt-3 relative">
                  <select
                    value={duration}
                    onChange={(event) => setDuration(Number(event.target.value))}
                    className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-5 py-4 pr-12 text-xl text-slate-800 font-semibold outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                  >
                    {MONTH_OPTIONS.map((month) => (
                      <option key={month} value={month}>
                        {month} {month === 1 ? "month" : "months"}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={20}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                </div>
              </label>
            </div>

            <div className="mt-7 space-y-1 text-[#143067]">
              <div className="grid grid-cols-[1fr_auto_auto] gap-4 items-center py-4 border-b border-slate-200">
                <p className="text-lg md:text-[33px] leading-tight md:leading-normal">
                  Required blocking amount
                </p>
                <span className="text-3xl leading-none">=</span>
                <motion.span
                  key={`required-${requiredBlockingAmount}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl font-semibold tabular-nums"
                >
                  {formatEur(requiredBlockingAmount)}
                </motion.span>
              </div>

              <div className="grid grid-cols-[1fr_auto_auto] gap-4 items-center py-4 border-b border-slate-200">
                <p className="text-lg md:text-[33px] leading-tight md:leading-normal flex items-center gap-2">
                  Buffer for blocked account
                  <AlertCircle size={16} className="text-cyan-500" />
                </p>
                <span className="text-3xl leading-none">+</span>
                <span className="text-2xl font-semibold tabular-nums">
                  {formatEur(BUFFER_FEE)}
                </span>
              </div>

              <div className="grid grid-cols-[1fr_auto_auto] gap-4 items-center py-4 border-b border-slate-200">
                <p className="text-lg md:text-[33px] leading-tight md:leading-normal flex items-center gap-2">
                  Setup fee
                  <AlertCircle size={16} className="text-cyan-500" />
                </p>
                <span className="text-3xl leading-none">+</span>
                <span className="text-2xl font-semibold tabular-nums">
                  {formatEur(SETUP_FEE)}
                </span>
              </div>

              <div className="grid grid-cols-[1fr_auto_auto] gap-4 items-center py-4 border-b border-slate-200">
                <p className="text-lg md:text-[33px] leading-tight md:leading-normal flex items-center gap-2">
                  Administrative fees
                  <AlertCircle size={16} className="text-cyan-500" />
                </p>
                <span className="text-3xl leading-none">+</span>
                <span className="text-2xl font-semibold tabular-nums">
                  {formatEur(ADMIN_FEE)}
                </span>
              </div>
            </div>

            <motion.div
              layout
              className="mt-7 rounded-2xl bg-gradient-to-r from-cyan-50 via-white to-primary-light/40 border border-cyan-200/70 p-4 md:p-5 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 sm:gap-3 items-center"
            >
              <p className="text-2xl md:text-5xl font-medium text-cyan-600 leading-tight">
                Total blocked amount
              </p>
              <motion.p
                key={`total-${totalBlockedAmount}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-5xl font-extrabold text-cyan-600 tabular-nums text-left sm:text-right"
              >
                {formatEur(totalBlockedAmount)}
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
