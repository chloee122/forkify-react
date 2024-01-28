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

export { searchRecipes, getRecipe };
