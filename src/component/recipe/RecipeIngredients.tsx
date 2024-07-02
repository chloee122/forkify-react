// @ts-ignore
import { Fraction } from "fractional";
import { FiCheck } from "react-icons/fi";
import { ExtendedRecipe } from "../../common/internal";

interface RecipeIngredientsProps {
  selectedRecipe: ExtendedRecipe;
  selectedServings: number;
}

function RecipeIngredients({
  selectedRecipe: { ingredients, servings: defaultServing },
  selectedServings,
}: RecipeIngredientsProps) {
  const renderedIngredients = ingredients.map((ingredient, index) => {
    const quantity = ingredient.quantity
      ? new Fraction(
          (ingredient.quantity * selectedServings) / defaultServing
        ).toString()
      : "";
    return (
      <li key={index} className="flex">
        <FiCheck className="text-primary h-5 w-5 mt-px mr-2.5 flex-ingredient" />
        <p>
          {quantity} {ingredient.unit} {ingredient.description}
        </p>
      </li>
    );
  });
  return (
    <div className="py-14 px-20 flex flex-col items-center bg-greylight2">
      <h2 className="text-xl font-bold text-primary uppercase mb-6 text-center">
        Recipe Ingredients
      </h2>
      <ul className="grid grid-cols-2 gap-y-6 gap-x-8">
        {renderedIngredients}
      </ul>
    </div>
  );
}

export default RecipeIngredients;
