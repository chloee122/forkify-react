import { GoClock, GoPerson, GoBookmark, GoBookmarkFill } from "react-icons/go";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

function RecipeDetails({
  cookingTime,
  servings,
  setServings,
  id,
  onBookmark,
  bookmarks,
}) {
  const handleIncreaseServings = () => {
    setServings(servings + 1);
  };
  const handleDecreaseServings = () => {
    if (servings === 1) return;
    setServings(servings - 1);
  };

  return (
    <div className="uppercase flex items-center pt-24 pb-12 pr-32 pl-32">
      <div className="flex mr-16 items-center">
        <GoClock className="mr-1" />
        <div>{cookingTime} minutes</div>
      </div>
      <div className="flex mr-16 items-center">
        <GoPerson className="mr-1" />
        <div>{servings} servings</div>
        <CiCircleMinus
          className="ml-2 h-5 w-5"
          onClick={handleDecreaseServings}
        />
        <CiCirclePlus className="h-5 w-5" onClick={handleIncreaseServings} />
      </div>
      <button
        className="rounded-full bg-gradient-to-br from-yellow-100 to-orange-500 h-10 w-10 flex items-center justify-center"
        onClick={() => onBookmark()}
      >
        {bookmarks.some((bookmark) => id === bookmark.id) ? (
          <GoBookmarkFill className="text-white h-6 w-6" />
        ) : (
          <GoBookmark className="text-white h-6 w-6" />
        )}
      </button>
    </div>
  );
}

export default RecipeDetails;
