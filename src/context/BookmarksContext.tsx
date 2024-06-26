import { createContext, useState } from "react";
import * as api from "../api/api";
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
    const data = await api.getBookmarks();
    setBookmarks(data);
  };

  const createBookmark = async (recipe: Bookmark) => {
    const data = await api.createBookmark(recipe);
    setBookmarks([...bookmarks, data]);
  };

  const deleteBookmark = async (id: string) => {
    await api.deleteBookmark(id);
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
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
