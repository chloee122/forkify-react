import { createContext, useState } from "react";
import { getBookmarks, addBookmark, removeBookmark } from "../api";

const BookmarksContext = createContext();
function BookmarksProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);

  const fetchBookmarks = async () => {
    const data = await getBookmarks();
    setBookmarks(data);
  };

  const createBookmark = async (recipe) => {
    const data = await addBookmark(recipe);
    setBookmarks([...bookmarks, data]);
  };

  const deleteBookmark = async (id) => {
    await removeBookmark(id);
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
