import { useState } from "react";
import { searchRecipes, getRecipe } from "./api";
import RecipeSearchForm from "./component/RecipeSearchForm";
import RecipeList from "./component/RecipeList";
import Recipe from "./component/Recipe";

function App() {
  const [recipes, setRecipes] = useState([]);
  const handleSubmit = async (term) => {
    const results = await searchRecipes(term);
    setRecipes(results.recipes);
  };

  const [recipe, setRecipe] = useState(null);
  const handleChooseRecipe = async (id) => {
    const result = await getRecipe(id);
    setRecipe(result);
  };

  return (
    <div>
      <div>
        <RecipeSearchForm handleSearch={handleSubmit} />
      </div>
      <div className="flex">
        <RecipeList recipes={recipes} handleChooseRecipe={handleChooseRecipe} />
        {recipe && <Recipe recipe={recipe} />}
      </div>
    </div>
  );
}

export default App;
