"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, CheckCircle2, Smartphone } from "lucide-react";
import GetAppDrawer from "./GetAppDrawer";
import { NAVBAR_OFFSET } from "./Navbar";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroBannerHome() {
  const [showAppDrawer, setShowAppDrawer] = useState(false);

  return (
    <>
    {/*
      Mobile/tablet (< lg): stacked layout — text on a sky-blue gradient, then a
      dedicated cropped image of the student fading into it from the top.
      Desktop (lg+): full-bleed background image with text on the left.
    */}
    <section
      style={{ marginTop: -NAVBAR_OFFSET }}
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#0a4fbf] to-[#0980d8] lg:bg-none lg:min-h-[764px] lg:flex lg:items-center"
    >
      {/* DESKTOP BACKGROUND IMAGE */}
      <motion.div
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 hidden lg:block"
      >
        <Image
          src="/images_assets/plurohero.png"
          alt="Smiling student with books, ready for her studies in Germany"
          fill
          priority
          sizes="(min-width: 1024px) 100vw, 1px"
          className="object-cover object-center"
        />
      </motion.div>

      {/* DESKTOP OVERLAY — keep text readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a2a8f]/70 via-[#0a2a8f]/25 to-transparent hidden lg:block" />
      {/* Soft shadow behind the text, fading out towards the right */}
      <div className="absolute inset-0 hidden lg:block bg-[radial-gradient(ellipse_55%_65%_at_28%_52%,rgba(4,18,70,0.42)_0%,rgba(4,18,70,0.18)_45%,transparent_75%)]" />

      {/* CONTENT */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-6 pt-[124px] pb-4 sm:pt-[140px] lg:pt-[168px] lg:pb-24"
      >
        <div className="max-w-xl lg:max-w-2xl text-white">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-medium backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            For international students in Germany
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-5 sm:mt-6 text-[clamp(2.1rem,9.5vw,3rem)] sm:text-5xl lg:text-[4.2rem] font-medium leading-[1.08] tracking-[-0.01em] drop-shadow-[0_2px_14px_rgba(0,0,0,0.28)]"
          >
            Your German visa,
            <br />
            sorted in one place
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 sm:mt-6 text-[15px] sm:text-base md:text-lg leading-relaxed text-white/90 max-w-lg [text-shadow:0_1px_8px_rgba(0,0,0,0.25)]"
          >
            Blocked account and health insurance from one trusted source —
            fast, fully digital and officially accepted for your study in
            Germany.
          </motion.p>

          <motion.div variants={item} className="mt-7 sm:mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/blocked-account/application"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-primary shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(0,0,0,0.2)]"
            >
              Open blocked account <ArrowRight size={18} />
            </Link>
            <button
              type="button"
              onClick={() => setShowAppDrawer(true)}
              className="hidden md:inline-flex items-center justify-center gap-2 rounded-full border border-white/60 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 cursor-pointer"
            >
              <Smartphone size={18} /> Get the App
            </button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-6 sm:mt-8 flex flex-wrap gap-x-5 sm:gap-x-6 gap-y-2 text-[13px] sm:text-sm text-white/90"
          >
            {["Visa-compliant", "Set up in 10 minutes", "Transparent fees"].map((t) => (
              <span key={t} className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} className="text-white" />
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* MOBILE / TABLET IMAGE — dedicated crop, fades into the sky gradient above */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative -mt-10 sm:-mt-14 lg:hidden"
      >
        <div
          className="relative w-full aspect-[900/806] sm:aspect-auto sm:h-[clamp(420px,62vw,560px)]"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, #000 22%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 22%)",
          }}
        >
          <Image
            src="/images_assets/plurohero-mobile.jpg"
            alt="Smiling student with books, ready for her studies in Germany"
            fill
            priority
            sizes="(min-width: 1024px) 1px, 100vw"
            className="object-cover object-[50%_20%]"
          />
        </div>
      </motion.div>
    </section>

    <GetAppDrawer isOpen={showAppDrawer} onClose={() => setShowAppDrawer(false)} />
    </>
  );
}
