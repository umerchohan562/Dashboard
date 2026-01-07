import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/dashboardLayout";
import { routes, RouteType } from "./components/routes";

function App() {
  return (
    <Routes>
      {/* Main dashboard layout */}
      <Route path="/" element={<DashboardLayout />}>
        {routes.map((route) => {
          // Add main route if element exists
          const mainRoute: RouteType[] = route.element
            ? [route]
            : [];

          // Add children routes if exist
          const childRoutes: RouteType[] = route.children || [];

          // Combine main + children
          const allRoutes = [...mainRoute, ...childRoutes];

          return allRoutes.map((r) => (
            <Route
              key={r.path}
              path={r.path === "/" ? "" : r.path.slice(1)}
              element={r.element!} // safe because element exists
            />
          ));
        })}
      </Route>
    </Routes>
  );
}

export default App;
