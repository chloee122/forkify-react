const convertIngredient = (text) => {
  const parts = text.split(',');
  if (parts.length !== 3) return null;
  return { quantity: Number(parts[0]), unit: parts[1], description: parts[2] };
};

export default convertIngredient;
