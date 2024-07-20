"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

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
  const [shouldUnmount, setShouldUnmount] = useState(false);

  const changeExpandedStage = useCallback((value: EXPANDED_STATE) => {
    setShouldUnmount(true);
    setTimeout(() => {
      setExpandedStage(value);
      setShouldUnmount(false);
    }, 300);
  }, []);

  useEffect(() => {
    const timer = setTimeout(
      () => setExpandedStage(EXPANDED_STATE.EXPANDED_1),
      1000
    );

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen cursor-pointer font-[Inter]">
      {expandedStage === EXPANDED_STATE.COLLAPSED && (
        <BaseDynamicIsland setExpandedStage={setExpandedStage} />
      )}
      {expandedStage === EXPANDED_STATE.EXPANDED_1 && (
        <ExpandedStageOne
          changeExpandedStage={changeExpandedStage}
          shouldUnmount={shouldUnmount}
        />
      )}
      {expandedStage === EXPANDED_STATE.EXPANDED_2 && (
        <ExpandedStageTwo setExpandedStage={setExpandedStage} />
      )}
      {expandedStage === EXPANDED_STATE.EXPANDED_3 && (
        <ExpandedStageThree
          changeExpandedStage={changeExpandedStage}
          shouldUnmount={shouldUnmount}
        />
      )}
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
  shouldUnmount,
  changeExpandedStage,
}: {
  shouldUnmount: boolean;
  changeExpandedStage: (value: EXPANDED_STATE) => void;
}) => {
  return (
    <motion.div
      className="p-2.5 bg-black text-white flex justify-between items-center space-x-2"
      layoutId="island-container"
      style={{ borderRadius: 36 }}
    >
      <AnimatePresence>
        {!shouldUnmount && (
          <>
            <motion.button
              className="w-9 h-9 bg-slate-600"
              onClick={() => changeExpandedStage(EXPANDED_STATE.COLLAPSED)}
              style={{ borderRadius: 999 }}
              variants={variants}
              initial="leftElementHidden"
              animate="visible"
              exit="leftElementHidden"
              transition={{ delay: 0.2, duration: 0.3, type: "spring" }}
              key="profile-button"
            >
              <img
                src="/cropped-profile-pic.JPG"
                className="w-full h-full overflow-hidden"
                style={{ borderRadius: 999 }}
                alt="Profile"
              />
            </motion.button>
            <motion.div
              className="flex flex-col pr-12 justify-center"
              variants={variants}
              initial="leftElementHidden"
              animate="visible"
              exit="leftElementHidden"
              transition={{ delay: 0.2, duration: 0.3, type: "spring" }}
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
              transition={{ delay: 0.2, duration: 0.3, type: "spring" }}
              key="options-button"
            >
              <button
                className="w-9 h-9 bg-[#F57202]"
                style={{ borderRadius: 999 }}
                onClick={() => changeExpandedStage(EXPANDED_STATE.EXPANDED_2)}
              >
                <AudioIcon />
              </button>
              <button
                className="w-9 h-9 bg-[#008BF5] p-2"
                style={{ borderRadius: 999 }}
                onClick={() => changeExpandedStage(EXPANDED_STATE.EXPANDED_3)}
              >
                <MoreIcon />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
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
      >
        It's been almost <span className="text-white">5 years</span> since I got
        into Frontend Development. In those years, I've developed user
        experiences for web, mobile and even desktop together with extremely
        talented people while being{" "}
        <span className="text-white">the youngest</span> on every team. And now,
        I'm working towards mastering the intersection of{" "}
        <span className="text-white">Development, Product and Design</span> to
        single-handedly ship the best possible product.
      </motion.p>
    </motion.button>
  );
};

const ExpandedStageThree = ({
  shouldUnmount,
  changeExpandedStage,
}: {
  shouldUnmount: boolean;
  changeExpandedStage: (value: EXPANDED_STATE) => void;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  return (
    <motion.div
      className="bg-black text-white"
      layoutId="island-container"
      style={{ borderRadius: 36 }}
    >
      <AnimatePresence>
        {!shouldUnmount && (
          <motion.div
            className="flex justify-center items-center p-1.5"
            variants={variants}
            initial="elementHidden"
            animate="visible"
            exit="elementHidden"
            transition={{ delay: 0.2, duration: 0.3, type: "spring" }}
          >
            {links.map((link, index) => (
              <motion.a
                key={link.title}
                href={link.title === links[0].title ? undefined : link.href}
                target="_blank"
                rel="noopener noreferrer"
                layout
                className="flex items-center relative z-10 px-2.5"
                style={{ height: 24 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(-1)}
                onClick={() => {
                  link.title === links[0].title &&
                    changeExpandedStage(EXPANDED_STATE.EXPANDED_1);
                }}
              >
                {link.icon()}
                {hoveredIndex === index && (
                  <>
                    <motion.div
                      className="absolute top-0 left-0 w-full h-full bg-zinc-700 -z-10"
                      style={{ borderRadius: 32 }}
                      variants={variants}
                      initial="elementHidden"
                      animate="visible"
                      exit="elementHidden"
                      transition={{ duration: 0.3, type: "spring" }}
                      key={`${link.title}-bg`}
                    ></motion.div>
                    <motion.div
                      className="text-white pl-1.5 text-xs"
                      variants={variants}
                      initial="elementHidden"
                      animate="visible"
                      exit="elementHidden"
                      transition={{ duration: 0.3, type: "spring" }}
                      key={`${link.title}-text`}
                    >
                      {link.title}
                    </motion.div>
                  </>
                )}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const links = [
  {
    title: "Back",
    icon: () => (
      <div>
        <ArrowLeftIcon />
      </div>
    ),
    href: "/private-island",
  },
  {
    title: "Website",
    icon: () => (
      <div
        style={{
          backgroundImage:
            "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8cGF0aCBkPSJNNyA4TDMgMTEuNjkyM0w3IDE2TTE3IDhMMjEgMTEuNjkyM0wxNyAxNk0xNCA0TDEwIDIwIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+DQo8L3N2Zz4=)",
          width: 20,
          height: 20,
        }}
      ></div>
    ),
    href: "https://exploreraadi.com",
  },
  {
    title: "Github",
    icon: () => (
      <div
        style={{
          backgroundImage:
            "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iI0ZGRkZGRiI+PHBhdGggZD0iTTcuOTk5IDBDMy41ODIgMCAwIDMuNTk2IDAgOC4wMzJhOC4wMzEgOC4wMzEgMCAwIDAgNS40NzIgNy42MjFjLjQuMDc0LjU0Ni0uMTc0LjU0Ni0uMzg3IDAtLjE5MS0uMDA3LS42OTYtLjAxMS0xLjM2Ni0yLjIyNS40ODUtMi42OTUtMS4wNzctMi42OTUtMS4wNzctLjM2My0uOTI4LS44ODgtMS4xNzUtLjg4OC0xLjE3NS0uNzI3LS40OTguMDU0LS40ODguMDU0LS40ODguODAzLjA1NyAxLjIyNS44MjggMS4yMjUuODI4LjcxNCAxLjIyNyAxLjg3My44NzMgMi4zMjkuNjY3LjA3Mi0uNTE5LjI3OS0uODczLjUwOC0xLjA3NC0xLjc3Ni0uMjAzLTMuNjQ0LS44OTItMy42NDQtMy45NjkgMC0uODc3LjMxMi0xLjU5NC44MjQtMi4xNTYtLjA4My0uMjAzLS4zNTctMS4wMi4wNzgtMi4xMjUgMCAwIC42NzItLjIxNiAyLjIuODIzYTcuNjMzIDcuNjMzIDAgMCAxIDIuMDAzLS4yNyA3LjY1IDcuNjUgMCAwIDEgMi4wMDMuMjcxYzEuNTI3LTEuMDM5IDIuMTk4LS44MjMgMi4xOTgtLjgyMy40MzYgMS4xMDYuMTYyIDEuOTIyLjA4IDIuMTI1LjUxMy41NjIuODIyIDEuMjc5LjgyMiAyLjE1NiAwIDMuMDg1LTEuODcgMy43NjQtMy42NTIgMy45NjMuMjg3LjI0OC41NDMuNzM4LjU0MyAxLjQ4NyAwIDEuMDc0LS4wMSAxLjk0LS4wMSAyLjIwMyAwIC4yMTUuMTQ0LjQ2NS41NS4zODZBOC4wMzIgOC4wMzIgMCAwIDAgMTYgOC4wMzJDMTYgMy41OTYgMTIuNDE4IDAgNy45OTkgMHoiPjwvcGF0aD48L3N2Zz4=)",
          width: 18,
          height: 18,
        }}
      ></div>
    ),
    href: "https://github.com/ExplorerAadi",
  },
  {
    title: "Twitter",
    icon: () => (
      <div>
        <XIcon />
      </div>
    ),
    href: "https://twitter.com/exploreraadi",
  },
  {
    title: "LinkedIn",
    icon: () => (
      <div
        style={{
          backgroundImage:
            "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiB4bWw6c3BhY2U9InByZXNlcnZlIiBmaWxsPSIjRkZGIiBzdHJva2Utd2lkdGg9IjEiPgoKPGRlZnM+CjwvZGVmcz4KPGcgc3R5bGU9InN0cm9rZTogbm9uZTsgc3Ryb2tlLXdpZHRoOiAwOyBzdHJva2UtZGFzaGFycmF5OiBub25lOyBzdHJva2UtbGluZWNhcDogYnV0dDsgc3Ryb2tlLWxpbmVqb2luOiBtaXRlcjsgc3Ryb2tlLW1pdGVybGltaXQ6IDEwOyBmaWxsOiBub25lOyBmaWxsLXJ1bGU6IG5vbnplcm87IG9wYWNpdHk6IDE7IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxLjQwNjU5MzQwNjU5MzQwMTYgMS40MDY1OTM0MDY1OTM0MDE2KSBzY2FsZSgyLjgxIDIuODEpIiA+Cgk8cGF0aCBkPSJNIDEuNDggMjkuOTEgaCAxOC42NTcgdiA2MC4wMSBIIDEuNDggViAyOS45MSB6IE0gMTAuODA5IDAuMDggYyA1Ljk2MyAwIDEwLjgwOSA0Ljg0NiAxMC44MDkgMTAuODE5IGMgMCA1Ljk2NyAtNC44NDYgMTAuODEzIC0xMC44MDkgMTAuODEzIEMgNC44MzIgMjEuNzEyIDAgMTYuODY2IDAgMTAuODk5IEMgMCA0LjkyNiA0LjgzMiAwLjA4IDEwLjgwOSAwLjA4IiBzdHlsZT0ic3Ryb2tlOiBub25lOyBzdHJva2Utd2lkdGg6IDE7IHN0cm9rZS1kYXNoYXJyYXk6IG5vbmU7IHN0cm9rZS1saW5lY2FwOiBidXR0OyBzdHJva2UtbGluZWpvaW46IG1pdGVyOyBzdHJva2UtbWl0ZXJsaW1pdDogMTA7IGZpbGw6ICNGRkZGRkY7IGZpbGwtcnVsZTogbm9uemVybzsgb3BhY2l0eTogMTsiIHRyYW5zZm9ybT0iIG1hdHJpeCgxIDAgMCAxIDAgMCkgIiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+Cgk8cGF0aCBkPSJNIDMxLjgzNSAyOS45MSBoIDE3Ljg5IHYgOC4yMDYgaCAwLjI1NSBjIDIuNDkgLTQuNzIgOC41NzYgLTkuNjkyIDE3LjY0NyAtOS42OTIgQyA4Ni41MTQgMjguNDI0IDkwIDQwLjg0OSA5MCA1Ny4wMDcgViA4OS45MiBIIDcxLjM1NyBWIDYwLjczNyBjIDAgLTYuOTYxIC0wLjEyMSAtMTUuOTEyIC05LjY5MiAtMTUuOTEyIGMgLTkuNzA2IDAgLTExLjE4NyA3LjU4NyAtMTEuMTg3IDE1LjQxMiBWIDg5LjkyIEggMzEuODM1IFYgMjkuOTEgeiIgc3R5bGU9InN0cm9rZTogbm9uZTsgc3Ryb2tlLXdpZHRoOiAxOyBzdHJva2UtZGFzaGFycmF5OiBub25lOyBzdHJva2UtbGluZWNhcDogYnV0dDsgc3Ryb2tlLWxpbmVqb2luOiBtaXRlcjsgc3Ryb2tlLW1pdGVybGltaXQ6IDEwOyBmaWxsOiAjRkZGRkZGOyBmaWxsLXJ1bGU6IG5vbnplcm87IG9wYWNpdHk6IDE7IiB0cmFuc2Zvcm09IiBtYXRyaXgoMSAwIDAgMSAwIDApICIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgo8L2c+Cjwvc3ZnPg==)",
          width: 18,
          height: 18,
          marginTop: -3,
        }}
      ></div>
    ),
    href: "https://www.linkedin.com/in/exploreraadi/",
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

const ArrowLeftIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      width="16"
      height="18"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
      />
    </svg>
  );
};

const XIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="1.607 2.058 14.666 12.83"
      width="16"
      height="16"
    >
      <g clipPath="url(#a)">
        <path
          fill="#FFFFFF"
          d="M13.158 2.058h2.248l-4.913 5.435 5.78 7.395h-4.525l-3.545-4.485-4.056 4.485h-2.25l5.255-5.813-5.545-7.017h4.64l3.205 4.1 3.706-4.1Zm-.79 11.527h1.246L5.57 3.293H4.233l8.135 10.292Z"
        />
      </g>
    </svg>
  );
};

const AudioIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 36 36"
      // preserveAspectRatio="xMidYMid meet"
      // style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px); content-visibility: visible;"
    >
      {/* <defs>
        <clipPath id="__lottie_element_2">
          <rect width="36" height="36" x="0" y="0"></rect>
        </clipPath>
      </defs> */}
      <g clipPath="url(#__lottie_element_2)">
        <g
          transform="matrix(1,0,0,1,10,10)"
          opacity="1"
          // style="display: block;"
        >
          <g opacity="1" transform="matrix(1,0,0,1,0,0)">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              fillOpacity="0"
              stroke="rgb(255,255,255)"
              strokeOpacity="0.96"
              strokeWidth="1.5"
              d=" M2,6.666749954223633 C2,6.666749954223633 2,9.333410263061523 2,9.333410263061523"
            ></path>
          </g>
          <g opacity="1" transform="matrix(1,0,0,1,0,0)">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              fillOpacity="0"
              stroke="rgb(255,255,255)"
              strokeOpacity="0.96"
              strokeWidth="1.5"
              d=" M5,7.333250045776367 C5,7.333250045776367 5,8.666589736938477 5,8.666589736938477"
            ></path>
          </g>
          <g opacity="1" transform="matrix(1,0,0,1,0,0)">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              fillOpacity="0"
              stroke="rgb(255,255,255)"
              strokeOpacity="0.96"
              strokeWidth="1.5"
              d=" M8,4 C8,4 8,12 8,12"
            ></path>
          </g>
          <g opacity="1" transform="matrix(1,0,0,1,0,0)">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              fillOpacity="0"
              stroke="rgb(255,255,255)"
              strokeOpacity="0.96"
              strokeWidth="1.5"
              d=" M11,2 C11,2 11,14 11,14"
            ></path>
          </g>
          <g opacity="1" transform="matrix(1,0,0,1,0,0)">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              fillOpacity="0"
              stroke="rgb(255,255,255)"
              strokeOpacity="0.96"
              strokeWidth="1.5"
              d=" M14,6.666749954223633 C14,6.666749954223633 14,9.333410263061523 14,9.333410263061523"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
};
