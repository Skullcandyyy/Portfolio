"use client";

import { useRef, useMemo, useCallback, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 120;
const CONNECTION_DIST = 2.5;

function Constellation({ isLight }: { isLight: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));

  const particleColor = isLight ? "#0891B2" : "#22D3EE";
  const lineColor = isLight ? "#9333EA" : "#A855F7";
  const particleOpacity = isLight ? 0.9 : 0.7;
  const lineOpacity = isLight ? 0.3 : 0.15;

  const handlePointerMove = useCallback((e: MouseEvent) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handlePointerMove);
    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, [handlePointerMove]);

  const range = 10;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * range;
      pos[i * 3 + 1] = (Math.random() - 0.5) * range;
      pos[i * 3 + 2] = (Math.random() - 0.5) * range * 0.4;
      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    return [pos, vel];
  }, []);

  const lineCount = PARTICLE_COUNT * 8;
  const linePositions = useMemo(() => new Float32Array(lineCount * 6), []);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      pos[i3] += velocities[i3] + mouse.current.x * 0.003;
      pos[i3 + 1] += velocities[i3 + 1] + mouse.current.y * 0.003;
      pos[i3 + 2] += velocities[i3 + 2];

      if (Math.abs(pos[i3]) > range / 2) velocities[i3] *= -1;
      if (Math.abs(pos[i3 + 1]) > range / 2) velocities[i3 + 1] *= -1;
      if (Math.abs(pos[i3 + 2]) > range / 2) velocities[i3 + 2] *= -1;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    const pairs: number[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < CONNECTION_DIST * CONNECTION_DIST) {
          pairs.push(i, j);
        }
      }
    }

    const lp = linesRef.current.geometry.attributes.position.array as Float32Array;
    const maxPairs = lp.length / 6;
    const drawCount = Math.min(pairs.length / 2, maxPairs);

    for (let k = 0; k < maxPairs; k++) {
      const idx = k * 6;
      if (k < drawCount) {
        const i1 = pairs[k * 2] * 3;
        const i2 = pairs[k * 2 + 1] * 3;
        lp[idx] = pos[i1]; lp[idx + 1] = pos[i1 + 1]; lp[idx + 2] = pos[i1 + 2];
        lp[idx + 3] = pos[i2]; lp[idx + 4] = pos[i2 + 1]; lp[idx + 5] = pos[i2 + 2];
      } else {
        lp[idx] = 0; lp[idx + 1] = 0; lp[idx + 2] = 0;
        lp[idx + 3] = 0; lp[idx + 4] = 0; lp[idx + 5] = 0;
      }
    }
    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.setDrawRange(0, drawCount * 2);
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color={particleColor}
          transparent
          opacity={particleOpacity}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={lineCount * 2}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={lineColor}
          transparent
          opacity={lineOpacity}
          depthWrite={false}
        />
      </lineSegments>
    </>
  );
}

export default function Scene3D() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsLight(document.documentElement.classList.contains("light"));
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Constellation isLight={isLight} />
      </Canvas>
    </div>
  );
}
