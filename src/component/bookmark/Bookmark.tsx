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
      className="flex justify-center text-sm w-full h-full hover:bg-stone-300 relative"
      onMouseEnter={() => setShowBookmarks(true)}
      onMouseLeave={() => setShowBookmarks(false)}
    >
      <button className="flex items-center justify-center gap-2 font-semibold">
        <FaRegBookmark className="text-2xl text-background2" />
        BOOKMARKS
      </button>
      {showBookmarks && <BookmarkList closeBookmarks={closeBookmarks} />}
    </div>
  );
}

export default Bookmark;
