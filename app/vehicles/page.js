'use client';

import { useMemo, useState } from 'react';
import DashboardShell from '../../components/DashboardShell';
import VehicleCard from '../../components/VehicleCard';
import { vehicles } from '../../data/vehicles';

const minDatasetPrice = Math.floor(Math.min(...vehicles.map((vehicle) => vehicle.price)));
const maxDatasetPrice = Math.ceil(Math.max(...vehicles.map((vehicle) => vehicle.price)));

function uniqueSorted(values) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

export default function VehiclesPage() {
  const [filtersCollapsed, setFiltersCollapsed] = useState(false);

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

  return (
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
        <div
          className={`grid gap-6 ${
            filtersCollapsed
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1800px)]:grid-cols-5'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 [@media(min-width:1800px)]:grid-cols-4'
          }`}
        >
          {filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
