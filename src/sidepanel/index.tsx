import React from "react";
import { createRoot } from "react-dom/client";
import "../assets/tailwind.css";
import Sidepanel from "./sidepanel";

function init() {
  const appContainer = document.createElement("div");
  appContainer.className = "container";

  document.body.appendChild(appContainer);

  if (!appContainer) {
    throw new Error("Can not find AppContainer");
  }
  const root = createRoot(appContainer);
  console.log(appContainer);
  root.render(<Sidepanel />);
}

init();
