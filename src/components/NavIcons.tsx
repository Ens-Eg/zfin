"use client";

import { motion, type Variants } from "framer-motion";

type NavIconProps = {
  className?: string;
  active?: boolean;
  hovered?: boolean;
};

const svgBase = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

function iconState(active?: boolean, hovered?: boolean) {
  if (hovered) return "hover";
  if (active) return "active";
  return "idle";
}

const wrap: Variants = {
  idle: { scale: 1, y: 0 },
  hover: {
    scale: 1.12,
    y: -1,
    transition: { type: "spring", stiffness: 420, damping: 18 },
  },
  active: { scale: 1.06, y: 0 },
};

export function NavHomeIcon({ active, hovered, className }: NavIconProps) {
  const state = iconState(active, hovered);

  return (
    <motion.svg
      {...svgBase}
      className={className}
      initial="idle"
      animate={state}
      variants={wrap}
    >
      <motion.path
        d="m4 11 8-7 8 7"
        variants={{
          idle: { y: 0 },
          hover: { y: -1.6, transition: { type: "spring", stiffness: 380, damping: 14 } },
          active: { y: -1 },
        }}
      />
      <path d="M6 10.8V19a1 1 0 0 0 1 1h3.2v-5.2h3.6V20H17a1 1 0 0 0 1-1v-8.2" />
    </motion.svg>
  );
}

export function NavServicesIcon({ active, hovered, className }: NavIconProps) {
  const state = iconState(active, hovered);

  return (
    <motion.svg
      {...svgBase}
      className={className}
      initial="idle"
      animate={state}
      variants={wrap}
    >
      <motion.polyline
        points="16 18 22 12 16 6"
        variants={{
          idle: { x: 0 },
          hover: { x: 1.6, transition: { type: "spring", stiffness: 360, damping: 16 } },
          active: { x: 1 },
        }}
      />
      <motion.polyline
        points="8 6 2 12 8 18"
        variants={{
          idle: { x: 0 },
          hover: { x: -1.6, transition: { type: "spring", stiffness: 360, damping: 16 } },
          active: { x: -1 },
        }}
      />
    </motion.svg>
  );
}

export function NavShowcasesIcon({ active, hovered, className }: NavIconProps) {
  const state = iconState(active, hovered);

  return (
    <motion.svg
      {...svgBase}
      className={className}
      initial="idle"
      animate={state}
      variants={wrap}
    >
      <motion.path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
        variants={{
          idle: { scaleY: 1 },
          hover: {
            scaleY: [1, 0.12, 1],
            transition: { duration: 0.45, times: [0, 0.45, 1] },
          },
          active: { scaleY: 1 },
        }}
        style={{ originX: 0.5, originY: 0.5 }}
      />
      <motion.circle
        cx="12"
        cy="12"
        r="3"
        variants={{
          idle: { cx: 12, scaleY: 1 },
          hover: {
            cx: [12, 14, 10, 12],
            transition: { duration: 0.9, delay: 0.2 },
          },
          active: { cx: 12, scaleY: 1 },
        }}
      />
    </motion.svg>
  );
}

export function NavAboutIcon({ active, hovered, className }: NavIconProps) {
  const state = iconState(active, hovered);

  return (
    <motion.svg
      {...svgBase}
      className={className}
      initial="idle"
      animate={state}
      variants={wrap}
    >
      <motion.g
        variants={{
          idle: { y: 0 },
          hover: { y: -1.4, transition: { type: "spring", stiffness: 380, damping: 14 } },
          active: { y: -0.8 },
        }}
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
      </motion.g>
      <motion.g
        variants={{
          idle: { x: 0, opacity: 0.75 },
          hover: {
            x: 1.2,
            opacity: 1,
            transition: { type: "spring", stiffness: 320, damping: 16 },
          },
          active: { x: 0.6, opacity: 1 },
        }}
      >
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </motion.g>
    </motion.svg>
  );
}

export function NavContactIcon({ active, hovered, className }: NavIconProps) {
  const state = iconState(active, hovered);
  const dot = (delay: number): Variants => ({
    idle: { y: 0, opacity: 0.45 },
    hover: {
      y: [0, -2.2, 0],
      opacity: 1,
      transition: { duration: 0.55, repeat: Infinity, delay, ease: "easeInOut" },
    },
    active: { y: 0, opacity: 1 },
  });

  return (
    <motion.svg
      {...svgBase}
      className={className}
      initial="idle"
      animate={state}
      variants={wrap}
    >
      <motion.path
        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
        variants={{
          idle: { rotate: 0 },
          hover: {
            rotate: [-4, 4, 0],
            transition: { duration: 0.45 },
          },
          active: { rotate: 0 },
        }}
        style={{ originX: 0.5, originY: 0.55 }}
      />
      <motion.circle cx="9" cy="12" r="0.9" fill="currentColor" stroke="none" variants={dot(0)} />
      <motion.circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" variants={dot(0.12)} />
      <motion.circle cx="15" cy="12" r="0.9" fill="currentColor" stroke="none" variants={dot(0.24)} />
    </motion.svg>
  );
}
