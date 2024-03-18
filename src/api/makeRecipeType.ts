export interface ConvertedIngredient {
  quantity: number;
  unit: string;
  description: string;
}

export interface CreateRecipeDetails {
  title: string;
  source_url: string;
  image_url: string;
  publisher: string;
  cooking_time: number;
  servings: number;
  ingredients: ConvertedIngredient[];
}
