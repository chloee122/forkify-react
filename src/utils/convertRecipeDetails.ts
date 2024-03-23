import { RecipeDetailsResponse } from "../api/types/RecipeDetailsResponse";
import { RecipeDetailsType } from "../api/types/RecipeDetailsType";

export const convertRecipeDetails = (
  recipe: RecipeDetailsResponse
): RecipeDetailsType => {
  return {
    id: recipe.id,
    title: recipe.title,
    sourceUrl: recipe.source_url,
    imageUrl: recipe.image_url,
    publisher: recipe.publisher,
    cookingTime: recipe.cooking_time,
    servings: recipe.servings,
    ingredients: recipe.ingredients,
  };
};
