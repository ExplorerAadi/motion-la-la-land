import { RedirectLink } from "../components/Button";

export const Homepage = () => {
  return (
    <div className="flex items-center justify-center p-4 h-screen">
      <div className="grid grid-cols-2 gap-4">
        <RedirectLink label="Menu Interaction" href="/menu-animation" />
        <RedirectLink
          label="Image Reveal Effect"
          href="/image-reveal-on-hover"
        />
        <RedirectLink label="Custom Animation" href="/custom-animation" />
        <RedirectLink label="Stateless Animation" href="/stateless-animation" />
      </div>
    </div>
  );
};
