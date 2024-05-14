"use client";

import { useAnimate } from "framer-motion";

export const CustomAnimation = () => {
  return (
    <div className="grid h-screen place-content-center">
      <Basic />
    </div>
  );
};

const Basic = () => {
  const [scope, animate] = useAnimate();

  const handleAnimate = async () => {
    await animate("div", { x: 200 });
    await animate("div", { y: 200, rotate: 360 }, { duration: 0.5 });
    await animate("div", { borderRadius: "100%" });
    await animate("div", {
      x: -150,
      borderRadius: "25px",
      rotate: 180,
      backgroundColor: "red",
    });
    await animate(
      "div",
      {
        y: 0,
        borderRadius: "0",
        rotate: 0,
      },
      {
        duration: 0.5,
      },
    );
    await animate("div", {
      x: 0,
      backgroundColor: "green",
    });
  };

  return (
    <div ref={scope}>
      <div className="h-32 w-32 bg-[green] rounded-md"></div>
      <button
        className="mt-4 p-4 bg-slate-900 text-white rounded-md"
        onClick={handleAnimate}
      >
        Trigger Animation
      </button>
    </div>
  );
};
