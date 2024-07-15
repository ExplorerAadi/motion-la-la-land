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
        key="profile-button"
      ></motion.button>
      <motion.div
        className="flex flex-col pr-12 justify-center"
        variants={variants}
        initial="leftElementHidden"
        animate="visible"
        exit="leftElementHidden"
        transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
        key="intro-text"
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
        key="options-button"
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
        key="bio"
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
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  return (
    <motion.div
      className="bg-black text-white"
      layoutId="island-container"
      style={{ borderRadius: 36 }}
    >
      <motion.div
        className="flex justify-center items-center p-1.5 space-x-1.5"
        variants={variants}
        initial="elementHidden"
        animate="visible"
        exit="elementHidden"
        key="options-menu"
        transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
      >
        {links.map((link, index) => (
          <motion.a
            layout
            className="inline-flex items-center relative z-10 px-2.5 h-6"
            style={{ borderRadius: 32 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(-1)}
            onClick={() => {
              link.title === links[0].title &&
                setExpandedStage(EXPANDED_STATE.EXPANDED_1);
            }}
          >
            {link.icon()}
            <AnimatePresence>
              {hoveredIndex === index && (
                <>
                  <motion.div
                    layout
                    className="absolute top-0 left-0 w-full h-full bg-zinc-700 -z-10"
                    style={{ borderRadius: 32 }}
                    variants={variants}
                    initial="elementHidden"
                    animate="visible"
                    exit="elementHidden"
                    key={`link-bg-${index}`}
                  ></motion.div>
                  <motion.span
                    layout
                    className="text-white pl-1.5 text-xs"
                    variants={variants}
                    initial="elementHidden"
                    animate="visible"
                    exit="elementHidden"
                    key={`link-text-${index}`}
                  >
                    {link.title}
                  </motion.span>
                </>
              )}
            </AnimatePresence>
          </motion.a>
        ))}
        {/* <motion.a className="inline-flex items-center">
          <span
            className="w-5 h-5 inline-block"
            style={{
              backgroundImage:
                "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iI0ZGRkZGRiI+PHBhdGggZD0iTTcuOTk5IDBDMy41ODIgMCAwIDMuNTk2IDAgOC4wMzJhOC4wMzEgOC4wMzEgMCAwIDAgNS40NzIgNy42MjFjLjQuMDc0LjU0Ni0uMTc0LjU0Ni0uMzg3IDAtLjE5MS0uMDA3LS42OTYtLjAxMS0xLjM2Ni0yLjIyNS40ODUtMi42OTUtMS4wNzctMi42OTUtMS4wNzctLjM2My0uOTI4LS44ODgtMS4xNzUtLjg4OC0xLjE3NS0uNzI3LS40OTguMDU0LS40ODguMDU0LS40ODguODAzLjA1NyAxLjIyNS44MjggMS4yMjUuODI4LjcxNCAxLjIyNyAxLjg3My44NzMgMi4zMjkuNjY3LjA3Mi0uNTE5LjI3OS0uODczLjUwOC0xLjA3NC0xLjc3Ni0uMjAzLTMuNjQ0LS44OTItMy42NDQtMy45NjkgMC0uODc3LjMxMi0xLjU5NC44MjQtMi4xNTYtLjA4My0uMjAzLS4zNTctMS4wMi4wNzgtMi4xMjUgMCAwIC42NzItLjIxNiAyLjIuODIzYTcuNjMzIDcuNjMzIDAgMCAxIDIuMDAzLS4yNyA3LjY1IDcuNjUgMCAwIDEgMi4wMDMuMjcxYzEuNTI3LTEuMDM5IDIuMTk4LS44MjMgMi4xOTgtLjgyMy40MzYgMS4xMDYuMTYyIDEuOTIyLjA4IDIuMTI1LjUxMy41NjIuODIyIDEuMjc5LjgyMiAyLjE1NiAwIDMuMDg1LTEuODcgMy43NjQtMy42NTIgMy45NjMuMjg3LjI0OC41NDMuNzM4LjU0MyAxLjQ4NyAwIDEuMDc0LS4wMSAxLjk0LS4wMSAyLjIwMyAwIC4yMTUuMTQ0LjQ2NS41NS4zODZBOC4wMzIgOC4wMzIgMCAwIDAgMTYgOC4wMzJDMTYgMy41OTYgMTIuNDE4IDAgNy45OTkgMHoiPjwvcGF0aD48L3N2Zz4=)",
            }}
          ></span>
          <span className="text-white pl-1 text-xs">Github</span>
        </motion.a>
        <motion.a className="inline-flex items-center">
          <span
            className="w-5 h-5 inline-block"
            style={{
              backgroundImage:
                "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgZGF0YS1uYW1lPSJMYXllciAxIiBpZD0iTGF5ZXJfMSIgdmlld0JveD0iMCAwIDEyOCAxMjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHN0eWxlPi5jbHMtMSwuY2xzLTN7ZmlsbDpub25lO30uY2xzLTJ7ZmlsbDojRkZGRkZGO30uY2xzLTN7c3Ryb2tlOiNGRkZGRkY7c3Ryb2tlLW1pdGVybGltaXQ6MTA7c3Ryb2tlLXdpZHRoOjYuNXB4O308L3N0eWxlPjwvZGVmcz48dGl0bGUvPjxjaXJjbGUgY2xhc3M9ImNscy0xIiBjeD0iNjQiIGN5PSI2My41IiByPSI1NCIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTY0LDE2QTQ3LjUsNDcuNSwwLDEsMSwxNi41LDYzLjUsNDcuNTUsNDcuNTUsMCwwLDEsNjQsMTZtMC02LjVhNTQsNTQsMCwxLDAsNTQsNTQsNTQsNTQsMCwwLDAtNTQtNTRaIi8+PHBhdGggY2xhc3M9ImNscy0zIiBkPSJNODcuNTgsMTA3LjcyYy0xOS42Ny03MC4wOS0zOS4zNC05MS0zOS4zNC05MSIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTExLjk0LDU2LjQ2Uzc3LjYsNjIuMzksOTkuNDIsMjkuMTMiLz48cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik0yOS43MywxMDBzMjQuMjEtNDguNjUsODUuOTQtMzMuNjciLz48L3N2Zz4=)",
            }}
          ></span>
          <span className="text-white pl-1 text-xs">Dribble</span>
        </motion.a>
        <motion.a className="inline-flex items-center">
          <span className="w-4 h-4 inline-block">
            <XIcon className="w-4 h-4" />
          </span>
          <span className="text-white pl-1 text-xs">Twitter</span>
        </motion.a>
        <motion.a className="inline-flex items-center">
          <span
            className="w-5 h-5 inline-block"
            style={{
              backgroundImage:
                "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgZGF0YS1uYW1lPSJMYXllciAxIiBpZD0iTGF5ZXJfMSIgdmlld0JveD0iMCAwIDEyOCAxMjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiNGRkZGRkY7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZS8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNjQsMzIuMjljLjIzLDAsMjIuOTIsMCwzNy45LDEuMDhsLjY2LjA2YzIsLjE4LDQuMTYuMzksNi4yOCwyLjU4bDAsMCwwLDBjMSwxLDIuMTQsNC41NCwyLjUzLDcuMDdhMTU2LDE1NiwwLDAsMSwxLDE2LjcxdjguMjRhMTU2LjgyLDE1Ni44MiwwLDAsMS0xLDE2LjcyYy0uMzcsMi40Ny0xLjU0LDYuMDYtMi41Miw3bDAsMCwwLDBjLTIuMTEsMi4xOC00LjMyLDIuMzktNi4yNywyLjU4bC0uNjguMDdjLTE0LjcyLDEtMzYuODksMS4xLTM3Ljg5LDEuMS0xLjE1LDAtMjgtLjI3LTM2LjU3LTEtLjUxLS4wOC0xLS4xNS0xLjU4LS4yMS0yLjI4LS4yNy00Ljg3LS41OC02LjczLTIuNTFsMCwwLDAsMGMtMS0xLTIuMTQtNC41My0yLjUyLTcuMDVhMTU2LDE1NiwwLDAsMS0xLTE2LjcxVjU5Ljg2YTE1Ni43OSwxNTYuNzksMCwwLDEsMS0xNi43MWMuMzktMi41NSwxLjU1LTYuMDksMi41My03LjA3bDAsMCwwLDBjMi4xMi0yLjE5LDQuMzMtMi4zOSw2LjI4LTIuNThsLjY2LS4wNmMxNS0xLjA3LDM3LjY3LTEuMDgsMzcuODktMS4wOEg2NG0wLTYuNUg2NHMtMjMuMDksMC0zOC40OCwxLjFjLTIuMTUuMjUtNi44My4yNy0xMSw0LjU5LTMuMjksMy4zLTQuMzcsMTAuNzktNC4zNywxMC43OUExNjIuMjUsMTYyLjI1LDAsMCwwLDksNTkuODZWNjguMWExNjIuMTksMTYyLjE5LDAsMCwwLDEuMSwxNy41OXMxLjA3LDcuNDksNC4zNywxMC43OGM0LjE5LDQuMzIsOS42OCw0LjE5LDEyLjEzLDQuNjUsOC44LjgzLDM3LjQsMS4wOSwzNy40LDEuMDlzMjMuMTEsMCwzOC41MS0xLjEzYzIuMTUtLjI1LDYuODQtLjI4LDExLTQuNiwzLjI5LTMuMjksNC4zNy0xMC43OCw0LjM3LTEwLjc4QTE2Mi4yNiwxNjIuMjYsMCwwLDAsMTE5LDY4LjExVjU5Ljg3YTE2Mi4yNywxNjIuMjcsMCwwLDAtMS4xLTE3LjU5cy0xLjA3LTcuNDktNC4zNy0xMC43OWMtNC4xOC00LjMyLTguODctNC4zNS0xMS00LjU5Qzg3LjExLDI1Ljc5LDY0LDI1Ljc5LDY0LDI1Ljc5WiIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSI1NC4xMyA0Ny42MSA1NC4xMyA4MC4zOSA4Mi4xMiA2NCA1NC4xMyA0Ny42MSIvPjwvc3ZnPg==)",
            }}
          ></span>
          <span className="text-white pl-1 text-xs">Youtube</span>
        </motion.a> */}
      </motion.div>
    </motion.div>
  );
};

const links = [
  {
    title: "Back",
    icon: () => (
      <span className="w-4 h-[18px] inline-block">
        <ArrowLeftIcon className="w-4 h-[18px]" />
      </span>
    ),
  },
  {
    title: "Github",
    icon: () => (
      <span
        className="w-[18px] h-[18px] inline-block"
        style={{
          backgroundImage:
            "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iI0ZGRkZGRiI+PHBhdGggZD0iTTcuOTk5IDBDMy41ODIgMCAwIDMuNTk2IDAgOC4wMzJhOC4wMzEgOC4wMzEgMCAwIDAgNS40NzIgNy42MjFjLjQuMDc0LjU0Ni0uMTc0LjU0Ni0uMzg3IDAtLjE5MS0uMDA3LS42OTYtLjAxMS0xLjM2Ni0yLjIyNS40ODUtMi42OTUtMS4wNzctMi42OTUtMS4wNzctLjM2My0uOTI4LS44ODgtMS4xNzUtLjg4OC0xLjE3NS0uNzI3LS40OTguMDU0LS40ODguMDU0LS40ODguODAzLjA1NyAxLjIyNS44MjggMS4yMjUuODI4LjcxNCAxLjIyNyAxLjg3My44NzMgMi4zMjkuNjY3LjA3Mi0uNTE5LjI3OS0uODczLjUwOC0xLjA3NC0xLjc3Ni0uMjAzLTMuNjQ0LS44OTItMy42NDQtMy45NjkgMC0uODc3LjMxMi0xLjU5NC44MjQtMi4xNTYtLjA4My0uMjAzLS4zNTctMS4wMi4wNzgtMi4xMjUgMCAwIC42NzItLjIxNiAyLjIuODIzYTcuNjMzIDcuNjMzIDAgMCAxIDIuMDAzLS4yNyA3LjY1IDcuNjUgMCAwIDEgMi4wMDMuMjcxYzEuNTI3LTEuMDM5IDIuMTk4LS44MjMgMi4xOTgtLjgyMy40MzYgMS4xMDYuMTYyIDEuOTIyLjA4IDIuMTI1LjUxMy41NjIuODIyIDEuMjc5LjgyMiAyLjE1NiAwIDMuMDg1LTEuODcgMy43NjQtMy42NTIgMy45NjMuMjg3LjI0OC41NDMuNzM4LjU0MyAxLjQ4NyAwIDEuMDc0LS4wMSAxLjk0LS4wMSAyLjIwMyAwIC4yMTUuMTQ0LjQ2NS41NS4zODZBOC4wMzIgOC4wMzIgMCAwIDAgMTYgOC4wMzJDMTYgMy41OTYgMTIuNDE4IDAgNy45OTkgMHoiPjwvcGF0aD48L3N2Zz4=)",
        }}
      ></span>
    ),
  },
  {
    title: "Dribble",
    icon: () => (
      <span
        className="w-5 h-5 inline-block"
        style={{
          backgroundImage:
            "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgZGF0YS1uYW1lPSJMYXllciAxIiBpZD0iTGF5ZXJfMSIgdmlld0JveD0iMCAwIDEyOCAxMjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHN0eWxlPi5jbHMtMSwuY2xzLTN7ZmlsbDpub25lO30uY2xzLTJ7ZmlsbDojRkZGRkZGO30uY2xzLTN7c3Ryb2tlOiNGRkZGRkY7c3Ryb2tlLW1pdGVybGltaXQ6MTA7c3Ryb2tlLXdpZHRoOjYuNXB4O308L3N0eWxlPjwvZGVmcz48dGl0bGUvPjxjaXJjbGUgY2xhc3M9ImNscy0xIiBjeD0iNjQiIGN5PSI2My41IiByPSI1NCIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTY0LDE2QTQ3LjUsNDcuNSwwLDEsMSwxNi41LDYzLjUsNDcuNTUsNDcuNTUsMCwwLDEsNjQsMTZtMC02LjVhNTQsNTQsMCwxLDAsNTQsNTQsNTQsNTQsMCwwLDAtNTQtNTRaIi8+PHBhdGggY2xhc3M9ImNscy0zIiBkPSJNODcuNTgsMTA3LjcyYy0xOS42Ny03MC4wOS0zOS4zNC05MS0zOS4zNC05MSIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTExLjk0LDU2LjQ2Uzc3LjYsNjIuMzksOTkuNDIsMjkuMTMiLz48cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik0yOS43MywxMDBzMjQuMjEtNDguNjUsODUuOTQtMzMuNjciLz48L3N2Zz4=)",
        }}
      ></span>
    ),
  },
  {
    title: "Twitter",
    icon: () => (
      <span className="w-4 h-4 inline-block">
        <XIcon className="w-4 h-4" />
      </span>
    ),
  },
  {
    title: "Youtube",
    icon: () => (
      <span
        className="w-5 h-5 inline-block"
        style={{
          backgroundImage:
            "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgZGF0YS1uYW1lPSJMYXllciAxIiBpZD0iTGF5ZXJfMSIgdmlld0JveD0iMCAwIDEyOCAxMjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiNGRkZGRkY7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZS8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNjQsMzIuMjljLjIzLDAsMjIuOTIsMCwzNy45LDEuMDhsLjY2LjA2YzIsLjE4LDQuMTYuMzksNi4yOCwyLjU4bDAsMCwwLDBjMSwxLDIuMTQsNC41NCwyLjUzLDcuMDdhMTU2LDE1NiwwLDAsMSwxLDE2LjcxdjguMjRhMTU2LjgyLDE1Ni44MiwwLDAsMS0xLDE2LjcyYy0uMzcsMi40Ny0xLjU0LDYuMDYtMi41Miw3bDAsMCwwLDBjLTIuMTEsMi4xOC00LjMyLDIuMzktNi4yNywyLjU4bC0uNjguMDdjLTE0LjcyLDEtMzYuODksMS4xLTM3Ljg5LDEuMS0xLjE1LDAtMjgtLjI3LTM2LjU3LTEtLjUxLS4wOC0xLS4xNS0xLjU4LS4yMS0yLjI4LS4yNy00Ljg3LS41OC02LjczLTIuNTFsMCwwLDAsMGMtMS0xLTIuMTQtNC41My0yLjUyLTcuMDVhMTU2LDE1NiwwLDAsMS0xLTE2LjcxVjU5Ljg2YTE1Ni43OSwxNTYuNzksMCwwLDEsMS0xNi43MWMuMzktMi41NSwxLjU1LTYuMDksMi41My03LjA3bDAsMCwwLDBjMi4xMi0yLjE5LDQuMzMtMi4zOSw2LjI4LTIuNThsLjY2LS4wNmMxNS0xLjA3LDM3LjY3LTEuMDgsMzcuODktMS4wOEg2NG0wLTYuNUg2NHMtMjMuMDksMC0zOC40OCwxLjFjLTIuMTUuMjUtNi44My4yNy0xMSw0LjU5LTMuMjksMy4zLTQuMzcsMTAuNzktNC4zNywxMC43OUExNjIuMjUsMTYyLjI1LDAsMCwwLDksNTkuODZWNjguMWExNjIuMTksMTYyLjE5LDAsMCwwLDEuMSwxNy41OXMxLjA3LDcuNDksNC4zNywxMC43OGM0LjE5LDQuMzIsOS42OCw0LjE5LDEyLjEzLDQuNjUsOC44LjgzLDM3LjQsMS4wOSwzNy40LDEuMDlzMjMuMTEsMCwzOC41MS0xLjEzYzIuMTUtLjI1LDYuODQtLjI4LDExLTQuNiwzLjI5LTMuMjksNC4zNy0xMC43OCw0LjM3LTEwLjc4QTE2Mi4yNiwxNjIuMjYsMCwwLDAsMTE5LDY4LjExVjU5Ljg3YTE2Mi4yNywxNjIuMjcsMCwwLDAtMS4xLTE3LjU5cy0xLjA3LTcuNDktNC4zNy0xMC43OWMtNC4xOC00LjMyLTguODctNC4zNS0xMS00LjU5Qzg3LjExLDI1Ljc5LDY0LDI1Ljc5LDY0LDI1Ljc5WiIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSI1NC4xMyA0Ny42MSA1NC4xMyA4MC4zOSA4Mi4xMiA2NCA1NC4xMyA0Ny42MSIvPjwvc3ZnPg==)",
        }}
      ></span>
    ),
  },
];

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

const XIcon = ({ className }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="1.607 2.058 14.666 12.83"
      className={className}
    >
      <g clip-path="url(#a)">
        <path
          fill="#FFFFFF"
          d="M13.158 2.058h2.248l-4.913 5.435 5.78 7.395h-4.525l-3.545-4.485-4.056 4.485h-2.25l5.255-5.813-5.545-7.017h4.64l3.205 4.1 3.706-4.1Zm-.79 11.527h1.246L5.57 3.293H4.233l8.135 10.292Z"
        />
      </g>
    </svg>
  );
};
