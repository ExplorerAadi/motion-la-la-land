"use client";

import {
  useScroll,
  motion,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useRef } from "react";

const images = ["/image_1.jpg", "/image_2.jpg", "/image_3.png", "/image_4.jpg"];

export default function ScrollEffectPage() {
  const { scrollY } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log(latest);
  });

  return (
    <div ref={containerRef} className="relative">
      {images.map((src, index) => (
        <motion.div
          key={index}
          className="h-screen w-full overflow-hidden"
          style={{
            scale: useTransform(scrollY, (value) => {
              const container = containerRef.current;
              if (!container) return 1;

              const containerHeight = container.offsetHeight;
              const windowHeight = window.innerHeight;
              const imageElement = container.children[index] as HTMLElement;
              if (!imageElement) return 1;

              const imageTop = imageElement.offsetTop;
              const imageHeight = imageElement.offsetHeight;
              const imageCenter = imageTop + imageHeight / 2;

              const distanceFromCenter = Math.abs(
                value + windowHeight / 2 - imageCenter
              );
              const maxDistance = containerHeight / 2;

              return (
                1 + (1 - Math.min(distanceFromCenter / maxDistance, 1)) * 0.5
              );
            }),
          }}
        >
          <img
            src={src}
            alt={`Image ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}
    </div>
  );
}

// Result - A certain parallax/scale effect on the page tied to velocity as you scroll down.
// Barebone implemention - Some scale effect happens on the page as you scroll down and depends on scroll velocity.

// Result after 30 mins attempt - Some working version of the barebone implemention but need to tie the animation with scroll velocity betters̱.
