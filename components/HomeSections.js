'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import VehicleCard from "./VehicleCard";
import { vehicles } from "../data/vehicles";

const sectionVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardGridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.06,
    },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stats = [
  { label: "Vehicles Ready", value: "150+" },
  { label: "Avg Pickup Time", value: "7 min" },
  { label: "Cities Covered", value: "42" },
  { label: "Happy Members", value: "18K+" },
];

const highlights = [
  { title: "No paperwork lines", body: "Verify once, unlock and drive from the app." },
  { title: "Transparent pricing", body: "No hidden fees and clear per-hour rates." },
  { title: "24/7 support", body: "Roadside and live chat anytime you need help." },
];

export default function HomeSections() {
  const featuredVehicles = vehicles.slice(0, 6);

  return (
    <div className="px-6 xl:px-10 pb-16 md:pb-20">
      <div className="mx-auto max-w-[1420px] space-y-14 md:space-y-16">
        <motion.section variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <div className="rounded-2xl border border-[#e2e3e8] bg-[#fafafc] p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white border border-[#ececf1] p-4 md:p-5">
                <p className="text-xs uppercase tracking-[0.08em] text-[#717586]">{stat.label}</p>
                <p className="mt-3 text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-[#1f2230]">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.08em] text-[#6f7380]">Featured Fleet</p>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-[#1e202c] mt-2">
                Popular choices this week
              </h2>
            </div>
            <Link href="/vehicles" className="text-sm text-[#252734] hover:text-[#111111] transition">
              Explore all vehicles
            </Link>
          </div>

          <motion.div
            variants={cardGridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
          >
            {featuredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} variants={cardItemVariants} />
            ))}
          </motion.div>
        </motion.section>

        <motion.section variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <div className="rounded-2xl border border-[#e3e4ea] bg-gradient-to-br from-white to-[#f3f4f8] p-6 md:p-8">
            <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8">
              <div>
                <p className="text-sm uppercase tracking-[0.08em] text-[#6f7380]">Why MOTO RENTALS</p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-[#1e202c] mt-2">
                  Designed for fast city mobility
                </h2>
                <p className="mt-4 text-[#5f6474] max-w-[56ch]">
                  Find nearby premium cars, unlock with your phone, and return anywhere in your allowed zone.
                </p>
                <Link
                  href="/support"
                  className="inline-flex mt-6 h-11 items-center rounded-xl bg-[#242530] px-5 text-sm text-white hover:bg-[#181922] transition"
                >
                  Read how it works
                </Link>
              </div>

              <div className="grid gap-4">
                {highlights.map((item) => (
                  <div key={item.title} className="rounded-xl border border-[#e8e8ee] bg-white p-4">
                    <h3 className="text-base font-medium text-[#232632]">{item.title}</h3>
                    <p className="text-sm text-[#666b79] mt-2">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
