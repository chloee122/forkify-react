import { SimpleRecipe } from "../../common/internal";

interface RecipeListItemProps {
  recipe: SimpleRecipe;
}

function RecipeListItem({ recipe }: RecipeListItemProps) {
  return (
    <div className="group/item hover:bg-slate-100 flex">
      <img
        src={recipe.imageUrl}
        alt={recipe.title}
        className="h-10 w-10 rounded-full "
      ></img>
      <div>
        <p className="font-sans text-sm font-semibold text-amber-600">
          {recipe.title}
        </p>
        <p className="text-xs text-stone-400">{recipe.publisher}</p>
      </div>
    </div>
  );
}

export default RecipeListItem;
 