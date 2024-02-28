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
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async (term) => {
    try {
      setRecipes([]);
      setIsLoading(true);
      const results = await searchRecipes(term);
      if (results.recipes.length === 0)
        throw Error("No recipe was found! Try other recipes");
      setIsLoading(false);
      setRecipes(results.recipes);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setErrorMessage(err.message);
    }
  };

  return (
    <div>
      <div className="flex">
        <RecipeSearchForm handleSearch={handleSearch} />
        <RecipeAddButton />
        <Bookmark />
      </div>
      <div className="flex">
        <RecipeList
          recipes={recipes}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
        <Route path="/recipes/">
          <DisplayRecipe />
        </Route>
      </div>
    </div>
  );
}

export default App;
