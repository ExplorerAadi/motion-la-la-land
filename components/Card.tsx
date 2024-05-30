"use client";

import { RedirectLink } from "./Button";

export const Card = ({
  title,
  description,
  redirectLabel,
  redirectLink,
}: {
  title: string;
  description: string;
  redirectLabel: string;
  redirectLink: string;
}) => {
  return (
    <div className="relative flex flex-col justify-between text-gray-700 bg-[#18181B] shadow-md bg-clip-border rounded-xl w-96 border border-[#27272A]">
      <div>
        <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
          <img
            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
            alt="card-image"
          />
        </div>
        <div className="p-6 text-white">
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal">
            {title}
          </h5>
          <p className="block font-sans text-sm antialiased font-light leading-normal">
            {description}
          </p>
        </div>
      </div>
      <div className="p-6">
        <RedirectLink label={redirectLabel} href={redirectLink} />
      </div>
    </div>
  );
};
