import { CreateRecipeRequest } from "../common/api.type";
import { ExtendedRecipeWithoutId } from "../common/internal";

const convertToCreateRecipeRequest = (
  recipe: ExtendedRecipeWithoutId
): CreateRecipeRequest => {
  return {
    title: recipe.title,
    source_url: recipe.sourceUrl,
    image_url: recipe.imageUrl,
    publisher: recipe.publisher,
    cooking_time: recipe.cookingTime,
    servings: recipe.servings,
    ingredients: recipe.ingredients,
  };
};

export default convertToCreateRecipeRequest;
