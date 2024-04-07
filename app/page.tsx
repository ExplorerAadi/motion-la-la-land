import { HamburgerInteraction } from "../components/hamburger";
import { ScrollInteractions } from "../components/scroll";
import { Tailwind } from "../components/tailwind";
import { Homepage } from "./Homepage";

import "../styles/globals.css";

export default async function Index() {
  return (
    <>
      {/* <HamburgerInteraction /> */}
      {/* <Tailwind /> */}
      {/* <ScrollInteractions /> */}
      <div className="flex items-center justify-center p-4 h-screen">
        <Homepage />
      </div>
    </>
  );
}
