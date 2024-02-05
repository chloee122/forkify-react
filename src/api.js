import axios from "axios";

const searchRecipes = async (term) => {
  const response = await axios.get(
    "https://forkify-api.herokuapp.com/api/v2/recipes",
    {
      params: { search: term },
    }
  );
  return response.data.data;
};

const getRecipe = async (id) => {
  const response = await axios.get(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
  );
  return response.data.data.recipe;
};

const getBookmarks = async () => {
  const response = await axios.get("http://localhost:3001/bookmarks");
  return response.data;
};

const addBookmark = async (recipe) => {
  const response = await axios.post("http://localhost:3001/bookmarks", {
    id: recipe.id,
    title: recipe.title,
    imageUrl: recipe.image_url,
    publisher: recipe.publisher,
  });
  return response.data;
};

const removeBookmark = async (id) => {
  await axios.delete(`http://localhost:3001/bookmarks/${id}`);
};

export { searchRecipes, getRecipe, getBookmarks, addBookmark, removeBookmark };
