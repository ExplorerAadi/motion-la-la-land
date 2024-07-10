"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export const PrivateIsland = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex items-center justify-center w-full h-screen cursor-pointer">
      {isExpanded ? (
        <motion.div
          className="p-2 bg-black text-white flex justify-between items-center space-x-2"
          layoutId="expand-stage-1"
          style={{ borderRadius: 999 }}
        >
          <motion.button
            className="w-9 h-9 bg-slate-600"
            onClick={() => setIsExpanded(false)}
            style={{ borderRadius: 999 }}
            layoutId="expand-stage-1-profile-pic"
          ></motion.button>
          <div className="flex flex-col pr-24 justify-center">
            <p className="text-sm text-slate-500 leading-tight">
              Hello, I&apos;m
            </p>
            <h3 className="text-base text-white leading-tight">Aditya</h3>
          </div>
          <div className="w-9 h-9 bg-green-500 rounded-full p-2">
            <MoreIcon />
          </div>
        </motion.div>
      ) : (
        <motion.button
          className="p-1 bg-black text-white flex justify-between items-center space-x-2"
          onClick={() => setIsExpanded(true)}
          layoutId="expand-stage-1"
          style={{ borderRadius: 999 }}
        >
          <motion.div
            className="w-6 h-6 bg-slate-600"
            style={{ borderRadius: 999 }}
            layoutId="expand-stage-1-profile-pic"
          ></motion.div>
          <div className="w-6 h-6 bg-green-500 rounded-full p-1">
            <PlusIcon />
          </div>
        </motion.button>
      )}
    </div>
  );
};

const PlusIcon = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      whileHover={{ rotate: 360 }}
      // transition={{ repeat: 5, duration: 0.5 }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </motion.svg>
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
      // whileHover={{ rotate: 360 }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
      />
    </motion.svg>
  );
};
