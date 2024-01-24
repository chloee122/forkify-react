import { useState } from "react";
import { searchRecipes, getRecipe } from "./api";
import RecipeSearch from "./component/RecipeSearch";
import RecipeList from "./component/RecipeList";
import DisplayRecipe from "./component/DisplayRecipe";

function App() {
  const [recipes, setRecipes] = useState([]);
  const handleSubmit = async (term) => {
    const results = await searchRecipes(term);
    setRecipes(results.recipes);
  };

  const [recipe, setRecipe] = useState([]);
  const handleChooseRecipe = async (id) => {
    const result = await getRecipe(id);
    setRecipe(result);
  };

  return (
    <div>
      <div>
        <RecipeSearch handleSearch={handleSubmit} />
      </div>
      <div className="flex">
        <RecipeList recipes={recipes} handleChooseRecipe={handleChooseRecipe} />
        {recipe && <DisplayRecipe recipe={recipe} />}
      </div>
    </div>
  );
}

export default App;
