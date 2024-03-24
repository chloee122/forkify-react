export interface IngredientType {
  quantity: number;
  unit: string;
  description: string;
}

export interface SimpleRecipe {
  id: string;
  title: string;
  imageUrl: string;
  publisher: string;
}

export interface ExtendedRecipe extends SimpleRecipe {
  sourceUrl: string;
  cookingTime: number;
  servings: number;
  ingredients: IngredientType[];
}

export type Bookmark = SimpleRecipe;

export type ExtendedRecipeWithoutId = Omit<ExtendedRecipe, "id">;
