"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Link from "next/link";
import { classNames } from "../utils";

const navItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Blog",
    link: "/blog",
  },
  {
    name: "Projects",
    link: "/projects",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

const colors = ["bg-violet-300", "bg-pink-300", "bg-blue-300", "bg-orange-300"];

export const SmartNavbar = () => {
  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
      <FloatingContainers />
    </div>
  );
};

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;

      if (direction < 0) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={classNames(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-white/[0.2] rounded-full bg-black z-[5000] px-12 py-4 items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={classNames(
              "relative text-neutral-50 items-center flex space-x-1 hover:text-neutral-300"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block">{navItem.name}</span>
          </Link>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export const FloatingContainers = () => {
  const [visibleIdx, setVisibleIdx] = useState(-1);
  const [allOffsetTops, setAllOffsetTops] = useState<Set<number>>(new Set());
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current === "number") {
      const direction = current! - scrollY.getPrevious()!;
      const allOffsetTopsArr = Array.from(allOffsetTops!);

      if (direction > 0) {
        allOffsetTopsArr.forEach((offset, idx) => {
          if (
            idx === 0 &&
            current >= 90 &&
            current < allOffsetTopsArr[idx + 1]
          ) {
            setVisibleIdx(idx);
          } else if (current >= offset && current < allOffsetTopsArr[idx + 1]) {
            setVisibleIdx(idx);
          } else if (current >= offset && idx === allOffsetTopsArr.length - 1) {
            setVisibleIdx(idx);
          }
        });
      } else {
        setVisibleIdx(-1);
      }
    }
  });

  return (
    <div>
      {colors.map((color, index) => (
        <Container
          key={color}
          bgColor={color}
          isVisible={visibleIdx === index}
          allOffsetTops={allOffsetTops}
          setAllOffsetTops={setAllOffsetTops}
        />
      ))}
      <Content />
      {/* <div className="h-32 bg-gray-100"></div> */}
    </div>
  );
};

const Container = ({
  bgColor,
  isVisible,
  allOffsetTops,
  setAllOffsetTops,
}: {
  bgColor: string;
  isVisible: boolean;
  allOffsetTops: Set<number>;
  setAllOffsetTops: (value: Set<number>) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      console.log(ref.current.offsetTop);
      setAllOffsetTops(allOffsetTops.add(ref.current.offsetTop));
    }
  }, [ref.current]);

  return (
    <motion.div ref={ref} className={classNames("h-screen w-full", bgColor)}>
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={classNames(
          "h-20 border-b border-b-white w-full fixed top-0",
          bgColor
        )}
      ></motion.div>
    </motion.div>
  );
};

const Content = () => {
  return (
    <div className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gray-900 antialiased">
      <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
        <article className="mx-auto w-full max-w-2xl text-gray-600 space-y-4 lg:space-y-6">
          <h1 className="text-3xl font-extrabold leading-tight lg:text-4xl text-white">
            Best practices for successful prototypes
          </h1>
          <p className="lead">
            Flowbite is an open-source library of UI components built with the
            utility-first classes from Tailwind CSS. It also includes
            interactive elements such as dropdowns, modals, datepickers.
          </p>
          <p>
            Before going digital, you might benefit from scribbling down some
            ideas in a sketchbook. This way, you can think things through before
            committing to an actual design project.
          </p>
          <p>
            But then I found a{" "}
            <a href="https://flowbite.com">
              component library based on Tailwind CSS called Flowbite
            </a>
            . It comes with the most commonly used UI components, such as
            buttons, navigation bars, cards, form elements, and more which are
            conveniently built with the utility classes from Tailwind CSS.
          </p>

          <h2 className="text-4xl font-bold text-white">
            Getting started with Flowbite
          </h2>
          <p>
            First of all you need to understand how Flowbite works. This library
            is not another framework. Rather, it is a set of components based on
            Tailwind CSS that you can just copy-paste from the documentation.
          </p>
          <p>
            It also includes a JavaScript file that enables interactive
            components, such as modals, dropdowns, and datepickers which you can
            optionally include into your project via CDN or NPM.
          </p>
          <p>
            You can check out the{" "}
            <a href="https://flowbite.com/docs/getting-started/quickstart/">
              quickstart guide
            </a>{" "}
            to explore the elements by including the CDN files into your
            project. But if you want to build a project with Flowbite I
            recommend you to follow the build tools steps so that you can purge
            and minify the generated CSS.
          </p>
          <p>
            You'll also receive a lot of useful application UI, marketing UI,
            and e-commerce pages that can help you get started with your
            projects even faster. You can check out this{" "}
            <a href="https://flowbite.com/docs/components/tables/">
              comparison table
            </a>{" "}
            to better understand the differences between the open-source and pro
            version of Flowbite.
          </p>
          <h2 className="text-4xl font-bold text-white">
            When does design come in handy?
          </h2>
          <p>
            While it might seem like extra work at a first glance, here are some
            key moments in which prototyping will come in handy:
          </p>
          <ol>
            <li>
              <strong>Usability testing</strong>. Does your user know how to
              exit out of screens? Can they follow your intended user journey
              and buy something from the site you’ve designed? By running a
              usability test, you’ll be able to see how users will interact with
              your design once it’s live;
            </li>
            <li>
              <strong>Involving stakeholders</strong>. Need to check if your
              GDPR consent boxes are displaying properly? Pass your prototype to
              your data protection team and they can test it for real;
            </li>
            <li>
              <strong>Impressing a client</strong>. Prototypes can help explain
              or even sell your idea by providing your client with a hands-on
              experience;
            </li>
            <li>
              <strong>Communicating your vision</strong>. By using an
              interactive medium to preview and test design elements, designers
              and developers can understand each other — and the project —
              better.
            </li>
          </ol>

          <h3 className="text-3xl font-bold text-white">
            Laying the groundwork for best design
          </h3>
          <p>
            Before going digital, you might benefit from scribbling down some
            ideas in a sketchbook. This way, you can think things through before
            committing to an actual design project.
          </p>
          <p>
            Let's start by including the CSS file inside the <code>head</code>{" "}
            tag of your HTML.
          </p>

          <h3 className="text-3xl font-bold text-white">
            Understanding typography
          </h3>

          <h4 className="text-2xl font-bold text-white">Type properties</h4>
          <p>
            A typeface is a collection of letters. While each letter is unique,
            certain shapes are shared across letters. A typeface represents
            shared patterns across a collection of letters.
          </p>

          <h4 className="text-2xl font-bold text-white">Baseline</h4>
          <p>
            A typeface is a collection of letters. While each letter is unique,
            certain shapes are shared across letters. A typeface represents
            shared patterns across a collection of letters.
          </p>
          <h4 className="text-2xl font-bold text-white">
            Measurement from the baseline
          </h4>
          <p>
            A typeface is a collection of letters. While each letter is unique,
            certain shapes are shared across letters. A typeface represents
            shared patterns across a collection of letters.
          </p>

          <h3 className="text-3xl font-bold text-white">Type classification</h3>
          <h4 className="text-2xl font-bold text-white">Serif</h4>
          <p>
            A serif is a small shape or projection that appears at the beginning
            or end of a stroke on a letter. Typefaces with serifs are called
            serif typefaces. Serif fonts are classified as one of the following:
          </p>
          <h4 className="text-2xl font-bold text-white">Old-Style serifs</h4>
          <ul>
            <li>Low contrast between thick and thin strokes</li>
            <li>Diagonal stress in the strokes</li>
            <li>Slanted serifs on lower-case ascenders</li>
          </ul>
          <ol>
            <li>Low contrast between thick and thin strokes</li>
            <li>Diagonal stress in the strokes</li>
            <li>Slanted serifs on lower-case ascenders</li>
          </ol>

          <h3 className="text-3xl font-bold text-white">
            Laying the best for successful prototyping
          </h3>
          <p>
            A serif is a small shape or projection that appears at the
            beginning:
          </p>
          <blockquote>
            <p>
              Flowbite is just awesome. It contains tons of predesigned
              components and pages starting from login screen to complex
              dashboard. Perfect choice for your next SaaS application.
            </p>
          </blockquote>

          <h4 className="text-2xl font-bold text-white">Code example</h4>
          <p>
            A serif is a small shape or projection that appears at the beginning
            or end of a stroke on a letter. Typefaces with serifs are called
            serif typefaces. Serif fonts are classified as one of the following:
          </p>

          <h4 className="text-2xl font-bold text-white">Table example</h4>
          <p>
            A serif is a small shape or projection that appears at the beginning
            or end of a stroke on a letter.
          </p>
          <table className="table-auto text-left border-collapse w-full">
            <thead className="bg-gray-700 rounded-sm text-white">
              <tr>
                <th>Country</th>
                <th>Date &amp; Time</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>United States</td>
                <td>April 21, 2021</td>
                <td>
                  <strong>$2,300</strong>
                </td>
              </tr>
              <tr>
                <td>Canada</td>
                <td>May 31, 2021</td>
                <td>
                  <strong>$300</strong>
                </td>
              </tr>
              <tr>
                <td>United Kingdom</td>
                <td>June 3, 2021</td>
                <td>
                  <strong>$2,500</strong>
                </td>
              </tr>
              <tr>
                <td>Australia</td>
                <td>June 23, 2021</td>
                <td>
                  <strong>$3,543</strong>
                </td>
              </tr>
              <tr>
                <td>Germany</td>
                <td>July 6, 2021</td>
                <td>
                  <strong>$99</strong>
                </td>
              </tr>
              <tr>
                <td>France</td>
                <td>August 23, 2021</td>
                <td>
                  <strong>$2,540</strong>
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-3xl font-bold text-white">
            Best practices for setting up your prototype
          </h3>
          <p>
            <strong>Low fidelity or high fidelity?</strong> Fidelity refers to
            how close a prototype will be to the real deal. If you’re simply
            preparing a quick visual aid for a presentation, a low-fidelity
            prototype — like a wireframe with placeholder images and some basic
            text — would be more than enough. But if you’re going for more
            intricate usability testing, a high-fidelity prototype — with
            on-brand colors, fonts and imagery — could help get more pointed
            results.
          </p>
          <p>
            <strong>Consider your user</strong>. To create an intuitive user
            flow, try to think as your user would when interacting with your
            product. While you can fine-tune this during beta testing,
            considering your user’s needs and habits early on will save you time
            by setting you on the right path.
          </p>
          <p>
            <strong>Start from the inside out</strong>. A nice way to both
            organize your tasks and create more user-friendly prototypes is by
            building your prototypes ‘inside out’. Start by focusing on what
            will be important to your user, like a Buy now button or an image
            gallery, and list each element by order of priority. This way,
            you’ll be able to create a prototype that puts your users’ needs at
            the heart of your design.
          </p>
          <p>
            And there you have it! Everything you need to design and share
            prototypes — right in Flowbite Figma.
          </p>
        </article>
      </div>
    </div>
  );
};
