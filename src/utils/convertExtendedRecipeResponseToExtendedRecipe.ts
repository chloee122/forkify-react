import { ExtendedRecipeResponse } from "../common/api.types";
import { ExtendedRecipe } from "../common/internal";

export const convertExtendedRecipeResponseToExtendedRecipe = (
  recipe: ExtendedRecipeResponse
): ExtendedRecipe => {
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
