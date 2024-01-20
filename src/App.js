import { useState } from "react";
import searchRecipes from "./api";
import RecipeSearch from "./component/RecipeSearch";
import RecipeList from "./component/RecipeList";

function App() {
  const [recipes, setRecipes] = useState([]);
  const handleSubmit = async (term) => {
    const results = await searchRecipes(term);
    setRecipes(results.recipes);
  };

  return (
    <div>
      <RecipeSearch onSubmit={handleSubmit} />
      <RecipeList recipes={recipes} />
    </div>
  );
}

export default App;
