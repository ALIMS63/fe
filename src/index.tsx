import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "./i18n/i18n";
import { Loader } from "./components/Loader/Loader";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(
  <Suspense fallback={<Loader />}>
    <App />
  </Suspense>,
  document.getElementById("root")
);

// serviceWorkerRegistration.register();

serviceWorkerRegistration.register({
  onUpdate: (registration) => {
    const waitingServiceWorker = registration.waiting;

    if (waitingServiceWorker) {
      waitingServiceWorker.addEventListener("statechange", (event: any) => {
        if (event.target.state === "activated") {
          window.location.reload();
        }
      });
      waitingServiceWorker.postMessage({ type: "SKIP_WAITING" });
    }
  },
});
