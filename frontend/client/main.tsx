import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
if (!container) throw new Error("Root container #root not found");

// Reuse existing root if present (HMR), otherwise create once
// @ts-expect-error - attach to DOM node for reuse across HMR updates
const existingRoot = container._reactRoot as
  | ReturnType<typeof createRoot>
  | undefined;
// @ts-expect-error - store root on the DOM node to prevent duplicate createRoot warnings
container._reactRoot = existingRoot ?? createRoot(container);
// @ts-expect-error - use stored root
container._reactRoot.render(<App />);
