import { useEffect, useState } from "react";

function getInitialTheme(): 'light' | 'dark' {
  // SSR Check
  if (typeof window === 'undefined') return 'dark';
  
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  const hour = new Date().getHours();
  const isDark = hour >= 20 || hour < 6;
  
  return isDark ? "dark" : "light";
}

export default function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => getInitialTheme());

  useEffect(() => {
    // Apply theme class to app
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const setAuto = () => {
    localStorage.removeItem("theme");
    setTheme(getInitialTheme());
  };

  return { theme, toggleTheme, setAuto };
}