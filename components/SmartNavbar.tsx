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
      {colors.map(
        (color, index) => (
          <Container
            bgColor={color}
            lastIndex={colors.length - 1}
            currentIndex={index}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
          />
        )
      )}
    </div>
  );
};

const Container = ({
  bgColor,
  lastIndex,
  currentIndex,
  isVisible,
  setIsVisible,
}: {
  bgColor: string;
  lastIndex: number;
  currentIndex: number;
  isVisible: number;
  setIsVisible: (value: number) => void;
}) => {
  const { ref, inView } = useInView({ threshold: 0.01 });
  const isFirstIndex = currentIndex === 0;

  useEffect(() => {
    if (inView && isVisible !== currentIndex) {
      setIsVisible(currentIndex);
    } else if (!inView && isVisible === currentIndex) {
      setIsVisible(0);
    }
  }, [inView, currentIndex]);

  return (
    <div ref={ref} className={classNames("h-screen w-full", bgColor)}>
      {!isFirstIndex && (
        <motion.div
          initial={{
            opacity: 1,
            y: -100,
          }}
          animate={{
            y: isVisible === currentIndex + 1 && currentIndex + 1 !== lastIndex ? 0 : -100,
            opacity: isVisible === currentIndex + 1 && currentIndex + 1 !== lastIndex ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className={classNames(
            "h-20 border-b border-b-white w-full fixed top-0",
            bgColor
          )}
        ></motion.div>
      )}
    </div>
  );
};

// Sticky navbar that only shows when scrolled up or when scrolled till the top
// Another navbar like container to show the current content section and gets hidden when the actual navbar shows up
// Calculate the offset of current container in viewport from the top of window and when it nears 0, attach the fixed class to it and remove the previous node's fixed class.
