import { createContext, useState } from "react";
import { Bookmark } from "../common/internal";

interface BookmarkProviderProps {
  children: React.ReactNode;
}

interface ContextType {
  bookmarks: Bookmark[];
  setBookmarks: (bookmarks: Bookmark[]) => void;
  getBookmarks: () => void;
  createBookmark: (recipe: Bookmark) => void;
  deleteBookmark: (id: string) => void;
}

const BookmarksContext = createContext<ContextType | null>(null);
function BookmarksProvider({ children }: BookmarkProviderProps) {
  const [bookmarks, setBookmarks] = useState<ContextType["bookmarks"]>([]);

  const getBookmarks = async () => {
    const data = window.localStorage.getItem("bookmarks");
    if (data && data.length !== 0) {
      const bookmarks = JSON.parse(data);
      setBookmarks(bookmarks);
    }
  };

  const createBookmark = async (recipe: Bookmark) => {
    setBookmarks([...bookmarks, recipe]);
    window.localStorage.setItem(
      "bookmarks",
      JSON.stringify([...bookmarks, recipe])
    );
  };

  const deleteBookmark = async (id: string) => {
    const filteredBookmarks = bookmarks.filter(
      (bookmark) => bookmark.id !== id
    );
    setBookmarks(filteredBookmarks);
    window.localStorage.setItem(
      "bookmarks",
      JSON.stringify([...filteredBookmarks])
    );
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        setBookmarks,
        getBookmarks,
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
