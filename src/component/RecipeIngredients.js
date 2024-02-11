import { Fraction } from "fractional";

function RecipeIngredients({
  selectedRecipe: { ingredients, servings: defaultServing },
  selectedServings,
}) {
  const renderedIngredients = ingredients.map((ingredient, index) => {
    const quantity = ingredient.quantity
      ? new Fraction(
          (ingredient.quantity * selectedServings) / defaultServing
        ).toString()
      : "";
    return (
      <div key={index}>
        {quantity} {ingredient.unit} {ingredient.description}
      </div>
    );
  });
  return <div>{renderedIngredients}</div>;
}

export default RecipeIngredients;
