"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useMousePosition } from "../utils";
import { useState } from "react";

export const MouseTracking = () => {
  const x = useMotionValue(200);
  const y = useMotionValue(200);

  const rotateX = useTransform(y, [0, 400], [45, -45]);
  const rotateY = useTransform(x, [0, 400], [-45, 45]);

  function handleMouse(event: any) {
    const rect = event.currentTarget.getBoundingClientRect();

    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  return (
    <motion.div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        placeItems: "center",
        placeContent: "center",
        backgroundColor: "#000",
        perspective: 400,
      }}
      onMouseMove={handleMouse}
    >
      <motion.div
        style={{
          width: 150,
          height: 150,
          borderRadius: 30,
          backgroundColor: "#7A71E1",
          rotateX,
          rotateY,
        }}
      />
    </motion.div>
  );
};

export const FollowCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 400 : 40;

  return (
    <main className="h-screen w-full bg-black">
      <motion.div
        className="follow-cursor-mask h-full w-full flex items-center justify-center text-6xl absolute bg-[#ec4e39] text-black"
        style={{
          maskImage: 'url("/mask.svg")',
          maskRepeat: "no-repeat",
        }}
        animate={{
          WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      >
        <p
          className="text-6xl w-2/3"
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
        >
          A visual designer - with skills that haven't been replaced by A.I
          (yet) - making good shit only if the paycheck is equally good.
        </p>
      </motion.div>
      <div className="h-full w-full flex items-center justify-center">
        <p className="text-6xl w-2/3 text-[#afa18f]">
          I'm a <span className="text-[#ec4e39]">selectively skilled</span>{" "}
          product designer with strong focus on producing high quality &
          impactful digital experience.
        </p>
      </div>
    </main>
  );
};
