import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../context/useTheme";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            TaskApp
          </Link>

          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-2xl flex justify-between items-center px-2">
              {["/", "/tasks", "/api"].map((path, i) => {
                const names = ["Home", "Tasks", "API"];
                return (
                  <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                      `px-3 py-1 rounded text-sm transition-colors ${
                        isActive
                          ? "bg-indigo-600 text-white"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`
                    }
                  >
                    {names[i]}
                  </NavLink>
                );
              })}
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
