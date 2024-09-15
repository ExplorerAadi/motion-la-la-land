"use client";

import { useState } from "react";
import { AddIcon } from "../../public/icons/AddIcon";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";

const CTAMorphEffect = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <MotionConfig transition={{ duration: 0.2 }}>
      <div className="relative h-screen w-full bg-black">
        <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center">
          <div className="w-32 flex items-center justify-end">
            <div></div>
            <motion.div
              style={{ direction: "rtl" }}
              initial={{ width: 54 }}
              //   animate={{
              //     width: isHovered ? 93.37 : 54,
              //   }}
            >
              <motion.button
                className="text-white text-xl px-4 h-10 border flex items-center justify-center w-full shrink-0 min-w-fit"
                style={{ borderRadius: "999px" }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                layout
                animate={{
                  backgroundColor: isHovered ? "#fff" : "#000",
                  color: isHovered ? "#000" : "#fff",
                }}
              >
                <motion.div className="h-5 w-5">
                  <AddIcon />
                </motion.div>
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      className="text-md pr-1"
                      initial={{ x: 0, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Add
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
};

export default CTAMorphEffect;

// Trial #1
{
  /* <div className="relative h-screen w-full bg-black">
      <motion.div
        className="absolute inset-0 z-10 flex h-full w-full items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{
          transition: { duration: 0.3 },
        }}
      >
        {isHovered ? (
          <motion.button
            className="text-white text-xl px-8 py-3 border flex items-center justify-center"
            style={{ borderRadius: "999px" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            layoutId="add-icon"
          >
            <p>Add</p>
            <AddIcon className="w-6 h-6" />
          </motion.button>
        ) : (
          <motion.button
            className="text-white text-xl p-3 border flex items-center justify-center"
            style={{ borderRadius: "999px" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            layoutId="add-icon"
          >
            <AddIcon className="w-6 h-6" />
          </motion.button>
        )}
      </motion.div>
    </div> */
}
