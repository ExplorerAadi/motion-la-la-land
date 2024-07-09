"use client";
import { motion } from "framer-motion";

export const PrivateIsland = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen cursor-pointer">
      <div className="p-1 rounded-full bg-black text-white flex justify-between items-center space-x-2">
        <button className="w-6 h-6 bg-slate-600 rounded-full"></button>
        <motion.button
          className="w-6 h-6 bg-green-500 rounded-full p-1"
          animate={{ rotate: 360 }}
          transition={{ repeat: 5, duration: 0.5 }}
        >
          <PlusIcon />
        </motion.button>
      </div>
    </div>
  );
};

const PlusIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
};
