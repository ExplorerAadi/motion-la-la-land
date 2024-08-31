"use client";

import { useState } from "react";
import { useWindowSize } from "usehooks-ts";
import { DeckCard } from "./DeckCard";
import { cloudinaryDomain } from "../utils";

export const StackedDeck = () => {
  const { width, height } = useWindowSize();
  const [flippedCardIdx, setFlippedCardIdx] = useState(-2);

  const getX = (xPercent: number) => {
    return (xPercent / 100) * width;
  };
  const getY = (yPercent: number) => {
    return (yPercent / 100) * height;
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center bg-black overflow-hidden relative"
      onClick={(e) => {
        if (
          !(e.target as HTMLElement).classList.contains("deck-card") &&
          flippedCardIdx !== -1
        ) {
          setFlippedCardIdx(-1);
        }
      }}
    >
      <button
        className="absolute z-[999] bg-neutral-800 text-white rounded-full pt-1 pb-0.5 px-1 left-1/2 top-10 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        onClick={() => {
          window.location.reload();
        }}
      >
        <ReloadIcon className="w-10 h-10 mt-0.5" />
      </button>
      {cardData.map((card, idx) => (
        <DeckCard
          key={card.x}
          index={idx}
          position={{ x: getX(card.x), y: getY(card.y) }}
          content={card}
          width={width}
          height={height}
          flippedCardIdx={flippedCardIdx}
          setFlippedCardIdx={setFlippedCardIdx}
        />
      ))}
      <div className="absolute bottom-4 left-0 text-gray-200 text-sm text-center w-full">
        Drag a card to move it around, or click it to flip over.
      </div>
    </div>
  );
};

const cardData = [
  {
    title: "Private Island",
    description:
      "A private island of links and bio based on the dynamic island concept of iPhones and inspired by @konsfyi design.",
    media: `${cloudinaryDomain}/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/f_auto:video,q_auto/private-island-demo`,
    redirectLabel: "Visit",
    redirectLink: "/private-island",
    x: 30,
    y: 41,
  },
  {
    title: "Art Gallery",
    description:
      "An art gallery with images arranged in a masonry grid and an iPhone like opening closing animation.",
    media: `${cloudinaryDomain}/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/f_auto:video,q_auto/art-gallery`,
    redirectLabel: "Visit",
    redirectLink: "/modal-animation",
    x: 36,
    y: 35,
  },
  {
    title: "Smart Navbar",
    description:
      "Stick the heading of the section in viewport to the top, super helpful when reading a blog post or a long article.",
    media: `${cloudinaryDomain}/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/v1717143294/smart-navbar.mp4`,
    redirectLabel: "Visit",
    redirectLink: "/smart-navbar",
    x: 42,
    y: 29,
  },
  {
    title: "Menu Interaction",
    description:
      "A hamburger menu created by only animating the svg paths and can be used to toggle the open/close state of sidebar menus.",
    media: `${cloudinaryDomain}/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/v1717143294/menu-svg.mp4`,
    redirectLabel: "Visit",
    redirectLink: "/menu-animation",
    x: 48,
    y: 38,
  },
  {
    title: "Mask Image Effect",
    description:
      "Hiding a text/image behind the content being shown on the screen that can be revealed in multiple ways, here I am using mouse hover.",
    media: `${cloudinaryDomain}/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/v1717143294/mouse-tracking.mp4`,
    redirectLabel: "Visit",
    redirectLink: "/mask-image-effect",
    x: 54,
    y: 44,
  },
];

const ReloadIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="-5.0 -10.0 110.0 135.0"
      fill="currentColor"
      className={className}
    >
      <path d="m78.18 43.352c-2.1484-8.0352-8.0469-14.531-15.836-17.445-7.7891-2.9102-16.504-1.875-23.395 2.7773-6.8867 4.6562-11.102 12.355-11.309 20.668l-1.5-0.85937v-0.003907c-1.6602-0.95703-3.7812-0.38672-4.7422 1.2734-0.46094 0.79297-0.58594 1.7422-0.34766 2.6328s0.82031 1.6484 1.6211 2.1055l7.4609 4.3086h-0.003906c0.17578 0.10156 0.35938 0.1875 0.55078 0.25h0.14062l0.42969 0.10938h1.0508l0.28125-0.050781h0.17969l0.21094-0.070313 0.32812-0.12891 0.32031-0.17188 0.26172-0.17188-0.003906 0.003906c0.085938-0.054687 0.16797-0.11719 0.24219-0.1875l6.4883-6.4609c1.3633-1.3555 1.3672-3.5586 0.011719-4.918-1.3555-1.3633-3.5586-1.3672-4.9219-0.011719l-1 1c0.54688-5.1016 3.1602-9.7578 7.2305-12.883 4.0664-3.125 9.2383-4.4492 14.309-3.6641 5.0703 0.78906 9.5977 3.6172 12.531 7.8281 2.9297 4.2109 4.0078 9.4375 2.9844 14.465-1.0234 5.0273-4.0586 9.418-8.4023 12.148s-9.6172 3.5625-14.59 2.3047c-1.8203-0.35938-3.6016 0.76562-4.0547 2.5625s0.58203 3.6328 2.3516 4.1797c2.0586 0.51172 4.1719 0.76953 6.293 0.76953 7.9883-0.003907 15.527-3.7188 20.391-10.059 4.8633-6.3398 6.5039-14.582 4.4375-22.301z" />
    </svg>
  );
};
