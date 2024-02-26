import { useContext } from "react";
import { NavigationContext } from "../context/NavigationContext";

function Route({ children, path }) {
  const { currentPath } = useContext(NavigationContext);

  if (path.test(currentPath)) {
    return children;
  }

  return null;
}

export default Route;
