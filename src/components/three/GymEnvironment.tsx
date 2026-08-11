'use client';

import { useRef, useEffect, useMemo, createRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface GymEnvironmentProps {
  quality: 'high' | 'medium' | 'low';
  scrollProgress: number;
}

export function GymEnvironment({ quality, scrollProgress }: GymEnvironmentProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Refs must be created unconditionally at the top level (Rules of Hooks) —
  // `useRef` cannot be called inside `useMemo`. We allocate the maximum
  // possible count once, then slice down based on `quality` below.
  const allDumbbellRefs = useRef(
    Array.from({ length: 8 }, () => createRef<THREE.Group>())
  ).current;
  const allBarbellRefs = useRef(
    Array.from({ length: 4 }, () => createRef<THREE.Group>())
  ).current;
  const allPlateRefs = useRef(
    Array.from({ length: 12 }, () => createRef<THREE.Mesh>())
  ).current;
  const rackRef = useRef<THREE.Group>(null);
  const benchRef = useRef<THREE.Mesh>(null);
  const cablesRef = useRef<THREE.Group>(null);
  const floorRef = useRef<THREE.Mesh>(null);

  const equipmentRefs = useMemo(() => ({
    dumbbells: allDumbbellRefs.slice(0, quality === 'high' ? 8 : 4),
    barbells: allBarbellRefs.slice(0, quality === 'high' ? 4 : 2),
    plates: allPlateRefs.slice(0, quality === 'high' ? 12 : 6),
    rack: rackRef,
    bench: benchRef,
    cables: cablesRef,
    floor: floorRef,
  }), [quality, allDumbbellRefs, allBarbellRefs, allPlateRefs]);

  useEffect(() => {
    if (!groupRef.current) return;

    const group = groupRef.current;
    const equipment = [
      ...equipmentRefs.dumbbells.map(r => r.current).filter(Boolean),
      ...equipmentRefs.barbells.map(r => r.current).filter(Boolean),
      ...equipmentRefs.plates.map(r => r.current).filter(Boolean),
      equipmentRefs.rack.current,
      equipmentRefs.bench.current,
      equipmentRefs.cables.current,
      equipmentRefs.floor.current,
    ].filter(Boolean) as THREE.Object3D[];

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    tl.fromTo(equipment.map(e => e.position), 
      { y: -5, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, stagger: 0.08 }
    ).fromTo(equipment.map(e => e.scale), 
      { x: 0.5, y: 0.5, z: 0.5 },
      { x: 1, y: 1, z: 1, duration: 1, stagger: 0.05 }, '-=1');

    return () => {
      tl.kill();
    };
  }, [equipmentRefs]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();
    const scroll = scrollProgress;

    groupRef.current.rotation.y = scroll * Math.PI * 0.3;

    equipmentRefs.dumbbells.forEach((ref, i) => {
      if (ref.current) {
        ref.current.position.y = Math.sin(time * 1.5 + i * 0.8) * 0.02;
        ref.current.rotation.y = time * 0.15;
      }
    });

    equipmentRefs.barbells.forEach((ref, i) => {
      if (ref.current) {
        ref.current.rotation.x = Math.sin(time * 0.8 + i) * 0.03;
      }
    });

    equipmentRefs.plates.forEach((ref, i) => {
      if (ref.current) {
        ref.current.rotation.z = time * 0.2 + i * 0.3;
        ref.current.position.y = Math.sin(time * 1.2 + i * 0.5) * 0.015;
      }
    });

    if (equipmentRefs.bench.current) {
      equipmentRefs.bench.current.position.y = Math.sin(time * 0.6) * 0.01;
    }
  });

  const dumbbellGeometry = useMemo(() => new THREE.CapsuleGeometry(0.03, 0.25, 8, 16), []);
  const dumbbellMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    metalness: 0.8,
    roughness: 0.2,
  }), []);

  const plateGeometry = useMemo(() => new THREE.CylinderGeometry(0.15, 0.15, 0.03, 16), []);
  const plateMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0x2d2d2d,
    metalness: 0.7,
    roughness: 0.3,
  }), []);

  const barGeometry = useMemo(() => new THREE.CylinderGeometry(0.025, 0.025, 1.8, 12), []);
  const barMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.9,
    roughness: 0.1,
  }), []);

  const benchGeometry = useMemo(() => new THREE.BoxGeometry(1.2, 0.08, 0.35), []);
  const benchMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0x0f0f0f,
    metalness: 0.1,
    roughness: 0.9,
  }), []);

  const floorGeometry = useMemo(() => new THREE.PlaneGeometry(20, 20), []);
  const floorMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0,
    roughness: 1,
  }), []);

  return (
    <group ref={groupRef}>
      <mesh ref={equipmentRefs.floor} geometry={floorGeometry} material={floorMaterial} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow />
      
      <group ref={equipmentRefs.rack} position={[-3, 0, -2]}>
        <mesh
          geometry={new THREE.BoxGeometry(0.08, 2.5, 0.08)}
          material={new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.7, roughness: 0.3 })}
          position={[-1, 1.25, -1]}
          castShadow receiveShadow
        />
        <mesh
          geometry={new THREE.BoxGeometry(0.08, 2.5, 0.08)}
          material={new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.7, roughness: 0.3 })}
          position={[1, 1.25, -1]}
          castShadow receiveShadow
        />
        <mesh
          geometry={new THREE.BoxGeometry(0.08, 2.5, 0.08)}
          material={new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.7, roughness: 0.3 })}
          position={[-1, 1.25, 1]}
          castShadow receiveShadow
        />
        <mesh
          geometry={new THREE.BoxGeometry(0.08, 2.5, 0.08)}
          material={new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.7, roughness: 0.3 })}
          position={[1, 1.25, 1]}
          castShadow receiveShadow
        />
        <mesh
          geometry={new THREE.BoxGeometry(2.16, 0.08, 2.16)}
          material={new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.7, roughness: 0.3 })}
          position={[0, 2.54, 0]}
          castShadow receiveShadow
        />
        <mesh
          geometry={new THREE.BoxGeometry(2.16, 0.08, 2.16)}
          material={new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.7, roughness: 0.3 })}
          position={[0, 1.2, 0]}
          castShadow receiveShadow
        />
      </group>

      <mesh ref={equipmentRefs.bench} geometry={benchGeometry} material={benchMaterial} position={[2, 0.04, 0]} castShadow receiveShadow />
      <mesh
        geometry={new THREE.BoxGeometry(0.4, 0.4, 0.35)}
        material={benchMaterial}
        position={[2, 0.48, -0.3]}
        castShadow receiveShadow
      />

      <group ref={equipmentRefs.cables} position={[0, 0, 3]}>
        <mesh
          geometry={new THREE.CylinderGeometry(0.15, 0.15, 2.2, 12)}
          material={new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.6, roughness: 0.4 })}
          position={[0, 1.1, 0]}
          castShadow receiveShadow
        />
        <mesh
          geometry={new THREE.BoxGeometry(0.6, 0.1, 0.6)}
          material={new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.6, roughness: 0.4 })}
          position={[0, 2.25, 0]}
          castShadow receiveShadow
        />
        <mesh
          geometry={new THREE.CylinderGeometry(0.02, 0.02, 1.5, 8)}
          material={new THREE.MeshStandardMaterial({ color: 0x4a4a4a, metalness: 0.3, roughness: 0.7 })}
          position={[0.2, 1.5, 0.2]}
          castShadow
        />
        <mesh
          geometry={new THREE.SphereGeometry(0.08, 8, 8)}
          material={new THREE.MeshStandardMaterial({ color: 0x2d2d2d, metalness: 0.7, roughness: 0.3 })}
          position={[0.2, 0.4, 0.2]}
          castShadow
        />
      </group>

      {equipmentRefs.dumbbells.map((ref, i) => (
        <group key={`dumbbell-${i}`} ref={ref} position={[-2 + (i % 4) * 0.35, 0.13, -1 + Math.floor(i / 4) * 0.4]} castShadow>
          <mesh geometry={dumbbellGeometry} material={dumbbellMaterial} />
          <mesh
            geometry={new THREE.SphereGeometry(0.06, 12, 12)}
            material={new THREE.MeshStandardMaterial({ color: 0x2d2d2d, metalness: 0.7, roughness: 0.3 })}
            position={[-0.14, 0, 0]}
          />
          <mesh
            geometry={new THREE.SphereGeometry(0.06, 12, 12)}
            material={new THREE.MeshStandardMaterial({ color: 0x2d2d2d, metalness: 0.7, roughness: 0.3 })}
            position={[0.14, 0, 0]}
          />
        </group>
      ))}

      {equipmentRefs.barbells.map((ref, i) => (
        <group key={`barbell-${i}`} ref={ref} position={[3, 0.1, -1.5 + i * 0.8]} rotation={[0, Math.PI / 2, 0]} castShadow>
          <mesh geometry={barGeometry} material={barMaterial} />
          <mesh
            geometry={new THREE.CylinderGeometry(0.06, 0.06, 0.15, 12)}
            material={new THREE.MeshStandardMaterial({ color: 0x2d2d2d, metalness: 0.8, roughness: 0.2 })}
            position={[-0.825, 0, 0]}
          />
          <mesh
            geometry={new THREE.CylinderGeometry(0.06, 0.06, 0.15, 12)}
            material={new THREE.MeshStandardMaterial({ color: 0x2d2d2d, metalness: 0.8, roughness: 0.2 })}
            position={[0.825, 0, 0]}
          />
        </group>
      ))}

      {equipmentRefs.plates.map((ref, i) => (
        <mesh
          key={`plate-${i}`}
          ref={ref}
          geometry={plateGeometry}
          material={plateMaterial}
          position={[
            3 + Math.sin(i * 0.8) * 0.3,
            0.15 + Math.floor(i / 4) * 0.06,
            -1.5 + Math.cos(i * 0.8) * 0.3 + Math.floor(i / 4) * 0.1
          ]}
          castShadow
          receiveShadow
        />
      ))}

      <AmbientLight intensity={0.6} color="#ffffff" />
      <DirectionalLight
        position={[5, 10, 5]}
        intensity={2}
        color="#fff8f0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.001}
      />
      <DirectionalLight
        position={[-5, 8, -5]}
        intensity={1}
        color="#fff0e0"
        castShadow
      />
      <PointLight
        position={[0, 3, 0]}
        intensity={1.5}
        color="#ffd700"
        distance={10}
        decay={2}
      />
      <PointLight
        position={[3, 2, -2]}
        intensity={1}
        color="#ff8c42"
        distance={8}
        decay={2}
      />
      <PointLight
        position={[-3, 2, 2]}
        intensity={0.8}
        color="#428cff"
        distance={8}
        decay={2}
      />
    </group>
  );
}

function AmbientLight({ intensity, color }: { intensity: number; color: string }) {
  const ref = useRef<THREE.AmbientLight>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.intensity = intensity;
      ref.current.color.set(color);
    }
  }, [intensity, color]);
  return <ambientLight ref={ref} />;
}

function DirectionalLight({
  position,
  intensity,
  color,
  castShadow,
  ...shadowProps
}: {
  position: [number, number, number];
  intensity: number;
  color: string;
  castShadow: boolean;
  [key: string]: unknown;
}) {
  const ref = useRef<THREE.DirectionalLight>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.intensity = intensity;
      ref.current.color.set(color);
      ref.current.position.set(...position);
      ref.current.castShadow = castShadow;
    }
  }, [position, intensity, color, castShadow]);
  return <directionalLight ref={ref} {...shadowProps} />;
}

function PointLight({
  position,
  intensity,
  color,
  distance,
  decay,
}: {
  position: [number, number, number];
  intensity: number;
  color: string;
  distance: number;
  decay: number;
}) {
  const ref = useRef<THREE.PointLight>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.intensity = intensity;
      ref.current.color.set(color);
      ref.current.position.set(...position);
      ref.current.distance = distance;
      ref.current.decay = decay;
    }
  }, [position, intensity, color, distance, decay]);
  return <pointLight ref={ref} />;
}