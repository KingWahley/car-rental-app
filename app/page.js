'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import HeroCarModel from "../components/HeroCarModel";

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

const searchPanelVariants = {
  hidden: { opacity: 0, y: 34, scale: 0.98, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.56,
      ease: [0.16, 1, 0.3, 1],
      when: "beforeChildren",
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
};

const searchItemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HomePage() {
  return (
    <main className="h-screen overflow-hidden bg-[#f4f4f6] ">
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

      <section className="pt-0 h-[calc(100vh-76px)] overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="relative isolate h-full w-full overflow-visible">
            <div className="relative z-10 w-full h-full">
              <HeroCarModel />
            </div>

            <motion.div
              variants={searchPanelVariants}
              initial="hidden"
              animate="show"
              className="relative z-30 -mt-[150px] md:-mt-36 mx-auto w-[95%] xl:w-[72%] rounded-2xl border border-white/55 bg-white/35 backdrop-blur-xl shadow-[0_12px_40px_rgba(17,17,17,0.14)] grid grid-cols-1 md:grid-cols-[2fr_1.6fr_1.6fr_auto]"
            >
              <FieldBlock
                variants={searchItemVariants}
                title="Pick-up Location"
                value="Los Angeles Airport (LAX)"
              />
              <FieldBlock variants={searchItemVariants} title="Pick-up Date" value="Mar 15, 2026    10:00 AM" />
              <FieldBlock variants={searchItemVariants} title="Return Date" value="Mar 20, 2026    12:00 PM" />
              <motion.button
                variants={searchItemVariants}
                className="m-4 h-12 px-5 rounded-xl bg-[#242530]/90 text-white text-sm whitespace-nowrap"
              >
                Find Cars
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

function FieldBlock({ title, value, variants }) {
  return (
    <motion.div variants={variants} className="px-6 py-4 border-b md:border-b-0 md:border-r border-white/45">
      <p className="text-lg leading-none text-[#252734]">{title}</p>
      <p className="text-sm md:text-base leading-none text-[#6f7380] mt-3">{value}</p>
    </motion.div>
  );
}
