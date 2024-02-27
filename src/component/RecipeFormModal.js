import { useReducer, useContext, useState, useEffect } from "react";
import { GoX, GoSync } from "react-icons/go";
import * as api from "../api";
import BookmarksContext from "../context/BookmarksContext";
import { NavigationContext } from "../context/NavigationContext";
import Modal from "./Modal";
import { makeRecipe } from "../utils/makeRecipe";

const initialFormValue = {
  title: "",
  source_url: "",
  image_url: "http://forkify-api.herokuapp.com/images/FlatBread21of1a180.jpg",
  publisher: "",
  cooking_time: 0,
  servings: 0,
  ingredients: ["", "", "", "", "", ""],
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
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [recipeFormState, dispatch] = useReducer(
    recipeFormReducer,
    initialFormValue
  );
  const { navigate } = useContext(NavigationContext);
  const { createBookmark } = useContext(BookmarksContext);

  const handleChange = (e) => {
    dispatch({
      type: e.target.name ? HANDLE_INPUT : HANDLE_INGREDIENT_INPUT,
      field: e.target.name || e.target.id,
      payload: e.target.value,
    });
  };

  const handleSuccess = () => {
    setIsLoading(false);
    setSuccessMessage("Recipe was successfully uploaded :)");
  };

  const handleError = (err) => {
    setIsLoading(false);
    setErrorMessage(err.message);
  };

  const handleSubmit = async (e) => {
    try {
      setErrorMessage(null);
      e.preventDefault();
      setIsLoading(true);
      const recipe = makeRecipe(recipeFormState);
      const response = await api.createRecipe(recipe);

      navigate(`/recipes/${response.id}`);
      createBookmark(response);
      handleSuccess();
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  }, [successMessage, onClose]);

  const recipeData = Object.keys(recipeFormState)
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
            value={recipeFormState[key] || ""}
            min={labelCheck ? 1 : undefined}
          />
        </div>
      );
    });

  const recipeIngredients = recipeFormState.ingredients.map((_, index) => (
    <div key={index}>
      <label>Ingredient {index + 1}</label>
      <input
        id={index}
        type="text"
        placeholder="Format: 'Quantity, Unit, Description'"
        onChange={handleChange}
        value={recipeFormState.ingredients[index]}
      />
    </div>
  ));

  const form = (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="flex justify-end">
        <button type="button" onClick={onClose}>
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

      <button disabled={isLoading}>
        {isLoading ? <GoSync className="animate-spin" /> : "UPLOAD"}
      </button>
    </form>
  );

  const content = successMessage ? <p>{successMessage}</p> : form;
  return (
    <Modal onClose={onClose}>
      {content}
      <p>{errorMessage && errorMessage}</p>
    </Modal>
  );
}

export default RecipeFormModal;
