import type { CoverTheme } from "@/lib/blog";
import { cn } from "@/lib/utils";

type IllustrationVariant = CoverTheme;

type PlantIllustrationProps = {
  variant?: IllustrationVariant;
  className?: string;
};

function BluebonnetStem({
  x,
  y,
  height,
}: {
  x: number;
  y: number;
  height: number;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d={`M0 0 C6 -${height * 0.25} 3 -${height * 0.55} 0 -${height}`}
        stroke="#2E5A45"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      {Array.from({ length: 7 }).map((_, index) => (
        <ellipse
          key={index}
          cx={index % 2 === 0 ? 8 : -8}
          cy={-height + 18 + index * 16}
          rx="15"
          ry="11"
          fill="#3B6EA8"
          opacity={0.97 - index * 0.04}
        />
      ))}
      <ellipse cx="0" cy={-height - 8} rx="12" ry="10" fill="#F5E6A8" />
    </g>
  );
}

function GoldenrodStem({
  x,
  y,
  height,
}: {
  x: number;
  y: number;
  height: number;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d={`M0 0 C-3 -${height * 0.35} 6 -${height * 0.65} 0 -${height}`}
        stroke="#355B2D"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      {Array.from({ length: 18 }).map((_, index) => (
        <circle
          key={index}
          cx={Math.sin(index) * 14}
          cy={-height + 10 + index * 7}
          r="5"
          fill="#E2B93E"
        />
      ))}
    </g>
  );
}

function BeautyberryBranch({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M0 0 C-10 -45 10 -110 52 -150"
        stroke="#6A5A33"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      {[
        [16, -84],
        [28, -96],
        [40, -108],
        [47, -124],
        [22, -124],
      ].map(([cx, cy], index) => (
        <circle
          key={index}
          cx={cx}
          cy={cy}
          r="12"
          fill="#B665B8"
          opacity={0.9}
        />
      ))}
      <ellipse cx="22" cy="-68" rx="24" ry="11" fill="#587749" />
      <ellipse cx="46" cy="-140" rx="24" ry="11" fill="#587749" />
    </g>
  );
}

function Monarch({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path
        d="M0 0 C-28 -26 -62 -30 -86 -14 C-62 10 -28 12 0 0Z"
        fill="#EF8B2C"
        stroke="#2A251E"
        strokeWidth="4"
      />
      <path
        d="M8 0 C36 -22 72 -24 95 -8 C72 12 36 16 8 0Z"
        fill="#EF8B2C"
        stroke="#2A251E"
        strokeWidth="4"
      />
      <path d="M4 -8 V20" stroke="#2A251E" strokeWidth="5" strokeLinecap="round" />
      <circle cx="-44" cy="-7" r="4" fill="#F7F4E8" />
      <circle cx="-23" cy="-15" r="3.5" fill="#F7F4E8" />
      <circle cx="44" cy="-7" r="4" fill="#F7F4E8" />
      <circle cx="24" cy="-15" r="3.5" fill="#F7F4E8" />
    </g>
  );
}

function CommunityShapes() {
  return (
    <g opacity="0.92">
      <path
        d="M140 488 C198 428 246 412 292 398"
        stroke="#F7F4E8"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray="1 22"
      />
      <circle cx="148" cy="494" r="22" fill="#E3A75C" />
      <circle cx="214" cy="458" r="20" fill="#7B8F58" />
      <circle cx="276" cy="414" r="20" fill="#D86F59" />
      <circle cx="330" cy="392" r="14" fill="#3E6C5A" />
    </g>
  );
}

const palettes: Record<
  IllustrationVariant,
  {
    sky: string;
    haze: string;
    sun: string;
    hillOne: string;
    hillTwo: string;
    hillThree: string;
  }
> = {
  savanna: {
    sky: "#E9E0C7",
    haze: "#F6EAD4",
    sun: "#E2B75B",
    hillOne: "#B8B57A",
    hillTwo: "#7E8C56",
    hillThree: "#3F5A3B",
  },
  bluebonnet: {
    sky: "#E7E3D8",
    haze: "#F5EFE2",
    sun: "#F0C45D",
    hillOne: "#AAB876",
    hillTwo: "#667A4F",
    hillThree: "#304A37",
  },
  pollinator: {
    sky: "#E8DFC8",
    haze: "#F5EBDD",
    sun: "#F1C66F",
    hillOne: "#B5A36B",
    hillTwo: "#728154",
    hillThree: "#37513A",
  },
  monarch: {
    sky: "#ECE4D0",
    haze: "#F7F0E1",
    sun: "#F4A356",
    hillOne: "#B39C6B",
    hillTwo: "#6D7B50",
    hillThree: "#31493A",
  },
  community: {
    sky: "#E8DECB",
    haze: "#F5EBDF",
    sun: "#EAB76B",
    hillOne: "#B8AB7D",
    hillTwo: "#7A8558",
    hillThree: "#42533C",
  },
};

export function PlantIllustration({
  variant = "savanna",
  className,
}: PlantIllustrationProps) {
  const palette = palettes[variant];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-white/40 bg-[#efe8d8] shadow-[0_30px_80px_rgba(43,62,36,0.18)]",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 800 640"
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`sky-${variant}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={palette.sky} />
            <stop offset="100%" stopColor={palette.haze} />
          </linearGradient>
        </defs>

        <rect width="800" height="640" fill={`url(#sky-${variant})`} />
        <circle cx="664" cy="110" r="84" fill={palette.sun} opacity="0.9" />
        <ellipse cx="620" cy="132" rx="210" ry="64" fill="white" opacity="0.2" />

        <path
          d="M0 420 C120 364 200 356 312 388 C430 420 522 432 652 398 C706 384 754 374 800 378 V640 H0 Z"
          fill={palette.hillOne}
        />
        <path
          d="M0 468 C136 414 244 428 360 462 C470 494 610 502 800 454 V640 H0 Z"
          fill={palette.hillTwo}
        />
        <path
          d="M0 520 C128 496 254 526 372 556 C474 582 610 582 800 534 V640 H0 Z"
          fill={palette.hillThree}
        />

        <g opacity="0.95">
          <path
            d="M128 510 C116 402 136 286 178 212"
            stroke="#52603A"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <ellipse cx="196" cy="220" rx="42" ry="18" fill="#6A8152" />
          <ellipse cx="156" cy="258" rx="44" ry="18" fill="#6A8152" />
        </g>

        {variant === "bluebonnet" && (
          <>
            <BluebonnetStem x={188} y={554} height={176} />
            <BluebonnetStem x={286} y={578} height={152} />
            <BluebonnetStem x={392} y={560} height={192} />
            <GoldenrodStem x={540} y={585} height={145} />
          </>
        )}

        {variant === "pollinator" && (
          <>
            <GoldenrodStem x={212} y={582} height={158} />
            <GoldenrodStem x={288} y={604} height={132} />
            <BeautyberryBranch x={474} y={562} />
            <Monarch x={600} y={252} scale={1.1} />
          </>
        )}

        {variant === "monarch" && (
          <>
            <BluebonnetStem x={206} y={584} height={148} />
            <GoldenrodStem x={620} y={590} height={140} />
            <Monarch x={512} y={224} scale={1.4} />
            <Monarch x={650} y={174} scale={0.8} />
          </>
        )}

        {variant === "community" && (
          <>
            <BluebonnetStem x={178} y={584} height={152} />
            <GoldenrodStem x={612} y={592} height={146} />
            <BeautyberryBranch x={510} y={566} />
            <CommunityShapes />
          </>
        )}

        {variant === "savanna" && (
          <>
            <BluebonnetStem x={214} y={590} height={138} />
            <GoldenrodStem x={580} y={598} height={132} />
            <path
              d="M0 610 C164 586 324 622 472 610 C620 598 710 572 800 580 V640 H0 Z"
              fill="#294036"
              opacity="0.9"
            />
          </>
        )}
      </svg>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.45),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_30%)]" />
    </div>
  );
}

