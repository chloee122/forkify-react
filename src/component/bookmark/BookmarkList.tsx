import useBookmarksContext from "../../hooks/useBookmarksContext";
import Link from "../navigation/Link";
import ListItem from "../shared/ListItem";

interface BookmarkListProps {
  closeBookmarks: () => void;
}

function BookmarkList({ closeBookmarks }: BookmarkListProps) {
  const { bookmarks } = useBookmarksContext();

  const renderedBookmarks = bookmarks.map((bookmark) => {
    return (
      <Link key={bookmark.id} to={`/recipes/${bookmark.id}`}>
        <ListItem item={bookmark} onClick={closeBookmarks} />
      </Link>
    );
  });
  return <>{renderedBookmarks}</>;
}

export default BookmarkList;
