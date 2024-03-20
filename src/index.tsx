import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BookmarksProvider } from "./context/BookmarksContext";
import { NavigationProvider } from "./context/NavigationContext";

const el = document.getElementById("root")!;
const root = createRoot(el);

root.render(
  <NavigationProvider>
    <BookmarksProvider>
      <App />
    </BookmarksProvider>
  </NavigationProvider>
);
