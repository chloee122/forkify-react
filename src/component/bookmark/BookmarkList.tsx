import useBookmarksContext from "../../hooks/useBookmarksContext";
import Link from "../navigation/Link";
import Message from "../shared/Message";
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
  return (
    <div className="absolute top-[100px] right-0 py-3 bg-white w-[400px] z-10">
      {renderedBookmarks.length === 0 ? (
        <Message
          message={"No bookmarks yet. Find a nice recipe and bookmark it"}
        />
      ) : (
        renderedBookmarks
      )}
    </div>
  );
}

export default BookmarkList;
