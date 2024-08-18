"use client";

import {
  motion,
  useAnimate,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import { classNames } from "../utils";

const BaseCard = ({
  index,
  position,
  width,
  height,
  flippedCardIdx,
  setFlippedCardIdx,
}: {
  index: number;
  position: { x: number; y: number };
  width: number;
  height: number;
  flippedCardIdx: number;
  setFlippedCardIdx: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const x = useMotionValue(position.x);
  const y = useMotionValue(position.y);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const isFlipped = flippedCardIdx === index;

  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      scope.current,
      {
        opacity: 1,
        rotateY: isFlipped ? 180 : 0,
        scale: isFlipped ? 2.5 : 1,
        zIndex: isFlipped ? 999 : undefined,
        x: isFlipped ? width / 2 - 100 : x.get(),
        y: isFlipped ? height / 2 - 150 : y.get(),
      },
      {
        duration: 0.2,
        type: "spring",
        stiffness: 120,
        delay: index > 0 ? 0.2 * index : 0,
      }
    );
    animate("h3", { rotateY: isFlipped ? -180 : 0 });
  }, [isFlipped]);

  useMotionValueEvent(x, "change", () => {
    animate(
      scope.current,
      { x },
      { type: "spring", stiffness: 1000, damping: 10 }
    );
  });

  useMotionValueEvent(y, "change", () => {
    animate(
      scope.current,
      { y },
      { type: "spring", stiffness: 1000, damping: 10 }
    );
  });

  return (
    <motion.button
      ref={scope}
      drag={true}
      dragMomentum={false}
      dragConstraints={{
        left: 10,
        right: width - 300,
        top: 10,
        bottom: height - 400,
      }}
      className={classNames(
        "flex flex-col items-center justify-center bg-white rounded-lg w-72 h-96 shadow-xl",
        isFlipped ? "cursor-grabbing" : "cursor-pointer"
      )}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
      }}
      initial={{
        opacity: 0,
        x: width / 2,
        y: height + 100,
      }}
      onMouseDown={() => (window.xyValue = { x: x.get(), y: y.get() })}
      onMouseUp={() => {
        if (
          Math.abs(x.get() - window.xyValue.x) < 2 ||
          Math.abs(y.get() - window.xyValue.y) < 2
        ) {
          setFlippedCardIdx(index);
        }
      }}
      onDrag={(_, info) => {
        if (info.point.x > 200 || info.point.y > 200) {
          x.set(info.point.x);
          y.set(info.point.y);
        }
      }}
      onAnimationComplete={() => setIsAnimationComplete(true)}
      onAnimationStart={() => setIsAnimationComplete(false)}
    >
      <motion.h3 className="text-lg" initial={{}}>
        {isAnimationComplete && isFlipped ? "Got you!" : "The greatest trick"}
      </motion.h3>
    </motion.button>
  );
};

export const BaseCardsStacked = () => {
  const { width, height } = useWindowSize();
  const [flippedCardIdx, setFlippedCardIdx] = useState(-1);

  const getX = (xPercent: number) => {
    return (xPercent / 100) * width;
  };
  const getY = (yPercent: number) => {
    return (yPercent / 100) * height;
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-950 overflow-hidden relative">
      {positions.map((position, idx) => (
        <BaseCard
          key={idx}
          index={idx}
          position={{ x: getX(position.x), y: getY(position.y) }}
          width={width}
          height={height}
          flippedCardIdx={flippedCardIdx}
          setFlippedCardIdx={setFlippedCardIdx}
        />
      ))}
    </div>
  );
};

const positions = [
  { x: 30, y: 41 },
  { x: 36, y: 35 },
  { x: 42, y: 29 },
  { x: 48, y: 38 },
  { x: 54, y: 44 },
];
