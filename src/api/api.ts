import axios from "axios";
import convertSimpleRecipeResponseToSimpleRecipe from "../utils/convertSimpleRecipeResponseToSimpleRecipe";
import { convertExtendedRecipeResponseToExtendedRecipe } from "../utils/convertExtendedRecipeResponseToExtendedRecipe";
import { Bookmark, ExtendedRecipe, SimpleRecipe } from "../common/internal";
import { CreateRecipeRequest } from "../common/api.type";

const apiKey = process.env.REACT_APP_API_KEY;
const ROOT_URL = "https://forkify-api.herokuapp.com/api/v2/recipes";
const BOOKMARK_DB_URL = "http://localhost:3001/bookmarks";

const searchRecipes = async (term: string): Promise<SimpleRecipe[]> => {
  const response = await axios.get(`${ROOT_URL}?search=${term}&key=${apiKey}`);
  const recipes = response.data.data.recipes.map(
    convertSimpleRecipeResponseToSimpleRecipe
  );
  return recipes;
};

const getRecipe = async (id: string): Promise<ExtendedRecipe> => {
  const response = await axios.get(`${ROOT_URL}/${id}`);
  const recipe = convertExtendedRecipeResponseToExtendedRecipe(
    response.data.data.recipe
  );
  return recipe;
};

const createRecipe = async (
  recipe: CreateRecipeRequest
): Promise<SimpleRecipe> => {
  const response = await axios.post(`${ROOT_URL}?key=${apiKey}`, recipe);
  const createdRecipe = convertExtendedRecipeResponseToExtendedRecipe(
    response.data.data.recipe
  );
  return {
    id: createdRecipe.id,
    title: createdRecipe.title,
    imageUrl: createdRecipe.imageUrl,
    publisher: createdRecipe.publisher,
  };
};

const getBookmarks = async (): Promise<Bookmark[]> => {
  const response = await axios.get(BOOKMARK_DB_URL);
  const bookmarks = response.data.map(
    convertSimpleRecipeResponseToSimpleRecipe
  );
  return bookmarks;
};

const createBookmark = async (recipe: Bookmark): Promise<Bookmark> => {
  const response = await axios.post(BOOKMARK_DB_URL, {
    id: recipe.id,
    title: recipe.title,
    image_url: recipe.imageUrl,
    publisher: recipe.publisher,
  });
  const bookmark = convertSimpleRecipeResponseToSimpleRecipe(response.data);
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
