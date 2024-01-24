function ShowRecipe({ recipe }) {
  const content = (
    <div>
      <div>
        <img src={recipe.image_url} alt={recipe.title} />
        {recipe.title}
      </div>
    </div>
  );
  return <div>{content}</div>;
}
export default ShowRecipe;
