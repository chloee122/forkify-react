import { useState, createContext, useEffect } from "react";

interface NavigationContextProps {
  children: React.ReactNode;
}

interface NavigationContextType {
  currentPath: string;
  navigate: (to: string) => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);
function NavigationProvider({ children }: NavigationContextProps) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handler = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handler);

    return () => {
      window.removeEventListener("popstate", handler);
    };
  }, []);

  const navigate = (to: string) => {
    window.history.pushState({}, "", to);
    setCurrentPath(to);
  };

  return (
    <NavigationContext.Provider value={{ navigate, currentPath }}>
      {children}
    </NavigationContext.Provider>
  );
}

export { NavigationContext, NavigationProvider };
