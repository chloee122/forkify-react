export interface RecipeFormState {
  title: string;
  source_url: string;
  image_url: string;
  publisher: string;
  cooking_time: number;
  servings: number;
  ingredients: string[];
}

export enum RecipeFormActionKind {
  HANDLE_INPUT = "handle_input",
  HANDLE_INGREDIENT_INPUT = "handle_ingredient_input",
}

interface RecipeFormInputAction {
  type: RecipeFormActionKind.HANDLE_INPUT;
  field: string;
  payload: string;
}

interface RecipeFormIngredientAction {
  type: RecipeFormActionKind.HANDLE_INGREDIENT_INPUT;
  field: number;
  payload: string;
}

export type RecipeFormAction =
  | RecipeFormInputAction
  | RecipeFormIngredientAction;
