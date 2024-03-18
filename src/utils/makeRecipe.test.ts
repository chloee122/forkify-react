import { convertIngredient, makeRecipe } from "./makeRecipe";

describe("convertIngredient", () => {
  it("converts ingredient string into an object with quanity, unit and description keys", () => {
    const expectedIngredientObj = {
      quantity: 1,
      unit: "kg",
      description: "Rice",
    };
    expect(convertIngredient("1,kg,Rice")).toEqual(expectedIngredientObj);
  });
});

describe("makeRecipe", () => {
  const recipe = {
    title: "Vietnamese Pho",
    source_url: "www.mapcancook",
    image_url: "http://forkify-api.herokuapp.com/images/FlatBread21of1a180.jpg",
    publisher: "Mappinen",
    cooking_time: 0,
    servings: 0,
  };

  const convertedRecipe = {
    title: "Vietnamese Pho",
    source_url: "www.mapcancook",
    image_url: "http://forkify-api.herokuapp.com/images/FlatBread21of1a180.jpg",
    publisher: "Mappinen",
    cooking_time: 0,
    servings: 0,
  };

  it("should return a correct recipe when processing a recipe object containing a list of valid ingredient strings", () => {
    expect(
      makeRecipe({ ...recipe, ingredients: ["1,kg,Rice", "1,kg,Avocado"] })
    ).toEqual({
      ...convertedRecipe,
      ingredients: [
        { quantity: 1, unit: "kg", description: "Rice" },
        { quantity: 1, unit: "kg", description: "Avocado" },
      ],
    });
  });

  it("should return a correct recipe when processing a recipe object containing a list of valid ingredient strings and empty strings", () => {
    expect(makeRecipe({ ...recipe, ingredients: ["1,kg,Rice", ""] })).toEqual({
      ...convertedRecipe,
      ingredients: [{ quantity: 1, unit: "kg", description: "Rice" }],
    });
  });

  it("should throw error when processing a recipe object containing a list of invalid ingredient strings", () => {
    expect(() => {
      makeRecipe({ ...recipe, ingredients: ["1,kg,Rice", "1kgAvocado"] });
    }).toThrow();
  });
});
