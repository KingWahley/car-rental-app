'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import DashboardShell from '../../components/DashboardShell';
import VehicleCard from '../../components/VehicleCard';
import VehicleDetailsModal from '../../components/VehicleDetailsModal';
import { vehicles } from '../../data/vehicles';

const minDatasetPrice = Math.floor(Math.min(...vehicles.map((vehicle) => vehicle.price)));
const maxDatasetPrice = Math.ceil(Math.max(...vehicles.map((vehicle) => vehicle.price)));

function uniqueSorted(values) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

const cardGridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.34,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function VehiclesPage() {
  const router = useRouter();
  const [filtersCollapsed, setFiltersCollapsed] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const options = useMemo(
    () => ({
      priceBounds: { min: minDatasetPrice, max: maxDatasetPrice },
      brands: uniqueSorted(vehicles.map((vehicle) => vehicle.brand)),
      modelYears: uniqueSorted(vehicles.map((vehicle) => `${vehicle.model} ${vehicle.year}`)),
      bodyTypes: uniqueSorted(vehicles.map((vehicle) => vehicle.bodyType)),
      fuelTypes: uniqueSorted(vehicles.map((vehicle) => vehicle.fuelType)),
    }),
    []
  );

  const [filters, setFilters] = useState({
    rentalType: 'any',
    availableNowOnly: false,
    priceMin: options.priceBounds.min,
    priceMax: options.priceBounds.max,
    brands: [],
    modelYears: [],
    bodyTypes: [],
    transmission: 'any',
    fuelTypes: [],
  });

  function setFilterValue(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function toggleFilterArray(key, value) {
    setFilters((prev) => {
      const exists = prev[key].includes(value);
      return {
        ...prev,
        [key]: exists ? prev[key].filter((entry) => entry !== value) : [...prev[key], value],
      };
    });
  }

  function resetFilters() {
    setFilters({
      rentalType: 'any',
      availableNowOnly: false,
      priceMin: options.priceBounds.min,
      priceMax: options.priceBounds.max,
      brands: [],
      modelYears: [],
      bodyTypes: [],
      transmission: 'any',
      fuelTypes: [],
    });
  }

  const filteredVehicles = useMemo(
    () =>
      vehicles.filter((vehicle) => {
        if (filters.rentalType !== 'any' && vehicle.rentalType !== filters.rentalType) return false;
        if (filters.availableNowOnly && !vehicle.availableNow) return false;
        if (vehicle.price < filters.priceMin || vehicle.price > filters.priceMax) return false;
        if (filters.brands.length > 0 && !filters.brands.includes(vehicle.brand)) return false;
        if (filters.modelYears.length > 0 && !filters.modelYears.includes(`${vehicle.model} ${vehicle.year}`)) {
          return false;
        }
        if (filters.bodyTypes.length > 0 && !filters.bodyTypes.includes(vehicle.bodyType)) return false;
        if (filters.transmission !== 'any' && vehicle.transmission !== filters.transmission) return false;
        if (filters.fuelTypes.length > 0 && !filters.fuelTypes.includes(vehicle.fuelType)) return false;
        return true;
      }),
    [filters]
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('filters') === '1') {
      setMobileFiltersOpen(true);
    }
  }, []);

  function closeMobileFilters() {
    const params = new URLSearchParams(window.location.search);
    params.delete('filters');
    const nextQuery = params.toString();
    router.replace(nextQuery ? `/vehicles?${nextQuery}` : '/vehicles');
    setMobileFiltersOpen(false);
  }

  return (
    <>
      <DashboardShell
        sidebarProps={{
          filtersCollapsed,
          onToggleFiltersCollapsed: () => setFiltersCollapsed((value) => !value),
          filters,
          options,
          onChange: setFilterValue,
          onToggleArray: toggleFilterArray,
          onReset: resetFilters,
        }}
      >
        <h1 className="text-2xl font-semibold mb-6 text-[#121212]">{filteredVehicles.length} vehicles to rent</h1>

        {filteredVehicles.length === 0 ? (
          <div className="rounded-xl border border-[#e2e2e2] bg-white p-8 text-center text-[#666666]">
            No vehicles match the selected filters.
          </div>
        ) : (
          <motion.div
            variants={cardGridVariants}
            initial="hidden"
            animate="show"
            className={`grid gap-6 ${
              filtersCollapsed
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1800px)]:grid-cols-5'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 [@media(min-width:1800px)]:grid-cols-4'
            }`}
          >
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onSelect={setSelectedVehicle}
                variants={cardItemVariants}
              />
            ))}
          </motion.div>
        )}
      </DashboardShell>

      <MobileFiltersDrawer
        open={mobileFiltersOpen}
        filters={filters}
        options={options}
        onChange={setFilterValue}
        onToggleArray={toggleFilterArray}
        onReset={resetFilters}
        onClose={closeMobileFilters}
      />

      <AnimatePresence>
        {selectedVehicle ? (
          <VehicleDetailsModal
            key={selectedVehicle.id}
            vehicle={selectedVehicle}
            onClose={() => setSelectedVehicle(null)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

function MobileFiltersDrawer({ open, filters, options, onChange, onToggleArray, onReset, onClose }) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close filters"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="lg:hidden fixed inset-0 z-40 bg-black/40"
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 250, damping: 28 }}
            className="lg:hidden fixed inset-x-0 bottom-0 z-50 max-h-[80vh] rounded-t-2xl border-t border-[#d9d9de] bg-[#f3f3f6]"
          >
            <div className="flex items-center justify-between border-b border-[#dfdfe5] px-4 py-3">
              <h2 className="text-lg font-semibold text-[#111111]">Filter Vehicles</h2>
              <div className="flex items-center gap-3">
                <button type="button" onClick={onReset} className="text-sm text-[#70737f]">
                  Reset
                </button>
                <button type="button" onClick={onClose} className="rounded-md border border-[#d5d5dc] px-3 py-1 text-sm">
                  Done
                </button>
              </div>
            </div>

            <div className="space-y-6 overflow-y-auto p-4 pb-24">
              <section>
                <p className="mb-2 text-xs uppercase tracking-[0.08em] text-[#7d8091]">Rental Type</p>
                <div className="flex flex-wrap gap-2">
                  <FilterTag active={filters.rentalType === 'any'} onClick={() => onChange('rentalType', 'any')}>
                    Any
                  </FilterTag>
                  <FilterTag active={filters.rentalType === 'day'} onClick={() => onChange('rentalType', 'day')}>
                    Per day
                  </FilterTag>
                  <FilterTag active={filters.rentalType === 'hour'} onClick={() => onChange('rentalType', 'hour')}>
                    Per hour
                  </FilterTag>
                </div>
              </section>

              <section>
                <button
                  type="button"
                  onClick={() => onChange('availableNowOnly', !filters.availableNowOnly)}
                  className="w-full flex items-center justify-between"
                >
                  <p className="text-xs uppercase tracking-[0.08em] text-[#7d8091]">Available now only</p>
                  <div
                    className={`h-7 w-12 rounded-full px-1 flex items-center transition ${
                      filters.availableNowOnly ? 'bg-[#111111] justify-end' : 'bg-[#d8d9e0] justify-start'
                    }`}
                  >
                    <span className="h-5 w-5 rounded-full bg-white" />
                  </div>
                </button>
              </section>

              <section>
                <p className="mb-3 text-xs uppercase tracking-[0.08em] text-[#7d8091]">Price / hour</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="rounded-md border border-[#dfdfe5] bg-white px-3 py-2">${filters.priceMin.toFixed(2)}</div>
                  <div className="rounded-md border border-[#dfdfe5] bg-white px-3 py-2">${filters.priceMax.toFixed(2)}</div>
                </div>
                <div className="mt-3 space-y-2">
                  <input
                    type="range"
                    min={options.priceBounds.min}
                    max={options.priceBounds.max}
                    value={filters.priceMin}
                    onChange={(event) =>
                      onChange('priceMin', Math.min(Number(event.target.value), filters.priceMax - 1))
                    }
                    className="w-full accent-[#111111]"
                  />
                  <input
                    type="range"
                    min={options.priceBounds.min}
                    max={options.priceBounds.max}
                    value={filters.priceMax}
                    onChange={(event) =>
                      onChange('priceMax', Math.max(Number(event.target.value), filters.priceMin + 1))
                    }
                    className="w-full accent-[#111111]"
                  />
                </div>
              </section>

              <section>
                <p className="mb-2 text-xs uppercase tracking-[0.08em] text-[#7d8091]">Brand</p>
                <div className="grid grid-cols-2 gap-2">
                  {options.brands.map((brand) => (
                    <FilterCheck
                      key={brand}
                      label={brand}
                      checked={filters.brands.includes(brand)}
                      onClick={() => onToggleArray('brands', brand)}
                    />
                  ))}
                </div>
              </section>

              <section>
                <p className="mb-2 text-xs uppercase tracking-[0.08em] text-[#7d8091]">Body Type</p>
                <div className="grid grid-cols-2 gap-2">
                  {options.bodyTypes.map((type) => (
                    <FilterCheck
                      key={type}
                      label={type}
                      checked={filters.bodyTypes.includes(type)}
                      onClick={() => onToggleArray('bodyTypes', type)}
                    />
                  ))}
                </div>
              </section>

              <section>
                <p className="mb-2 text-xs uppercase tracking-[0.08em] text-[#7d8091]">Transmission</p>
                <div className="flex flex-wrap gap-2">
                  <FilterTag active={filters.transmission === 'any'} onClick={() => onChange('transmission', 'any')}>
                    Any
                  </FilterTag>
                  <FilterTag
                    active={filters.transmission === 'Automatic'}
                    onClick={() => onChange('transmission', 'Automatic')}
                  >
                    Automatic
                  </FilterTag>
                  <FilterTag active={filters.transmission === 'Manual'} onClick={() => onChange('transmission', 'Manual')}>
                    Manual
                  </FilterTag>
                </div>
              </section>

              <section>
                <p className="mb-2 text-xs uppercase tracking-[0.08em] text-[#7d8091]">Fuel Type</p>
                <div className="grid grid-cols-2 gap-2">
                  {options.fuelTypes.map((type) => (
                    <FilterCheck
                      key={type}
                      label={type}
                      checked={filters.fuelTypes.includes(type)}
                      onClick={() => onToggleArray('fuelTypes', type)}
                    />
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function FilterTag({ children, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-9 rounded-lg border px-4 text-sm ${
        active ? 'border-[#111111] bg-[#111111] text-white' : 'border-[#d7d8df] bg-white text-[#2d3040]'
      }`}
    >
      {children}
    </button>
  );
}

function FilterCheck({ label, checked, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-3 py-2 text-left text-sm ${
        checked ? 'border-[#111111] bg-[#111111] text-white' : 'border-[#d7d8df] bg-white text-[#2d3040]'
      }`}
    >
      {label}
    </button>
  );
}
