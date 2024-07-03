import { useReducer, useState, useEffect } from "react";
import { AxiosError } from "axios";
import { GoX, GoSync } from "react-icons/go";
import { FiUploadCloud, FiSmile } from "react-icons/fi";
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
  publisher: "Publisher",
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
    setSuccessMessage("Recipe was successfully uploaded!");
  };

  const handleError = (errorMessage: string) => {
    setIsLoading(false);
    setErrorMessage(errorMessage);
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
      if (err instanceof AxiosError) {
        handleError(err.response?.data.message || err.message);
      }
    }
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        onClose();
      }, 5000);
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
        <div
          key={key}
          className="grid grid-cols-[1fr_2.8fr] items-center gap-3.5 mb-3.5 text-[15px]"
        >
          <label className="font-semibold">{labelText[key]}</label>
          <input
            name={key}
            type={labelCheck ? "number" : "text"}
            required
            onChange={handleChange}
            value={recipeFormState[key] || ""}
            min={labelCheck ? 1 : undefined}
            className="py-1 px-2.5 border-[1px] border-[#ddd] rounded-md"
          />
        </div>
      );
    });

  const recipeIngredients = recipeFormState.ingredients.map(
    (_: string, index: number) => (
      <div
        key={index}
        className="grid grid-cols-[1fr_2.8fr] items-center gap-3.5 mb-3.5 text-[15px]"
      >
        <label className="font-semibold">Ingredient {index + 1}</label>
        <input
          id={String(index)}
          type="text"
          placeholder="Format: 'Quantity, Unit, Description'"
          onChange={handleChange}
          value={recipeFormState.ingredients[index]}
          className="py-1 px-2.5 border-[1px] border-[#ddd] rounded-md placeholder:text-greylight3"
        />
      </div>
    )
  );

  const form = (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="flex justify-end">
        <button type="button" onClick={onClose}>
          <GoX className="h-8 w-8" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-16">
        <div>
          <h3 className="font-bold text-xl uppercase mb-5">RECIPE DATA</h3>
          <div>{recipeData}</div>
        </div>

        <div>
          <h3 className="font-bold text-xl uppercase mb-5">INGREDIENTS</h3>
          <div>{recipeIngredients}</div>
        </div>
      </div>

      <button
        disabled={isLoading}
        className="flex items-center justify-center gap-3 rounded-full bg-gradient-to-br from-background1 to-background2 text-white px-10 py-4 uppercase hover:scale-105 font-bold mx-auto mt-5"
      >
        {isLoading ? (
          <GoSync className="animate-spin h-5 w-5" />
        ) : (
          <FiUploadCloud className="h-6 w-6" />
        )}
        UPLOAD
      </button>
    </form>
  );

  return (
    <Modal onClose={onClose}>
      {successMessage ? (
        <div className="flex items-center py-12 px-11 gap-3.5 m-auto">
          <FiSmile className="h-10 w-10 text-primary" />
          <p className="font-semibold text-xl">{successMessage}</p>
        </div>
      ) : (
        form
      )}
      {errorMessage && <Message message={errorMessage} error={true} />}
    </Modal>
  );
}

export default RecipeFormModal;
