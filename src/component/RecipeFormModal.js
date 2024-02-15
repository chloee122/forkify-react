import { useReducer, useContext } from "react";
import * as api from "../api";
import SelectedRecipeContext from "../context/SelectedRecipeContext";
import BookmarksContext from "../context/BookmarksContext";
import RecipeForm from "./RecipeForm";

const initialFormValue = {
  title: "TEST24",
  source_url: "TEST24",
  image_url:
    " http://forkify-api.herokuapp.com/images/BBQChickenPizzawithCauliflowerCrust5004699695624ce.jpg",
  publisher: "TEST24",
  cooking_time: 40,
  servings: 4,
  ingredients: ["0.5,kg,Rice", "1,,Avocado", ",,salt", "", "", ""],
};

const recipeFormReducer = (state, action) => {
  switch (action.type) {
    case HANDLE_INPUT:
      return { ...state, [action.field]: action.payload };
    case HANDLE_INGREDIENT_INPUT:
      const ingredients = [...state.ingredients];
      ingredients[action.field] = action.payload;
      return { ...state, ingredients };
    default:
      return state;
  }
};

const HANDLE_INPUT = "handle_input";
const HANDLE_INGREDIENT_INPUT = "handle_ingredient_input";

function RecipeFormModal() {
  const [state, dispatch] = useReducer(recipeFormReducer, initialFormValue);
  const { selectRecipe } = useContext(SelectedRecipeContext);
  const { createBookmark } = useContext(BookmarksContext);

  const handleChange = (e) => {
    dispatch({
      type: e.target.name ? HANDLE_INPUT : HANDLE_INGREDIENT_INPUT,
      field: e.target.name || e.target.id,
      payload: e.target.value,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const ingredients = [];
    for (const ingredient of state.ingredients) {
      if (ingredient === "") continue;
      const parts = ingredient.split(",");
      ingredients.push({
        quantity: parts[0],
        unit: parts[1],
        description: parts[2],
      });
    }
    const recipe = { ...state, ingredients };

    const response = await api.createRecipe(recipe);
    selectRecipe(response.id);
    createBookmark(response);
  };

  return (
    <RecipeForm
      onSubmit={handleSubmitForm}
      onChange={handleChange}
      state={state}
    />
  );
}

export default RecipeFormModal;
