import { useState, useEffect, useCallback } from "react";
import Pagination from "./pagination/Pagination";
import Link from "../navigation/Link";
import { GoSync } from "react-icons/go";
import ErrorMessage from "../shared/ErrorMessage";
import { SimpleRecipe } from "../../common/internal";
import ListItem from "../shared/ListItem";

interface RecipeListProps {
  recipes: SimpleRecipe[];
  isLoading: boolean;
  errorMessage: string;
}

const RECORDS_PER_PAGE = 10;
function RecipeList({ recipes, isLoading, errorMessage }: RecipeListProps) {
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
        <ListItem item={recipe} />
      </Link>
    );
  });

  return (
    <div>
      {isLoading ? <GoSync className="animate-spin" /> : renderedRecipes}
      {errorMessage && <ErrorMessage message={errorMessage} />}
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
