"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Link from "next/link";
import { classNames } from "../utils";

const navItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Blog",
    link: "/blog",
  },
  {
    name: "Projects",
    link: "/projects",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

const colors = ["bg-violet-300", "bg-pink-300", "bg-blue-300", "bg-orange-300"];

export const SmartNavbar = () => {
  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
      <FloatingContainers />
    </div>
  );
};

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;

      if (direction < 0) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={classNames(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white z-[5000] px-12 py-4 items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={classNames(
              "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block">{navItem.name}</span>
          </Link>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export const FloatingContainers = () => {
  const [visibleIdx, setVisibleIdx] = useState(-1);
  const [allOffsetTops, setAllOffsetTops] = useState<Set<number>>(new Set());
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current === "number") {
      const direction = current! - scrollY.getPrevious()!;
      const allOffsetTopsArr = Array.from(allOffsetTops!);

      if (direction > 0) {
        allOffsetTopsArr.forEach((offset, idx) => {
          if (idx === 0 && current >= 90 && current < allOffsetTopsArr[idx + 1]) {
            setVisibleIdx(idx);
          } else if (current >= offset && current < allOffsetTopsArr[idx + 1]) {
            setVisibleIdx(idx);
          } else if (current >= offset && idx === allOffsetTopsArr.length - 1) {
            setVisibleIdx(idx);
          }
        });
      } else {
        setVisibleIdx(-1);
      }
    }
  });

  return (
    <div>
      {colors.map((color, index) => (
        <Container
          bgColor={color}
          isVisible={visibleIdx === index}
          allOffsetTops={allOffsetTops}
          setAllOffsetTops={setAllOffsetTops}
        />
      ))}
      <div className="h-screen / 2 bg-gray-200"></div>
    </div>
  );
};

const Container = ({
  bgColor,
  isVisible,
  allOffsetTops,
  setAllOffsetTops,
}: {
  bgColor: string;
  isVisible: boolean;
  allOffsetTops: Set<number>;
  setAllOffsetTops: (value: Set<number>) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      console.log(ref.current.offsetTop);
      setAllOffsetTops(allOffsetTops.add(ref.current.offsetTop));
    }
  }, [ref.current]);

  return (
    <motion.div ref={ref} className={classNames("h-screen w-full", bgColor)}>
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={classNames(
          "h-20 border-b border-b-white w-full fixed top-0",
          bgColor
        )}
      ></motion.div>
    </motion.div>
  );
};
