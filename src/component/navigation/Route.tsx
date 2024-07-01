import useNavigationContext from "../../hooks/useNavigationContext";

interface RouteProps {
  children: React.ReactNode;
  path: string;
  exact?: boolean;
}

function Route({ children, path, exact }: RouteProps) {
  const { currentPath } = useNavigationContext();

  const re = new RegExp(path);
  if (exact) {
    if (currentPath === path) {
      return <>{children}</>;
    } else {
      return null;
    }
  }
  if (currentPath.match(re)) return <>{children}</>;

  return null;
}

export default Route;
