import { useState, useEffect } from "react";
import RecipeDetails from "./RecipeDetails";
import RecipeIngredients from "./RecipeIngredients";
import RecipeDirection from "./RecipeDirection";

function DisplayRecipe({
  recipe: {
    id,
    cooking_time,
    image_url,
    ingredients,
    publisher,
    servings: defaultServing,
    source_url,
    title,
  },
  onBookmark,
}) {
  const [servings, setServings] = useState(defaultServing);

  useEffect(() => {
    setServings(defaultServing);
  }, [defaultServing]);

  const content = (
    <div>
      <figure className="before:block before:h-100 before:w-100 before:absolute before:bg-slate-100 h-80 relative origin-top">
        <img
          className="object-cover block h-full w-full"
          src={image_url}
          alt={title}
        />
        <h1 className="absolute bottom-0 left-1/2  -translate-x-2/4 translate-y-1/4 -skew-y-6 text-white text-5xl w-1/2 uppercase leading-loose text-center">
          <span className="py-5 px-8 bg-gradient-to-br from-yellow-100 to-orange-500">
            {title}
          </span>
        </h1>
      </figure>
      <RecipeDetails
        id={id}
        cookingTime={cooking_time}
        servings={servings}
        setServings={setServings}
        onBookmark={onBookmark}
      />
      <RecipeIngredients
        ingredients={ingredients}
        defaultServing={defaultServing}
        servings={servings}
      />
      <RecipeDirection url={source_url} publisher={publisher} />
    </div>
  );
  return <div>{content}</div>;
}
export default DisplayRecipe;
