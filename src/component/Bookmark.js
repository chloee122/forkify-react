import { useState, useEffect, useContext } from "react";
import BookmarkList from "./BookmarkList";
import BookmarksContext from "../context/BookmarksContext";

function Bookmark() {
  const [showBookmarks, setShowBookmarks] = useState(false);
  const { getBookmarks } = useContext(BookmarksContext);

  useEffect(() => {
    getBookmarks();
  }, []);

  return (
    <div
      onMouseEnter={() => setShowBookmarks(true)}
      onMouseLeave={() => setShowBookmarks(false)}
    >
      <button>BOOKMARKS</button>
      {showBookmarks && <BookmarkList />}
    </div>
  );
}

export default Bookmark;
