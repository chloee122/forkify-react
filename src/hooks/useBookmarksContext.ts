import { useContext } from "react";
import BookmarksContext from "../context/BookmarksContext";

export default function useBookmarksContext() {
  const bookmarksContext = useContext(BookmarksContext);

  if (!bookmarksContext) {
    throw new Error(
      "useBookmarksContext has to be used within <BookmarksContext.Provider>"
    );
  }

  return bookmarksContext;
}
