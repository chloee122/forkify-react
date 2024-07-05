import { useState } from "react";
import { FaRegPenToSquare } from "react-icons/fa6";
import RecipeFormModal from "../../RecipeAddForm/RecipeFormModal";

function RecipeAddButton() {
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const handleClick = () => {
    setShowRecipeModal(true);
  };
  const handleClose = () => {
    setShowRecipeModal(false);
  };
  return (
    <div className="flex justify-center text-sm w-full h-full hover:bg-greylight2">
      <button
        onClick={handleClick}
        className="flex items-center justify-center gap-2 font-semibold"
      >
        <FaRegPenToSquare className="h-6 w-6 text-primary" />
        ADD RECIPE
      </button>
      {showRecipeModal && <RecipeFormModal onClose={handleClose} />}
    </div>
  );
}

export default RecipeAddButton;
