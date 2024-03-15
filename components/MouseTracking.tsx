"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";

export function Example() {
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
        width: 400,
        height: 400,
        display: "flex",
        placeItems: "center",
        placeContent: "center",
        borderRadius: 30,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        perspective: 400,
      }}
      onMouseMove={handleMouse}
    >
      <motion.div
        style={{
          width: 150,
          height: 150,
          borderRadius: 30,
          backgroundColor: "#fff",
          rotateX,
          rotateY,
        }}
      />
    </motion.div>
  );
}
