import RecipeDetails from "./RecipeDetails";

function DisplayRecipe({ recipe }) {
  const {
    id,
    cooking_time,
    image_url,
    ingredients,
    publisher,
    servings,
    source_url,
    title,
  } = recipe;
  const content = (
    <div>
      <figure className="before:block before:h-100 before:w-100 before:absolute before:bg-slate-100 h-80 relative origin-top">
        <img
          className="object-cover block h-full w-full"
          src={recipe.image_url}
          alt={recipe.title}
        />
        <h1 className="absolute bottom-0 left-1/2  -translate-x-2/4 translate-y-1/4 -skew-y-6 text-white text-5xl w-1/2 uppercase leading-loose text-center">
          <span className="py-5 px-8 bg-gradient-to-br from-yellow-100 to-orange-500">
            {recipe.title}
          </span>
        </h1>
      </figure>
      <RecipeDetails cookingTime={cooking_time} servings={servings} />
    </div>
  );
  return <div>{content}</div>;
}
export default DisplayRecipe;
