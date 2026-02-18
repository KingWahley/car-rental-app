'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const defaultFilters = {
  rentalType: 'any',
  availableNowOnly: false,
  priceMin: 19,
  priceMax: 99,
  brands: [],
  modelYears: [],
  bodyTypes: [],
  transmission: 'any',
  fuelTypes: [],
};

const defaultOptions = {
  priceBounds: { min: 19, max: 99 },
  brands: [],
  modelYears: [],
  bodyTypes: [],
  fuelTypes: [],
};

export default function Sidebar({
  filtersCollapsed = false,
  onToggleFiltersCollapsed,
  filters,
  options,
  onChange,
  onToggleArray,
  onReset,
}) {
  const pathname = usePathname();
  const isVehiclesPage = pathname === '/vehicles';

  const [navCollapsed, setNavCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState({
    price: true,
    brand: false,
    modelYear: false,
    body: true,
    transmission: true,
    fuel: true,
  });

  const activeFilters = filters ?? defaultFilters;
  const activeOptions = options ?? defaultOptions;
  const handleChange = onChange ?? (() => {});
  const handleToggleArray = onToggleArray ?? (() => {});
  const handleReset = onReset ?? (() => {});
  const handleToggleFilters = onToggleFiltersCollapsed ?? (() => {});

  function toggleSection(sectionKey) {
    setOpenSections((prev) => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  }

  function setPriceMin(value) {
    const safeMin = Math.min(value, activeFilters.priceMax - 1);
    handleChange('priceMin', safeMin);
  }

  function setPriceMax(value) {
    const safeMax = Math.max(value, activeFilters.priceMin + 1);
    handleChange('priceMax', safeMax);
  }

  const topNavItems = [
    { label: 'Home', icon: 'home', href: '/' },
    { label: 'Vehicles', icon: 'car', href: '/vehicles' },
    { label: 'Notes', icon: 'notes', href: '/notes' },
    { label: 'Favourites', icon: 'heart', href: '/favourites' },
    { label: 'Recents', icon: 'clock', href: '/recents' },
    { label: 'Notifications', icon: 'bell', href: '/notifications' },
    { label: 'Chat', icon: 'chat', href: '/chat' },
  ];

  const bottomNavItems = [
    { label: 'License', icon: 'license', href: '/license' },
    { label: 'Support', icon: 'support', href: '/support' },
    { label: 'Logout', icon: 'logout', href: '/logout' },
  ];

  return (
    <aside className="hidden lg:flex h-screen sticky top-0 overflow-hidden bg-[#efefef] border-r border-[#dddddd]">
      <div
        className={`border-r border-[#dddddd] bg-[#f3f3f3] py-6 transition-all duration-300 ${
          navCollapsed ? 'w-[74px] px-2' : 'w-[186px] px-4'
        }`}
      >
        <div className="mb-7 flex items-center justify-between">
          {!navCollapsed ? <p className="text-xs uppercase tracking-[0.14em] text-[#999999]">Menu</p> : null}
          <button
            aria-label={navCollapsed ? 'Expand menu' : 'Collapse menu'}
            onClick={() => setNavCollapsed((value) => !value)}
            className="h-7 w-7 rounded-md border border-[#d8d8d8] bg-[#f6f6f6] grid place-items-center text-[#8d8d8d] hover:text-[#5f5f5f]"
          >
            <ArrowHorizontal direction={navCollapsed ? 'right' : 'left'} />
          </button>
        </div>

        <div className="flex h-[calc(100vh-96px)] flex-col justify-between">
          <div className="space-y-1.5">
            {topNavItems.map((item) => (
              <NavButton
                key={item.label}
                item={item}
                collapsed={navCollapsed}
                active={pathname === item.href}
              />
            ))}
          </div>

          <div className="space-y-1.5">
            {bottomNavItems.map((item) => (
              <NavButton
                key={item.label}
                item={item}
                collapsed={navCollapsed}
                active={pathname === item.href}
              />
            ))}
          </div>
        </div>
      </div>

      {isVehiclesPage ? (
        <div
          className={`bg-[#efefef] py-6 transition-all duration-300 overflow-hidden ${
            filtersCollapsed ? 'w-[80px] px-3' : 'w-[404px] px-6'
          }`}
        >
          <div className="mb-7 flex items-center justify-between">
            {filtersCollapsed ? null : (
              <>
                <h2 className="text-[32px] leading-none font-medium text-[#121212]">Filter by</h2>
                <button onClick={handleReset} className="text-sm text-[#ababab] hover:text-[#8f8f8f]">
                  Reset all
                </button>
              </>
            )}

            <button
              aria-label={filtersCollapsed ? 'Expand filters' : 'Collapse filters'}
              onClick={handleToggleFilters}
              className="h-7 w-7 rounded-md border border-[#d8d8d8] bg-[#f6f6f6] grid place-items-center text-[#8d8d8d] hover:text-[#5f5f5f]"
            >
              <ArrowHorizontal direction={filtersCollapsed ? 'right' : 'left'} />
            </button>
          </div>

          <div className="h-[calc(100vh-96px)] overflow-y-auto pr-1 themed-scrollbar">
            {filtersCollapsed ? (
              <div className="h-full flex items-start justify-center pt-8">
                <span className="-rotate-90 text-[11px] uppercase tracking-[0.2em] text-[#9a9a9a]">Filters</span>
              </div>
            ) : (
              <>
                <section className="pb-6 border-b border-[#e3e3e3]">
                  <p className="mb-3 text-[13px] uppercase tracking-[0.06em] text-[#8c8c8c]">Rental Type</p>
                  <div className="flex gap-2">
                    <Tag active={activeFilters.rentalType === 'any'} onClick={() => handleChange('rentalType', 'any')}>
                      Any
                    </Tag>
                    <Tag active={activeFilters.rentalType === 'day'} onClick={() => handleChange('rentalType', 'day')}>
                      Per day
                    </Tag>
                    <Tag
                      active={activeFilters.rentalType === 'hour'}
                      onClick={() => handleChange('rentalType', 'hour')}
                    >
                      Per hour
                    </Tag>
                  </div>
                </section>

                <section className="py-6 border-b border-[#e3e3e3]">
                  <button
                    onClick={() => handleChange('availableNowOnly', !activeFilters.availableNowOnly)}
                    className="w-full flex items-center justify-between"
                  >
                    <p className="text-[13px] uppercase tracking-[0.06em] text-[#8c8c8c]">Available now only</p>
                    <div
                      className={`w-12 h-7 rounded-full px-1 flex items-center transition ${
                        activeFilters.availableNowOnly ? 'bg-[#111111] justify-end' : 'bg-[#dedede] justify-start'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-[#f4f4f4] border border-[#d8d8d8]" />
                    </div>
                  </button>
                </section>

                <section className="py-6 border-b border-[#e3e3e3]">
                  <SectionHeader
                    title="Price Range / hour"
                    open={openSections.price}
                    onClick={() => toggleSection('price')}
                  />
                  {openSections.price ? (
                    <PriceBlock
                      priceMin={activeFilters.priceMin}
                      priceMax={activeFilters.priceMax}
                      bounds={activeOptions.priceBounds}
                      onMinChange={setPriceMin}
                      onMaxChange={setPriceMax}
                    />
                  ) : null}
                </section>

                <section className="py-5 border-b border-[#e3e3e3]">
                  <SectionHeader title="Car Brand" open={openSections.brand} onClick={() => toggleSection('brand')} />
                  {openSections.brand ? (
                    <div className="mt-4 max-h-36 overflow-auto pr-1 space-y-2 themed-scrollbar">
                      {activeOptions.brands.map((brand) => (
                        <CheckboxRow
                          key={brand}
                          label={brand}
                          checked={activeFilters.brands.includes(brand)}
                          onToggle={() => handleToggleArray('brands', brand)}
                        />
                      ))}
                    </div>
                  ) : null}
                </section>

                <section className="py-5 border-b border-[#e3e3e3]">
                  <SectionHeader
                    title="Car Model & Year"
                    open={openSections.modelYear}
                    onClick={() => toggleSection('modelYear')}
                  />
                  {openSections.modelYear ? (
                    <div className="mt-4 max-h-36 overflow-auto pr-1 space-y-2 themed-scrollbar">
                      {activeOptions.modelYears.map((modelYear) => (
                        <CheckboxRow
                          key={modelYear}
                          label={modelYear}
                          checked={activeFilters.modelYears.includes(modelYear)}
                          onToggle={() => handleToggleArray('modelYears', modelYear)}
                        />
                      ))}
                    </div>
                  ) : null}
                </section>

                <section className="py-6 border-b border-[#e3e3e3]">
                  <SectionHeader title="Body Type" open={openSections.body} onClick={() => toggleSection('body')} />
                  {openSections.body ? (
                    <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
                      {activeOptions.bodyTypes.map((type) => (
                        <CheckboxRow
                          key={type}
                          label={type}
                          checked={activeFilters.bodyTypes.includes(type)}
                          onToggle={() => handleToggleArray('bodyTypes', type)}
                        />
                      ))}
                    </div>
                  ) : null}
                </section>

                <section className="py-6 border-b border-[#e3e3e3]">
                  <SectionHeader
                    title="Transmission"
                    open={openSections.transmission}
                    onClick={() => toggleSection('transmission')}
                  />
                  {openSections.transmission ? (
                    <div className="mt-4 flex gap-2">
                      <Tag active={activeFilters.transmission === 'any'} onClick={() => handleChange('transmission', 'any')}>
                        Any
                      </Tag>
                      <Tag
                        active={activeFilters.transmission === 'Automatic'}
                        onClick={() => handleChange('transmission', 'Automatic')}
                      >
                        Automatic
                      </Tag>
                      <Tag
                        active={activeFilters.transmission === 'Manual'}
                        onClick={() => handleChange('transmission', 'Manual')}
                      >
                        Manual
                      </Tag>
                    </div>
                  ) : null}
                </section>

                <section className="py-6">
                  <SectionHeader title="Fuel Type" open={openSections.fuel} onClick={() => toggleSection('fuel')} />
                  {openSections.fuel ? (
                    <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
                      {activeOptions.fuelTypes.map((type) => (
                        <CheckboxRow
                          key={type}
                          label={type}
                          checked={activeFilters.fuelTypes.includes(type)}
                          onToggle={() => handleToggleArray('fuelTypes', type)}
                        />
                      ))}
                    </div>
                  ) : null}
                </section>
              </>
            )}
          </div>
        </div>
      ) : null}
    </aside>
  );
}

function NavButton({ item, collapsed, active }) {
  return (
    <Link
      href={item.href}
      className={`w-full h-11 rounded-md flex items-center transition ${
        collapsed ? 'justify-center px-0' : 'gap-3 px-2.5'
      } ${active ? 'bg-[#e9e9e9]' : 'hover:bg-[#ececec]'}`}
      title={item.label}
    >
      <span className="w-5 h-5 text-[#111111]">{renderIcon(item.icon)}</span>
      {!collapsed ? <span className="text-[16px] text-[#161616] font-normal">{item.label}</span> : null}
    </Link>
  );
}

function SectionHeader({ title, open, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between text-left">
      <p className="text-[13px] uppercase tracking-[0.06em] text-[#8c8c8c]">{title}</p>
      <Chevron direction={open ? 'up' : 'down'} />
    </button>
  );
}

function PriceBlock({ priceMin, priceMax, bounds, onMinChange, onMaxChange }) {
  return (
    <>
      <div className="mt-4 h-[82px] flex items-end gap-[2px]">
        {[
          10, 13, 15, 17, 21, 24, 27, 31, 35, 39, 42, 45, 48, 50, 53, 55, 54, 52, 49, 45, 42,
          39, 34, 30, 27, 24, 22, 20, 23, 28, 31, 37,
        ].map((height, index) => (
          <span key={index} className="w-1.5 bg-[#161616] rounded-sm" style={{ height: `${height}px` }} />
        ))}
      </div>

      <div className="mt-3 space-y-2">
        <input
          type="range"
          min={bounds.min}
          max={bounds.max}
          value={priceMin}
          onChange={(event) => onMinChange(Number(event.target.value))}
          className="w-full accent-[#111111]"
        />
        <input
          type="range"
          min={bounds.min}
          max={bounds.max}
          value={priceMax}
          onChange={(event) => onMaxChange(Number(event.target.value))}
          className="w-full accent-[#111111]"
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-[16px]">
        <div className="bg-[#f2f2f2] border border-[#e5e5e5] rounded-md px-3 py-2.5 flex items-center justify-between">
          <span className="text-[12px] uppercase tracking-[0.03em] text-[#8e8e8e]">From</span>
          <span className="font-medium text-[#111111]">${priceMin.toFixed(2)}</span>
        </div>
        <div className="bg-[#f2f2f2] border border-[#e5e5e5] rounded-md px-3 py-2.5 flex items-center justify-between">
          <span className="text-[12px] uppercase tracking-[0.03em] text-[#8e8e8e]">To</span>
          <span className="font-medium text-[#111111]">${priceMax.toFixed(2)}</span>
        </div>
      </div>
    </>
  );
}

function Tag({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`h-9 px-4 rounded-xl text-[15px] transition border ${
        active
          ? 'border-[#111111] bg-[#f4f4f4] text-[#111111]'
          : 'border-[#dddddd] bg-[#f4f4f4] text-[#303030]'
      }`}
    >
      {children}
    </button>
  );
}

function CheckboxRow({ label, checked, onToggle }) {
  return (
    <button onClick={onToggle} className="flex items-center gap-2.5 text-[15px] text-[#131313] text-left">
      <span
        className={`w-4 h-4 rounded-[4px] border ${
          checked ? 'bg-[#111111] border-[#111111]' : 'bg-[#efefef] border-[#cfcfcf]'
        } flex items-center justify-center`}
      >
        {checked ? <CheckMark /> : null}
      </span>
      <span>{label}</span>
    </button>
  );
}

function CheckMark() {
  return (
    <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none" stroke="white" strokeWidth="2">
      <path d="M2.2 6.4l2.2 2.2 5-5" />
    </svg>
  );
}

function Chevron({ direction }) {
  const transform = direction === 'up' ? 'rotate(180 8 8)' : undefined;

  return (
    <svg viewBox="0 0 16 16" className="w-4 h-4 text-[#bababa]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <g transform={transform}>
        <path d="M4 6l4 4 4-4" />
      </g>
    </svg>
  );
}

function ArrowHorizontal({ direction }) {
  return (
    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
      {direction === 'left' ? <path d="M10.5 3.5L6 8l4.5 4.5" /> : <path d="M5.5 3.5L10 8l-4.5 4.5" />}
    </svg>
  );
}

function renderIcon(type) {
  const cls = 'w-5 h-5';

  if (type === 'home') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
        <path d="M3 11.5L12 4l9 7.5" />
        <path d="M6.5 10.8V20h11V10.8" />
      </svg>
    );
  }

  if (type === 'car') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
        <path d="M4 13.5l2-5h12l2 5" />
        <rect x="3" y="13" width="18" height="5.5" rx="1.5" />
        <circle cx="7" cy="18.5" r="1" fill="currentColor" />
        <circle cx="17" cy="18.5" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (type === 'notes') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
        <rect x="5" y="3.5" width="14" height="17" rx="2" />
        <path d="M9 8.5h6M9 12h6M9 15.5h4" />
      </svg>
    );
  }

  if (type === 'heart') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
        <path d="M12 20.5s-7-4.2-7-10A4.5 4.5 0 019.5 6c1.2 0 2.3.5 2.5 1 .2-.5 1.3-1 2.5-1A4.5 4.5 0 0119 10.5c0 5.8-7 10-7 10z" />
      </svg>
    );
  }

  if (type === 'clock') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v5l3 2" />
      </svg>
    );
  }

  if (type === 'bell') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
        <path d="M6.5 16.5V11a5.5 5.5 0 1111 0v5.5l1.5 1.5H5l1.5-1.5z" />
        <path d="M10 19a2 2 0 004 0" />
      </svg>
    );
  }

  if (type === 'chat') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
        <path d="M5 6.5h14a2 2 0 012 2v6a2 2 0 01-2 2H11l-4 3v-3H5a2 2 0 01-2-2v-6a2 2 0 012-2z" />
      </svg>
    );
  }

  if (type === 'license') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
        <rect x="3.5" y="6.5" width="17" height="11" rx="1.5" />
        <circle cx="8" cy="12" r="1.2" />
        <path d="M11 10.5h6M11 13.5h6" />
      </svg>
    );
  }

  if (type === 'support') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="9" cy="11" r="1" fill="currentColor" />
        <circle cx="15" cy="11" r="1" fill="currentColor" />
        <path d="M8.5 15c1 .8 2.2 1.2 3.5 1.2s2.5-.4 3.5-1.2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
      <path d="M4 12h16" />
      <path d="M8 8l-4 4 4 4" />
      <path d="M20 5v14" />
    </svg>
  );
}
