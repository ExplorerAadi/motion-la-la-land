"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
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
      let direction = current! - scrollYProgress.getPrevious()!;

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
  const [isVisible, setIsVisible] = useState(0);

  return (
    <div>
      {["bg-violet-300", "bg-pink-300", "bg-blue-300", "bg-orange-300"].map(
        (color, index) => (
          <Container bgColor={color} hideStickyHeader={index === 0} isVisible={isVisible} setIsVisible={setIsVisible} index={index} />
        )
      )}
    </div>
  );
};

const Container = ({
  isVisible,
  setIsVisible,
  index,
  bgColor,
  hideStickyHeader,
}: {
  isVisible: number;
  setIsVisible: (value: number) => void;
  index: number;
  bgColor: string;
  hideStickyHeader?: boolean;
}) => {
  const { ref, inView } = useInView({ threshold: 0.7 });
  console.log(isVisible, index, inView)

  useEffect(() => {
    if (inView && index < (isVisible + 1)) {
      setIsVisible(index);
    } else if (!inView && isVisible === index) {
      setIsVisible(0);
    }
  }, [inView, index])

  return (
    <div ref={ref} className={classNames("h-screen w-full", bgColor)}>
      {!hideStickyHeader && (
        <div
          className={classNames(
            "h-20 border-b border-b-white w-full",
            bgColor,
            isVisible === index ? "fixed top-0" : ""
          )}
        ></div>
      )}
    </div>
  );
};

// Sticky navbar that only shows when scrolled up or when scrolled till the top
// Another navbar like container to show the current content section and gets hidden when the actual navbar shows up
// Calculate the offset of current container in viewport from the top of window and when it nears 0, attach the fixed class to it and remove the previous node's fixed class.
