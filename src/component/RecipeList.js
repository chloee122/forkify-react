import { useState, useEffect, useCallback } from "react";
import RecipeListItem from "./RecipeListItem";
import Pagination from "./Pagination";

function RecipeList({ recipes, handleChooseRecipe }) {
  const [currentPage, setCurrentPage] = useState();
  const [recordsPerPage] = useState(10);

  useEffect(() => {
    setCurrentPage(1);
  }, [recipes]);

  const totalPages = Math.ceil(recipes.length / recordsPerPage);

  const getRecipeListByCurrentPageNumber = useCallback(() => {
    const endIndex = currentPage * recordsPerPage;
    const startIndex = endIndex - recordsPerPage;
    return recipes.slice(startIndex, endIndex);
  }, [currentPage, recordsPerPage, recipes]);

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
      {renderedRecipes.length !== 0 && (
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
