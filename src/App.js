import { useState } from "react";
import { searchRecipes } from "./api";
import RecipeSearchForm from "./component/RecipeSearchForm";
import RecipeList from "./component/RecipeList";
import DisplayRecipe from "./component/DisplayRecipe";
import Bookmark from "./component/Bookmark";
import RecipeAddButton from "./component/RecipeAddButton";
import Route from "./component/Route";

function App() {
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async (term) => {
    const results = await searchRecipes(term);
    setRecipes(results.recipes);
  };

  return (
    <div>
      <div className="flex">
        <RecipeSearchForm handleSearch={handleSearch} />
        <RecipeAddButton />
        <Bookmark />
      </div>
      <div className="flex">
        <RecipeList recipes={recipes} />
        <Route path="/recipes/">
          <DisplayRecipe />
        </Route>
      </div>
    </div>
  );
}

export default App;
