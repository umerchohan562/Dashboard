import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/dashboardLayout";
import { routes, RouteType } from "./components/routes";
import ProtectedRoute from "./components/protectedRoutes";

import Login from "./pages/Auth/login";
import Signup from "./pages/Auth/signup";

function App() {
  return (
    <Routes>
      {/* ===== PUBLIC ROUTES ===== */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* ===== PROTECTED ROUTES ===== */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashboardLayout />}>
          {routes.map((route) => {
            const mainRoute: RouteType[] = route.element ? [route] : [];
            const childRoutes: RouteType[] = route.children || [];
            const allRoutes = [...mainRoute, ...childRoutes];

            return allRoutes.map((r) => (
              <Route
                key={r.path}
                path={r.path === "/" ? "" : r.path.slice(1)}
                element={r.element!}
              />
            ));
          })}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
