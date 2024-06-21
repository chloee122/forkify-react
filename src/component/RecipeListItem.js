function RecipeListItem({ recipe }) {
  return (
    <div className='group/item hover:bg-slate-100 flex'>
      <img
        src={recipe.image_url}
        alt={recipe.title}
        className='h-10 w-10 rounded-full '
      ></img>
      <div>
        <p className='font-sans text-sm font-semibold text-amber-600'>
          {recipe.title}
        </p>
        <p className='text-xs text-stone-400'>{recipe.publisher}</p>
      </div>
    </div>
  );
}

export default RecipeListItem;
