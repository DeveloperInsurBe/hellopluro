"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

// 🔥 ANIMATIONS
const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 },
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

export default function About() {
  return (
    <div className="bg-white">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl font-bold text-[#0b2c6b] leading-tight"
          >
            About <span className="text-teal-600">Pluro</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-gray-700 text-lg max-w-lg"
          >
            Pluro is built to simplify one of the most stressful parts of studying
            abroad — your visa process. From blocked accounts to health insurance,
            we bring everything together in one seamless platform.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-gray-600 max-w-lg"
          >
            Our goal is to remove complexity, reduce delays, and give students a
            clear, reliable path to starting their journey in Germany with confidence.
          </motion.p>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative h-[300px] md:h-[450px] rounded-3xl overflow-hidden shadow-xl"
        >
          <Image
            src="/images_assets/students4.jpg"
            alt="about"
            fill
            className="object-cover"
          />
        </motion.div>
      </section>

      {/* VALUES */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-[#0b2c6b] mb-12 text-center"
        >
          Our Core Values
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Trust & Stability",
              desc: "We build reliable systems that ensure your funds and documents are always secure.",
            },
            {
              title: "Transparency",
              desc: "Clear pricing, honest communication, and no hidden surprises — ever.",
            },
            {
              title: "User First",
              desc: "Everything we build is designed around the real needs of students.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-[#0b2c6b]">
                {item.title}
              </h3>
              <p className="mt-3 text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* IMAGE + TEXT */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative h-[300px] md:h-[450px] rounded-3xl overflow-hidden shadow-xl"
        >
          <Image
            src="/images_assets/students.jpg"
            alt="team"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* TEXT */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-[#0b2c6b]"
          >
            Global Vision, Local Expertise
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-gray-700 leading-relaxed"
          >
            We combine global financial experience with deep knowledge of German
            regulations. This allows us to deliver solutions that are both reliable
            and perfectly aligned with visa requirements.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-gray-600"
          >
            Our platform is continuously evolving to provide faster processes,
            better support, and a smoother experience for every student.
          </motion.p>
        </motion.div>
      </section>

      {/* TIMELINE */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-[#0b2c6b] mb-6"
        >
          Our Journey
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl mx-auto"
        >
          Pluro is building a next-generation platform to support international
          students moving to Germany — combining speed, clarity, and trust in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-10 bg-white rounded-2xl p-6 shadow-md inline-block"
        >
          <span className="text-lg font-semibold text-teal-600">
            Launching in 2026 🚀
          </span>
        </motion.div>
      </section>

    </div>
  );
}