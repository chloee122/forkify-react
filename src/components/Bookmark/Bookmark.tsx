import { useState, useEffect } from "react";
import BookmarkList from "./BookmarkList";
import useBookmarksContext from "../../hooks/useBookmarksContext";
import { FaRegBookmark } from "react-icons/fa";

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
      className="flex justify-center text-sm w-full h-full hover:bg-greylight2"
      onMouseEnter={() => setShowBookmarks(true)}
      onMouseLeave={() => setShowBookmarks(false)}
    >
      <button className="flex items-center justify-center gap-2 font-semibold">
        <FaRegBookmark className="h-6 w-6 text-primary" />
        BOOKMARKS
      </button>
      {showBookmarks && <BookmarkList closeBookmarks={closeBookmarks} />}
    </div>
  );
}

export default Bookmark;
