"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

enum EXPANDED_STATE {
  COLLAPSED,
  EXPANDED_1,
  EXPANDED_2,
}

export const PrivateIsland = () => {
  const [expandedStage, setExpandedStage] = useState<EXPANDED_STATE>(
    EXPANDED_STATE.COLLAPSED
  );

  useEffect(() => {
    const timer = setTimeout(
      () => setExpandedStage(EXPANDED_STATE.EXPANDED_1),
      1000
    );

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen cursor-pointer">
      <AnimatePresence mode="wait">
        {expandedStage === EXPANDED_STATE.COLLAPSED && (
          <BaseDynamicIsland setExpandedStage={setExpandedStage} />
        )}
        {expandedStage === EXPANDED_STATE.EXPANDED_1 && (
          <ExpandedStageOne setExpandedStage={setExpandedStage} />
        )}
        {expandedStage === EXPANDED_STATE.EXPANDED_2 && (
          <ExpandedStageTwo setExpandedStage={setExpandedStage} />
        )}
      </AnimatePresence>
    </div>
  );
};

const BaseDynamicIsland = ({
  setExpandedStage,
}: {
  setExpandedStage: (value: EXPANDED_STATE) => void;
}) => {
  return (
    <motion.button
      className="bg-black text-white flex justify-between items-center space-x-2 w-[100px] h-7"
      onClick={() => setExpandedStage(EXPANDED_STATE.EXPANDED_1)}
      layoutId="expand-stage-1"
      style={{ borderRadius: 999 }}
    ></motion.button>
  );
};

const ExpandedStageOne = ({
  setExpandedStage,
}: {
  setExpandedStage: (value: EXPANDED_STATE) => void;
}) => {
  const variants = {
    leftElementHidden: { opacity: 0, scale: 0.5, transformOrigin: "left" },
    rightElementHidden: { opacity: 0, scale: 0.5, transformOrigin: "right" },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
  };

  return (
    <motion.div
      className="p-2.5 bg-black text-white flex justify-between items-center space-x-2"
      layoutId="expand-stage-1"
      style={{ borderRadius: 999 }}
    >
      <motion.button
        className="w-9 h-9 bg-slate-600"
        onClick={() => setExpandedStage(EXPANDED_STATE.COLLAPSED)}
        style={{ borderRadius: 999 }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.4, type: "spring" }}
      ></motion.button>
      <motion.div
        className="flex flex-col pr-16 justify-center"
        variants={variants}
        initial="leftElementHidden"
        animate="visible"
        exit="leftElementHidden"
        transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
        key="options-1"
      >
        <p className="text-sm text-slate-500 leading-tight">Hello, I&apos;m</p>
        <h3 className="text-base text-white leading-tight">Aditya</h3>
      </motion.div>
      <motion.div
        className="flex justify-center space-x-2"
        variants={variants}
        initial="rightElementHidden"
        animate="visible"
        exit="rightElementHidden"
        transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
        key="options-2"
      >
        <button
          className="w-9 h-9 bg-[#F57202] p-2"
          style={{ borderRadius: 999 }}
          onClick={() => setExpandedStage(EXPANDED_STATE.EXPANDED_2)}
        >
          <MagnifyingGlassIcon />
        </button>
        <button
          className="w-9 h-9 bg-[#008BF5] p-2"
          style={{ borderRadius: 999 }}
        >
          <MoreIcon />
        </button>
      </motion.div>
    </motion.div>
  );
};

const ExpandedStageTwo = ({
  setExpandedStage,
}: {
  setExpandedStage: (value: EXPANDED_STATE) => void;
}) => {
  return (
    <motion.button
      className="px-5 py-6 bg-black text-white h-[200px] min-w-96 max-w-96"
      layoutId="expand-stage-1"
      style={{ borderRadius: 36 }}
      onClick={() => setExpandedStage(EXPANDED_STATE.EXPANDED_1)}
    >
      <div className="">aditya</div>
    </motion.button>
  );
};

const MoreIcon = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
      />
    </motion.svg>
  );
};

const MagnifyingGlassIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6"
      />
    </svg>
  );
};
