import { createContext, useState } from "react";

import { getRecipe } from "../api";

const SelectedRecipeContext = createContext();
function SelectedRecipeProvider({ children }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSelectRecipe = async (id) => {
    const result = await getRecipe(id);
    setSelectedRecipe(result);
  };

  return (
    <SelectedRecipeContext.Provider
      value={{ selectedRecipe, setSelectedRecipe, handleSelectRecipe }}
    >
      {children}
    </SelectedRecipeContext.Provider>
  );
}

export { SelectedRecipeProvider };
export default SelectedRecipeContext;
