import { useState, useEffect, useCallback } from "react";
import RecipeListItem from "./RecipeListItem";
import Pagination from "./Pagination";

const RECORDS_PER_PAGE = 10;
function RecipeList({ recipes, handleChooseRecipe }) {
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

  const renderedRecipes = getRecipeListByCurrentPageNumber().map((recipe) => (
    <RecipeListItem
      key={recipe.id}
      recipe={recipe}
      handleChooseRecipe={handleChooseRecipe}
    />
  ));

  return (
    <div>
      <div>{renderedRecipes}</div>
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
