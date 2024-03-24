import { useContext } from "react";
import { NavigationContext } from "../context/NavigationContext";

export default function useNavigationContext() {
  const navigationContext = useContext(NavigationContext);

  if (!navigationContext) {
    throw new Error(
      "useNavigationContext has to be used within <NavigationContext.Provider>"
    );
  }

  return navigationContext;
}
