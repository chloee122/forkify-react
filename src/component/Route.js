import { useContext } from "react";
import { NavigationContext } from "../context/NavigationContext";

function Route({ children, path }) {
  const { currentPath } = useContext(NavigationContext);
  const re = new RegExp(path);
  console.log(re);

  if (currentPath.match(re)) {
    return children;
  }

  return null;
}

export default Route;
