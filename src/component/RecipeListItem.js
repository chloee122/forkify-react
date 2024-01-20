function RecipeListItem({ recipe }) {
  return (
    <div className="group/item hover:bg-slate-100">
      <img src={recipe.image_url} alt={recipe.title}></img>
      <h4>{recipe.title}</h4>
      <p>{recipe.publisher}</p>
    </div>
  );
}

export default RecipeListItem;
