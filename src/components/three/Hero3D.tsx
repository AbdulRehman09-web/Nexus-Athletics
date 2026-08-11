'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { Html, OrbitControls, PerspectiveCamera, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Suspense, lazy } from 'react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const GymEnvironment = lazy(() => import('./GymEnvironment').then((m) => ({ default: m.GymEnvironment })));
const FloatingMetrics = lazy(() => import('./FloatingMetrics').then((m) => ({ default: m.FloatingMetrics })));
const ParticleSystem = lazy(() => import('./ParticleSystem').then((m) => ({ default: m.ParticleSystem })));

interface Hero3DProps {
  className?: string;
  scrollProgress?: number;
}

export function Hero3D({ className, scrollProgress = 0 }: Hero3DProps) {
  const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('high');

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const gl = canvas as HTMLCanvasElement;
      const ctx = gl.getContext('webgl2') || gl.getContext('webgl');
      if (ctx) {
        const debugInfo = ctx.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = ctx.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          if (renderer.includes('Intel') || renderer.includes('Mesa') || renderer.includes('SwiftShader')) {
            setQuality('low');
          } else if (renderer.includes('AMD') || renderer.includes('NVIDIA') || renderer.includes('Apple')) {
            setQuality('high');
          } else {
            setQuality('medium');
          }
        }
      }
    }
  }, []);

  return (
    <div className={cn('relative w-full h-full', className)} style={{ width: '100%', height: '100%' }}>
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 1.5, 5], fov: 45 }}
        gl={{ antialias: quality === 'high', alpha: true, preserveDrawingBuffer: false, powerPreference: 'high-performance', logarithmicDepthBuffer: true }}
        shadows={quality !== 'low'}
        performance={{ min: 0.5, max: 0.8 }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <ColorAttachments />
          <Environment
            preset="warehouse"
            background={false}
            ground={false}
          />
          <PerspectiveCamera makeDefault position={[0, 1.5, 5]} fov={45} />
          <GymEnvironment quality={quality} scrollProgress={scrollProgress} />
          {quality !== 'low' && <FloatingMetrics scrollProgress={scrollProgress} />}
          {quality === 'high' && <ParticleSystem scrollProgress={scrollProgress} />}
          <ContactShadows opacity={0.3} scale={10} blur={2} position={[0, -0.01, 0]} />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
          autoRotate={quality !== 'low'}
          autoRotateSpeed={0.2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}

function ColorAttachments() {
  const { gl } = useThree();
  useEffect(() => {
    gl.setClearColor(0x09090b, 0);
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.2;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  }, [gl]);
  return null;
}

function LoadingFallback() {
  return (
    <Html className="absolute inset-0 flex items-center justify-center z-10" style={{ pointerEvents: 'none' }}>
      <div className="flex flex-col items-center gap-4 text-nexus-400">
        <div className="relative w-20 h-20">
          <svg className="w-full h-full text-accent-gold animate-rotate-slow" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="180 100" strokeLinecap="round">
              <animate attributeName="strokeDashoffset" dur="2s" repeatCount="indefinite" from="0" to="280" />
            </circle>
          </svg>
        </div>
        <p className="text-body-sm font-medium">INITIALIZING PERFORMANCE SYSTEM</p>
        <div className="w-48 h-1 bg-surface-200 rounded-full overflow-hidden">
          <div className="h-full bg-accent-gold animate-shimmer rounded-full" style={{ width: '60%' }} />
        </div>
      </div>
    </Html>
  );
}
