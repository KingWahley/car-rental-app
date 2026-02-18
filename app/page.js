import Link from "next/link";
import HeroCarModel from "../components/HeroCarModel";

export default function HomePage() {
  return (
    <main className="h-screen overflow-hidden bg-[#f4f4f6] ">
      <header className="h-[76px] border-b border-[#e4e4e7] bg-[#f8f8fa] px-6 xl:px-10">
        <div className="mx-auto max-w-[1420px] h-full flex items-center justify-between">
          {/* Left — Logo */}
          <Link
            href="/"
            className="text-xl leading-none font-medium tracking-[-0.03em] text-[#22232c]"
          >
            MOTO RENTALS.
          </Link>

          {/* Center — Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-lg text-[#666873]">
            <a href="#" className="hover:text-[#2d2f39] transition">
              Membership
            </a>
            <a href="#" className="hover:text-[#2d2f39] transition">
              FAQ
            </a>
          </nav>

         
        </div>
      </header>

      <section className="pt-0 h-[calc(100vh-76px)] overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="relative isolate h-full w-full overflow-visible">
            <div className="relative z-10 w-full h-full">
              <HeroCarModel />
            </div>

            <div className="relative z-30 -mt-[150px] md:-mt-36 mx-auto w-[95%] xl:w-[72%] rounded-2xl border border-white/55 bg-white/35 backdrop-blur-xl shadow-[0_12px_40px_rgba(17,17,17,0.14)] grid grid-cols-1 md:grid-cols-[2fr_1.6fr_1.6fr_auto]">
              <FieldBlock
                title="Pick-up Location"
                value="Los Angeles Airport (LAX)"
              />
              <FieldBlock
                title="Pick-up Date"
                value="Mar 15, 2026    10:00 AM"
              />
              <FieldBlock
                title="Return Date"
                value="Mar 20, 2026    12:00 PM"
              />
              <button className="m-4 h-12 px-5 rounded-xl bg-[#242530]/90 text-white text-sm whitespace-nowrap">
                Find Cars
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function FieldBlock({ title, value }) {
  return (
    <div className="px-6 py-4 border-b md:border-b-0 md:border-r border-white/45">
      <p className="text-lg leading-none text-[#252734]">{title}</p>
      <p className="text-sm md:text-base leading-none text-[#6f7380] mt-3">
        {value}
      </p>
    </div>
  );
}
