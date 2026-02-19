'use client';

import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';

const overlayVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } },
};

const modalVariants = {
  hidden: { opacity: 0, y: 34, scale: 0.96, filter: 'blur(4px)' },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      when: 'beforeChildren',
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    y: 24,
    scale: 0.98,
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
  },
};

const modalItemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
  },
};

const chipGridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
};

export default function VehicleDetailsModal({ vehicle, onClose }) {
  useEffect(() => {
    function onEscape(event) {
      if (event.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', onEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!vehicle) return null;

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
    >
      <motion.button
        variants={overlayVariants}
        aria-label="Close vehicle details"
        onClick={onClose}
        className="absolute inset-0 bg-[#0b0b0b]/42 backdrop-blur-[6px]"
      />

      <motion.div
        variants={modalVariants}
        className="relative w-full max-w-6xl rounded-2xl border border-white/50 bg-white/30 backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.35)] overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.55),rgba(255,255,255,0.12)_48%,rgba(176,196,219,0.22))]" />
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr]">
          <motion.div
            variants={modalItemVariants}
            className="h-[320px] md:h-[430px] lg:h-[560px] bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.95),rgba(232,234,239,0.65)_58%,rgba(215,219,228,0.55)_100%)] border-b lg:border-b-0 lg:border-r border-white/35"
          >
            <VehicleModelScene modelPath={vehicle.model3d} fallbackImage={vehicle.image} vehicleName={vehicle.name} />
          </motion.div>

          <motion.div
            variants={modalItemVariants}
            className="relative p-5 bg-white md:p-7 lg:p-8 overflow-y-auto max-h-[560px]"
          >
            <motion.div variants={modalItemVariants} className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-[#687089]">Vehicle Details</p>
                <h2 className="text-2xl md:text-3xl leading-tight font-semibold text-[#14171f] mt-2 drop-shadow-sm">{vehicle.name}</h2>
                <p className="text-sm text-[#50596d] mt-2">{vehicle.subtitle}</p>
              </div>

              <button
                aria-label="Close"
                onClick={onClose}
                className="h-9 w-9 rounded-lg border border-white/55 bg-white/45 backdrop-blur-md text-[#202534] grid place-items-center"
              >
                <CloseIcon />
              </button>
            </motion.div>

            <motion.div
              variants={modalItemVariants}
              className="mt-6 rounded-xl border border-black/55 bg-white/40 backdrop-blur-md px-4 py-4 flex items-end justify-between"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.08em] text-[#717b92]">Price</p>
                <p className="text-2xl font-semibold text-[#161c27] mt-1">${vehicle.price.toFixed(2)}</p>
              </div>
              <p className="text-sm text-[#4f5b77]">/{vehicle.rentalType}</p>
            </motion.div>

            <motion.div variants={chipGridVariants} className="mt-5 grid grid-cols-2 gap-3">
              <DetailChip variants={modalItemVariants} label="Rating" value={`${vehicle.rating} (${vehicle.reviews} reviews)`} icon={<StarIcon />} />
              <DetailChip
                variants={modalItemVariants}
                label="Availability"
                value={vehicle.availableNow ? 'Available now' : 'Unavailable'}
                icon={<StatusIcon />}
              />
              <DetailChip variants={modalItemVariants} label="Brand" value={vehicle.brand} icon={<BadgeIcon />} />
              <DetailChip variants={modalItemVariants} label="Model" value={vehicle.model} icon={<CarIcon />} />
              <DetailChip variants={modalItemVariants} label="Year" value={String(vehicle.year)} icon={<CalendarIcon />} />
              <DetailChip variants={modalItemVariants} label="Body Type" value={vehicle.bodyType} icon={<BodyIcon />} />
              <DetailChip variants={modalItemVariants} label="Transmission" value={vehicle.transmission} icon={<GearIcon />} />
              <DetailChip variants={modalItemVariants} label="Fuel Type" value={vehicle.fuelType} icon={<FuelIcon />} />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function VehicleModelScene({ modelPath, fallbackImage, vehicleName }) {
  if (!modelPath) {
    return <img src={fallbackImage} alt={vehicleName} className="h-full w-full object-contain" />;
  }

  return (
    <Canvas
      camera={{ position: [5.8, 2.1, 5.8], fov: 35 }}
      dpr={[1, 1.6]}
      className="h-full w-full"
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, outputColorSpace: THREE.SRGBColorSpace }}
    >
      <ambientLight intensity={0.22} />
      <hemisphereLight args={['#ffffff', '#cfd6e1', 0.22]} />
      <directionalLight position={[8, 9, 4]} intensity={0.26} />
      <directionalLight position={[-7, 4, -3]} intensity={0.2} />
      <Environment preset="city" intensity={0.2} />

      <group position={[0, -0.5, 0]}>
        <RoadShadow />
        <Suspense fallback={null}>
          <AutoFitModel modelPath={modelPath} />
        </Suspense>
      </group>

      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={4.8}
        maxDistance={9.5}
        minPolarAngle={0.95}
        maxPolarAngle={1.58}
        target={[0, 0.1, 0]}
      />
    </Canvas>
  );
}

function AutoFitModel({ modelPath }) {
  const groupRef = useRef(null);
  const { scene } = useGLTF(modelPath);

  const normalizedScene = useMemo(() => {
    const root = scene.clone(true);

    root.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const targetSize = 5.8;
    const scale = targetSize / maxDim;
    root.scale.setScalar(scale);

    const scaledBox = new THREE.Box3().setFromObject(root);
    const center = scaledBox.getCenter(new THREE.Vector3());
    const minY = scaledBox.min.y;
    root.position.set(-center.x, -minY + 0.03, -center.z);

    return root;
  }, [scene]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.18 + 0.9;
  });

  return (
    <group ref={groupRef}>
      <primitive object={normalizedScene} />
    </group>
  );
}

function RoadShadow() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.07, 0]}>
      <circleGeometry args={[3.3, 56]} />
      <meshStandardMaterial color="#cfd3dc" transparent opacity={0.7} />
    </mesh>
  );
}

function DetailChip({ label, value, icon, variants }) {
  return (
    <motion.div variants={variants} className="relative rounded-lg border border-black bg-white/35 backdrop-blur-md px-3 py-2.5 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.48),rgba(255,255,255,0.03)_58%)]" />
      <div className="relative flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.07em] text-[#65708a]">{label}</p>
        <span className="text-[#4a5570]">{icon}</span>
      </div>
      <p className="relative text-sm text-[#1d2332] mt-1">{value}</p>
    </motion.div>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3.5l2.5 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8 6.9 19.5l1-5.8-4.2-4.1 5.8-.8L12 3.5z" />
    </svg>
  );
}

function StatusIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="7.5" />
      <path d="M8.7 12.2l2.1 2.2 4.4-4.5" />
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3.7l7 2.6v5.6c0 4.2-2.9 7.3-7 8.4-4.1-1.1-7-4.2-7-8.4V6.3L12 3.7z" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4.5 13l1.8-4.6h11.4L19.5 13" />
      <rect x="3.5" y="13" width="17" height="5.5" rx="1.4" />
      <circle cx="7.5" cy="18.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="18.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="5.5" width="16" height="14" rx="2" />
      <path d="M8 3.5v4M16 3.5v4M4 9.5h16" />
    </svg>
  );
}

function BodyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4.5 14.2h15" />
      <path d="M7.5 14.2V9.8c0-1.2 1-2.1 2.1-2.1h4.8c1.2 0 2.1 1 2.1 2.1v4.4" />
      <path d="M5.8 14.2v2.2M18.2 14.2v2.2" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 4.5v2.1M12 17.4v2.1M4.5 12h2.1M17.4 12h2.1M6.9 6.9l1.5 1.5M15.6 15.6l1.5 1.5M17.1 6.9l-1.5 1.5M8.4 15.6l-1.5 1.5" />
    </svg>
  );
}

function FuelIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6.5 6.5h7v11h-7z" />
      <path d="M17.5 9.2v7.3a2 2 0 01-2 2h-2" />
      <path d="M17.5 9.2l-1.7-1.7" />
    </svg>
  );
}
