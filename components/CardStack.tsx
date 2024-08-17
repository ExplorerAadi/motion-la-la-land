"use client";

import { motion, useMotionValue } from "framer-motion";
import { useState } from "react";
import { useWindowSize } from "usehooks-ts";

const BaseCard = ({
  index,
  x,
  y,
  width,
  height,
}: {
  index: number;
  x: number;
  y: number;
  width: number;
  height: number;
}) => {
  const point = useMotionValue({ x, y });
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  return (
    <motion.button
      drag={true}
      dragMomentum={false}
      dragConstraints={{
        left: 10,
        right: width - 300,
        top: 10,
        bottom: height - 400,
      }}
      className="flex flex-col items-center justify-center bg-white rounded-lg w-72 h-96 shadow-xl cursor-pointer"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        x: point.get().x,
        y: point.get().y,
      }}
      initial={{
        opacity: 0,
        // y: 800,
      }}
      animate={{
        opacity: 1,
        // y: point.y,
        rotateY: isFlipped ? 180 : 0,
        scale: isFlipped ? 2.5 : 1,
        zIndex: isFlipped ? 999 : undefined,
        x: isFlipped ? width / 2 - 100 : point.get().x,
        y: isFlipped ? height / 2 - 150 : point.get().y,
      }}
      transition={{ duration: 0.8, type: "spring", delay: 0.2 * index }}
      onMouseDown={() => (window.xyValue = point.get())}
      onMouseUp={() => {
        if (
          Math.abs(point.get().x - window.xyValue.x) < 2 ||
          Math.abs(point.get().y - window.xyValue.y) < 2
        ) {
          setIsFlipped(true);
        }
      }}
      onDrag={(_, info) => {
        if (info.point.x > 200 || info.point.y > 200) {
          point.set({
            x: info.point.x,
            y: info.point.y,
          });
        }
      }}
      onAnimationComplete={() => setIsAnimationComplete(true)}
      onAnimationStart={() => setIsAnimationComplete(false)}
    >
      <h3
        className="text-lg"
        style={{ transform: isFlipped ? "rotateY(-180deg)" : "" }}
      >
        {isAnimationComplete && isFlipped ? "Got you!" : "The greatest trick"}
      </h3>
    </motion.button>
  );
};

export const BaseCardsStacked = () => {
  const { width, height } = useWindowSize();

  const getX = (xPercent: number) => {
    return (xPercent / 100) * width;
  };
  const getY = (yPercent: number) => {
    return (yPercent / 100) * height;
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-950 overflow-hidden">
      <div className="relative h-full w-full">
        <BaseCard
          key={1}
          index={0}
          x={getX(30)}
          y={getY(41)}
          width={width}
          height={height}
        />
        <BaseCard
          key={2}
          index={1}
          x={getX(36)}
          y={getY(35)}
          width={width}
          height={height}
        />
        <BaseCard
          key={3}
          index={2}
          x={getX(42)}
          y={getY(29)}
          width={width}
          height={height}
        />
        <BaseCard
          key={4}
          index={3}
          x={getX(48)}
          y={getY(38)}
          width={width}
          height={height}
        />
        <BaseCard
          key={5}
          index={4}
          x={getX(54)}
          y={getY(44)}
          width={width}
          height={height}
        />
      </div>
    </div>
  );
};
