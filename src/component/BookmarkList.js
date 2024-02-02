function BookmarkList({ bookmarks, setShowBookmarks, handleChooseRecipe }) {
  const renderedBookmarks = bookmarks.map((bookmark) => {
    return (
      <div
        key={bookmark.id}
        onMouseEnter={() => setShowBookmarks(true)}
        onMouseLeave={() => setShowBookmarks(false)}
        className="group/item hover:bg-slate-100 flex"
        onClick={() => handleChooseRecipe(bookmark.id)}
      >
        <img
          src={bookmark.imageUrl}
          alt={bookmark.title}
          className="h-10 w-10 rounded-full "
        ></img>
        <div>
          <p className="font-sans text-sm font-semibold text-amber-600">
            {bookmark.title}
          </p>
          <p className="text-xs text-stone-400">{bookmark.publisher}</p>
        </div>
      </div>
    );
  });
  return renderedBookmarks;
}

export default BookmarkList;
