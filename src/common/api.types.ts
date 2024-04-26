import { IngredientType } from "./internal";

export interface SimpleRecipeResponse {
  id: string;
  title: string;
  image_url: string;
  publisher: string;
}

export interface ExtendedRecipeResponse extends SimpleRecipeResponse {
  source_url: string;
  cooking_time: number;
  servings: number;
  ingredients: IngredientType[];
}

export type CreateRecipeRequest = Omit<ExtendedRecipeResponse, "id">;
