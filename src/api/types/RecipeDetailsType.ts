import { IngredientType } from "./IngredientType";

export interface RecipeDetailsType {
  id: string;
  title: string;
  sourceUrl: string;
  imageUrl: string;
  publisher: string;
  cookingTime: number;
  servings: number;
  ingredients: IngredientType[];
}
