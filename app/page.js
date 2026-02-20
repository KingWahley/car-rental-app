'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import HomeSections from "../components/HomeSections";

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
      when: "beforeChildren",
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const headerItemVariants = {
  hidden: { opacity: 0, y: -12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f4f4f6]">
      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate="show"
        className="h-[76px] border-b border-[#e4e4e7] bg-[#f8f8fa] px-6 xl:px-10"
      >
        <div className="mx-auto max-w-[1420px] h-full flex items-center justify-between">
          <motion.div variants={headerItemVariants}>
            <Link href="/" className="text-xl leading-none font-medium tracking-[-0.03em] text-[#22232c]">
              MOTO RENTALS.
            </Link>
          </motion.div>

          <motion.nav variants={headerItemVariants} className="hidden md:flex items-center gap-8 text-lg text-[#666873]">
            <a href="#" className="hover:text-[#2d2f39] transition">
              Membership
            </a>
            <a href="#" className="hover:text-[#2d2f39] transition">
              FAQ
            </a>
          </motion.nav>
        </div>
      </motion.header>

      <HeroSection />
      <HomeSections />
    </main>
  );
}
