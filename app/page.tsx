'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useRef } from 'react';

const SectionWrapper = ({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

// Floating card animation component
const FloatingCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

// Reveal text animation
const RevealText = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: "easeOut"
      }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      {/* Hero Section with Parallax */}
      <section 
        ref={heroRef}
        className="relative h-screen text-white flex items-center" 
        style={{
          backgroundImage: 'url("/images_assets/berlin.jpg")', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"
          style={{ opacity }}
        />
        
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <motion.div 
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
          style={{ scale }}
        >
          <motion.div 
            className="max-w-2xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-6xl md:text-7xl font-bold mb-6 leading-tight"
              variants={itemVariants}
            >
              Welcome to{" "}
              <motion.span
                className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: "200% 200%"
                }}
              >
                HelloPluro
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-blue-100"
              variants={itemVariants}
            >
              We will launch our digital finance for Germany in 2026.
            </motion.p>
            <motion.div
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/learn-more" 
                  className="inline-block bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition shadow-lg"
                >
                  Learn more
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <SectionWrapper className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <RevealText delay={0.2}>
              <motion.h2 
                className="text-4xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                A new chapter for your{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  finance
                </span>
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-600 mb-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                We firmly believe that digital finance needs stability, transparency, and reliability above all, without losing sight of the personal touch. That's why we're launching HelloPluro, the new digital finance for Germany – already trusted by more than 80 million customers worldwide.
              </motion.p>
              <motion.p 
                className="text-lg text-gray-600"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Our goal? To help people unlock the full potential of their money.
              </motion.p>
            </RevealText>
            
            <motion.div 
              className="h-96 rounded-lg overflow-hidden shadow-2xl relative group"
              initial={{ opacity: 0, x: 30, rotateY: -15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              style={{
                backgroundImage: 'url("/images_assets/hero1.jpg")', 
                backgroundSize: 'cover', 
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* Global Section */}
      <SectionWrapper className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="h-96 rounded-lg overflow-hidden shadow-2xl relative group"
              initial={{ opacity: 0, x: -30, rotateY: 15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              style={{
                backgroundImage: 'url("/images_assets/hero4.jpg")', 
                backgroundSize: 'cover', 
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
            
            <RevealText delay={0.2}>
              <motion.h2 
                className="text-4xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Global experience meets{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  local expertise
                </span>
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-600"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                HelloPluro's origins in Germany date back more than 100 years. As part of one of the world's largest finance companies, we now combine this experience from our Berlin location with a smart and user-friendly finance app specifically tailored to the needs of the German market.
              </motion.p>
            </RevealText>
          </div>
        </div>
      </SectionWrapper>

      {/* Services Section */}
      <SectionWrapper 
        className="py-20 px-4 sm:px-6 lg:px-8 relative" 
        style={{
          backgroundImage: 'url("/images_assets/berlin.jpg")', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <RevealText delay={0.2}>
              <motion.h2 
                className="text-4xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Discover what your{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  finance can do
                </span>
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-600 mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                We're setting new standards to make digital finance easier than ever. We start with an intuitive app experience and offer excellent support when it matters most – because we know finance is a very personal matter.
              </motion.p>
              <motion.p 
                className="text-lg text-gray-600"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                And in the long run? We'll be by your side with additional financial products to help you get closer to your goals, step by step.
              </motion.p>
            </RevealText>
            
            <motion.div 
              className="h-96 rounded-lg overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.8, rotateZ: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                rotateZ: 2,
                transition: { duration: 0.3 }
              }}
            >
              <img 
                src="/images_assets/pluro.png" 
                alt="App Interface" 
                className="w-full h-full object-cover" 
              />
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <motion.section 
        className="py-32 px-4 sm:px-6 lg:px-8 text-white rounded-3xl m-8 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-purple-900/80 rounded-3xl"></div>
        
        {/* Enhanced animated background elements */}
        <motion.div 
          className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-60 h-60 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold mb-6 border border-white/30"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(255,255,255,0.3)",
                  "0 0 40px rgba(255,255,255,0.5)",
                  "0 0 20px rgba(255,255,255,0.3)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              🚀 Coming Soon
            </motion.span>
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            The Future of Finance is Here
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/90 mb-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Join the digital revolution. Experience banking redefined.
          </motion.p>
          
          <motion.p 
            className="text-lg text-white/70 mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Be among the first to experience HelloPluro when we launch in 2026
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/learn-more" 
                className="inline-block px-8 py-4 bg-white text-blue-900 rounded-full font-bold text-lg hover:bg-blue-50 hover:shadow-2xl transition-all duration-300"
              >
                Get Early Access
              </Link>
            </motion.div>
            
            <motion.button 
              className="px-8 py-4 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <SectionWrapper className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <RevealText delay={0.1}>
              <h3 className="font-bold text-lg mb-4 text-black">Pursue</h3>
              <ul className="space-y-2 text-gray-600">
                <motion.li
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href="https://insurbe.com/imprint" target="_blank" rel="noopener noreferrer" className="hover:text-blue-900">
                    imprint
                  </Link>
                </motion.li>
              </ul>
            </RevealText>
            
            <RevealText delay={0.2}>
              <h3 className="font-bold text-lg mb-4 text-black">Legal</h3>
              <ul className="space-y-2 text-gray-600">
                <motion.li
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href="https://insurbe.com/termscondition" target="_blank" rel="noopener noreferrer" className="hover:text-blue-900">
                    Website Terms of Use
                  </Link>
                </motion.li>
                <motion.li
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href="https://insurbe.com/privacypolicy" target="_blank" rel="noopener noreferrer" className="hover:text-blue-900">
                    Cookie Policy and Privacy Policy
                  </Link>
                </motion.li>
              </ul>
            </RevealText>
          </div>
          
          <motion.div 
            className="border-t pt-8 text-center text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p>HelloPluro is operated by</p>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
}