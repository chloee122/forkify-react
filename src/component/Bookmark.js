import { useState } from "react";
import BookmarkList from "./BookmarkList";

function Bookmark() {
  const [showBookmarks, setShowBookmarks] = useState(false);

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
