import type { ReactNode } from "react";

const FUR = "#e8a75d";
const FUR_DARK = "#c9803a";
const CREAM = "#fff0e6";
const PAPER = "#f1ebdd";
const INK = "#3a211a";
const CORAL = "#f55a6a";
const HONEY = "#f7b84b";

function Ground({ y = 122 }: { y?: number }) {
  return <ellipse cx="100" cy={y} rx="62" ry="6" fill={INK} opacity=".1" />;
}

/** Dog facing right. Head circle centred at (hx, hy). */
function Head({ hx, hy, look = 0 }: { hx: number; hy: number; look?: number }) {
  return (
    <g>
      <path d={`M${hx - 13} ${hy - 12} L${hx - 20} ${hy - 34} L${hx} ${hy - 20} Z`} fill={FUR_DARK} />
      <circle cx={hx} cy={hy} r="19" fill={FUR} />
      <ellipse cx={hx + 15} cy={hy + 6} rx="11" ry="8" fill={CREAM} />
      <circle cx={hx + 24} cy={hy + 3} r="3.6" fill={INK} />
      <circle cx={hx + 6} cy={hy - 4 + look} r="2.7" fill={INK} />
    </g>
  );
}

const ART: Record<string, ReactNode> = {
  /* ---------- products ---------- */
  g4: (
    <>
      <rect width="200" height="140" fill={PAPER} />
      <ellipse cx="100" cy="116" rx="64" ry="7" fill={INK} opacity=".1" />
      <rect x="34" y="52" width="132" height="62" rx="16" fill={HONEY} />
      <rect x="34" y="52" width="132" height="14" rx="7" fill="#e09a22" opacity=".55" />
      {[58, 100, 142].map((x) => (
        <g key={x}>
          <circle cx={x} cy="90" r="15" fill="#8a5a1d" />
          <circle cx={x} cy="90" r="15" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="2" />
        </g>
      ))}
      <g transform="rotate(-18 100 40)">
        <g className="anim-wobble">
        <rect x="76" y="34" width="48" height="10" rx="5" fill="#fff" />
        <circle cx="76" cy="36" r="6" fill="#fff" />
        <circle cx="76" cy="44" r="6" fill="#fff" />
        <circle cx="124" cy="36" r="6" fill="#fff" />
        <circle cx="124" cy="44" r="6" fill="#fff" />
        </g>
      </g>
      <circle cx="58" cy="88" r="5" fill={CORAL} />
      <circle cx="142" cy="92" r="5" fill={CORAL} />
    </>
  ),
  g5: (
    <>
      <rect width="200" height="140" fill={PAPER} />
      <ellipse cx="100" cy="112" rx="70" ry="8" fill={INK} opacity=".12" />
      <path d="M26 96 L56 52 H176 L150 100 Z" fill="#7cc4ec" />
      <path d="M26 96 L150 100 V110 H26 Z" fill="#4aa3d6" />
      <path d="M150 100 L176 52 V62 L150 110 Z" fill="#5fb3e0" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${62 + i * 6} ${88 - i * 14} q18 -8 36 0 t36 0 t30 0`} fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="3" strokeLinecap="round" />
      ))}
      <g className="anim-spin" stroke="#fff" strokeWidth="3" strokeLinecap="round">
        <path d="M150 22 v26 M137 35 h26 M141 26 l18 18 M159 26 l-18 18" />
      </g>
    </>
  ),

  /* ---------- lessons ---------- */
  sit: (
    <>
      <rect width="200" height="140" fill={PAPER} />
      <Ground />
      <path className="anim-tail" d="M62 100 C40 96 36 74 50 64" fill="none" stroke={FUR_DARK} strokeWidth="9" strokeLinecap="round" />
      <ellipse cx="90" cy="96" rx="30" ry="26" fill={FUR} />
      <ellipse cx="110" cy="84" rx="17" ry="28" fill={FUR} />
      <ellipse cx="108" cy="92" rx="9" ry="20" fill={CREAM} />
      <rect x="106" y="94" width="12" height="28" rx="6" fill={FUR} />
      <ellipse cx="82" cy="116" rx="18" ry="9" fill={FUR_DARK} />
      <Head hx={116} hy={50} />
      <g className="anim-bob">
        <circle cx="160" cy="40" r="6" fill={CORAL} />
        <path d="M160 46 l-3 10 h6 Z" fill={CORAL} />
      </g>
    </>
  ),
  come: (
    <>
      <rect width="200" height="140" fill={PAPER} />
      <Ground y={124} />
      <g className="anim-speed" stroke="#7cc4ec" strokeWidth="4" strokeLinecap="round">
        <path d="M18 70 h26 M10 86 h30 M22 102 h22" />
      </g>
      <g className="anim-run">
      <path className="anim-tail" d="M62 80 C52 62 44 58 40 46" fill="none" stroke={FUR_DARK} strokeWidth="8" strokeLinecap="round" />
      <ellipse cx="96" cy="82" rx="36" ry="19" fill={FUR} />
      <ellipse cx="104" cy="90" rx="24" ry="9" fill={CREAM} />
      <g stroke={FUR} strokeWidth="11" strokeLinecap="round">
        <path d="M118 90 L146 106 M126 86 L158 98" />
        <path d="M74 92 L50 108 M68 88 L40 96" />
      </g>
      <Head hx={138} hy={60} />
      </g>
      <g className="anim-pulse">
        <path d="M170 38 q8 4 8 14" fill="none" stroke={CORAL} strokeWidth="3" strokeLinecap="round" />
        <path d="M176 28 q14 6 14 24" fill="none" stroke={CORAL} strokeWidth="3" strokeLinecap="round" />
      </g>
    </>
  ),
  leash: (
    <>
      <rect width="200" height="140" fill={PAPER} />
      <Ground y={124} />
      <circle cx="26" cy="34" r="9" fill="#f2c9a8" />
      <rect x="17" y="42" width="18" height="46" rx="9" fill={CORAL} />
      <path className="anim-sway" d="M30 42 Q74 74 118 60" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="124" cy="88" rx="32" ry="17" fill={FUR} />
      <ellipse cx="130" cy="95" rx="20" ry="8" fill={CREAM} />
      <g stroke={FUR} strokeWidth="10" strokeLinecap="round">
        <path d="M144 98 V122 M130 100 V122 M108 98 V122 M96 96 V122" />
      </g>
      <path className="anim-tail" d="M94 82 C84 70 80 62 82 52" fill="none" stroke={FUR_DARK} strokeWidth="8" strokeLinecap="round" />
      <path d="M118 66 q14 -6 26 2" fill="none" stroke={CORAL} strokeWidth="6" strokeLinecap="round" />
      <Head hx={148} hy={64} />
    </>
  ),
  leave: (
    <>
      <rect width="200" height="140" fill={PAPER} />
      <Ground />
      <g transform="translate(-14 0)">
        <path className="anim-tail" d="M62 100 C40 96 36 74 50 64" fill="none" stroke={FUR_DARK} strokeWidth="9" strokeLinecap="round" />
        <ellipse cx="90" cy="96" rx="30" ry="26" fill={FUR} />
        <ellipse cx="110" cy="84" rx="17" ry="28" fill={FUR} />
        <ellipse cx="108" cy="92" rx="9" ry="20" fill={CREAM} />
        <rect x="106" y="94" width="12" height="28" rx="6" fill={FUR} />
        <ellipse cx="82" cy="116" rx="18" ry="9" fill={FUR_DARK} />
        <Head hx={116} hy={50} look={-1} />
      </g>
      <g transform="translate(150 98)">
        <g className="anim-pulse">
        <rect x="-18" y="-5" width="36" height="9" rx="4.5" fill="#fff" stroke={INK} strokeOpacity=".25" />
        <circle cx="-18" cy="-6" r="6" fill="#fff" stroke={INK} strokeOpacity=".25" />
        <circle cx="-18" cy="5" r="6" fill="#fff" stroke={INK} strokeOpacity=".25" />
        <circle cx="18" cy="-6" r="6" fill="#fff" stroke={INK} strokeOpacity=".25" />
        <circle cx="18" cy="5" r="6" fill="#fff" stroke={INK} strokeOpacity=".25" />
        <circle r="26" fill="none" stroke={CORAL} strokeWidth="5" />
        <path d="M-18 -18 L18 18" stroke={CORAL} strokeWidth="5" strokeLinecap="round" />
        </g>
      </g>
    </>
  ),
  settle: (
    <>
      <rect width="200" height="140" fill={PAPER} />
      <rect x="22" y="100" width="156" height="22" rx="11" fill={CORAL} />
      <rect x="22" y="100" width="156" height="8" rx="4" fill="#fff" opacity=".25" />
      <path className="anim-tail" d="M52 94 C36 92 30 78 38 70" fill="none" stroke={FUR_DARK} strokeWidth="8" strokeLinecap="round" />
      <g className="anim-breathe">
        <ellipse cx="96" cy="88" rx="44" ry="17" fill={FUR} />
        <ellipse cx="104" cy="96" rx="28" ry="8" fill={CREAM} />
      </g>
      <ellipse cx="146" cy="100" rx="18" ry="7" fill={FUR_DARK} />
      <circle cx="140" cy="82" r="17" fill={FUR} />
      <ellipse cx="154" cy="88" rx="10" ry="7" fill={CREAM} />
      <circle cx="162" cy="86" r="3.4" fill={INK} />
      <path d="M131 80 q5 5 10 0" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M127 70 L120 54 L136 66 Z" fill={FUR_DARK} />
      <g className="anim-z">
        <text x="168" y="52" fontSize="14" fontWeight="800" fill="#7aa591">z</text>
      </g>
      <g className="anim-z" style={{ animationDelay: "1.2s" }}>
        <text x="178" y="40" fontSize="11" fontWeight="800" fill="#7aa591">z</text>
      </g>
    </>
  ),
};

export const hasIllustration = (id: string) => id in ART;

export function Illustration({
  id,
  className = "",
}: {
  id: string;
  className?: string;
}) {
  const art = ART[id];
  if (!art) return null;
  return (
    <svg
      viewBox="0 0 200 140"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-hidden
    >
      {art}
    </svg>
  );
}
