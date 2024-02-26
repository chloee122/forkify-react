const convertIngredient = (text) => {
  const parts = text.split(",");
  if (parts.length !== 3) return null;
  return { quantity: Number(parts[0]), unit: parts[1], description: parts[2] };
};

const makeRecipe = (state) => {
  try {
    const ingredients = state.ingredients
      .filter((ingredient) => ingredient !== "")
      .map(convertIngredient);

    if (ingredients.some((ingredient) => ingredient === null))
      throw Error("Input format was not correct! Please try again :)");

    const recipe = { ...state, ingredients };
    return recipe;
  } catch (err) {
    throw err;
  }
};

export { convertIngredient, makeRecipe };
