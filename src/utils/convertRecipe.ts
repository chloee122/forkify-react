import { RecipeResponse } from "../api/types/RecipeResponse";
import { RecipeType } from "../api/types/RecipeType";

export const convertRecipe = (recipe: RecipeResponse): RecipeType => {
  return {
    id: recipe.id,
    title: recipe.title,
    imageUrl: recipe.image_url,
    publisher: recipe.publisher,
  };
};
