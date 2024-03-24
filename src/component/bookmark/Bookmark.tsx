import { useState, useEffect } from "react";
import BookmarkList from "./BookmarkList";
import useBookmarksContext from "../../hooks/useBookmarksContext";

function Bookmark() {
  const [showBookmarks, setShowBookmarks] = useState(false);
  const { getBookmarks } = useBookmarksContext();
  useEffect(() => {
    getBookmarks();
  }, []);

  const closeBookmarks = () => {
    setShowBookmarks(false);
  };

  return (
    <div
      onMouseEnter={() => setShowBookmarks(true)}
      onMouseLeave={() => setShowBookmarks(false)}
    >
      <button>BOOKMARKS</button>
      {showBookmarks && <BookmarkList closeBookmarks={closeBookmarks} />}
    </div>
  );
}

export default Bookmark;
