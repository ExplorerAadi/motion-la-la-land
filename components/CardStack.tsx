"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

const BaseCard = ({
  index,
  xPercent,
  yPercent,
}: {
  index: number;
  xPercent: string;
  yPercent: string;
}) => {
  const [point, setPoint] = useState({
    x: (Number(xPercent) / 100) * window?.innerWidth,
    y: (Number(yPercent) / 100) * window?.innerHeight,
  });

  console.log(point);

  return (
    <motion.div
      drag={true}
      dragMomentum={false}
      dragConstraints={{
        left: 0,
        right: window.innerWidth - 300,
        top: 0,
        bottom: window.innerHeight - 400,
      }}
      className="flex flex-col items-center justify-center bg-white rounded-lg w-72 h-96 shadow-xl"
      style={{ position: "absolute", top: 0, left: 0, x: point.x, y: point.y }}
      initial={{
        opacity: 0,
        y: 800,
      }}
      animate={{
        opacity: 1,
        y: point.y,
      }}
      transition={{ duration: 0.8, type: "spring", delay: 0.2 * index }}
      onDrag={(_, info) => {
        if (info.point.x > 200 || info.point.y > 200) {
          console.log(info);
          setPoint({
            x: info.point.x,
            y: info.point.y,
          });
        }
      }}
    >
      <h3 className="text-lg">The greatest trick</h3>
    </motion.div>
  );
};

export const BaseCardsStacked = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-950 overflow-hidden">
      <div className="relative h-full w-full" ref={ref}>
        <BaseCard key={1} index={0} xPercent="30" yPercent="41" />
        <BaseCard key={2} index={1} xPercent="36" yPercent="35" />
        <BaseCard key={3} index={2} xPercent="42" yPercent="29" />
        <BaseCard key={4} index={3} xPercent="48" yPercent="38" />
        <BaseCard key={5} index={4} xPercent="54" yPercent="44" />
      </div>
    </div>
  );
};
