function BookmarkList({ bookmarks }) {
  const renderedBookmarks = bookmarks.map((bookmark) => {
    return <div>bookmark</div>;
  });
  return renderedBookmarks;
}

export default BookmarkList;
