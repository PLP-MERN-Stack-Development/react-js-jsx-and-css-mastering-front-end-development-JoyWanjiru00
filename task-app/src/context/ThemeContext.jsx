import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

// Only export the provider component from this file (avoids react-refresh export rule)
export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = typeof window !== "undefined" && localStorage.getItem("theme");
      if (saved) return saved;
    } catch {}
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");

    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
