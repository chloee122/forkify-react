import { useContext } from 'react';
import { NavigationContext } from '../context/NavigationContext';

function Link({ children, to }) {
  const { navigate } = useContext(NavigationContext);
  const handleClick = (e) => {
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
