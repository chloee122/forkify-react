import { useContext } from "react";
import BookmarksContext from "../context/BookmarksContext";
import BookmarkListItem from "./BookmarkListItem";
import Link from "./Link";

function BookmarkList({ setShowBookmarks }) {
  const { bookmarks } = useContext(BookmarksContext);
  const closeBookmarks = () => {
    setShowBookmarks(false);
  };

  const renderedBookmarks = bookmarks.map((bookmark) => {
    return (
      <Link key={bookmark.id} to={`/recipes/${bookmark.id}`}>
        <BookmarkListItem bookmark={bookmark} closeBookmarks={closeBookmarks} />
      </Link>
    );
  });
  return renderedBookmarks;
}

export default BookmarkList;
