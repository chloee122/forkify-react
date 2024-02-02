import { useState } from "react";
import BookmarkList from "./BookmarkList";

function Bookmark({ bookmarks, handleChooseRecipe }) {
  const [showBookmarks, setShowBookmarks] = useState(false);

  return (
    <div>
      <button
        onMouseEnter={() => setShowBookmarks(true)}
        onMouseLeave={() => setShowBookmarks(false)}
      >
        BOOKMARKS
      </button>
      {showBookmarks && (
        <BookmarkList
          bookmarks={bookmarks}
          setShowBookmarks={setShowBookmarks}
          handleChooseRecipe={handleChooseRecipe}
        />
      )}
    </div>
  );
}

export default Bookmark;
