import { Homepage } from "./Homepage";

import "../styles/globals.css";

export default async function Index() {
  return (
    <div className="flex items-center justify-center p-4 h-screen">
      <Homepage />
    </div>
  );
}
