"use client";

import { useState } from "react";
import { useWindowSize } from "usehooks-ts";
import { DeckCard } from "./DeckCard";
import { CloseIcon } from "../public/icons/CloseIcon";

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
    <div
      className="w-screen h-screen flex items-center justify-center bg-slate-950 overflow-hidden relative"
      onClick={(e) => {
        if (
          !(e.target as HTMLElement).classList.contains("deck-card") &&
          flippedCardIdx !== -1
        ) {
          setFlippedCardIdx(-1);
        }
      }}
    >
      {positions.map((position, idx) => (
        <DeckCard
          key={idx}
          index={idx}
          position={{ x: getX(position.x), y: getY(position.y) }}
          width={width}
          height={height}
          flippedCardIdx={flippedCardIdx}
          setFlippedCardIdx={setFlippedCardIdx}
        />
      ))}
      <button
        className="absolute z-[999] bg-neutral-800 text-white rounded-full p-3 left-1/2 top-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        onClick={() => setFlippedCardIdx(-1)}
      >
        <CloseIcon className="h-6 font-semibold" />
      </button>
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
