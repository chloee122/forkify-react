import useNavigationContext from "../../hooks/useNavigationContext";

interface RouteProps {
  children: React.ReactNode;
  path: string;
}

function Route({ children, path }: RouteProps) {
  const { currentPath } = useNavigationContext();
  const re = new RegExp(path);
  if (currentPath.match(re)) return <>{children}</>;

  return null;
}

export default Route;
