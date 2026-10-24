"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { X } from "lucide-react";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
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

// Icons from Font Awesome Free (CC BY 4.0) - https://fontawesome.com/license/free
function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 -420 384 456" fill="currentColor" aria-hidden="true">
      <path
        transform="scale(1,-1)"
        d="M318.7 179.3c0 -1.89941 -3.5 -61.2002 61.7002 -91.8994c-12.2002 -36.8008 -54 -118.601 -102.601 -119.301c-28.0996 0 -44.5996 17.9004 -76.3994 17.9004c-32.8008 0 -50.6006 -17.2998 -75.8008 -17.9004c-48.1992 -1.5 -94.3994 88.5 -107.199 125.2c-9.60059 27.9336 -14.4004 55 -14.4004 81.2002c0 88.7002 59.2998 132.3 115.1 133.2c27 0 61.4004 -19.7002 76.4004 -19.7002c14.2002 0 53 23.5 88.5 20.7002c37.5 -2.90039 65.9004 -17.7002 84.7002 -44.6006c-33.6006 -20.3994 -50.2002 -48.0996 -50 -84.7998zM262.1 343.5c-19.5996 -22.9004 -43.3994 -36.2998 -69.5 -34.2998c-2.19922 27.5996 8.10059 52.0996 25.6006 71.8994c15.8994 18.5 43.7998 33.5 67.8994 34.9004c0.800781 -10.5996 3.30078 -40.0996 -24 -72.5z"
      />
    </svg>
  );
}

function AndroidIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 -400 576 390" fill="currentColor" aria-hidden="true">
      <path
        transform="scale(1,-1)"
        d="M420.55 146.07c-13.248 0 -24 10.752 -24 24s10.752 24 24 24s24 -10.752 24 -24s-10.752 -24 -24 -24zM155.45 146.07c-13.248 0 -24 10.752 -24 24s10.752 24 24 24s24 -10.752 24 -24s-10.752 -24 -24 -24zM429.15 290.55l47.9395 83c0.936523 1.39551 1.69629 3.8916 1.69629 5.57227c0 5.51953 -4.47949 10 -10 10c-3.43066 0 -7.44727 -2.49609 -8.96582 -5.57227v0l-48.54 -84.0693c-32.4678 14.5615 -87.6973 26.3789 -123.28 26.3789s-90.8125 -11.8174 -123.28 -26.3789l-48.54 84.0693c-1.51855 3.07617 -5.53516 5.57227 -8.96582 5.57227c-5.52051 0 -10 -4.48047 -10 -10c0 -1.68066 0.759766 -4.17676 1.69629 -5.57227v0l47.9395 -83c-82.3193 -44.7695 -138.609 -128.1 -146.85 -226.55h576c-8.24023 98.4502 -64.54 181.78 -146.85 226.55z"
      />
    </svg>
  );
}

export default function AppDownloadSection() {
  const [showIosModal, setShowIosModal] = useState(false);

  useEffect(() => {
    if (!showIosModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowIosModal(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showIosModal]);

  return (
    <>
      {/* Desktop only - hidden on mobile & tablet */}
      <section className="hidden lg:block w-full bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-sm font-semibold tracking-wide uppercase text-primary bg-primary-light px-3 py-1 rounded-full"
            >
              Pluro App
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="mt-5 text-5xl font-bold text-gray-800 leading-tight"
            >
              All-in-One App for <br />
              <span className="text-primary">Your Move to Germany</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-gray-600 text-lg max-w-lg"
            >
              Blocked Account, Health Insurance, visa documents and much more -
              manage everything from your phone, anytime.
            </motion.p>

            {/* STORE BADGES */}
            <motion.div variants={fadeUp} className="mt-10 flex items-center gap-5">
              <motion.button
                type="button"
                onClick={() => setShowIosModal(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-3 bg-black text-white pl-4 pr-6 py-2.5 rounded-xl border border-gray-700 shadow-md cursor-pointer"
              >
                <AppleIcon className="w-7 h-7" />
                <span className="flex flex-col leading-tight text-left">
                  <span className="text-[11px]">Download on the</span>
                  <span className="text-xl font-semibold -mt-0.5">App Store</span>
                </span>
              </motion.button>

              <motion.a
                href="/pluro.apk"
                download="Pluro.apk"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-3 bg-black text-white pl-4 pr-6 py-2.5 rounded-xl border border-gray-700 shadow-md"
              >
                <AndroidIcon className="w-8 h-8 text-[#3DDC84]" />
                <span className="flex flex-col leading-tight text-left">
                  <span className="text-[11px] uppercase">Download for</span>
                  <span className="text-xl font-semibold -mt-0.5">Android</span>
                </span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center"
          >
            <div className="absolute -top-6 right-10 w-64 h-64 bg-primary/15 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-10 w-56 h-56 bg-primary-light rounded-full blur-3xl" />

            <div className="relative w-full max-w-[440px] h-[540px] rounded-[28px] overflow-hidden bg-primary shadow-[0_20px_60px_rgba(0,0,255,0.18)] border border-primary/20">
              <Image
                src="/images_assets/studenttab.jpg"
                alt="Student managing her German visa steps in the Pluro app"
                fill
                sizes="440px"
                className="object-cover object-[60%_center]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
            </div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-10 left-6 bg-white/95 backdrop-blur px-4 py-3 rounded-2xl border border-primary/20 shadow-[0_12px_28px_rgba(0,0,255,0.14)]"
            >
              <p className="text-xs text-gray-500">Now available</p>
              <p className="text-sm font-semibold text-gray-800">Pluro for Android</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* iOS COMING SOON POPUP */}
      <AnimatePresence>
        {showIosModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowIosModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="ios-coming-soon-title"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm bg-white rounded-3xl p-8 text-center shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setShowIosModal(false)}
                aria-label="Close"
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mx-auto w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center">
                <AppleIcon className="w-8 h-8" />
              </div>

              <h3
                id="ios-coming-soon-title"
                className="mt-5 text-2xl font-bold text-gray-800"
              >
                Coming Soon on iOS
              </h3>
              <p className="mt-3 text-gray-600">
                The Pluro app for iPhone is on its way. Meanwhile, download it
                for Android or continue on our website.
              </p>

              <button
                type="button"
                onClick={() => setShowIosModal(false)}
                className="mt-7 w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl shadow-md transition cursor-pointer"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
