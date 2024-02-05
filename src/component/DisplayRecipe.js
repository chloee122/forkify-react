import { useState, useEffect } from "react";
import RecipeDetails from "./RecipeDetails";
import RecipeIngredients from "./RecipeIngredients";
import RecipeDirection from "./RecipeDirection";

function DisplayRecipe({ selectedRecipe }) {
  const [updatedServings, setUpdatedServings] = useState(
    selectedRecipe.servings
  );

  useEffect(() => {
    setUpdatedServings(selectedRecipe.servings);
  }, [selectedRecipe]);

  const content = (
    <div>
      <figure className="before:block before:h-100 before:w-100 before:absolute before:bg-slate-100 h-80 relative origin-top">
        <img
          className="object-cover block h-full w-full"
          src={selectedRecipe.image_url}
          alt={selectedRecipe.title}
        />
        <h1 className="absolute bottom-0 left-1/2  -translate-x-2/4 translate-y-1/4 -skew-y-6 text-white text-5xl w-1/2 uppercase leading-loose text-center">
          <span className="py-5 px-8 bg-gradient-to-br from-yellow-100 to-orange-500">
            {selectedRecipe.title}
          </span>
        </h1>
      </figure>
      <RecipeDetails
        updatedServings={updatedServings}
        setUpdatedServings={setUpdatedServings}
        selectedRecipe={selectedRecipe}
      />

      <RecipeIngredients
        selectedRecipe={selectedRecipe}
        updatedServings={updatedServings}
      />
      <RecipeDirection selectedRecipe={selectedRecipe} />
    </div>
  );
  return content;
}
export default DisplayRecipe;
