import axios from "axios";
import { RecipeDetailsType } from "../types/RecipeDetailsType";
import { CreatedRecipeType } from "../types/RecipeDetailsResponse";
import { RecipeType } from "../types/RecipeType";
import { convertRecipe } from "../../utils/convertRecipe";
import { convertRecipeDetails } from "../../utils/convertRecipeDetails";

const apiKey = process.env.REACT_APP_API_KEY;
const ROOT_URL = "https://forkify-api.herokuapp.com/api/v2/recipes";
const BOOKMARK_DB_URL = "http://localhost:3001/bookmarks";

const searchRecipes = async (term: string): Promise<RecipeType[]> => {
  const response = await axios.get(`${ROOT_URL}?search=${term}&key=${apiKey}`);
  const recipes = response.data.data.recipes.map(convertRecipe);
  return recipes;
};

const getRecipe = async (id: string): Promise<RecipeDetailsType> => {
  const response = await axios.get(`${ROOT_URL}/${id}`);
  const recipe = convertRecipeDetails(response.data.data.recipe);
  return recipe;
};

const createRecipe = async (recipe: CreatedRecipeType): Promise<RecipeType> => {
  const response = await axios.post(`${ROOT_URL}?key=${apiKey}`, recipe);
  const createdRecipe = convertRecipeDetails(response.data.data.recipe);
  return {
    id: createdRecipe.id,
    title: createdRecipe.title,
    imageUrl: createdRecipe.imageUrl,
    publisher: createdRecipe.publisher,
  };
};

const getBookmarks = async (): Promise<RecipeType[]> => {
  const response = await axios.get(BOOKMARK_DB_URL);
  const bookmarks = response.data.map(convertRecipe);
  return bookmarks;
};

const createBookmark = async (recipe: RecipeType): Promise<RecipeType> => {
  const response = await axios.post(BOOKMARK_DB_URL, {
    id: recipe.id,
    title: recipe.title,
    image_url: recipe.imageUrl,
    publisher: recipe.publisher,
  });
  const bookmark = convertRecipe(response.data);
  return bookmark;
};

const deleteBookmark = async (id: string) => {
  await axios.delete(`${BOOKMARK_DB_URL}/${id}`);
};

export {
  searchRecipes,
  getRecipe,
  createRecipe,
  getBookmarks,
  createBookmark,
  deleteBookmark,
};
