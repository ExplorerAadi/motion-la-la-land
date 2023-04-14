"use client";

import { motion, useCycle } from "framer-motion";

const Path = (props: any) => (
  <motion.path
    fill="currentColor"
    strokeWidth="3"
    stroke="white"
    strokeLinecap="round"
    {...props}
  />
);

export const HamburgerInteraction = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="min-h-screen w-full flex items-center justify-center"
      variants={{
        closed: { backgroundColor: "#2563eb" },
        open: { backgroundColor: "#7c3aed", transition: { delay: 0.2 } },
      }}
    >
      <button onClick={() => toggleOpen()}>
        <svg width="64" height="72" viewBox="0 0 23 23">
          <Path
            d="M 2 2.5 L 20 2.5"
            variants={{
              closed: { y: 0, opacity: 1 },
              open: { y: 7, opacity: 0 },
            }}
            transition={{
              duration: 0.2,
              type: "spring",
              stiffness: 500,
              damping: 20,
            }}
          />
          <Path
            variants={{
              closed: {
                d: "M 2 16.346 L 20 16.346",
                transition: { duration: 0.2, type: "spring" },
              },
              open: {
                d: "M 3 2.5 L 17 16.346",
                transition: {
                  delay: 0.2,
                  type: "spring",
                  stiffness: 500,
                  damping: 20,
                },
              },
            }}
          />
          <Path
            variants={{
              closed: {
                y: 0,
                d: "M 2 9.423 L 20 9.423",
                transition: { duration: 0.2, type: "spring" },
              },
              open: {
                d: "M 3 16.5 L 17 2.5",
                transition: {
                  delay: 0.2,
                  type: "spring",
                  stiffness: 500,
                  damping: 20,
                },
              },
            }}
          />
        </svg>
      </button>
    </motion.div>
  );
};

export default HamburgerInteraction;
