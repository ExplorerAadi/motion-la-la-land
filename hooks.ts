"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return mousePosition;
};

export const useOffsets = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [offsets, setOffsets] = useState({ offsetTop: 0, offsetLeft: 0 });
  useLayoutEffect(() => {
    if (ref.current) {
      setOffsets({
        offsetTop: ref.current.offsetTop,
        offsetLeft: ref.current.offsetLeft,
      });
    }

    window.addEventListener("resize", () => {
      if (ref.current) {
        setOffsets({
          offsetTop: ref.current.offsetTop,
          offsetLeft: ref.current.offsetLeft,
        });
      }
    });

    return () => {
      window.removeEventListener("resize", () => {
        if (ref.current) {
          setOffsets({
            offsetTop: ref.current.offsetTop,
            offsetLeft: ref.current.offsetLeft,
          });
        }
      });
    };
  }, [ref.current]);

  return { ref, offsets };
};
