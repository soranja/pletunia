import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const App = dynamic(() => import("../../src/App"), { ssr: false });

export function ClientOnly() {
  return (
    <React.StrictMode>
      <Suspense fallback={"THIS PAGE IS LOADING... STAND BY"}>
        <App />
      </Suspense>
    </React.StrictMode>
  );
}
