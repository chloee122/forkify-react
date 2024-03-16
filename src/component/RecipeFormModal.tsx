import { useReducer, useContext, useState, useEffect } from "react";
import { GoX, GoSync } from "react-icons/go";
import * as api from "../api";
import BookmarksContext from "../context/BookmarksContext";
import { NavigationContext } from "../context/NavigationContext";
import Modal from "./Modal";
import { makeRecipe } from "../utils/makeRecipe";
import ErrorMessage from "./ErrorMessage";

export interface RecipeFormState {
  title: string;
  source_url: string;
  image_url: string;
  publisher: string;
  cooking_time: number;
  servings: number;
  ingredients: string[];
}

enum RecipeFormActionKind {
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

type RecipeFormAction = RecipeFormInputAction | RecipeFormIngredientAction;

const initialFormValue: RecipeFormState = {
  title: "",
  source_url: "",
  image_url: "http://forkify-api.herokuapp.com/images/FlatBread21of1a180.jpg",
  publisher: "",
  cooking_time: 0,
  servings: 0,
  ingredients: ["", "", "", "", "", ""],
};

const recipeFormReducer = (
  state: RecipeFormState,
  action: RecipeFormAction
) => {
  switch (action.type) {
    case RecipeFormActionKind.HANDLE_INPUT:
      return { ...state, [action.field]: action.payload };
    case RecipeFormActionKind.HANDLE_INGREDIENT_INPUT:
      const ingredients = [...state.ingredients];
      ingredients[action.field] = action.payload;
      return { ...state, ingredients };
    default:
      return state;
  }
};

interface LabelText {
  title: string;
  source_url: string;
  image_url: string;
  publisher: string;
  cooking_time: string;
  servings: string;
}
const labelText: LabelText = {
  title: "Title",
  source_url: "URL",
  image_url: "Image URL",
  publisher: "publisher",
  cooking_time: "Prep time",
  servings: "Servings",
};

interface RecipeFormModalProps {
  onClose: () => void;
}

function RecipeFormModal({ onClose }: RecipeFormModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [recipeFormState, dispatch] = useReducer(
    recipeFormReducer,
    initialFormValue
  );
  const { navigate } = useContext(NavigationContext);
  const { createBookmark } = useContext(BookmarksContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name) {
      dispatch({
        type: RecipeFormActionKind.HANDLE_INPUT,

        field: e.target.name,
        payload: e.target.value,
      });
    } else {
      dispatch({
        type: RecipeFormActionKind.HANDLE_INGREDIENT_INPUT,
        field: Number(e.target.id),
        payload: e.target.value,
      });
    }
  };

  const handleSuccess = () => {
    setIsLoading(false);
    setSuccessMessage("Recipe was successfully uploaded :)");
  };

  const handleError = (err: Error) => {
    setIsLoading(false);
    setErrorMessage(err.message);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setErrorMessage("");
      e.preventDefault();
      setIsLoading(true);
      const recipe = makeRecipe(recipeFormState);
      const response = await api.createRecipe(recipe);

      navigate(`/recipes/${response.id}`);
      createBookmark(response);
      handleSuccess();
    } catch (err) {
      if (err instanceof Error) handleError(err);
    }
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  }, [successMessage, onClose]);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const recipeData = (Object.keys(recipeFormState) as (keyof RecipeFormState)[])
    .filter((key) => key !== "ingredients")
    .map((key) => {
      const labelCheck = ["cooking_time", "servings"].includes(key);
      return (
        <div key={key}>
          <label>
            {labelText[key as keyof Omit<RecipeFormState, "ingredients">]}
          </label>
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

  const recipeIngredients = recipeFormState.ingredients.map(
    (_: string, index: number) => (
      <div key={index}>
        <label>Ingredient {index + 1}</label>
        <input
          id={String(index)}
          type="text"
          placeholder="Format: 'Quantity, Unit, Description'"
          onChange={handleChange}
          value={recipeFormState.ingredients[index]}
        />
      </div>
    )
  );

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

  return (
    <Modal onClose={onClose}>
      {successMessage ? <p>{successMessage}</p> : form}
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </Modal>
  );
}

export default RecipeFormModal;
