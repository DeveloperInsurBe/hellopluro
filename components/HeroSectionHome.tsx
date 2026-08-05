"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function HeroSectionHome() {
  return (
    <section className="w-full bg-white py-20 md:py-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.h1
            variants={item}
            className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight"
          >
            All You Need for <br /> Your German Visa
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 text-gray-600 text-lg max-w-lg"
          >
            Get your blocked account and health insurance from one trusted
            source. <span className="font-semibold text-primary">Pluro</span>{" "}
            simplifies your entire visa process - fast, secure, and officially
            approved for your study in Germany.
          </motion.p>

          <motion.button
            variants={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="mt-8 bg-primary hover:bg-primary-dark text-white px-6 py-4 rounded-xl shadow-md transition"
          >
            Health Insurance & Blocked Account
          </motion.button>
        </motion.div>

        <div className="relative h-[500px] md:h-[600px] flex items-center justify-center">
          <motion.div
            className="absolute top-8 right-2 w-60 h-60 bg-primary/15 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], x: [0, 10, 0], y: [0, -12, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-6 left-2 w-52 h-52 bg-primary-light rounded-full blur-3xl"
            animate={{ scale: [1, 1.15, 1], x: [0, -8, 0], y: [0, 10, 0] }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96, rotate: -2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: -2 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -6, rotate: -1, scale: 1.01 }}
            className="relative w-[82%] max-w-[420px] h-[360px] md:h-[440px] rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,255,0.18)] border border-primary/20 bg-white"
          >
            <motion.div
              className="absolute inset-0"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/images_assets/students1.jpg"
                alt="Student preparing German visa journey with Pluro"
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
                priority
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-white/20" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="absolute top-14 right-2 md:right-5"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white/95 backdrop-blur px-4 py-3 rounded-2xl border border-primary/20 shadow-[0_12px_28px_rgba(0,0,255,0.14)]"
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white">
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12.5L9.2 16.7L19 7"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <p className="text-xs md:text-sm font-semibold text-gray-800">
                  Blocked Account Ready
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="absolute bottom-10 left-0 md:left-3"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 5.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
              className="bg-primary text-white px-4 py-3 rounded-2xl shadow-[0_12px_28px_rgba(0,0,204,0.28)]"
            >
              <p className="text-[11px] md:text-xs uppercase tracking-wider text-white/80">
                Visa Fund Status
              </p>
              <p className="text-sm md:text-base font-bold">EUR 11,904 Secured</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
