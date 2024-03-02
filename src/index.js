import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BookmarksProvider } from "./context/BookmarksContext";
import { SelectedRecipeProvider } from "./context/SelectedRecipeContext";
import { NavigationProvider } from "./context/NavigationContext";

const el = document.getElementById("root");
const root = createRoot(el);

root.render(
  <NavigationProvider>
    <BookmarksProvider>
      <SelectedRecipeProvider>
        <App />
      </SelectedRecipeProvider>
    </BookmarksProvider>
  </NavigationProvider>
);
