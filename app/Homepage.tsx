"use client";

import { motion } from "framer-motion";
import { Card } from "../components/Card";
import { Spotlight } from "../components/Spotlight";
import { cloudinaryDomain } from "../utils";

export const Homepage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-neutral-950 min-h-screen">
      <Spotlight className="-top-[10%] left-[15%] md:top-0" />
      <motion.h1
        initial={{ opacity: 0, y: 120 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="pb-20 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-semibold tracking-tight text-transparent md:text-7xl mt-28"
      >
        Motion La La Land
      </motion.h1>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-12">
        <Card
          title="Private Island"
          description="A private island of links and bio based on the dynamic island concept of iPhones."
          media={"/Private Island Demo.mp4"}
          redirectLabel="Demo"
          redirectLink="/private-island"
        />
        <Card
          title="Deck of Cards"
          description="A deck of cards that can be shuffled using the mouse and flipped to reveal projects."
          media={"/Card Deck Video.mp4"}
          redirectLabel="Demo"
          redirectLink="/stacked-cards"
        />
        <Card
          title="Art Gallery"
          description="An art gallery with images arranged in a masonry grid and an iPhone like opening closing animation."
          media={"/Art Gallery.mp4"}
          redirectLabel="Demo"
          redirectLink="/modal-animation"
        />
        <Card
          title="Smart Navbar"
          description="Stick the heading of the section in viewport to the top, super helpful when reading a blog post or a long article."
          media={"/Smart Navbar Demo.mp4"}
          redirectLabel="Demo"
          redirectLink="/smart-navbar"
        />
        <Card
          title="Menu Interaction"
          description="A hamburger menu created by only animating the svg paths and can be used to toggle the open/close state of sidebar menus."
          media={"/Menu SVG.mp4"}
          redirectLabel="Demo"
          redirectLink="/menu-animation"
        />
        {/* <Card
          title="Image Reveal Effect"
          description="Hiding a secret image behind the content being shown on the screen that can be revealed in multiple ways, here I am using mouse hover and click to reveal it."
          media="/image-reveal-on-hover.mp4"
          redirectLabel="Demo"
          redirectLink="/image-reveal-on-hover"
        /> */}
        <Card
          title="Mask Image Effect"
          description="Hiding a text/image behind the content being shown on the screen that can be revealed in multiple ways, here I am using mouse hover."
          media={"/Mouse Tracking Video.mp4"}
          redirectLabel="Demo"
          redirectLink="/mask-image-effect"
        />
        {/* <RedirectLink label="Custom Animation" href="/custom-animation" /> */}
        {/* <RedirectLink label="Stateless Animation" href="/stateless-animation" /> */}
      </div>
    </div>
  );
};
