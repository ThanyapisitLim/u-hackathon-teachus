"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Ingredient({
  color,
  phase,
  radius = 1.55,
}: {
  color: string;
  phase: number;
  radius?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * 0.35 + phase;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius * 0.45;
    ref.current.position.y = 0.72 + Math.sin(t * 1.7) * 0.08;
  });
  return (
    <mesh ref={ref} castShadow>
      <icosahedronGeometry args={[0.26, 2]} />
      <meshStandardMaterial color={color} roughness={0.6} />
    </mesh>
  );
}

function BowlScene() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ pointer }) => {
    if (!group.current) return;
    group.current.rotation.y +=
      (pointer.x * 0.22 - group.current.rotation.y) * 0.035;
    group.current.rotation.x +=
      (-pointer.y * 0.08 - group.current.rotation.x) * 0.035;
  });
  return (
    <group ref={group} rotation={[0.08, -0.25, 0]}>
      <mesh position={[0, -0.22, 0]} receiveShadow>
        <cylinderGeometry args={[1.28, 0.9, 0.65, 64, 1, true]} />
        <meshStandardMaterial
          color="#F55A6A"
          roughness={0.38}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.08, 0.17, 18, 80]} />
        <meshStandardMaterial color="#FFF8F0" roughness={0.42} />
      </mesh>
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.93, 64]} />
        <meshStandardMaterial color="#7D3E2D" roughness={0.85} />
      </mesh>
      {[-0.62, -0.2, 0.2, 0.62].map((x, i) => (
        <mesh
          key={x}
          position={[x, 0.24 + (i % 2) * 0.05, i % 2 ? -0.1 : 0.1]}
          rotation={[0.2, i, 0.1]}
        >
          <dodecahedronGeometry args={[0.23, 0]} />
          <meshStandardMaterial
            color={i % 2 ? "#E59B52" : "#F1C77C"}
            roughness={0.8}
          />
        </mesh>
      ))}
      <Ingredient color="#F55A6A" phase={0} />
      <Ingredient color="#F7B84B" phase={1.6} />
      <Ingredient color="#72C3A3" phase={3.2} />
      <Ingredient color="#6FB7E9" phase={4.8} />
    </group>
  );
}

export function TasteBowlCanvas({ locale = "en" }: { locale?: "en" | "th" }) {
  return (
    <div
      className="relative h-[280px] w-full overflow-hidden rounded-[32px] bg-[radial-gradient(circle_at_50%_38%,#fff_0,#fff0e6_48%,#ffd9c9_100%)]"
      aria-label={
        locale === "en"
          ? "Interactive 3D Signature Bowl visualization"
          : "ภาพชาม Signature Bowl แบบสามมิติที่โต้ตอบได้"
      }
    >
      <Canvas
        camera={{ position: [0, 2.4, 5], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={2.2} />
        <directionalLight
          position={[3, 5, 4]}
          intensity={3.4}
          color="#fff8e7"
        />
        <pointLight position={[-3, 1, 2]} intensity={1.2} color="#ff8ea0" />
        <BowlScene />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-xs font-bold text-[var(--muted)]">
        {locale === "en"
          ? "Move to explore · Mochi's Signature Bowl"
          : "ขยับเพื่อสำรวจ · Signature Bowl ของโมจิ"}
      </div>
    </div>
  );
}
