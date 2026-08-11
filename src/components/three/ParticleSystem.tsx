'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface ParticleSystemProps {
  scrollProgress: number;
}

export function ParticleSystem({ scrollProgress }: ParticleSystemProps) {
  const { size } = useThree();
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = useMemo(() => {
    const baseCount = 3000;
    return Math.floor(baseCount * (size.width / 1920) * (size.height / 1080));
  }, [size.width, size.height]);

  const { geometry, material } = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);
    const lifetimes = new Float32Array(particleCount);
    const maxLifetimes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 5 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) + 1;
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const colorChoice = Math.random();
      if (colorChoice < 0.4) {
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 0.85;
        colors[i * 3 + 2] = 0.3;
      } else if (colorChoice < 0.7) {
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 0.55;
        colors[i * 3 + 2] = 0.2;
      } else {
        colors[i * 3] = 0.3;
        colors[i * 3 + 1] = 0.55;
        colors[i * 3 + 2] = 1;
      }

      sizes[i] = 0.5 + Math.random() * 1.5;
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02 + 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
      lifetimes[i] = Math.random() * 100;
      maxLifetimes[i] = 50 + Math.random() * 100;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    geometry.setAttribute('lifetime', new THREE.BufferAttribute(lifetimes, 1));
    geometry.setAttribute('maxLifetime', new THREE.BufferAttribute(maxLifetimes, 1));

    const material = new THREE.PointsMaterial({
      size: 1,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    return { geometry, material };
  }, [particleCount]);

  useEffect(() => {
    const tl = gsap.fromTo(
      material,
      { opacity: 0 },
      { opacity: 0.6, duration: 2, ease: 'power2.out' }
    );

    return () => {
      tl.kill();
    };
  }, [material]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;

    const time = state.clock.getElapsedTime();
    const scroll = scrollProgress;

    const positions = geometry.getAttribute('position') as THREE.BufferAttribute;
    const velocities = geometry.getAttribute('velocity') as THREE.BufferAttribute;
    const lifetimes = geometry.getAttribute('lifetime') as THREE.BufferAttribute;
    const maxLifetimes = geometry.getAttribute('maxLifetime') as THREE.BufferAttribute;
    const sizes = geometry.getAttribute('size') as THREE.BufferAttribute;

    const count = positions.count;

    for (let i = 0; i < count; i++) {
      lifetimes.array[i] += delta * 60;

      if (lifetimes.array[i] > maxLifetimes.array[i]) {
        lifetimes.array[i] = 0;
        const radius = 5 + Math.random() * 8;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions.array[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions.array[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) + 1;
        positions.array[i * 3 + 2] = radius * Math.cos(phi);

        velocities.array[i * 3] = (Math.random() - 0.5) * 0.02;
        velocities.array[i * 3 + 1] = (Math.random() - 0.5) * 0.02 + 0.01;
        velocities.array[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
      } else {
        positions.array[i * 3] += velocities.array[i * 3] + Math.sin(time + i) * 0.001;
        positions.array[i * 3 + 1] += velocities.array[i * 3 + 1] + Math.cos(time * 0.7 + i) * 0.001;
        positions.array[i * 3 + 2] += velocities.array[i * 3 + 2] + Math.sin(time * 0.5 + i) * 0.001;

        const lifeRatio = lifetimes.array[i] / maxLifetimes.array[i];
        sizes.array[i] = (0.5 + Math.random() * 1.5) * (1 - lifeRatio * 0.5);
      }
    }

    positions.needsUpdate = true;
    lifetimes.needsUpdate = true;
    sizes.needsUpdate = true;

    particlesRef.current.rotation.y += delta * 0.02 * (1 - scroll * 0.5);
    particlesRef.current.rotation.x = Math.sin(time * 0.3) * 0.05;

    material.opacity = 0.6 * (1 - scroll * 0.3);
  });

  return <points ref={particlesRef} geometry={geometry} material={material} />;
}
