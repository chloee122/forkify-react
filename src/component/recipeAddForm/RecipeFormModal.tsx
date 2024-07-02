import { useReducer, useState, useEffect } from "react";
import { GoX, GoSync } from "react-icons/go";
import * as api from "../../api/api";
import Modal from "./Modal";
import { convertIngredients } from "../../utils/convertIngredients";
import Message from "../shared/Message";
import {
  RecipeFormState,
  RecipeFormAction,
  RecipeFormActionKind,
} from "./recipeFormModal.types";
import useBookmarksContext from "../../hooks/useBookmarksContext";
import useNavigationContext from "../../hooks/useNavigationContext";
import convertToCreateRecipeRequest from "../../utils/convertToCreateRecipeRequest";

const initialFormValue: RecipeFormState = {
  title: "",
  sourceUrl: "",
  imageUrl: "http://forkify-api.herokuapp.com/images/FlatBread21of1a180.jpg",
  publisher: "",
  cookingTime: 0,
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

type LabelText = { [key in keyof RecipeFormState]?: string };

const labelText: LabelText = {
  title: "Title",
  sourceUrl: "URL",
  imageUrl: "Image URL",
  publisher: "publisher",
  cookingTime: "Prep time",
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
  const { navigate } = useNavigationContext();
  const { createBookmark } = useBookmarksContext();

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
      const recipe = {
        ...recipeFormState,
        ingredients: convertIngredients(recipeFormState.ingredients),
      };
      const recipeToCreate = convertToCreateRecipeRequest(recipe);
      const createdRecipe = await api.createRecipe(recipeToCreate);

      navigate(`/recipes/${createdRecipe.id}`);
      createBookmark(createdRecipe);
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
      {errorMessage && <Message message={errorMessage} error={true} />}
    </Modal>
  );
}

export default RecipeFormModal;
