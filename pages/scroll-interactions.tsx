import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";

const ScrollInteractions: NextPage = () => {
  const [heightScrolled, setHeightScrolled] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // controls scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrolledHeightPercent =
          (scrollRef.current.scrollTop /
            (scrollRef.current.scrollHeight - scrollRef.current.clientHeight)) *
          100;
        setHeightScrolled(Math.round(scrolledHeightPercent));
      }
    };
    scrollRef.current?.addEventListener("scroll", handleScroll);

    return () => scrollRef.current?.removeEventListener("scroll", handleScroll);
  }, [setHeightScrolled]);

  return (
    <div className="relative bg-white pt-3 h-screen">
      {/* {console.log(intersectingGridArr)} */}
      <div className="bg-gray-300 w-full h-3 fixed top-0">
        <div
          className="h-full transition-all ease-linear"
          style={{
            width: `${heightScrolled}%`,
            backgroundImage: "linear-gradient(265deg, #d36ec6, #4fadff)",
          }}
        ></div>
      </div>

      {/* Content */}
      <div
        className="px-4 sm:px-6 lg:px-8 h-full overflow-y-auto py-8"
        ref={scrollRef}
      >
        <div className="mx-auto max-w-prose text-lg">
          <h1>
            <span className="block text-center text-lg font-semibold text-indigo-600">
              Introducing
            </span>
            <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              JavaScript for Beginners
            </span>
          </h1>
          <p className="mt-8 text-xl leading-8 text-gray-500">
            Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At
            arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae
            feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget.
            Eleifend egestas fringilla sapien.
          </p>
        </div>
        <div className="prose prose-lg mt-6 text-gray-500 mx-auto">
          <p>
            Faucibus commodo massa rhoncus, volutpat. <strong>Dignissim</strong>{" "}
            sed <strong>eget risus enim</strong>. Mattis mauris semper sed amet
            vitae sed turpis id. Id dolor praesent donec est. Odio penatibus
            risus viverra tellus varius sit neque erat velit. Faucibus commodo
            massa rhoncus, volutpat. Dignissim sed eget risus enim.{" "}
            <a href="#">Mattis mauris semper</a> sed amet vitae sed turpis id.
          </p>
          <ul role="list">
            <li>Quis elit egestas venenatis mattis dignissim.</li>
            <li>
              Cras cras lobortis vitae vivamus ultricies facilisis tempus.
            </li>
            <li>Orci in sit morbi dignissim metus diam arcu pretium.</li>
          </ul>
          <p>
            Quis semper vulputate aliquam venenatis egestas sagittis quisque
            orci. Donec commodo sit viverra aliquam porttitor ultrices gravida
            eu. Tincidunt leo, elementum mattis elementum ut nisl, justo, amet,
            mattis. Nunc purus, diam commodo tincidunt turpis. Amet, duis sed
            elit interdum dignissim.
          </p>
          <p>
            Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
            enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
            praesent donec est. Odio penatibus risus viverra tellus varius sit
            neque erat velit. Mattis mauris semper sed amet vitae sed turpis id.
            Id dolor praesent donec est. Odio penatibus risus viverra tellus
            varius sit neque erat velit.
          </p>
          <h2>From beginner to expert in 30 days</h2>
          <p>
            Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat
            in. Convallis arcu ipsum urna nibh. Pharetra, euismod vitae interdum
            mauris enim, consequat vulputate nibh. Maecenas pellentesque id sed
            tellus mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi.
            Pellentesque nam sed nullam sed diam turpis ipsum eu a sed convallis
            diam.
          </p>
          <p>
            Quis semper vulputate aliquam venenatis egestas sagittis quisque
            orci. Donec commodo sit viverra aliquam porttitor ultrices gravida
            eu. Tincidunt leo, elementum mattis elementum ut nisl, justo, amet,
            mattis. Nunc purus, diam commodo tincidunt turpis. Amet, duis sed
            elit interdum dignissim.
          </p>
          <blockquote>
            <p>
              Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum
              urna sed consectetur neque tristique pellentesque. Blandit amet,
              sed aenean erat arcu morbi.
            </p>
          </blockquote>
          <p>
            Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
            enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
            praesent donec est. Odio penatibus risus viverra tellus varius sit
            neque erat velit. Donec commodo sit viverra aliquam porttitor
            ultrices gravida eu. Tincidunt leo, elementum mattis elementum ut
            nisl, justo, amet, mattis.
          </p>
          <div
            className={classNames(
              "grid grid-cols-4 grid-rows-4 rounded-md h-[600px] w-full overflow-hidden border"
            )}
          >
            {splittedImages.map((url, index) => (
              <img
                key={url}
                src={url}
                alt=""
                className={classNames("w-full h-full m-0")}
                id={`${index}`}
              />
            ))}
          </div>
          <h2>Everything you need to get up and running</h2>
          <p>
            Purus morbi dignissim senectus mattis <a href="#">adipiscing</a>.
            Amet, massa quam varius orci dapibus volutpat cras. In amet eu
            ridiculus leo sodales cursus tristique. Tincidunt sed tempus ut
            viverra ridiculus non molestie. Gravida quis fringilla amet eget dui
            tempor dignissim. Facilisis auctor venenatis varius nunc, congue
            erat ac. Cras fermentum convallis quam.
          </p>
          <p>
            Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
            enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
            praesent donec est. Odio penatibus risus viverra tellus varius sit
            neque erat velit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScrollInteractions;

// 1. Auto Drag and Drop in Grid boxes with wobbly effect like Mac - using framer
// 2. Animate on entering viewport when scrolling from top to bottom - using framer
// 3. Ultimate styling with tailwind using all of its features - including all the variants and new utilities
// 4. Crazy control over DOM manipulations
// 3. Superhuman Interactions

const splittedImages = [
  "./row-1-column-1.jpg",
  "./row-1-column-2.jpg",
  "./row-1-column-3.jpg",
  "./row-1-column-4.jpg",
  "./row-2-column-1.jpg",
  "./row-2-column-2.jpg",
  "./row-2-column-3.jpg",
  "./row-2-column-4.jpg",
  "./row-3-column-1.jpg",
  "./row-3-column-2.jpg",
  "./row-3-column-3.jpg",
  "./row-3-column-4.jpg",
  "./row-4-column-1.jpg",
  "./row-4-column-2.jpg",
  "./row-4-column-3.jpg",
  "./row-4-column-4.jpg",
];

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};
