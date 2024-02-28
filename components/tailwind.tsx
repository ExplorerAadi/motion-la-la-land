"use client";

import { useState } from "react";
import { classNames } from "../utils";

export const Tailwind = () => {
  return (
    <>
      <ProductCard />
      <Form />
    </>
  );
};

const Form = () => {
  return (
    <div className="h-screen bg-gray-200">
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 min-h-[75%]">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              start your 14-day free trial
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md mx-4">
          <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="peer"
                    placeholder="Email"
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-gray-400 top-1.5 left-[13px] text-xs peer-placeholder-shown:text-base peer-placeholder-shown:top-2.5 transition-all duration-300 peer-focus:top-1.5 peer-focus:text-xs"
                  >
                    Email
                  </label>
                </div>
              </div>

              <div>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="peer"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="password"
                    className="absolute text-gray-400 top-1.5 left-[13px] text-xs peer-placeholder-shown:text-base peer-placeholder-shown:top-2.5 transition-all duration-300 peer-focus:top-1.5 peer-focus:text-xs"
                  >
                    Password
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center items-center rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCard = () => {
  const [selectedColor, setSelectedColor] = useState("blueTheme");

  return (
    <div
      className={classNames(
        "h-screen relative group flex items-center bg-gray-50",
        selectedColor
      )}
    >
      <div className="h-full sm:w-[375px] sm:mx-auto sm:h-[860px] sm:rounded-md sm:shadow-lg sm:overflow-hidden">
        <div className="w-full group-[.redTheme]:bg-red-700/30 group-[.blueTheme]:bg-blue-700/30 group-[.blackTheme]:bg-gray-700/30 group-[.greenTheme]:bg-green-700/30 py-8 h-[360px] transition-colors duration-500">
          <div
            className="h-full w-full bg-contain bg-no-repeat bg-center mix-blend-luminosity"
            style={{
              backgroundImage:
                "url(https://www.apple.com/v/airpods-max/e/images/overview/hero__gnfk5g59t0qe_large_2x.png)",
            }}
          ></div>
        </div>
        <div className="px-6 pb-8">
          <h1 className="text-4xl font-semibold mt-10">Airpod Max</h1>
          <h2 className="text-gray-500 text-xl font-medium">Apple</h2>
          <p className="text-xs text-gray-500 mt-4 leading-5 font-medium">
            Introducing AirPods Max — a perfect balance of exhilarating
            high-fidelity audio and the effortless magic of AirPods. The
            ultimate personal listening experience is here.
            <br />
            <br />
            AirPods Max inherit all of the wireless, effortless magic of the
            AirPods family. From setup to Siri commands, they make the listening
            experience completely...
            <span className="text-blue-600">Read More</span>
          </p>
          <h3 className="text-xl font-medium mt-6">Colour</h3>
          <div className="flex items-center space-x-2 mt-2">
            {["blueTheme", "redTheme", "blackTheme", "greenTheme"].map(
              (color) => (
                <div className="flex" key={color}>
                  <input
                    type="radio"
                    name="color"
                    id={color}
                    className="hidden peer"
                    checked={selectedColor === color}
                    onChange={() => setSelectedColor(color)}
                  />
                  <label
                    htmlFor={color}
                    className={classNames(
                      "w-6 h-6 rounded-full ring-2 ring-transparent ring-offset-4 ml-2 transition-all duration-300",
                      color === "blueTheme"
                        ? "bg-blue-700 peer-checked:ring-blue-700"
                        : "",
                      color === "redTheme"
                        ? "bg-red-700 peer-checked:ring-red-700"
                        : "",
                      color === "greenTheme"
                        ? "bg-green-700 peer-checked:ring-green-700"
                        : "",
                      color === "blackTheme"
                        ? "bg-gray-700 peer-checked:ring-gray-700"
                        : ""
                    )}
                  ></label>
                </div>
              )
            )}
          </div>
          <div className="flex items-center justify-between mt-10">
            <div className="w-20">
              <div className="text-gray-500 text-xs font-medium">Price</div>
              <div className="text-2xl font-semibold">$199</div>
            </div>
            <div className="px-6 py-3 text-white text-sm font-medium shrink-0 rounded-full group-[.blueTheme]:bg-blue-700 group-[.redTheme]:bg-red-700 group-[.blackTheme]:bg-gray-700 group-[.greenTheme]:bg-green-700 shadow-md transition-colors duration-500">
              Buy Now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
