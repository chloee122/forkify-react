import { useState } from "react";
import { searchRecipes } from "./api";
import RecipeSearchForm from "./component/RecipeSearchForm";
import RecipeList from "./component/RecipeList";
import DisplayRecipe from "./component/DisplayRecipe";
import Bookmark from "./component/Bookmark";
import RecipeAddButton from "./component/RecipeAddButton";
import Link from "./component/Link";
import Route from "./component/Route"
import RecipeFormModal from "./component/RecipeFormModal";


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
        {/* <Link to="/AddRecipeForm">ADD RECIPE</Link> */}
        {/* <Route path="/AddRecipeForm"><RecipeFormModal /></Route> */}
        <RecipeAddButton />
        <Bookmark />
      </div>
      <div className="flex">
        <RecipeList recipes={recipes} />
        <DisplayRecipe />
      </div>
    </div>
  );
}

export default App;
