import React, { useState, useEffect } from "react";
import { ThemeContext } from "./useTheme";

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = typeof window !== "undefined" && localStorage.getItem("theme");
      console.log("Initial theme from localStorage:", saved);
      if (saved) return saved;
    } catch {}
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    console.log("Updating theme to:", theme);
    root.classList.toggle("dark", theme === "dark");
    try { 
      localStorage.setItem("theme", theme);
      console.log("Theme saved to localStorage");
    } catch (error) {
      console.error("Failed to save theme:", error);
    }
  }, [theme]);

  const toggleTheme = () => {
    console.log("Toggle theme called, current theme:", theme);
    setTheme(t => (t === "light" ? "dark" : "light"));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}