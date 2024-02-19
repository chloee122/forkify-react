import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;
const ROOT_URL = "https://forkify-api.herokuapp.com/api/v2/recipes";
const BOOKMARK_DB_URL = "http://localhost:3001/bookmarks";

const searchRecipes = async (term) => {
  const response = await axios.get(`${ROOT_URL}?search=${term}&key=${apiKey}`);
  return response.data.data;
};

const selectRecipe = async (id) => {
  const response = await axios.get(`${ROOT_URL}/${id}`);
  return response.data.data.recipe;
};

const createRecipe = async (recipe) => {
  const response = await axios.post(`${ROOT_URL}?key=${apiKey}`, recipe);

  return response.data.data.recipe;
};

const getBookmarks = async () => {
  const response = await axios.get(BOOKMARK_DB_URL);
  return response.data;
};

const createBookmark = async (recipe) => {
  const response = await axios.post(BOOKMARK_DB_URL, {
    id: recipe.id,
    title: recipe.title,
    imageUrl: recipe.image_url,
    publisher: recipe.publisher,
  });
  return response.data;
};

const deleteBookmark = async (id) => {
  await axios.delete(`${BOOKMARK_DB_URL}/${id}`);
};

export {
  searchRecipes,
  selectRecipe,
  createRecipe,
  getBookmarks,
  createBookmark,
  deleteBookmark,
};
