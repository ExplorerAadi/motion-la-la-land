"use client";

import { motion, useAnimate, useSpring } from "framer-motion";
import { useEffect } from "react";
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
  const [scope, animate] = useAnimate();
  const x = useSpring(position.x, { stiffness: 300, damping: 30 });
  const y = useSpring(position.y, { stiffness: 300, damping: 30 });
  const isFlipped = flippedCardIdx === index;

  useEffect(() => {
    const animateCard = () => {
      animate(
        scope.current,
        {
          opacity: 1,
          rotateY: isFlipped ? 180 : 0,
          scale: isFlipped ? 1.8 : 1,
          x: isFlipped ? width / 2 - 100 : x.get(),
          y: isFlipped ? height / 2 - 150 : y.get(),
        },
        {
          type: "spring",
          stiffness: 90,
        }
      );
    };
    animate("h3", { rotateY: isFlipped ? -180 : 0 });

    animateCard();

    // const unsubscribeX = x.on("change", animateCard);
    // const unsubscribeY = y.on("change", animateCard);

    // return () => {
    //   unsubscribeX();
    //   unsubscribeY();
    // };
  }, [isFlipped, x, y, width, height, position, animate]);

  return (
    <motion.button
      ref={scope}
      drag={!isFlipped}
      dragElastic={0.02}
      dragMomentum={false}
      dragConstraints={{
        left: 10,
        right: width - 300,
        top: 10,
        bottom: height - 400,
      }}
      style={{ x, y, zIndex: isFlipped ? "999" : "auto" }}
      initial={{ opacity: 0, x: position.x, y: position.y }}
      animate={{ opacity: 1 }}
      onDrag={(_, info) => {
        x.set(info.point.x);
        y.set(info.point.y);
      }}
      className={classNames(
        "flex flex-col items-center justify-center bg-white rounded-lg w-72 h-96 shadow-xl deck-card absolute top-0 left-0",
        x.isAnimating() || y.isAnimating()
          ? "cursor-grabbing"
          : "cursor-pointer"
      )}
      onMouseDown={(e) => {
        e.stopPropagation();
        window.xyValue = { x: x.get(), y: y.get() };
      }}
      onMouseUp={(e) => {
        e.stopPropagation();
        if (
          Math.abs(x.get() - window.xyValue.x) < 2 ||
          Math.abs(y.get() - window.xyValue.y) < 2
        ) {
          setFlippedCardIdx(index);
        }
      }}
    >
      <motion.h3 className="text-lg deck-card" initial={{}}>
        {isFlipped ? "Got you!" : "The greatest trick"}
      </motion.h3>
    </motion.button>
  );
};
