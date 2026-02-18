export default function VehicleCard({ vehicle }) {
  const distanceMeters = vehicle.distanceMeters ?? 120;
  const walkMinutes = vehicle.walkMinutes ?? 4;

  return (
    <article className="rounded-[10px] bg-[#f5f5f5] border border-[#ececec] px-[12px] pt-[10px] pb-[12px] transition-shadow hover:shadow-sm">
      <div className="flex items-center justify-between text-[10px] leading-none text-[#464646] mb-[10px]">
        <div className="flex items-center gap-[14px]">
          <span className="inline-flex items-center gap-[4px]">
            <WalkIcon />
            {distanceMeters}m ({walkMinutes} min)
          </span>
          <span className="inline-flex items-center gap-[4px]">
            <span className="text-[#f0c343] leading-none">★</span>
            {vehicle.rating} ({vehicle.reviews})
          </span>
        </div>

        <button aria-label="Add to favourites" className="text-[#1f1f1f] leading-none">
          <HeartIcon />
        </button>
      </div>

      <div className="h-[160px] rounded-[8px] bg-[#f2f2f2] grid place-items-center mb-[12px] overflow-hidden">
        <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-contain" />
      </div>

      <div className="flex items-end justify-between gap-3">
        <div>
          <h3 className="text-sm leading-none font-medium tracking-[-0.01em] text-[#121212] mb-[8px]">
            {vehicle.name}
          </h3>
          <p className="text-[10px] text-[#7f7f7f] leading-none">{vehicle.subtitle}</p>
        </div>

        <div className="whitespace-nowrap pb-[2px]">
          <span className="text-sm leading-none font-semibold text-[#121212]">
            ${vehicle.price.toFixed(2)}
          </span>
          <span className="text-xs text-[#8a8a8a]"> / hour</span>
        </div>
      </div>
    </article>
  );
}

function WalkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-[12px] h-[12px] text-[#666666]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="4.5" r="1.7" fill="currentColor" stroke="none" />
      <path d="M9.8 10.5l2-2.8 1.8 1.2 2.2 1" />
      <path d="M11.8 9.8l-2 3.8-2.8 2.8" />
      <path d="M13 12l1.2 3.8 2.8 2.2" />
      <path d="M8.4 20l2.4-3.4" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[16px] h-[16px]" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 20.5s-7-4.2-7-10A4.5 4.5 0 019.5 6c1.2 0 2.3.5 2.5 1 .2-.5 1.3-1 2.5-1A4.5 4.5 0 0119 10.5c0 5.8-7 10-7 10z" />
    </svg>
  );
}
{/* <div className=" grid lg:grid-cols-2 gap-8 items-end mt-auto pb-4">
            <div>
              <p className="text-base text-[#8a8c97] mb-4">We&apos;re chosen by the best</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[0.95] font-medium tracking-[-0.02em] text-[#252734]">
                Discover new
                <br />
                routes in <span className="text-[#9a9ca7]">comfort</span>
              </h1>
              <div className="mt-8 flex items-center gap-4">
                <button className="h-12 px-8 rounded-xl bg-[#23242d] text-white text-base">Book your Ride</button>
                <Link href="/vehicles" className="h-12 px-8 rounded-xl border border-[#dddde4] bg-white text-[#2d2f39] text-base flex items-center">
                  View cars
                </Link>
              </div>
            </div>

            <p className="text-lg md:text-xl leading-[1.35] text-[#555862] lg:text-right">
              Rent a reliable car and explore the world on your own terms.
              Enjoy the freedom to travel wherever you want, whenever you want,
              <span className="text-[#9a9ca7]"> in comfort and style.</span>
            </p>
          </div> */}