import { useState, useEffect, useContext } from "react";
import { searchRecipes } from "./api";
import RecipeSearchForm from "./component/RecipeSearchForm";
import RecipeList from "./component/RecipeList";
import DisplayRecipe from "./component/DisplayRecipe";
import Bookmark from "./component/Bookmark";
import BookmarksContext from "./context/BookmarksContext";
import SelectedRecipeContext from "./context/SelectedRecipeContext";

function App() {
  const [recipes, setRecipes] = useState([]);

  const handleSubmit = async (term) => {
    const results = await searchRecipes(term);
    setRecipes(results.recipes);
  };

  const { fetchBookmarks } = useContext(BookmarksContext);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const { selectedRecipe } = useContext(SelectedRecipeContext);

  return (
    <div>
      <div className="flex">
        <RecipeSearchForm handleSearch={handleSubmit} />
        <Bookmark />
      </div>
      <div className="flex">
        <RecipeList recipes={recipes} />
        {selectedRecipe && <DisplayRecipe selectedRecipe={selectedRecipe} />}
      </div>
    </div>
  );
}

export default App;
