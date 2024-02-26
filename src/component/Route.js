import { useContext } from 'react';
import { NavigationContext } from '../context/NavigationContext';

function Route({ children, path }) {
  const { currentPath } = useContext(NavigationContext);

  if (currentPath === path) return children;
  return null;
}

export default Route;
