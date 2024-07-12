"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const PrivateIsland = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsExpanded(true), 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen cursor-pointer">
      {isExpanded ? (
        <ExpandedStageOne setIsExpanded={setIsExpanded} />
      ) : (
        <BaseDynamicIsland setIsExpanded={setIsExpanded} />
      )}
    </div>
  );
};

const BaseDynamicIsland = ({
  setIsExpanded,
}: {
  setIsExpanded: (value: boolean) => void;
}) => {
  return (
    <motion.button
      className="bg-black text-white flex justify-between items-center space-x-2 w-[100px] h-7"
      onClick={() => setIsExpanded(true)}
      layoutId="expand-stage-1"
      style={{ borderRadius: 999 }}
    ></motion.button>
  );
};

const ExpandedStageOne = ({
  setIsExpanded,
}: {
  setIsExpanded: (value: boolean) => void;
}) => {
  return (
    <motion.div
      className="p-2.5 bg-black text-white flex justify-between items-center space-x-2"
      layoutId="expand-stage-1"
      style={{ borderRadius: 999 }}
    >
      <motion.button
        className="w-9 h-9 bg-slate-600"
        onClick={() => setIsExpanded(false)}
        style={{ borderRadius: 999 }}
      ></motion.button>
      <div className="flex flex-col pr-16 justify-center">
        <p className="text-sm text-slate-500 leading-tight">Hello, I&apos;m</p>
        <h3 className="text-base text-white leading-tight">Aditya</h3>
      </div>
      <div className="flex justify-center space-x-2">
        <motion.button
          className="w-9 h-9 bg-[#F57202] p-2"
          style={{ borderRadius: 999 }}
        >
          <MagnifyingGlassIcon />
        </motion.button>
        <motion.button
          className="w-9 h-9 bg-[#008BF5] p-2"
          style={{ borderRadius: 999 }}
        >
          <MoreIcon />
        </motion.button>
      </div>
    </motion.div>
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
