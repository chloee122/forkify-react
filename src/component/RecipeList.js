import { useState, useEffect, useCallback } from "react";
import RecipeListItem from "./RecipeListItem";
import Pagination from "./Pagination";
import Link from "./Link";
import { GoSync } from "react-icons/go";

const RECORDS_PER_PAGE = 10;
function RecipeList({ recipes, isLoading, errorMessage }) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [recipes]);

  const totalPages = Math.ceil(recipes.length / RECORDS_PER_PAGE);

  const getRecipeListByCurrentPageNumber = useCallback(() => {
    const endIndex = currentPage * RECORDS_PER_PAGE;
    const startIndex = endIndex - RECORDS_PER_PAGE;
    return recipes.slice(startIndex, endIndex);
  }, [currentPage, recipes]);

  const renderedRecipes = getRecipeListByCurrentPageNumber().map((recipe) => {
    return (
      <Link key={recipe.id} to={`/recipes/${recipe.id}`}>
        <RecipeListItem recipe={recipe} />
      </Link>
    );
  });

  console.log(isLoading);
  console.log(recipes);
  return (
    <div>
      <div>
        {isLoading ? <GoSync className="animate-spin" /> : renderedRecipes}
      </div>
      {getRecipeListByCurrentPageNumber().length !== 0 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}

export default RecipeList;
