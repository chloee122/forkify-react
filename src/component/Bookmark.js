import { useState, useEffect, useContext } from "react";
import BookmarkList from "./BookmarkList";
import BookmarksContext from "../context/BookmarksContext";

function Bookmark() {
  const [showBookmarks, setShowBookmarks] = useState(false);
  const { fetchBookmarks } = useContext(BookmarksContext);

  useEffect(() => {
    fetchBookmarks();
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
