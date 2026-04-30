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

export default function LearnMore() {
  return (
    <div className="w-full bg-white">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* TEXT */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl font-bold text-[#0b2c6b]"
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

          <motion.p variants={fadeUp} className="mt-4 text-gray-600">
            We simplify complex financial processes so you can focus on your
            studies and your future.
          </motion.p>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden shadow-xl"
        >
          <Image
            src="/images_assets/student4.jpg"
            alt="students"
            width={800}
            height={500}
            priority
            className="w-full h-auto object-cover rounded-3xl"
          />
        </motion.div>
      </section>

      {/* WHAT IS BLOCKED ACCOUNT */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden shadow-lg"
        >
          <Image
            src="/images_assets/student1.jpg"
            alt="blocked account"
            width={800}
            height={420}
            className="w-full h-auto object-cover"
            style={{ height: "auto" }} // ✅ FIX
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
            What is a Blocked Account?
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-6 text-gray-700">
            A blocked account is a special bank account required for
            international students in Germany. It ensures that you have
            sufficient financial resources to cover your living expenses.
          </motion.p>

          <motion.p variants={fadeUp} className="mt-4 text-gray-600">
            Each month, a fixed amount is released to you, helping you manage
            your finances responsibly during your stay.
          </motion.p>
        </motion.div>
      </section>

      {/* WHY CHOOSE PLURO */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          className="text-3xl md:text-4xl font-bold text-center text-[#0b2c6b]"
        >
          Why Choose Pluro?
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          className="grid md:grid-cols-3 gap-8 mt-12"
        >
          {[
            "Transparent pricing with no hidden fees",
            "Fast and fully digital onboarding",
            "Trusted by students worldwide",
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="bg-white p-6 rounded-2xl shadow-md"
            >
              <p className="text-gray-700">{item}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-6 py-16 bg-[#e0f5eb] rounded-3xl">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          className="text-3xl md:text-4xl font-bold text-[#0b2c6b]"
        >
          How It Works
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          className="grid md:grid-cols-3 gap-8 mt-10"
        >
          {[
            "Create your account online",
            "Verify your identity securely",
            "Transfer funds and receive confirmation",
          ].map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-white p-6 rounded-2xl shadow-sm"
            >
              <h3 className="font-bold text-[#0b2c6b] mb-2">Step {i + 1}</h3>
              <p className="text-gray-600">{step}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FUTURE */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          className="text-3xl md:text-4xl font-bold text-[#0b2c6b]"
        >
          Looking Ahead
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          className="mt-6 text-gray-600"
        >
          We are building a future where international students can manage every
          financial requirement in one place — simple, fast, and secure.
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="mt-10 inline-block bg-white px-8 py-4 rounded-2xl shadow-md"
        >
          <span className="text-primary font-semibold text-lg">
            Launching in 2026 🚀
          </span>
        </motion.div>
      </section>
    </div>
  );
}
