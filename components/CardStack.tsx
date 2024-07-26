"use client";

const BaseCard = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-lg w-72 h-96 shadow-xl">
      <h3 className="text-lg">The greatest trick</h3>
    </div>
  );
};

export const BaseCardsStacked = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-950">
      <div className="relative h-full w-full">
        <div className="absolute top-[54%] left-[30%] -translate-x-[30%] -translate-y-[54%]">
          <BaseCard />
        </div>
        <div className="absolute top-[47%] left-[38%] -translate-x-[38%] -translate-y-[47%]">
          <BaseCard />
        </div>
        <div className="absolute top-[42%] left-[47%] -translate-x-[47%] -translate-y-[42%]">
          <BaseCard />
        </div>
        <div className="absolute top-[49%] left-[54%] -translate-x-[54%] -translate-y-[49%]">
          <BaseCard />
        </div>
        <div className="absolute top-[56%] left-[61%] -translate-x-[61%] -translate-y-[56%]">
          <BaseCard />
        </div>
      </div>
    </div>
  );
};
