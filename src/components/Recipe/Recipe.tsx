import { useState, useEffect } from "react";
import { AxiosError } from "axios";
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
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function getRecipe() {
      try {
        setErrorMessage("");
        const response = await api.getRecipe(recipeId);
        setSelectedRecipe(response);
      } catch (error) {
        if (error instanceof AxiosError) {
          const message = error.response?.data.message || error.message;
          setErrorMessage(message);
        }
      }
    }
    getRecipe();
  }, [recipeId]);

  useEffect(() => {
    if (selectedRecipe) setSelectedServings(selectedRecipe.servings);
  }, [selectedRecipe]);

  if (errorMessage)
    return (
      <div>
        <Message message={errorMessage} error={true} />
      </div>
    );
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
