import { useState } from "react";
import { searchRecipes, getRecipe } from "./api";
import RecipeSearchForm from "./component/RecipeSearchForm";
import RecipeList from "./component/RecipeList";
import DisplayRecipe from "./component/DisplayRecipe";
import BookmarkList from "./component/BookmarkList";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  const handleSubmit = async (term) => {
    const results = await searchRecipes(term);
    setRecipes(results.recipes);
  };

  const handleBookmark = (id) => {
    setBookmarks([...bookmarks, id]);
  };

  const [recipe, setRecipe] = useState([]);
  const handleChooseRecipe = async (id) => {
    const result = await getRecipe(id);
    setRecipe(result);
  };

  const handleHover = () => {
    setShowBookmarks(true);
  };

  const handleLeave = () => {
    setShowBookmarks(false);
  };

  return (
    <div>
      <div className="flex">
        <RecipeSearchForm handleSearch={handleSubmit} />
        <button onMouseEnter={handleHover} onMouseLeave={handleLeave}>
          BOOKMARKS
        </button>
        {showBookmarks && <BookmarkList bookmarks={bookmarks} />}
      </div>
      <div className="flex">
        <RecipeList
          recipes={recipes}
          handleChooseRecipe={handleChooseRecipe}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        {recipe.length !== 0 && (
          <DisplayRecipe recipe={recipe} onBookmark={handleBookmark} />
        )}
      </div>
    </div>
  );
}

export default App;
