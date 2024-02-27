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
  describe("processes a list of ingredient strings that has empty values", () => {
    it("filters empty values and only convert valid strings", () => {
      const recipe = {
        title: "Vietnamese Pho",
        ingredients: ["1,kg,Rice", ""],
      };
      const convertedRecipe = {
        title: "Vietnamese Pho",
        ingredients: [{ quantity: 1, unit: "kg", description: "Rice" }],
      };
      expect(makeRecipe(recipe)).toEqual(convertedRecipe);
    });
  });

  describe("processes a list of invalid ingredient strings", () => {
    it("throws error", () => {
      const recipe = {
        title: "Vietnamese Pho",
        ingredients: ["1,kg,Rice", "1kgAvocado"],
      };
      expect(() => {
        makeRecipe(recipe);
      }).toThrow();
    });
  });

  describe("processes a list of valid ingredient strings", () => {
    it("returns a converted recipe object", () => {
      const recipe = {
        title: "Vietnamese Pho",
        ingredients: ["1,kg,Rice", "1,kg,Avocado"],
      };
      const convertedRecipe = {
        title: "Vietnamese Pho",
        ingredients: [
          { quantity: 1, unit: "kg", description: "Rice" },
          { quantity: 1, unit: "kg", description: "Avocado" },
        ],
      };
      expect(makeRecipe(recipe)).toEqual(convertedRecipe);
    });
  });
});
