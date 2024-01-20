import axios from "axios";

const searchRecipes = async (term) => {
  const response = await axios.get(
    "https://forkify-api.herokuapp.com/api/v2/recipes",
    {
      params: { search: term },
    }
  );
  console.log(response);
  return response.data.data;
};

export default searchRecipes;
