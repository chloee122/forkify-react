import { useState, useEffect } from "react";
import axios from "axios";
import { searchRecipes, getRecipe } from "./api";
import RecipeSearchForm from "./component/RecipeSearchForm";
import RecipeList from "./component/RecipeList";
import DisplayRecipe from "./component/DisplayRecipe";
import Bookmark from "./component/Bookmark";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [bookmarks, setBookmarks] = useState([]);

  const handleSubmit = async (term) => {
    const results = await searchRecipes(term);
    setRecipes(results.recipes);
  };

  const fetchBookmark = async () => {
    const response = await axios.get("http://localhost:3001/bookmarks");
    console.log("render");
    setBookmarks(response.data);
  };

  useEffect(() => {
    fetchBookmark();
  }, []);

  const createBookmark = async (recipe) => {
    const response = await axios.post("http://localhost:3001/bookmarks", {
      id: recipe.id,
      title: recipe.title,
      imageUrl: recipe.image_url,
      publisher: recipe.publisher,
    });

    setBookmarks([...bookmarks, response.data]);
  };

  const deleteBookmark = async (id) => {
    await axios.delete(`http://localhost:3001/bookmarks/${id}`);

    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
  };

  const handleBookmark = () => {
    if (bookmarks.some((bookmark) => bookmark.id === recipe.id)) {
      deleteBookmark(recipe.id);
    } else {
      createBookmark(recipe);
    }
  };

  const [recipe, setRecipe] = useState([]);
  const handleChooseRecipe = async (id) => {
    const result = await getRecipe(id);
    setRecipe(result);
  };

  return (
    <div>
      <div className="flex">
        <RecipeSearchForm handleSearch={handleSubmit} />
        <Bookmark
          bookmarks={bookmarks}
          handleChooseRecipe={handleChooseRecipe}
        />
      </div>
      <div className="flex">
        <RecipeList
          recipes={recipes}
          handleChooseRecipe={handleChooseRecipe}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        {recipe.length !== 0 && (
          <DisplayRecipe
            recipe={recipe}
            onBookmark={handleBookmark}
            bookmarks={bookmarks}
          />
        )}
      </div>
    </div>
  );
}

export default App;
