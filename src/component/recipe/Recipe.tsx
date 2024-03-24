import { useState, useEffect } from "react";
import RecipeDetails from "./RecipeDetails";
import RecipeIngredients from "./RecipeIngredients";
import RecipeDirection from "./RecipeDirection";
import * as api from "../../api/api";
import useNavigationContext from "../../hooks/useNavigationContext";
import { ExtendedRecipe } from "../../common/internal";

const STARTING_INDEX_OF_RECIPE_ID = 9;

function Recipe() {
  const [selectedRecipe, setSelectedRecipe] = useState<ExtendedRecipe | null>(
    null
  );

  const [selectedServings, setSelectedServings] = useState<number>(0);
  const { currentPath } = useNavigationContext();
  const recipeId = currentPath.substring(STARTING_INDEX_OF_RECIPE_ID);

  useEffect(() => {
    async function getRecipe() {
      const recipe = await api.getRecipe(recipeId);
      setSelectedRecipe(recipe);
    }
    getRecipe();
  }, [recipeId]);

  useEffect(() => {
    if (selectedRecipe) setSelectedServings(selectedRecipe.servings);
  }, [selectedRecipe]);

  if (!selectedRecipe) {
    return null;
  }

  const content = (
    <div>
      <figure className="before:block before:h-100 before:w-100 before:absolute before:bg-slate-100 h-80 relative origin-top">
        <img
          className="object-cover block h-full w-full"
          src={selectedRecipe.imageUrl}
          alt={selectedRecipe.title}
        />
        <h1 className="absolute bottom-0 left-1/2  -translate-x-2/4 translate-y-1/4 -skew-y-6 text-white text-5xl w-1/2 uppercase leading-loose text-center">
          <span className="py-5 px-8 bg-gradient-to-br from-yellow-100 to-orange-500">
            {selectedRecipe.title}
          </span>
        </h1>
      </figure>
      <RecipeDetails
        selectedServings={selectedServings}
        setSelectedServings={setSelectedServings}
        selectedRecipe={selectedRecipe}
      />

      <RecipeIngredients
        selectedRecipe={selectedRecipe}
        selectedServings={selectedServings}
      />
      <RecipeDirection selectedRecipe={selectedRecipe} />
    </div>
  );

  return content;
}
export default Recipe;
