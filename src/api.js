import axios from "axios";

const API_KEY = "56fd73ef-331c-4628-bb57-8a8a8cd8e99b";
const searchRecipes = async (term) => {
  const response = await axios.get(
    `https://forkify-api.herokuapp.com/api/v2/recipes?search=${term}&key=${API_KEY}`
  );
  return response.data.data;
};

const selectRecipe = async (id) => {
  const response = await axios.get(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
  );
  return response.data.data.recipe;
};

const createRecipe = async (recipe) => {
  const response = await axios.post(
    `https://forkify-api.herokuapp.com/api/v2/recipes?key=${API_KEY}`,
    recipe
  );

  return response.data.data.recipe;
};

const getBookmarks = async () => {
  const response = await axios.get("http://localhost:3001/bookmarks");
  return response.data;
};

const createBookmark = async (recipe) => {
  const response = await axios.post("http://localhost:3001/bookmarks", {
    id: recipe.id,
    title: recipe.title,
    imageUrl: recipe.image_url,
    publisher: recipe.publisher,
  });
  return response.data;
};

const deleteBookmark = async (id) => {
  await axios.delete(`http://localhost:3001/bookmarks/${id}`);
};

export {
  searchRecipes,
  selectRecipe,
  createRecipe,
  getBookmarks,
  createBookmark,
  deleteBookmark,
};
