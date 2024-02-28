import { useContext } from "react";
import { NavigationContext } from "../context/NavigationContext";

function Route({ children, path }) {
  const { currentPath } = useContext(NavigationContext);
  const re = new RegExp(path);

  if (currentPath.match(re)) {
    return children;
  }

  return null;
}

export default Route;
