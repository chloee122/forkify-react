import { useState } from "react";
import RecipeFormModal from "./RecipeFormModal";

function RecipeAddButton() {
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const handleClick = () => {
    setShowRecipeForm(!showRecipeForm);
  };
  return (
    <div>
      <button onClick={handleClick}>ADD RECIPE</button>
      {showRecipeForm && <RecipeFormModal />}
    </div>
  );
}

export default RecipeAddButton;
