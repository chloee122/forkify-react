import { useState, useEffect } from "react";
import RecipeHeader from "./RecipeHeader";
import RecipeDetails from "./RecipeDetails";
import RecipeIngredients from "./RecipeIngredients";
import RecipeDirection from "./RecipeDirection";
import * as api from "../../api/api";
import useNavigationContext from "../../hooks/useNavigationContext";
import { ExtendedRecipe } from "../../common/internal";
import Message from "../shared/Message";

const STARTING_INDEX_OF_RECIPE_ID = 9;

function Recipe() {
  const [selectedRecipe, setSelectedRecipe] = useState<ExtendedRecipe | null>(
    null
  );
  const [selectedServings, setSelectedServings] = useState<number>(0);
  const { currentPath } = useNavigationContext();
  const recipeId = currentPath.substring(STARTING_INDEX_OF_RECIPE_ID);
  const [error, setError] = useState<string | null>(null);

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    } else if (error && typeof error === "object" && "message" in error) {
      return String(error.message);
    } else if (typeof error === "string") {
      return error;
    } else {
      return "Something went wrong.";
    }
  };

  useEffect(() => {
    async function getRecipe() {
      try {
        setError(null);
        const response = await api.getRecipe(recipeId);
        setSelectedRecipe(response);
      } catch (error) {
        const message = getErrorMessage(error);
        setError(message);
      }
    }
    getRecipe();
  }, [recipeId]);

  useEffect(() => {
    if (selectedRecipe) setSelectedServings(selectedRecipe.servings);
  }, [selectedRecipe]);

  if (error) return <Message message={error} error={true} />;
  if (!selectedRecipe) return null;

  return (
    <div>
      <RecipeHeader selectedRecipe={selectedRecipe} />
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
}

export default Recipe;
