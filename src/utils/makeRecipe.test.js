import { convertIngredient } from "./makeRecipe";

it("converts ingredient string into an object with quanity, unit and description keys", () => {
  const ingredient = { quantity: 1, unit: "kg", description: "Rice" };
  expect(convertIngredient("1,kg,Rice")).toEqual(ingredient);
});
