import { IngredientType } from "./IngredientType";

export interface RecipeDetailsResponse {
  id: string;
  title: string;
  source_url: string;
  image_url: string;
  publisher: string;
  cooking_time: number;
  servings: number;
  ingredients: IngredientType[];
}

export type CreatedRecipeType = Omit<RecipeDetailsResponse, "id">;
