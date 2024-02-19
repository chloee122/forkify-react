const convertIngredient = (text) => {
  if (!text) return;
  const parts = text.split(",");
  return { quantity: Number(parts[0]), unit: parts[1], description: parts[2] };
};

export default convertIngredient;
