'use client';

import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { animate, useMotionValue } from 'framer-motion';

const MODEL_PATH = '/models/free_porsche_911_carrera_4s.glb';

export default function HeroCarModel() {
  return (
    <Canvas
      camera={{ position: [6.8, 2.3, 6.8], fov: 36 }}
      dpr={[1, 1.5]}
      className="h-full w-full"
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, outputColorSpace: THREE.SRGBColorSpace }}
    >
      <color attach="background" args={['#f2f2f5']} />
      <ambientLight intensity={1.1} />
      <hemisphereLight args={['#ffffff', '#d5d9e2', 0.9]} />
      <directionalLight position={[8, 10, 5]} intensity={1.9} />
      <directionalLight position={[-8, 5, -4]} intensity={1.0} />
      <directionalLight position={[0, 4, 9]} intensity={0.55} />
      <Environment preset="city" intensity={0.85} />

      <group position={[0, -0.5, 0]}>
        <RoadShadow />
        <Suspense fallback={null}>
          <CarModel />
        </Suspense>
      </group>

      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={5.6}
        maxDistance={9.2}
        minPolarAngle={1.05}
        maxPolarAngle={1.55}
        target={[0, 0.1, 0]}
      />
    </Canvas>
  );
}

function CarModel() {
  const groupRef = useRef(null);
  const progress = useMotionValue(0);
  const { scene } = useGLTF(MODEL_PATH);
  const currentState = useRef({ y: -0.8, rotY: 0, scale: 0.86 });
  const initializedRef = useRef(false);

  const normalizedScene = useMemo(() => {
    const root = scene.clone(true);

    root.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach((material) => {
            if ('envMapIntensity' in material) material.envMapIntensity = 1.2;
            if ('metalness' in material) material.metalness = Math.min(material.metalness ?? 0.65, 0.7);
            if ('roughness' in material) material.roughness = Math.max(material.roughness ?? 0.25, 0.22);
          });
        }
      }
    });

    // Normalize model to a stable visual size and ground alignment.
    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const targetSize = 10;
    const scale = targetSize / maxDim;
    root.scale.setScalar(scale);

    const scaledBox = new THREE.Box3().setFromObject(root);
    const center = scaledBox.getCenter(new THREE.Vector3());
    const minY = scaledBox.min.y;
    root.position.set(-center.x, -minY + 0.04, -center.z);

    return root;
  }, [scene]);

  useEffect(() => {
    const controls = animate(progress, 1, {
      duration: 3.6,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => controls.stop();
  }, [progress]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const eased = progress.get();
    const finalAngle = 5.8;
    const initialAngle = finalAngle + Math.PI * 2.1;
    const targetY = THREE.MathUtils.lerp(-0.8, 0, eased);
    const targetRotY = THREE.MathUtils.lerp(initialAngle, finalAngle, eased);
    const targetScale = THREE.MathUtils.lerp(0.86, 1, eased);

    if (!initializedRef.current) {
      currentState.current.rotY = initialAngle;
      initializedRef.current = true;
    }

    currentState.current.y = THREE.MathUtils.damp(currentState.current.y, targetY, 8, delta);
    currentState.current.rotY = THREE.MathUtils.damp(currentState.current.rotY, targetRotY, 8, delta);
    currentState.current.scale = THREE.MathUtils.damp(currentState.current.scale, targetScale, 8, delta);

    groupRef.current.position.y = currentState.current.y;
    groupRef.current.rotation.y = currentState.current.rotY;
    groupRef.current.scale.setScalar(currentState.current.scale);
  });

  return (
    <group ref={groupRef} rotation={[0, 0.8, 0]}>
      <primitive object={normalizedScene} />
    </group>
  );
}

function RoadShadow() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.07, 0]}>
      <circleGeometry args={[3.8, 60]} />
      <meshStandardMaterial color="#d7d9de" transparent opacity={0.7} />
    </mesh>
  );
}

useGLTF.preload(MODEL_PATH);
