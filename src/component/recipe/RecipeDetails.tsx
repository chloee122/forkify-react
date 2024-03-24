import { GoClock, GoPerson, GoBookmark, GoBookmarkFill } from "react-icons/go";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useMemo } from "react";
import useBookmarksContext from "../../hooks/useBookmarksContext";
import { ExtendedRecipe } from "../../common/internal";

interface RecipeDetailsProps {
  selectedRecipe: ExtendedRecipe;
  selectedServings: number;
  setSelectedServings: (servings: number) => void;
}

function RecipeDetails({
  selectedRecipe,
  selectedServings,
  setSelectedServings,
}: RecipeDetailsProps) {
  const handleIncreaseServings = () => {
    setSelectedServings(selectedServings + 1);
  };
  const handleDecreaseServings = () => {
    if (selectedServings === 1) return;
    setSelectedServings(selectedServings - 1);
  };

  const { bookmarks, createBookmark, deleteBookmark } = useBookmarksContext();

  const isRecipeBookmarked = useMemo(
    () => bookmarks.some((bookmark) => bookmark.id === selectedRecipe.id),
    [bookmarks, selectedRecipe]
  );

  const handleBookmark = () => {
    if (isRecipeBookmarked) {
      deleteBookmark(selectedRecipe.id);
    } else {
      createBookmark(selectedRecipe);
    }
  };

  return (
    <div className="uppercase flex items-center pt-24 pb-12 pr-32 pl-32">
      <div className="flex mr-16 items-center">
        <GoClock className="mr-1" />
        <div>{selectedRecipe.cookingTime} minutes</div>
      </div>
      <div className="flex mr-16 items-center">
        <GoPerson className="mr-1" />
        <div>{selectedServings} servings</div>
        <CiCircleMinus
          className="ml-2 h-5 w-5"
          onClick={handleDecreaseServings}
        />
        <CiCirclePlus className="h-5 w-5" onClick={handleIncreaseServings} />
      </div>
      <button
        className="rounded-full bg-gradient-to-br from-yellow-100 to-orange-500 h-10 w-10 flex items-center justify-center"
        onClick={() => handleBookmark()}
      >
        {isRecipeBookmarked ? (
          <GoBookmarkFill className="text-white h-6 w-6" />
        ) : (
          <GoBookmark className="text-white h-6 w-6" />
        )}
      </button>
    </div>
  );
}

export default RecipeDetails;
