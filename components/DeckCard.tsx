"use client";

import { motion, useAnimate, useSpring } from "framer-motion";
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
  const [isDragging, setIsDragging] = useState(false);
  const [scope, animate] = useAnimate();
  const x = useSpring(width / 2, { stiffness: 100, damping: 10 });
  const y = useSpring(height + 100, { stiffness: 100, damping: 10 });
  const isFlipped = flippedCardIdx === index;
  const cardWidth = 288;
  const cardHeight = 384;

  useEffect(() => {
    const animateCard = async () => {
      if (flippedCardIdx === -2) {
        x.set(position.x);
        y.set(position.y);
      } else if (isFlipped) {
        x.set(width / 2 - cardWidth / 2);
        y.set(height / 2 - cardHeight / 2);
      }
    };

    animateCard();
  }, [position, x, y, flippedCardIdx]);

  useEffect(() => {
    const unsubscribeX = x.on("change", (latest) => {
      return animate(scope.current, { x: latest });
    });
    const unsubscribeY = y.on("change", (latest) =>
      animate(scope.current, { y: latest })
    );

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [x, y]);

  return (
    <motion.button
      ref={scope}
      drag={!isFlipped}
      dragElastic={0.02}
      dragMomentum={false}
      dragConstraints={{
        left: 0,
        right: width - cardWidth,
        top: 0,
        bottom: height - cardHeight,
      }}
      transition={{ type: "spring", stiffness: 90 }}
      style={{ x, y, top: 0, left: 0 }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        rotateY: isFlipped ? 180 : 0,
        scale: isFlipped ? 1.8 : 1,
        zIndex: isFlipped ? "999" : "auto",
      }}
      onDrag={(_, info) => {
        const newX = Math.max(0, Math.min(info.point.x, width - cardWidth));
        const newY = Math.max(0, Math.min(info.point.y, height - cardHeight));
        x.set(newX);
        y.set(newY);
      }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      className={classNames(
        "flex flex-col items-center justify-center bg-white rounded-lg w-72 h-96 shadow-xl deck-card absolute top-0 left-0",
        isDragging ? "cursor-grabbing" : "cursor-pointer"
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
