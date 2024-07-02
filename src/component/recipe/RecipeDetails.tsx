import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { FiMinusCircle, FiPlusCircle, FiUsers, FiClock } from "react-icons/fi";
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
    <div className="uppercase flex items-center pt-[75px] px-20 pb-9">
      <div className="flex items-center mr-12">
        <FiClock className="h-6 w-6 text-primary mr-3" />
        <div>
          <span className="font-bold">{selectedRecipe.cookingTime}</span>
          <span> minutes</span>
        </div>
      </div>
      <div className="flex items-center mr-12">
        <FiUsers className="h-6 w-6 text-primary mr-3" />
        <div>
          <span className="font-bold">{selectedServings}</span>
          <span> servings</span>
        </div>
        <div className="flex items-center ml-4 -translate-y-px">
          <button className="hover:-translate-y-px">
            <FiMinusCircle
              className="mr-1 h-5 w-5 text-primary"
              onClick={handleDecreaseServings}
            />
          </button>
          <button className="hover:-translate-y-px">
            <FiPlusCircle
              className="h-5 w-5 text-primary"
              onClick={handleIncreaseServings}
            />
          </button>
        </div>
      </div>
      <button
        className="rounded-full bg-gradient-to-br from-background1 to-background2 h-11 w-11 flex items-center justify-center hover:scale-105 ml-auto"
        onClick={() => handleBookmark()}
      >
        {isRecipeBookmarked ? (
          <FaBookmark className="text-white h-6 w-6" />
        ) : (
          <FaRegBookmark className="text-white h-6 w-6" />
        )}
      </button>
    </div>
  );
}

export default RecipeDetails;
