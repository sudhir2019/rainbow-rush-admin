import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useSession from "./hooks/Authentication/useSession";

// Components
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";

// Admin Components
import SuperDistributor from "./pages/Dashboard/SuperDistributor";
import Distributor from "./pages/Dashboard/Distributor";
import Retailer from "./pages/Dashboard/Retailer";
import Users from "./pages/Dashboard/Users";

// Other Components
import ToastContainers from "./components/Toast/ToastContainer";
import Company from "./pages/Dashboard/Company";


export default function App() {
  const { isLoggedIn } = useSession();

  // Function to render routes
  const renderRoutes = (layout, routes) => (
    <Route path={layout.path} element={layout.component}>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      <Route index element={<Navigate to={routes[0]?.path} />} />
    </Route>
  );

  return (
    <BrowserRouter>
      <Routes>
        {renderRoutes({ path: "", component: <MainLayout /> }, [
          { path: "/", element: <Home /> },
        ])}
        {renderRoutes({ path: "auth", component: <AuthLayout /> }, [
          { path: "login", element: <Login /> },
          { path: "signup", element: <Signup /> },
        ])}
        {renderRoutes({ path: "admin", component: <AdminLayout /> }, [
          { path: "dashboard", element: <Dashboard /> },
          { path: "company", element: <Company /> },
          { path: "company/:action", element: <Company /> },
          { path: "superDistributor", element: <SuperDistributor /> },
          { path: "superDistributor/:action", element: <SuperDistributor /> },
          { path: "distributor", element: <Distributor /> },
          { path: "distributor/:action", element: <Distributor /> },
          { path: "retailer", element: <Retailer /> },
          { path: "users", element: <Users /> },
          { path: "*", element: <Navigate to="/admin/dashboard" /> },
        ])}
        {/* <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/admin/dashboard" : "/auth/login"} />}
        /> */}
      </Routes>
      <ToastContainers />
    </BrowserRouter>
  );
}
