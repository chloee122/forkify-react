import { useState } from "react";
import RecipeListItem from "./RecipeListItem";
import Pagination from "./Pagination";

function RecipeList({ recipes }) {
  const [currentPage, setCurrentPage] = useState(1);
  //   const [recipeList, setRecipeList] = useState([
  //     ...recipes.slice(startIndex, endIndex),
  //   ]);
  const [recordsPerPage] = useState(10);

  const endIndex = currentPage * recordsPerPage;
  const startIndex = endIndex - recordsPerPage;
  const nPages = Math.ceil(recipes.length / recordsPerPage);
  const recipeList = recipes.slice(startIndex, endIndex);

  const renderedRecipes = recipeList.map((recipe) => (
    <RecipeListItem key={recipe.id} recipe={recipe} />
  ));

  return (
    <div>
      <div>{renderedRecipes}</div>
      {renderedRecipes.length !== 0 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          nPages={nPages}
        />
      )}
    </div>
  );
}

export default RecipeList;
