import { Homepage } from "./Homepage";

import "../styles/globals.css";

export default async function Index() {
  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-neutral-950">
      <Homepage />
    </div>
  );
}
