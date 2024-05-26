import { RedirectLink } from "../components/Button";
import { Card } from "../components/Card";

export const Homepage = () => {
  return (
    <div className="flex items-center justify-center p-4 h-full">
      <div className="grid grid-cols-3 gap-4">
        <Card title="Menu Interaction" description="Hamburger menu interaction by animating svg paths." redirectLabel="Demo" redirectLink="/menu-animation" />
        <Card title="Image Reveal Effect" description="Hover over the area to sneak peek the image and click to reveal it." redirectLabel="Demo" redirectLink="/image-reveal-on-hover" />
        <Card title="Mouse Tracking" description="Revealing hidden message when hovering over the text shown." redirectLabel="Demo" redirectLink="/mouse-tracking" />
        <Card title="Menu Interaction" description="Stick the heading of the section in viewport to the top." redirectLabel="Demo" redirectLink="/smart-navbar" />
        {/* <RedirectLink label="Custom Animation" href="/custom-animation" /> */}
        {/* <RedirectLink label="Stateless Animation" href="/stateless-animation" /> */}
      </div>
    </div>
  );
};
