import { ExtendedRecipe } from "../../common/internal";

interface RecipeHeaderProps {
  selectedRecipe: ExtendedRecipe;
}

function RecipeHeader({ selectedRecipe }: RecipeHeaderProps) {
  return (
    <figure className="h-80 relative before:h-full before:w-full before:bg-gradient-to-br from-background1 to-background2 before:block before:absolute before:top-0 before:left-0 before:opacity-60">
      <img
        className="object-cover block h-full w-full"
        src={selectedRecipe.imageUrl}
        alt={selectedRecipe.title}
      />
      <h1 className="absolute bottom-0 left-1/2 -translate-x-2/4 translate-y-1/4 -skew-y-6 text-white text-4xl font-bold uppercase text-center leading-loose">
        <span className="py-3.5 px-5 bg-gradient-to-br from-background1 to-background2 box-decoration-clone">
          {selectedRecipe.title}
        </span>
      </h1>
    </figure>
  );
}

export default RecipeHeader;
