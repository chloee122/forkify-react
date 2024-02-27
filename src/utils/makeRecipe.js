const convertIngredient = (text) => {
  const parts = text.split(",");
  if (parts.length !== 3) return null;
  return { quantity: Number(parts[0]), unit: parts[1], description: parts[2] };
};

const makeRecipe = (recipe) => {
  const ingredients = recipe.ingredients
    .filter((ingredient) => ingredient !== "")
    .map(convertIngredient);

  if (ingredients.some((ingredient) => ingredient === null))
    throw Error("Input format was not correct! Please try again :)");

  const newRecipe = { ...recipe, ingredients };
  return newRecipe;
};

export { convertIngredient, makeRecipe };
