"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { classNames } from "../utils";

export const DeckCard = ({
  index,
  position,
  content,
  width,
  height,
  flippedCardIdx,
  setFlippedCardIdx,
}: {
  index: number;
  position: { x: number; y: number };
  content: {
    title: string;
    description: string;
    media: string;
    redirectLabel: string;
    redirectLink: string;
  };
  width: number;
  height: number;
  flippedCardIdx: number;
  setFlippedCardIdx: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const x = useSpring(width / 2, { damping: 20 });
  const y = useSpring(height + 100, { damping: 20 });
  const isFlipped = flippedCardIdx === index;
  const cardWidth = 288;
  const cardHeight = 384;
  const cardScale = Math.max(((height / cardHeight) * 80) / 100, 1);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (flippedCardIdx === -2) {
      timeout = setTimeout(() => {
        x.set(position.x);
        y.set(position.y);
      }, 200 * index);
    } else if (isFlipped) {
      x.set(width / 2 - cardWidth / 2);
      y.set(height / 2 - (cardHeight / 2 - 20));
    } else if (!isFlipped && window.cardPositions?.[index]) {
      x.set(window.cardPositions[index].x);
      y.set(window.cardPositions[index].y);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [position, flippedCardIdx, isFlipped]);

  return (
    <motion.button
      key={index}
      id={index.toString()}
      drag={!isFlipped}
      dragMomentum={false}
      dragConstraints={{
        left: 10,
        right: width - cardWidth - 20,
        top: 10,
        bottom: height - cardHeight - 20,
      }}
      transition={{
        duration: 0.4,
      }}
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
        window.cardPositions = {
          ...window.cardPositions,
          [index]: { x: x.get(), y: y.get() },
        };
      }}
      onMouseUp={(e) => {
        e.stopPropagation();
        if (
          Math.abs(x.get() - window.cardPositions[index].x) < 2 ||
          Math.abs(y.get() - window.cardPositions[index].y) < 2
        ) {
          setFlippedCardIdx(index);
        }
        window.cardPositions = {
          ...window.cardPositions,
          [index]: { x: x.get(), y: y.get() },
        };
      }}
    >
      <motion.div
        className="text-lg deck-card flex items-center justify-center h-full w-full"
        initial={{ rotateY: 0 }}
        animate={{ rotateY: isFlipped ? -180 : 0 }}
      >
        {isFlipped ? (
          <FlippedCard
            title={content.title}
            description={content.description}
            media={content.media}
            redirectLink={content.redirectLink}
          />
        ) : (
          <p className="text-gray-700 text-xl font-medium">{content.title}</p>
        )}
      </motion.div>
    </motion.button>
  );
};

const FlippedCard = ({
  title,
  description,
  media,
  redirectLink,
}: {
  title: string;
  description: string;
  media: string;
  redirectLink: string;
}) => {
  return (
    <div className="relative flex flex-col justify-between text-gray-700 h-full w-full p-2 deck-card">
      <div className="flex flex-row items-center space-x-1">
        <div className="bg-gray-100 rounded-[5px] p-1">
          <ProjectIcon className="h-2.5" />
        </div>
        <h5 className="text-[8px] antialiased font-semibold tracking-normal text-start deck-card">
          {title}
        </h5>
      </div>
      <div className="h-3/5">
        <video
          className="h-5/6 w-full rounded-md overflow-hidden object-cover border border-gray-100 deck-card"
          src={media}
          autoPlay
          loop
        />
        <p className="h-1/6 block shrink-0 text-[6px] antialiased font-normal leading-normal mt-1 text-start deck-card">
          {description}
        </p>
      </div>
      <div className="flex w-full justify-end deck-card">
        <VisitButton href={redirectLink} />
      </div>
    </div>
  );
};

const VisitButton = ({ href }: { href: string }) => {
  return (
    <a
      href={href}
      className="inline-flex items-center px-2 bg-gray-100 text-gray-600 rounded-[5px] text-[6px] hover:bg-gray-200 transition-colors h-4"
      target="_blank"
      rel="noopener noreferrer"
    >
      Visit <span className="ml-0.5">→</span>
    </a>
  );
};

const ProjectIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"></path>
    </svg>
  );
};
