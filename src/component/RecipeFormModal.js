import { useReducer, useContext, useState } from "react";
import { GoX } from "react-icons/go";
import * as api from "../api";
import SelectedRecipeContext from "../context/SelectedRecipeContext";
import BookmarksContext from "../context/BookmarksContext";
import Modal from "./Modal";
import convertIngredient from "../utils/convertIngredient";

const initialFormValue = {
  title: "TEST24",
  source_url: "TEST24",
  image_url:
    " http://forkify-api.herokuapp.com/images/BBQChickenPizzawithCauliflowerCrust5004699695624ce.jpg",
  publisher: "TEST24",
  cooking_time: 12,
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

const labelText = {
  title: "Title",
  source_url: "URL",
  image_url: "Image URL",
  publisher: "publisher",
  cooking_time: "Prep time",
  servings: "Servings",
};

const HANDLE_INPUT = "handle_input";
const HANDLE_INGREDIENT_INPUT = "handle_ingredient_input";

function RecipeFormModal({ onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
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

  const pause = (duration) => {
    return new Promise((resolve) => {
      setTimeout(resolve, duration);
    });
  };
  const handleSuccess = () => {
    setSuccessMessage("Recipe was successfully uploaded :)");
    setIsLoading(false);

    // if (successMessage) setTimeout(()=>onClose(),2000)
  };

  const handleError = (err) => {
    setIsLoading(true);
    console.log("isLoading", isLoading);
    setErrorMessage(true);
    console.log("fail", errorMessage);
    if (errorMessage) setTimeout(() => onClose(), 2000);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      console.log(isLoading);
      const ingredients = state.ingredients
        .filter((ingredient) => ingredient !== "")
        .map(convertIngredient);

      const recipe = { ...state, ingredients };

      const response = await api.createRecipe(recipe);
      await pause(5000);
      selectRecipe(response.id);
      createBookmark(response);
      // handleSuccess();
    } catch (err) {
      // await pause(10000);
      handleError(err);
   
      console.log("fail", errorMessage);
    }
    // console.log(errorMessage);
  };

  const recipeData = Object.keys(state)
    .filter((key) => key !== "ingredients")
    .map((key) => {
      const labelCheck = ["cooking_time", "servings"].includes(key);
      return (
        <div key={key}>
          <label>{labelText[key]}</label>
          <input
            name={key}
            type={labelCheck ? "number" : "text"}
            required
            onChange={handleChange}
            value={state[key] || ""}
            min={labelCheck ? 1 : undefined}
          />
        </div>
      );
    });

  const recipeIngredients = state.ingredients.map((_, index) => (
    <div key={index}>
      <label>Ingredient {index + 1}</label>
      <input
        id={index}
        type="text"
        placeholder="Format: 'Quantity, Unit, Description'"
        onChange={handleChange}
        value={state.ingredients[index]}
      />
    </div>
  ));

  const form = (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="flex justify-end">
        {/* <button type="button" onClick={onClose}> */}
        <button type="button" onClick={handleError}>
          <GoX />
        </button>
      </div>
      <div className="flex flex-row">
        <div>
          <h3>RECIPE DATA</h3>
          <div className="flex flex-col">{recipeData}</div>
        </div>

        <div>
          <h3>INGREDIENTS</h3>
          <div className="flex flex-col">{recipeIngredients}</div>
        </div>
      </div>

      <button>UPLOAD</button>
    </form>
  );

  return <Modal onClose={onClose}>{form}</Modal>;
}

export default RecipeFormModal;
