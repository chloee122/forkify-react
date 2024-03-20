import axios from "axios";
import { RecipeDetailsType } from "../types/RecipeDetailsType";
import { RecipeType } from "../types/RecipeType";

interface SearchRecipesResponse {
  recipes: RecipeType[];
}

const apiKey = process.env.REACT_APP_API_KEY;
const ROOT_URL = "https://forkify-api.herokuapp.com/api/v2/recipes";
const BOOKMARK_DB_URL = "http://localhost:3001/bookmarks";

const searchRecipes = async (term: string): Promise<SearchRecipesResponse> => {
  const response = await axios.get(`${ROOT_URL}?search=${term}&key=${apiKey}`);
  return response.data.data;
};

const getRecipe = async (id: string): Promise<RecipeDetailsType> => {
  const response = await axios.get(`${ROOT_URL}/${id}`);
  return response.data.data.recipe;
};

const createRecipe = async (
  recipe: Omit<RecipeDetailsType, "id">
): Promise<RecipeType> => {
  const response = await axios.post(`${ROOT_URL}?key=${apiKey}`, recipe);
  console.log(response.data.data.recipe);
  const { id, title, image_url, publisher } = response.data.data.recipe;
  return { id, title, image_url, publisher };
};

const getBookmarks = async (): Promise<RecipeType[]> => {
  const response = await axios.get(BOOKMARK_DB_URL);
  return response.data;
};

const createBookmark = async (recipe: RecipeType): Promise<RecipeType> => {
  const response = await axios.post(BOOKMARK_DB_URL, {
    id: recipe.id,
    title: recipe.title,
    image_url: recipe.image_url,
    publisher: recipe.publisher,
  });

  return response.data;
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
