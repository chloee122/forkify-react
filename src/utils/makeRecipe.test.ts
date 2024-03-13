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
  it("should return a correct recipe when processing a list of valid ingredient strings", () => {
    const recipe = {
      title: "Vietnamese Pho",
      source_url: "www.mapcancook",
      image_url:
        "http://forkify-api.herokuapp.com/images/FlatBread21of1a180.jpg",
      publisher: "Mappinen",
      cooking_time: 0,
      servings: 0,
      ingredients: ["1,kg,Rice", "1,kg,Avocado"],
    };
    const convertedRecipe = {
      title: "Vietnamese Pho",
      source_url: "www.mapcancook",
      image_url:
        "http://forkify-api.herokuapp.com/images/FlatBread21of1a180.jpg",
      publisher: "Mappinen",
      cooking_time: 0,
      servings: 0,
      ingredients: [
        { quantity: 1, unit: "kg", description: "Rice" },
        { quantity: 1, unit: "kg", description: "Avocado" },
      ],
    };
    expect(makeRecipe(recipe)).toEqual(convertedRecipe);
  });

  it("should return correct indredient strings when processing a list of ingredient strings", () => {
    const recipe = {
      title: "Vietnamese Pho",
      source_url: "www.mapcancook",
      image_url:
        "http://forkify-api.herokuapp.com/images/FlatBread21of1a180.jpg",
      publisher: "Mappinen",
      cooking_time: 0,
      servings: 0,
      ingredients: ["1,kg,Rice", ""],
    };
    const convertedRecipe = {
      title: "Vietnamese Pho",
      ingredients: [{ quantity: 1, unit: "kg", description: "Rice" }],
    };
    expect(makeRecipe(recipe)).toEqual(convertedRecipe);
  });

  it("should throw error when processing a list of invalid ingredient strings", () => {
    const recipe = {
      title: "Vietnamese Pho",
      source_url: "www.mapcancook",
      image_url:
        "http://forkify-api.herokuapp.com/images/FlatBread21of1a180.jpg",
      publisher: "Mappinen",
      cooking_time: 0,
      servings: 0,
      ingredients: ["1,kg,Rice", "1kgAvocado"],
    };
    expect(() => {
      makeRecipe(recipe);
    }).toThrow();
  });
});
