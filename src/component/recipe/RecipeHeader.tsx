import { ExtendedRecipe } from "../../common/internal";

interface RecipeHeaderProps {
  selectedRecipe: ExtendedRecipe;
}

function RecipeHeader({ selectedRecipe }: RecipeHeaderProps) {
  return (
    <figure className="before:block before:h-100 before:w-100 before:absolute before:bg-slate-100 h-80 relative origin-top">
      <img
        className="object-cover block h-full w-full"
        src={selectedRecipe.imageUrl}
        alt={selectedRecipe.title}
      />
      <h1 className="absolute bottom-0 left-1/2  -translate-x-2/4 translate-y-1/4 -skew-y-6 text-white text-5xl w-1/2 uppercase leading-loose text-center">
        <span className="py-5 px-8 bg-gradient-to-br from-yellow-100 to-orange-500">
          {selectedRecipe.title}
        </span>
      </h1>
    </figure>
  );
}

export default RecipeHeader;
