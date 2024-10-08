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

export const SmartNavbar = () => {
  return (
    <div className="relative w-full bg-[#010101]">
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
  const { scrollY } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollY.getPrevious()!;

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
          opacity: 0,
          y: -40,
        }}
        animate={{
          y: visible ? 0 : -40,
          opacity: visible ? 1 : 0,
        }}
        exit={{
          opacity: 0,
          y: -40,
        }}
        transition={{
          duration: 0.4,
          ease: [0.42, 0, 0.58, 1], // Custom cubic-bezier easing
        }}
        className={classNames(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-white/[0.2] rounded-full bg-black z-[5000] px-12 py-4 items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <motion.div
            key={`link=${idx}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }} // Staggered animation
          >
            <Link
              href={navItem.link}
              className={classNames(
                "relative text-neutral-50 items-center flex space-x-1 hover:text-neutral-300"
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden sm:block">{navItem.name}</span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export const FloatingContainers = () => {
  const { scrollY } = useScroll();
  const headingsRef = useRef<any[]>([]);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current === "number") {
      const direction = current! - scrollY.getPrevious()!;
      const lastIndex = headingsRef.current?.length - 1;

      headingsRef.current?.forEach((el, idx) => {
        if (direction > 0) {
          if (
            current >= el.offsetTop &&
            ((idx < lastIndex &&
              current < headingsRef.current[idx + 1].offsetTop) ||
              idx === lastIndex)
          ) {
            el.classList.add("stick");
          }
        } else {
          el.classList.remove("stick");
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
    <div className="pt-16 bg-[#010101] scroll-smooth">
      <BlogContent />
    </div>
  );
};
