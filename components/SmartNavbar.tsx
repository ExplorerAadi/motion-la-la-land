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
import { BlogContent } from "./DummyContent";

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
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-white/[0.2] rounded-full bg-black z-[5000] px-12 py-4 items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={classNames(
              "relative text-neutral-50 items-center flex space-x-1 hover:text-neutral-300"
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
  const headingsRef = useRef<any[]>([]);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current === "number") {
      const direction = current! - scrollY.getPrevious()!;

      headingsRef.current?.forEach((el, idx) => {
        if (direction > 0) {
          if (
            current >= el.offsetTop &&
            current < headingsRef.current[idx + 1].offsetTop
          ) {
            el.classList.add("fixed");
          }
        } else {
          el.classList.add("fixed");
        }
      });
    }
  });

  useEffect(() => {
    const allH1s = document.querySelectorAll("h1");
    const allH2s = document.querySelectorAll("h2");
    const allHeadingsArr = Array.from(allH1s).concat(Array.from(allH2s));
    headingsRef.current = allHeadingsArr;
  }, []);

  return (
    <div>
      {colors.map((color, index) => (
        <Container
          key={color}
          bgColor={color}
          isVisible={visibleIdx === index}
          allOffsetTops={allOffsetTops}
          setAllOffsetTops={setAllOffsetTops}
        />
      ))}
      <BlogContent />
      {/* <div className="h-32 bg-gray-100"></div> */}
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
