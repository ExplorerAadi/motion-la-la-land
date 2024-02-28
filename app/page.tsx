import { HamburgerInteraction } from "../components/hamburger";
import { ScrollInteractions } from "../components/scroll";
import { Tailwind } from "../components/tailwind";

export default async function Index() {
  return (
    <>
      <HamburgerInteraction />
      <Tailwind />
      <ScrollInteractions />
    </>
  );
}
