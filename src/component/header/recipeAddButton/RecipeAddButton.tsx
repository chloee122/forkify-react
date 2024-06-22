import { useState } from "react";
import { FaRegPenToSquare } from "react-icons/fa6";
import RecipeFormModal from "../../recipeAddForm/RecipeFormModal";

function RecipeAddButton() {
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const handleClick = () => {
    setShowRecipeModal(true);
  };
  const handleClose = () => {
    setShowRecipeModal(false);
  };
  return (
    <div className="flex justify-center text-sm w-full h-full hover:bg-neutral-200">
      <button
        onClick={handleClick}
        className="flex items-center justify-center gap-2 font-semibold"
      >
        <FaRegPenToSquare className="text-2xl text-background2" />
        ADD RECIPE
      </button>
      {showRecipeModal && <RecipeFormModal onClose={handleClose} />}
    </div>
  );
}

export default RecipeAddButton;
