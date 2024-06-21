import { useState } from "react";
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
    <div className="relative">
      <button onClick={handleClick}>ADD RECIPE</button>
      {showRecipeModal && <RecipeFormModal onClose={handleClose} />}
    </div>
  );
}

export default RecipeAddButton;
