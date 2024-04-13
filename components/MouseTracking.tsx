"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

export const MouseTracking = () => {
  const x = useMotionValue(200);
  const y = useMotionValue(200);

  const rotateX = useTransform(y, [0, 400], [45, -45]);
  const rotateY = useTransform(x, [0, 400], [-45, 45]);

  useEffect(() => {
    console.log(x, y, rotateX, rotateY);
  }, [x, y, rotateX, rotateY]);

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
