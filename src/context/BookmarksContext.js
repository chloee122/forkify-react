import { createContext, useState } from "react";
import * as api from "../api";

const BookmarksContext = createContext();
function BookmarksProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);

  const fetchBookmarks = async () => {
    const data = await api.fetchBookmarks();
    setBookmarks(data);
  };

  const createBookmark = async (recipe) => {
    const data = await api.createBookmark(recipe);
    setBookmarks([...bookmarks, data]);
  };

  const deleteBookmark = async (id) => {
    await api.deleteBookmark(id);
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        setBookmarks,
        fetchBookmarks,
        createBookmark,
        deleteBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export { BookmarksProvider };
export default BookmarksContext;
