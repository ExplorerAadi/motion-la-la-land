"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
  const x = useSpring(width / 2);
  const y = useSpring(height + 100);
  const originalPosition = useRef(position);
  const isFlipped = flippedCardIdx === index;
  const cardWidth = 288;
  const cardHeight = 384;
  const cardScale = Math.max(((height / cardHeight) * 70) / 100, 1);

  useEffect(() => {
    const animateCard = async () => {
      if (flippedCardIdx === -2) {
        x.set(position.x);
        y.set(position.y);
      } else if (isFlipped) {
        x.set(width / 2 - cardWidth / 2);
        y.set(height / 2 - cardHeight / 2);
      } else if (flippedCardIdx === -1) {
        x.set(originalPosition.current.x);
        y.set(originalPosition.current.y);
      }
    };

    animateCard();
  }, [position, flippedCardIdx, isFlipped, originalPosition]);

  return (
    <motion.button
      drag={!isFlipped}
      dragMomentum={false}
      dragConstraints={{
        left: 10,
        right: width - cardWidth - 20,
        top: 10,
        bottom: height - cardHeight - 20,
      }}
      transition={{ type: "spring", stiffness: 90 }}
      style={{ x, y, top: 0, left: 0 }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        rotateY: isFlipped ? 180 : 0,
        scale: isFlipped ? cardScale : 1,
        zIndex: isFlipped ? 999 : "auto",
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
        originalPosition.current = { x: x.get(), y: y.get() };
      }}
      onMouseUp={(e) => {
        e.stopPropagation();
        if (
          Math.abs(x.get() - window.xyValue.x) < 2 ||
          Math.abs(y.get() - window.xyValue.y) < 2
        ) {
          setFlippedCardIdx(index);
        }
        originalPosition.current = { x: x.get(), y: y.get() };
      }}
    >
      <motion.h3
        className="text-lg deck-card"
        initial={{ rotateY: 0 }}
        animate={{ rotateY: isFlipped ? -180 : 0 }}
      >
        {isFlipped ? "Got you!" : "The greatest trick"}
      </motion.h3>
    </motion.button>
  );
};
