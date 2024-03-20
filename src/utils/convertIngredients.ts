// import { ConvertedIngredient } from "./convertRecipeTypes";
import { ConvertedIngredient } from "../api/types/RecipeDetailsType";

const convertIngredients = (ingredients: string[]) => {
  const newIngredients = ingredients.reduce(
    (acc: ConvertedIngredient[], ingredient) => {
      if (ingredient === "") return acc;
      const parts = ingredient.split(",");

      if (parts.length !== 3) {
        throw new Error("Input format was not correct! Please try again :)");
      }

      return [
        ...acc,
        { quantity: Number(parts[0]), unit: parts[1], description: parts[2] },
      ];
    },
    []
  );
  return newIngredients;
};

export { convertIngredients };
