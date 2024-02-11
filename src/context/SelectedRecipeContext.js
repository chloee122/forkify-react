import { createContext, useState } from "react";

import * as api from "../api";

const SelectedRecipeContext = createContext();
function SelectedRecipeProvider({ children }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const selectRecipe = async (id) => {
    const result = await api.selectRecipe(id);
    setSelectedRecipe(result);
  };

  return (
    <SelectedRecipeContext.Provider
      value={{ selectedRecipe, setSelectedRecipe, selectRecipe }}
    >
      {children}
    </SelectedRecipeContext.Provider>
  );
}

export { SelectedRecipeProvider };
export default SelectedRecipeContext;
