"use client";

import { RedirectLink } from "./Button";

export const Card = ({
  title,
  description,
  media,
  redirectLabel,
  redirectLink,
}: {
  title: string;
  description: string;
  media: string;
  redirectLabel: string;
  redirectLink: string;
}) => {
  return (
    <div className="relative flex flex-col justify-between text-gray-700 bg-[#18181B] shadow-md bg-clip-border rounded-xl w-96 border border-[#27272A]">
      <div>
        <div className="relative h-64 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
          <video
            className="h-full w-full rounded-md overflow-hidden object-cover"
            src={media}
            autoPlay={true}
            loop={true}
          />
        </div>
        <div className="p-6 text-white">
          <h5 className="block mb-2 text-xl antialiased font-semibold tracking-normal">
            {title}
          </h5>
          <p className="block text-sm antialiased font-light leading-normal">
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
