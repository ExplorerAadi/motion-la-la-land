"use client";

import { motion, useTransform, useSpring, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ScrollEffectPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContentHeight(containerRef.current.scrollHeight);
      }
      setWindowHeight(window.innerHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    damping: scrollYProgress.getVelocity() > 0.2 ? 25 : 40,
    stiffness: scrollYProgress.getVelocity() > 0.2 ? 200 : 100,
  });

  const translateY = useTransform(
    smoothProgress,
    (value) => value * -(contentHeight - windowHeight)
  );

  return (
    <div className="w-full" ref={containerRef}>
      <motion.div
        className="flex h-full mx-auto p-4 max-w-6xl"
        style={{ y: contentHeight ? translateY : 0 }}
      >
        <div className="w-full grid grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div key={index} className="mb-8">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover mb-2"
              />
              <div className="text-xs text-gray-500 mb-1">
                {project.categories.join(" • ")}
              </div>
              <h3 className="text-lg font-bold">{project.title}</h3>
              {project.subtitle && (
                <p className="text-sm">{project.subtitle}</p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

interface Project {
  image: string;
  title: string;
  subtitle: string;
  categories: string[];
}

const projects: Project[] = [
  {
    image: "/home_img_1.jpg",
    title: "Cozy Bedroom Retreat",
    subtitle: "Tranquil Sleep Space",
    categories: ["BEDROOM"],
  },
  {
    image: "/home_img_2.jpg",
    title: "Cozy Living Room Design",
    subtitle: "Modern Comfort",
    categories: ["LIVING ROOM"],
  },
  {
    image: "/home_img_3.jpg",
    title: "Luxurious Living Room",
    subtitle: "Elegant Comfort",
    categories: ["LIVING ROOM"],
  },
  {
    image: "/home_img_4.jpg",
    title: "Elegant Drawing Room",
    subtitle: "Classic Sophistication",
    categories: ["LIVING ROOM"],
  },
  {
    image: "/home_img_5.jpg",
    title: "Cozy Bedroom",
    subtitle: "Relaxing Retreat",
    categories: ["BEDROOM"],
  },
  {
    image: "/home_img_6.jpg",
    title: "Elegant Drawing Room",
    subtitle: "Classic Sophistication",
    categories: ["LIVING ROOM"],
  },
  {
    image: "/home_img_1.jpg",
    title: "Cozy Bedroom Retreat",
    subtitle: "Tranquil Sleep Space",
    categories: ["BEDROOM"],
  },
  {
    image: "/home_img_2.jpg",
    title: "Cozy Living Room Design",
    subtitle: "Modern Comfort",
    categories: ["LIVING ROOM"],
  },
  {
    image: "/home_img_3.jpg",
    title: "Luxurious Living Room",
    subtitle: "Elegant Comfort",
    categories: ["LIVING ROOM"],
  },
  {
    image: "/home_img_4.jpg",
    title: "Elegant Drawing Room",
    subtitle: "Classic Sophistication",
    categories: ["LIVING ROOM"],
  },
  {
    image: "/home_img_5.jpg",
    title: "Cozy Bedroom",
    subtitle: "Relaxing Retreat",
    categories: ["BEDROOM"],
  },
  {
    image: "/home_img_6.jpg",
    title: "Elegant Drawing Room",
    subtitle: "Classic Sophistication",
    categories: ["LIVING ROOM"],
  },
  {
    image: "/home_img_1.jpg",
    title: "Cozy Bedroom Retreat",
    subtitle: "Tranquil Sleep Space",
    categories: ["BEDROOM"],
  },
  {
    image: "/home_img_2.jpg",
    title: "Cozy Living Room Design",
    subtitle: "Modern Comfort",
    categories: ["LIVING ROOM"],
  },
  {
    image: "/home_img_3.jpg",
    title: "Luxurious Living Room",
    subtitle: "Elegant Comfort",
    categories: ["LIVING ROOM"],
  },
  {
    image: "/home_img_4.jpg",
    title: "Elegant Drawing Room",
    subtitle: "Classic Sophistication",
    categories: ["LIVING ROOM"],
  },
  {
    image: "/home_img_5.jpg",
    title: "Cozy Bedroom",
    subtitle: "Relaxing Retreat",
    categories: ["BEDROOM"],
  },
  {
    image: "/home_img_6.jpg",
    title: "Elegant Drawing Room",
    subtitle: "Classic Sophistication",
    categories: ["LIVING ROOM"],
  },
];
