// Photos from https://citizenofnowhe.re
import "./styles.css";
import { ScrollAnimation } from "../../components/ScrollAnimation";

export default function ScrollAnimationPage() {
  return (
    <>
      {[1, 2, 3, 4, 5].map((image) => (
        <ScrollAnimation id={image} />
      ))}
    </>
  );
}
