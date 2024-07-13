"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

enum EXPANDED_STATE {
  COLLAPSED,
  EXPANDED_1,
  EXPANDED_2,
  EXPANDED_3,
}

const variants = {
  leftElementHidden: {
    opacity: 0,
    scale: 0.5,
    x: -5,
    transformOrigin: "left",
  },
  rightElementHidden: {
    opacity: 0,
    scale: 0.5,
    x: 5,
    transformOrigin: "right",
  },
  elementHidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
};

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
    <div className="flex items-center justify-center w-full h-screen cursor-pointer font-[Inter]">
      <AnimatePresence>
        {expandedStage === EXPANDED_STATE.COLLAPSED && (
          <BaseDynamicIsland setExpandedStage={setExpandedStage} />
        )}
        {expandedStage === EXPANDED_STATE.EXPANDED_1 && (
          <ExpandedStageOne setExpandedStage={setExpandedStage} />
        )}
        {expandedStage === EXPANDED_STATE.EXPANDED_2 && (
          <ExpandedStageTwo setExpandedStage={setExpandedStage} />
        )}
        {expandedStage === EXPANDED_STATE.EXPANDED_3 && (
          <ExpandedStageThree setExpandedStage={setExpandedStage} />
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
      layoutId="island-container"
      style={{ borderRadius: 36 }}
    ></motion.button>
  );
};

const ExpandedStageOne = ({
  setExpandedStage,
}: {
  setExpandedStage: (value: EXPANDED_STATE) => void;
}) => {
  return (
    <motion.div
      className="p-2.5 bg-black text-white flex justify-between items-center space-x-2"
      layoutId="island-container"
      style={{ borderRadius: 36 }}
    >
      <motion.button
        className="w-9 h-9 bg-slate-600"
        onClick={() => setExpandedStage(EXPANDED_STATE.COLLAPSED)}
        style={{ borderRadius: 999 }}
        variants={variants}
        initial="leftElementHidden"
        animate="visible"
        exit="leftElementHidden"
        transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
      ></motion.button>
      <motion.div
        className="flex flex-col pr-12 justify-center"
        variants={variants}
        initial="leftElementHidden"
        animate="visible"
        exit="leftElementHidden"
        transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
        key="options-1"
      >
        <p className="text-xs text-neutral-500 leading-tight">
          Hello, I&apos;m
        </p>
        <h3 className="text-sm text-white leading-tight">Aditya</h3>
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
          onClick={() => setExpandedStage(EXPANDED_STATE.EXPANDED_3)}
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
      className="px-6 py-5 bg-black text-white h-[200px] min-w-96 max-w-96 flex flex-col justify-center items-start"
      layoutId="island-container"
      style={{ borderRadius: 36 }}
      onClick={() => setExpandedStage(EXPANDED_STATE.EXPANDED_1)}
    >
      <motion.p
        className="text-sm text-neutral-500 text-left leading-normal tracking-tight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        It's been 12 years since I got into design. I now have clear principles,
        the main one being "value instead of mindless execution". It's easy to
        print generic solutions, but what we designers are hired for is our
        unique point of view and creative thinking. Usability combined with
        aesthetics is the key to memorable and enjoyable products. This is what
        I've been applying in my design agency ↗ since day one.
      </motion.p>
    </motion.button>
  );
};

const ExpandedStageThree = ({
  setExpandedStage,
}: {
  setExpandedStage: (value: EXPANDED_STATE) => void;
}) => {
  return (
    <motion.button
      className="bg-black text-white flex justify-between items-center space-x-2 h-7 p-1"
      layout
      // layoutId="island-container"
      style={{ borderRadius: 36 }}
      variants={variants}
      initial="elementHidden"
      animate="visible"
      exit="elementHidden"
      // transition={{ duration: 0.4, type: "spring" }}
    >
      <motion.button
        className="px-1.5 py-1"
        onClick={() => setExpandedStage(EXPANDED_STATE.EXPANDED_1)}
      >
        <ArrowLeftIcon className="w-4 h-4" />
      </motion.button>
      <motion.button className="px-1.5 py-1">
        <DribbleIcon className="w-4 h-4" />
      </motion.button>
      <motion.button className="px-1.5 py-1">
        <YoutubeIcon className="w-4 h-4" />
      </motion.button>
      <motion.button className="px-1.5 py-1">
        <GithubIcon className="w-4 h-4" />
      </motion.button>
    </motion.button>
  );
};

const MoreIcon = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
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

const ArrowLeftIcon = ({ className }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
      />
    </svg>
  );
};

const DribbleIcon = ({ className }: { className: string }) => {
  return (
    <svg
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth={2}
      className={className}
    >
      <circle cx="64" cy="63.5" r="54" />
      <path d="M87.58,107.72c-19.67-70.09-39.34-91-39.34-91" />
      <path d="M11.94,56.46S77.6,62.39,99.42,29.13" />
      <path d="M29.73,100s24.21-48.65,85.94-33.67" />
    </svg>
  );
};

const GithubIcon = ({ className }: { className: string }) => {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
    >
      <path d="M16,3a13,13,0,0,0-3.46,25.53,1,1,0,1,0,.53-1.92,11,11,0,1,1,7-.4,15.85,15.85,0,0,0-.3-3.92A6.27,6.27,0,0,0,24.68,16a6.42,6.42,0,0,0-1.05-3.87,7.09,7.09,0,0,0-.4-3.36,1,1,0,0,0-1.1-.67,8,8,0,0,0-3.37,1.28A11.35,11.35,0,0,0,16,9a13.09,13.09,0,0,0-3,.43A5.74,5.74,0,0,0,9.62,8.25a1,1,0,0,0-1,.66,7.06,7.06,0,0,0-.37,3.19A7.15,7.15,0,0,0,7.2,16a6.66,6.66,0,0,0,5,6.28,7.43,7.43,0,0,0-.15.79c-1,.06-1.58-.55-2.32-1.48a3.45,3.45,0,0,0-1.94-1.53,1,1,0,0,0-1.15.76A1,1,0,0,0,7.35,22c.16,0,.55.52.77.81a4.74,4.74,0,0,0,3.75,2.25,4.83,4.83,0,0,0,1.3-.18h0a1,1,0,0,0,.29-.14l0,0a.72.72,0,0,0,.18-.21.34.34,0,0,0,.08-.09.85.85,0,0,0,.06-.17,1.52,1.52,0,0,0,.06-.2v0a4.11,4.11,0,0,1,.46-1.91,1,1,0,0,0-.76-1.65A4.6,4.6,0,0,1,9.2,16a4.84,4.84,0,0,1,.87-3,1,1,0,0,0,.24-.83,5,5,0,0,1,0-1.85,3.59,3.59,0,0,1,1.74.92,1,1,0,0,0,1,.23A12.49,12.49,0,0,1,16,11a9.91,9.91,0,0,1,2.65.43,1,1,0,0,0,1-.18,5,5,0,0,1,2-1,4.11,4.11,0,0,1,0,1.91,1.05,1.05,0,0,0,.32,1A4,4,0,0,1,22.68,16a4.29,4.29,0,0,1-4.41,4.46,1,1,0,0,0-.94.65,1,1,0,0,0,.28,1.11c.59.51.5,4,.47,5.36a1,1,0,0,0,.38.81,1,1,0,0,0,.62.21,1.07,1.07,0,0,0,.25,0A13,13,0,0,0,16,3Z" />
    </svg>
  );
};

const YoutubeIcon = ({ className }: { className: string }) => {
  return (
    <svg
      viewBox="0 0 128 128"
      stroke="currentColor"
      strokeWidth={2}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M64,32.29c.23,0,22.92,0,37.9,1.08l.66.06c2,.18,4.16.39,6.28,2.58l0,0,0,0c1,1,2.14,4.54,2.53,7.07a156,156,0,0,1,1,16.71v8.24a156.82,156.82,0,0,1-1,16.72c-.37,2.47-1.54,6.06-2.52,7l0,0,0,0c-2.11,2.18-4.32,2.39-6.27,2.58l-.68.07c-14.72,1-36.89,1.1-37.89,1.1-1.15,0-28-.27-36.57-1-.51-.08-1-.15-1.58-.21-2.28-.27-4.87-.58-6.73-2.51l0,0,0,0c-1-1-2.14-4.53-2.52-7.05a156,156,0,0,1-1-16.71V59.86a156.79,156.79,0,0,1,1-16.71c.39-2.55,1.55-6.09,2.53-7.07l0,0,0,0c2.12-2.19,4.33-2.39,6.28-2.58l.66-.06c15-1.07,37.67-1.08,37.89-1.08H64m0-6.5H64s-23.09,0-38.48,1.1c-2.15.25-6.83.27-11,4.59-3.29,3.3-4.37,10.79-4.37,10.79A162.25,162.25,0,0,0,9,59.86V68.1a162.19,162.19,0,0,0,1.1,17.59s1.07,7.49,4.37,10.78c4.19,4.32,9.68,4.19,12.13,4.65,8.8.83,37.4,1.09,37.4,1.09s23.11,0,38.51-1.13c2.15-.25,6.84-.28,11-4.6,3.29-3.29,4.37-10.78,4.37-10.78A162.26,162.26,0,0,0,119,68.11V59.87a162.27,162.27,0,0,0-1.1-17.59s-1.07-7.49-4.37-10.79c-4.18-4.32-8.87-4.35-11-4.59C87.11,25.79,64,25.79,64,25.79Z" />
      <polygon points="54.13 47.61 54.13 80.39 82.12 64 54.13 47.61" />
    </svg>
  );
};
