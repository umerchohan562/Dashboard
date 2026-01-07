import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { routes } from "./routes";
import { Menu, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Toggle dropdown only (parent does NOT navigate)
  const toggleDropdown = (route: typeof routes[0]) => {
    setOpenDropdown(openDropdown === route.label ? null : route.label);
  };

  // Check if a route or any of its children is active
  const isRouteActive = (route: typeof routes[0]) => {
    if (route.path === location.pathname) return true;
    if (route.children) {
      return route.children.some((child) => child.path === location.pathname);
    }
    return false;
  };

  return (
    <aside
      className={cn(
        "bg-foreground/10 shadow border-r-[2px] border-primary/10 transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="font-bold text-xl text-gray-800 dark:text-white">
            Dashboard
          </div>
        )}

        <Button
          variant="ghost"
          className="p-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu size={20} />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 p-4">
        {routes.map((route) => {
          const hasChildren = !!route.children?.length;
          const active = isRouteActive(route);

          return (
            <div key={route.label} className="flex flex-col gap-1">
              {/* Main button */}
              {collapsed && hasChildren ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-center px-0",
                        active
                          ? "bg-primary text-black dark:hover:bg-primary dark:hover:text-black"
                          : "hover:bg-gray-200 dark:hover:bg-gray-700"
                      )}
                    >
                      {route.icon}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent side="right" className="w-48 p-2">
                    <div className="flex flex-col gap-1">
                      {route.children!.map((child) => (
                        <Button
                          key={child.path}
                          variant="ghost"
                          className="justify-start gap-2"
                          onClick={() => navigate(child.path)}
                        >
                          {child.icon}
                          <span>{child.label}</span>
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-between items-center gap-2 ",
                    collapsed ? "justify-center px-0" : "justify-start px-4",
                    active
                      ? "bg-primary text-black hover:bg-primary hover:text-black dark:hover:bg-primary dark:hover:text-black"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  )}
                  onClick={() =>
                    hasChildren ? toggleDropdown(route) : navigate(route.path)
                  }
                >
                  <div className={cn( !collapsed && "flex items-center justify-between w-full")}>
                  <div className="flex items-center gap-2">
                    {route.icon}
                    {!collapsed && <span>{route.label}</span>}
                  </div>
                  {hasChildren && !collapsed && (
                    <ChevronDown
                      size={16}
                      className={cn(
                        "transition-transform",
                        openDropdown === route.label && "rotate-180"
                      )}
                    />
                  )}
                  </div>
                </Button>
              )}
              {hasChildren && openDropdown === route.label && !collapsed && (
                <div className="flex flex-col pl-8 gap-1">
                  {route.children!.map((child) => (
                    <NavLink key={child.path} to={child.path}>
                      {({ isActive }) => (
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start gap-2 text-sm",
                            isActive
                              ? "bg-primary text-black hover:bg-primary hover:text-black dark:hover:bg-primary dark:hover:text-black"
                              : "hover:bg-gray-200 dark:hover:bg-gray-700"
                          )}
                        >
                          {child.icon}
                          <span>{child.label}</span>
                        </Button>
                      )}
                    </NavLink>
                  ))}
                </div>
              )}

            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
