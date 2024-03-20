import useBookmarksContext from "../../hooks/useBookmarksContext";
import BookmarkListItem from "./BookmarkListItem";
import Link from "../navigation/Link";

interface BookmarkListProps {
  closeBookmarks: () => void;
}

function BookmarkList({ closeBookmarks }: BookmarkListProps) {
  const { bookmarks } = useBookmarksContext();

  const renderedBookmarks = bookmarks.map((bookmark) => {
    return (
      <Link key={bookmark.id} to={`/recipes/${bookmark.id}`}>
        <BookmarkListItem bookmark={bookmark} closeBookmarks={closeBookmarks} />
      </Link>
    );
  });
  return <>{renderedBookmarks}</>;
}

export default BookmarkList;
