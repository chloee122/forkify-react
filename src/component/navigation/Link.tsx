import useNavigationContext from "../../hooks/useNavigationContext";

interface LinkProps {
  children: React.ReactNode;
  to: string;
}

function Link({ children, to }: LinkProps) {
  const { navigate } = useNavigationContext();
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <a onClick={handleClick} href={to}>
      {children}
    </a>
  );
}

export default Link;
