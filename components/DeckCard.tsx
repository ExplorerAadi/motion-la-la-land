"use client";

import {
  motion,
  useAnimate,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";
import { classNames } from "../utils";

export const DeckCard = ({
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
  // const x = useMotionValue(position.x);
  // const y = useMotionValue(position.y);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const isFlipped = flippedCardIdx === index;

  const [scope, animate] = useAnimate();

  const springConfig = { damping: 12, stiffness: 100 };
  const dragControls = useSpring(position.x, springConfig);
  const dragControlsY = useSpring(position.y, springConfig);

  useEffect(() => {
    animate(
      scope.current,
      {
        opacity: 1,
        rotateY: isFlipped ? 180 : 0,
        scale: isFlipped ? 1.8 : 1,
        x: isFlipped ? width / 2 - 100 : dragControls.get(),
        y: isFlipped ? height / 2 - 150 : dragControlsY.get(),
      },
      {
        duration: 0.2,
        type: "spring",
        stiffness: 90,
        // delay: index > 0 ? 0.2 * index : 0,
      }
    );
    animate("h3", { rotateY: isFlipped ? -180 : 0 });
  }, [isFlipped]);

  // useMotionValueEvent(x, "change", () => {
  //   animate(
  //     scope.current,
  //     { x },
  //     { type: "spring", stiffness: 90, damping: 12 }
  //   );
  // });

  // useMotionValueEvent(y, "change", () => {
  //   animate(
  //     scope.current,
  //     { y },
  //     { type: "spring", stiffness: 90, damping: 12 }
  //   );
  // });
  console.log(isAnimationComplete);

  return (
    <motion.button
      ref={scope}
      drag={isFlipped ? false : true}
      dragElastic={0.02}
      dragTransition={{
        power: 0.2,
        timeConstant: 120,
        bounceStiffness: 600,
        bounceDamping: 10,
      }}
      dragMomentum={false}
      dragConstraints={{
        left: 10,
        right: width - 300,
        top: 10,
        bottom: height - 400,
      }}
      className={classNames(
        "flex flex-col items-center justify-center bg-white rounded-lg w-72 h-96 shadow-xl deck-card absolute top-0 left-0"
        // x.isAnimating() || y.isAnimating()
        //   ? "cursor-grabbing"
        //   : "cursor-pointer"
      )}
      style={{
        // x: dragControls,
        // y: dragControlsY,
        zIndex: isFlipped ? 999 : "auto",
      }}
      initial={{
        opacity: 0,
        x: width / 2,
        y: height + 100,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        window.xyValue = { x: dragControls.get(), y: dragControlsY.get() };
      }}
      onMouseUp={(e) => {
        e.stopPropagation();
        console.log(dragControls.get(), dragControlsY.get());
        if (
          Math.abs(dragControls.get() - window.xyValue.x) < 2 ||
          Math.abs(dragControlsY.get() - window.xyValue.y) < 2
        ) {
          setFlippedCardIdx(index);
        }
      }}
      onDrag={(_, info) => {
        dragControls.set(info.point.x);
        dragControlsY.set(info.point.y);
      }}
    >
      <motion.h3 className="text-lg deck-card" initial={{}}>
        {isAnimationComplete && isFlipped ? "Got you!" : "The greatest trick"}
      </motion.h3>
    </motion.button>
  );
};
