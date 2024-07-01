import { FiArrowRight } from "react-icons/fi";
import { ExtendedRecipe } from "../../common/internal";

interface RecipeDirectionsProps {
  selectedRecipe: ExtendedRecipe;
}
function RecipeDirections({
  selectedRecipe: { sourceUrl, publisher },
}: RecipeDirectionsProps) {
  return (
    <div className="py-12 px-24 flex flex-col items-center">
      <h2 className="text-xl font-bold text-primary uppercase mb-6 text-center">
        How to cook it
      </h2>
      <p className="text-center mb-9 text-greydark2">
        This recipe was carefully designed and tested by{" "}
        <span className="font-bold">{publisher}</span>. Please check out
        directions at their website.
      </p>
      <a
        href={sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="text-white bg-gradient-to-br from-background1 to-background2 rounded-full uppercase flex items-center text-sm font-semibold py-3.5 px-6 hover:scale-105"
      >
        <span>Directions</span>
        <FiArrowRight className="ml-1.5 h-5 w-5" />
      </a>
    </div>
  );
}
export default RecipeDirections;
