import { useContext } from "react";
import BookmarksContext from "../context/BookmarksContext";
import BookmarkListItem from "./BookmarkListItem";
import Link from "./Link";

function BookmarkList() {
  const { bookmarks } = useContext(BookmarksContext);

  const renderedBookmarks = bookmarks.map((bookmark) => {
    return (
      <Link key={bookmark.id} to={`/recipes/${bookmark.id}`}>
        <BookmarkListItem bookmark={bookmark} />
      </Link>
    );
  });
  return renderedBookmarks;
}

export default BookmarkList;
