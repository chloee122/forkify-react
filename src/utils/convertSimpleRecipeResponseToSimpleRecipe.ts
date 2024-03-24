import { SimpleRecipeResponse } from "../common/api.type";
import { SimpleRecipe } from "../common/internal";

const convertSimpleRecipeResponseToSimpleRecipe = (
  recipe: SimpleRecipeResponse
): SimpleRecipe => {
  return {
    id: recipe.id,
    title: recipe.title,
    imageUrl: recipe.image_url,
    publisher: recipe.publisher,
  };
};

export default convertSimpleRecipeResponseToSimpleRecipe;
