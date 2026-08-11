'use client';

import { useEffect, useRef, useMemo, createRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Text } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface FloatingMetricsProps {
  scrollProgress: number;
}

const metrics = [
  { value: '247', label: 'ACTIVE MEMBERS', unit: '+' },
  { value: '12', label: 'ELITE TRAINERS', unit: '' },
  { value: '18', label: 'PROGRAMS', unit: '' },
  { value: '94', label: 'SATISFACTION', unit: '%' },
];

const positions: [number, number, number][] = [
  [-3.5, 2.2, -1.5],
  [3.5, 2.2, -1.5],
  [-3.5, 1.2, -2.5],
  [3.5, 1.2, -2.5],
];

export function FloatingMetrics({ scrollProgress }: FloatingMetricsProps) {
  const groupRef = useRef<THREE.Group>(null);
  // `metrics` is a fixed-length module-level constant, so it's safe to
  // create these refs once, unconditionally (useRef cannot be called
  // inside useMemo — that breaks the Rules of Hooks).
  const metricRefs = useRef(metrics.map(() => createRef<THREE.Group>())).current;

  useEffect(() => {
    if (!groupRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    metricRefs.forEach((ref, i) => {
      if (ref.current) {
        tl.fromTo(ref.current.scale,
          { x: 0, y: 0, z: 0 },
          { x: 1, y: 1, z: 1, duration: 0.8, delay: i * 0.15 }, 0
        ).fromTo(ref.current.position,
          { y: ref.current.position.y + 1 },
          { y: ref.current.position.y, duration: 1, ease: 'elastic.out(1, 0.5)' }, '-=0.5');
      }
    });

    return () => {
      tl.kill();
    };
  }, [metricRefs]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scroll = scrollProgress;

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.05;
    }

    metricRefs.forEach((ref, i) => {
      if (ref.current) {
        ref.current.rotation.y = -scroll * Math.PI * 0.3;
        const html = ref.current.userData.html as HTMLElement;
        if (html) {
          html.style.transform = `translate(-50%, -50%) rotateY(${-scroll * 54}deg)`;
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      {metrics.map((metric, i) => (
        <group
          key={metric.label}
          ref={metricRefs[i]}
          position={positions[i]}
          onPointerOver={(e) => { e.stopPropagation(); }}
          onPointerOut={(e) => { e.stopPropagation(); }}
        >
          <Html
            wrapperClass="metric-card"
            prepend
            fullscreen={false}
            distanceFactor={10}
            zIndexRange={[100, 200]}
          >
            <div
              ref={(el) => {
                const group = metricRefs[i].current;
                if (group) group.userData.html = el;
              }}
              className="fixed pointer-events-none"
              style={{
                transform: 'translate(-50%, -50%)',
                width: '200px',
              }}
            >
              <div className="bg-nexus-950/95 backdrop-blur-xl border border-border rounded-2xl p-5 shadow-nexus-xl transform-gpu">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-display text-4xl font-bold text-accent-gold tabular-nums">{metric.value}</span>
                  <span className="font-display text-xl font-bold text-accent-gold/70">{metric.unit}</span>
                </div>
                <p className="text-micro text-nexus-500 tracking-widest uppercase">{metric.label}</p>
                <div className="mt-3 h-0.5 bg-gradient-to-r from-accent-gold/50 via-accent-gold to-transparent rounded-full" />
              </div>
            </div>
          </Html>
          <mesh
            geometry={new THREE.PlaneGeometry(1.8, 1.2)}
            material={new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })}
            position={[0, 0, 0.01]}
          />
        </group>
      ))}
    </group>
  );
}