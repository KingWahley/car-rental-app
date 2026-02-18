import Link from 'next/link';
import HeroCarModel from '../components/HeroCarModel';

export default function HomePage() {
  return (
    <main className="h-screen overflow-hidden bg-[#f4f4f6]">
      <header className="h-[76px] border-b border-[#e4e4e7] bg-[#f8f8fa] px-6 xl:px-10">
        <div className="mx-auto max-w-[1420px] h-full flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="text-3xl leading-none font-medium tracking-[-0.03em] text-[#22232c]">
              stdrive.
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-lg text-[#666873]">
              <Link href="/" className="text-[#2d2f39]">Home</Link>
              <a href="#" className="hover:text-[#2d2f39] transition">Pricing</a>
              <a href="#" className="hover:text-[#2d2f39] transition">Membership</a>
              <a href="#" className="hover:text-[#2d2f39] transition">FAQ</a>
            </nav>
          </div>

          <div className="hidden xl:flex items-center gap-3">
            <div className="h-12 w-[320px] rounded-xl border border-[#ececf0] bg-[#f1f1f4] px-4 flex items-center gap-3 text-[#9b9ca5]">
              <span className="text-base">Search</span>
              <span className="text-base">Search...</span>
            </div>
            <button className="h-12 px-6 rounded-xl bg-[#22232c] text-white text-base">Book your Ride</button>
            <Link href="/vehicles" className="h-12 px-6 rounded-xl border border-[#e2e2e8] bg-white text-[#2d2f39] text-base flex items-center">
              View cars
            </Link>
          </div>
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
                title="Where"
                value="City, Airport, address or hotel"
              />
              <FieldBlock
                title="Pick Up"
                value="01/18/2026    10:00 AM"
              />
              <FieldBlock
                title="Drop Off"
                value="02/10/2026    12:00 PM"
              />
              <button className="m-4 h-12 w-12 rounded-xl bg-[#242530]/90 text-white text-lg">Go</button>
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
      <p className="text-sm md:text-base leading-none text-[#6f7380] mt-3">{value}</p>
    </div>
  );
}
