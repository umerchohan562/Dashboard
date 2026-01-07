import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { routes } from "../components/routes";
import { Moon, Sun } from "lucide-react";

const Header = () => {
  const location = useLocation();

  // Get current page label dynamically
  const currentRoute = routes.find((r) => r.path === location.pathname);
  const pageTitle = currentRoute?.label || "Dashboard";

  // Dark mode state with localStorage persistence
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") return true;
    if (stored === "light") return false;
    // fallback to system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Update html class and localStorage when dark mode changes
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <header className="h-16 bg-foreground/10 flex items-center justify-between px-6 shadow">
      <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
        {pageTitle}
      </h1>

      <button
        onClick={() => setDark(!dark)}
        className="p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white transition"
      >
        {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>
    </header>
  );
};

export default Header;
