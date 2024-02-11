import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BookmarksProvider } from "./context/BookmarksContext";
import { SelectedRecipeProvider } from "./context/SelectedRecipeContext";

const el = document.getElementById("root");
const root = createRoot(el);

root.render(
  <BookmarksProvider>
    <SelectedRecipeProvider>
      <App />
    </SelectedRecipeProvider>
  </BookmarksProvider>
);
