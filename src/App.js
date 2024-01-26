import { useState } from "react";
import { searchRecipes, getRecipe } from "./api";
import RecipeSearch from "./component/RecipeSearch";
import RecipeList from "./component/RecipeList";
import DisplayRecipe from "./component/DisplayRecipe";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const handleSubmit = async (term) => {
    const results = await searchRecipes(term);
    setRecipes(results.recipes);
    setCurrentPage(1);
  };

  const [recipe, setRecipe] = useState([]);
  const handleChooseRecipe = async (id) => {
    const result = await getRecipe(id);
    setRecipe(result);
    console.log(result);
  };

  return (
    <div>
      <div>
        <RecipeSearch handleSearch={handleSubmit} />
      </div>
      <div className="flex">
        <RecipeList
          recipes={recipes}
          handleChooseRecipe={handleChooseRecipe}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        {recipe.length !== 0 && <DisplayRecipe recipe={recipe} />}
      </div>
    </div>
  );
}

export default App;
