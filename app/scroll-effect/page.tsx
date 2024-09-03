"use client";

import {
  useScroll,
  motion,
  useTransform,
  useSpring,
  useVelocity,
  useMotionValue,
} from "framer-motion";
import { useEffect, useRef } from "react";

export default function ScrollEffectPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollY = useMotionValue(0);
  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        scrollY.set(scrollTop);
        scrollProgress.set(scrollTop / (scrollHeight - clientHeight));
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollY, scrollProgress]);

  const smoothProgress = useSpring(scrollProgress, {
    damping: 15,
    stiffness: 100,
  });

  const scale = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.95, 1]);
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [0, 5, 0]);
  const opacity = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.8, 1]);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-scroll"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="relative"
        style={{
          scale,
          rotateX,
          opacity,
          transformOrigin: "center center",
        }}
      >
        <div className="flex px-8 py-4">
          <div className="w-1/5">
            <ul>
              {categories.map((category) => (
                <li
                  key={category}
                  className="mb-2 text-gray-600 hover:text-black cursor-pointer"
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-4/5 grid grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="mb-8">
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
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const categories = [
  "ALL",
  "LIVING ROOM",
  "KITCHEN",
  "BEDROOM",
  "BATHROOM",
  "DINING ROOM",
  "HOME OFFICE",
  "OUTDOOR SPACES",
];

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
