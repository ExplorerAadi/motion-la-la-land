"use client";

import { useState } from "react";
import { AddIcon } from "../../public/icons/AddIcon";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";

const CTAMorphEffect = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <MotionConfig transition={{ duration: 0.4 }}>
      <div className="relative h-screen w-full bg-black">
        <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center">
          <div className="w-24 flex items-center justify-end">
            <div></div>
            <motion.div style={{ direction: "rtl" }}>
              <motion.button
                className="text-white text-xl p-4 h-10 border flex items-center justify-center w-full shrink-0 min-w-fit"
                style={{ borderRadius: "999px" }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                layout
                animate={{
                  backgroundColor: isHovered ? "#fff" : "#000",
                  color: isHovered ? "#000" : "#fff",
                  width: isHovered ? 93.37 : 54,
                }}
              >
                <motion.div layout="position" className="h-5 w-5">
                  <AddIcon />
                </motion.div>
                <AnimatePresence>
                  {isHovered ? (
                    <motion.div
                      layout="position"
                      className="text-md pr-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { delay: 0.2 } }}
                    >
                      Add
                    </motion.div>
                  ) : (
                    <div />
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
