import { useState, useEffect, useContext } from "react";
import { searchRecipes } from "./api";
import RecipeSearchForm from "./component/RecipeSearchForm";
import RecipeList from "./component/RecipeList";
import DisplayRecipe from "./component/DisplayRecipe";
import Bookmark from "./component/Bookmark";
import RecipeAddButton from "./component/RecipeAddButton";
import Route from "./component/Route";
import { NavigationContext } from "./context/NavigationContext";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [recipePath, setRecipePath] = useState(null);
  const { currentPath } = useContext(NavigationContext);

  useEffect(() => {
    
    if (currentPath.includes("/recipes"))
      setRecipePath(window.location.pathname);
  }, [currentPath]);

  const handleSearch = async (term) => {
    const results = await searchRecipes(term);
    setRecipes(results.recipes);
  };

  const recipeId = window.location.pathname.includes("/recipes")
    ? window.location.pathname.substring(9)
    : undefined;


  return (
    <div>
      <div className="flex">
        <RecipeSearchForm handleSearch={handleSearch} />
        <RecipeAddButton />
        <Bookmark />
      </div>
      <div className="flex">
        <RecipeList recipes={recipes} />
        <Route path={recipePath}>
          <DisplayRecipe recipeId={recipeId} />
        </Route>
      </div>
    </div>
  );
}

export default App;
