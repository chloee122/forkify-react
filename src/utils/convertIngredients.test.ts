import { convertIngredients } from "./convertIngredients";

describe("convertIngredients", () => {
  it("converts a list of valid ingredient strings into a list of ingredient object", () => {
    const expectedIngredientObj = {
      quantity: 1,
      unit: "kg",
      description: "Rice",
    };
    expect(convertIngredients(["1,kg,Rice", ""])).toEqual([
      expectedIngredientObj,
    ]);
  });
  it("throws error if it receives an invalid list of ingredient strings", () => {
    expect(() => convertIngredients(["1,Avocado"])).toThrow(
      "Input format was not correct! Please try again :)"
    );
  });
});
