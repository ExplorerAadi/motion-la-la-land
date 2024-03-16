"use client";

// Photos from https://citizenofnowhe.re
import "./styles.css";
import { useEffect, useState } from "react";
import {
  animate,
  motion,
  Transition,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";

interface Size {
  width: number;
  height: number;
}

function Image({ id }: { id: number }) {
  const [size, setSize] = useState<Size | undefined>(undefined);
  const maskX = useMotionValue(0);
  const maskY = useMotionValue(0);
  const maskSize = useMotionValue(0);
  const maskImage = useMotionTemplate`radial-gradient(circle at ${maskX}px ${maskY}px, black 0px, black ${maskSize}px, transparent ${maskSize}px)`;

  useEffect(() => {
    if (!size) return;

    const transition: Transition = {
      type: "spring",
      stiffness: 200,
      damping: 10,
    };
    const { width, height } = size;
    animate(maskSize, Math.sqrt(width * width + height * height), {
      duration: 0.7,
    });
    animate(maskX, width / 2, transition);
    animate(maskY, height / 2, transition);
  }, [size]);

  return (
    <section>
      <motion.div
        onHoverStart={() => !size && animate(maskSize, 50)}
        onHoverEnd={() => !size && animate(maskSize, 0)}
        onPointerDown={() => !size && animate(maskSize, 40)}
        onClick={(e) => setSize(e.currentTarget.getBoundingClientRect())}
        onPointerMove={(e) => {
          if (size) return;
          const { top, left } = (
            e.currentTarget as any
          ).getBoundingClientRect();
          maskX.set(e.clientX - left);
          maskY.set(e.clientY - top);
        }}
        style={{ WebkitMaskImage: maskImage, maskImage }}
      >
        <img src={`/${id}.jpg`} alt="" />
      </motion.div>
    </section>
  );
}

export default function App() {
  return (
    <>
      {[1, 2, 3, 4, 5].map((image) => (
        <Image id={image} />
      ))}
    </>
  );
}
