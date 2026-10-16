"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function SealedPack({
  x,
  color,
  phase,
  label,
}: {
  x: number;
  color: string;
  phase: number;
  label: string;
}) {
  const pack = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!pack.current) return;
    pack.current.position.y = Math.sin(clock.elapsedTime * 0.9 + phase) * 0.06;
  });

  return (
    <group
      ref={pack}
      position={[x, 0, 0]}
      rotation={[0.02, x < 0 ? 0.18 : -0.18, x < 0 ? -0.06 : 0.06]}
      name={label}
    >
      <mesh castShadow>
        <boxGeometry args={[1.25, 1.72, 0.34]} />
        <meshStandardMaterial color="#FFF8F0" roughness={0.52} />
      </mesh>
      <mesh position={[0, 0.84, 0]} castShadow>
        <boxGeometry args={[1.18, 0.1, 0.39]} />
        <meshStandardMaterial color={color} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.1, 0.19]}>
        <boxGeometry args={[0.82, 0.74, 0.035]} />
        <meshStandardMaterial color={color} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.12, 0.22]}>
        <circleGeometry args={[0.2, 32]} />
        <meshStandardMaterial color="#FFF8F0" roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.52, 0.19]}>
        <boxGeometry args={[0.7, 0.08, 0.035]} />
        <meshStandardMaterial color="#E9D8CB" roughness={0.8} />
      </mesh>
      <mesh position={[0, -0.7, 0.19]}>
        <boxGeometry args={[0.46, 0.06, 0.035]} />
        <meshStandardMaterial color="#E9D8CB" roughness={0.8} />
      </mesh>
    </group>
  );
}

function MatchScene() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ pointer }) => {
    if (!group.current) return;
    group.current.rotation.y +=
      (pointer.x * 0.22 - group.current.rotation.y) * 0.035;
    group.current.rotation.x +=
      (-pointer.y * 0.08 - group.current.rotation.x) * 0.035;
  });

  return (
    <group ref={group} position={[0, 0.08, 0]}>
      <SealedPack x={-0.82} color="#F55A6A" label="S01" phase={0} />
      <SealedPack x={0.82} color="#F7B84B" label="C02" phase={1.2} />
    </group>
  );
}

export function TasteBowlCanvas({ locale = "en" }: { locale?: "en" | "th" }) {
  return (
    <div
      className="relative h-[280px] w-full overflow-hidden rounded-[32px] bg-[radial-gradient(circle_at_50%_38%,#fff_0,#fff0e6_48%,#ffd9c9_100%)]"
      aria-label={
        locale === "en"
          ? "Interactive 3D preview of two manufacturer-sealed partner products selected for Mochi"
          : "ภาพตัวอย่างสินค้าพาร์ตเนอร์สองรายการที่ปิดผนึกจากผู้ผลิตและเลือกให้โมจิ"
      }
    >
      <div className="pointer-events-none absolute inset-x-0 top-3 z-10 flex justify-center gap-2 text-[10px] font-black tracking-[0.12em] text-[var(--brown)]">
        <span className="rounded-full border border-[var(--line)] bg-white/90 px-3 py-1.5 shadow-sm">
          {locale === "en" ? "SEALED · S01" : "แพ็กปิดผนึก · S01"}
        </span>
        <span className="rounded-full border border-[var(--line)] bg-white/90 px-3 py-1.5 shadow-sm">
          {locale === "en" ? "SEALED · C02" : "แพ็กปิดผนึก · C02"}
        </span>
      </div>
      <Canvas
        camera={{ position: [0, 0.2, 5.4], fov: 38 }}
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
        <MatchScene />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-xs font-bold text-[var(--muted)]">
        {locale === "en"
          ? "First Match · original partner packs, never repacked"
          : "First Match · แพ็กเดิมจากพาร์ตเนอร์ ไม่แบ่งบรรจุใหม่"}
      </div>
    </div>
  );
}
