"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const Drawer = () => {
  const [drawerContent, setDrawerContent] = useState<
    (typeof tableData)[0] | null
  >(null);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-950">
      <motion.table
        className="w-full max-w-5xl text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-md overflow-hidden mx-10"
        style={drawerContent ? { marginRight: "30%" } : {}}
        layout
      >
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Color
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={data.name}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {data.name}
              </th>
              <td className="px-6 py-4">{data.color}</td>
              <td className="px-6 py-4">{data.category}</td>
              <td className="px-6 py-4">{data.price}</td>
              <td className="px-3 py-3 cursor-pointer">
                <button
                  className="bg-gray-700 px-3 py-1 rounded-md"
                  onClick={() => setDrawerContent(data)}
                >
                  Open
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </motion.table>
      <AnimatePresence>
        {drawerContent && (
          <motion.div
            className="fixed inset-y-0 right-0 w-1/2 bg-white dark:bg-gray-800"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
          >
            <div className="p-4">
              <button
                className="text-white"
                onClick={() => setDrawerContent(null)}
              >
                <ChevronRightIcon />
              </button>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mt-4">
                {drawerContent.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {drawerContent.description || "No description available."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const tableData = [
  {
    name: "Apple MacBook Pro 17",
    description:
      "The best laptop for developers and designers with a 17-inch screen. It has a 10-core M1 Pro chip, 32GB of RAM, and 2TB of storage.",
    color: "Silver",
    category: "Laptop",
    price: "$2999",
  },
  {
    name: "Google Pixel 6",
    description:
      "The latest smartphone from Google with a 6.4-inch display. It has a 50MP camera and 8GB of RAM.",
    color: "White",
    category: "Smartphone",
    price: "$699",
  },
  {
    name: "Sony PlayStation 5",
    color: "Black",
    category: "Gaming",
    price: "$499",
  },
  {
    name: "Apple AirPods Pro",
    color: "White",
    category: "Audio",
    price: "$249",
  },
  {
    name: "Samsung Galaxy Watch",
    color: "Black",
    category: "Wearable",
    price: "$199",
  },
  {
    name: "Bose QuietComfort 45",
    color: "Black",
    category: "Headphones",
    price: "$349",
  },
];

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    className="feather feather-chevrons-right"
  >
    <polyline points="13 17 18 12 13 7" />
    <polyline points="6 17 11 12 6 7" />
  </svg>
);
