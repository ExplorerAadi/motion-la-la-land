"use client";

import { TypewriterEffect } from "./TypewriterEffect";

export default function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Build",
    },
    {
      text: "fast,",
    },
    {
      text: "ship",
    },
    {
      text: "faster...",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="py-8">
        <TypewriterEffect words={words} />
      </div>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Get Started
        </button>
        <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
          Login
        </button>
      </div>
    </div>
  );
}
