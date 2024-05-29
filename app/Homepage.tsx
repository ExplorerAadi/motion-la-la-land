import { Card } from "../components/Card";

export const Homepage = () => {
  return (
    <div className="flex flex-col items-center justify-start p-4 h-full">
      <h3 className="pt-32 pb-28 text-white text-5xl font-semibold">Motion La La Land</h3>
      <div className="grid grid-cols-3 gap-x-4 gap-y-12">
        <Card title="Menu Interaction" description="A hamburger menu created by only animating the svg paths and can be used to toggle the open/close state of sidebar menus." redirectLabel="Demo" redirectLink="/menu-animation" />
        <Card title="Image Reveal Effect" description="A cool way to hide the image which lets the user take a sneak peek by hovering over the container and can be revealed after clicking on it." redirectLabel="Demo" redirectLink="/image-reveal-on-hover" />
        <Card title="Mouse Tracking" description="Revealing hidden message when hovering over the text shown." redirectLabel="Demo" redirectLink="/mouse-tracking" />
        <Card title="Smart Navbar" description="Stick the heading of the section in viewport to the top." redirectLabel="Demo" redirectLink="/smart-navbar" />
        {/* <RedirectLink label="Custom Animation" href="/custom-animation" /> */}
        {/* <RedirectLink label="Stateless Animation" href="/stateless-animation" /> */}
      </div>
    </div>
  );
};
