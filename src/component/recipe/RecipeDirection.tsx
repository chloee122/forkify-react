import { GoArrowRight } from "react-icons/go";
import { ExtendedRecipe } from "../../common/internal";

interface RecipeDirectionsProps {
  selectedRecipe: ExtendedRecipe;
}
function RecipeDirections({
  selectedRecipe: { sourceUrl, publisher },
}: RecipeDirectionsProps) {
  return (
    <div className="bg-slate-200">
      <h2>How to cook it</h2>
      <p>
        This recipe was carefully designed and tested by{" "}
        <span>{publisher}</span>. Please check out directions at their website.
      </p>
      <a href={sourceUrl} target="_blank" rel="noreferrer">
        <span>Directions</span>
        <GoArrowRight />
      </a>
    </div>
  );
}
export default RecipeDirections;
