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
import OnlinePlayers from "./pages/Dashboard/OnlinePlayers";
import GameHistory from "./pages/Dashboard/GameHistory";
import WinPercentage from "./pages/Dashboard/WinPercentage";
import TurnOverReport from "./pages/Dashboard/TurnOverReport";
import TransactionReport from "./pages/Dashboard/TransactionReport";
import CommissionPayout from "./pages/Dashboard/CommissionPayout";
import AdminCommissionReport from "./pages/Dashboard/AdminCommissionReport";
import LogActivities from "./pages/Dashboard/LogActivities";
import Profile from "./pages/Dashboard/Profile";
import Loader from "./components/Loader/Loader";

const ProtectedRoute = ({ element, redirectTo = "/auth/login" }) => {
  const { isAdmin, isUser, isSuperdistributers, isRetailers, isDistributers, isLoggedIn, isLoading } = useSession();

  // While session is loading, show a loader
  if (isLoading) {
    return <Loader />;
  }

  // If user is logged in, render the protected route element
  return isLoggedIn ? element : <Navigate to={redirectTo} />;
};
// Protected Route Component
// const ProtectedRoute = ({ element, redirectTo = "/auth/login", requiredRoles = [], accessDeniedPath = "/access-denied" }) => {
//   const { isAdmin, isUser, isSuperdistributers, isRetailers, isDistributers, isLoggedIn, isLoading } = useSession();


//   if (!isLoading) return <Loader />;

//   if (isLoggedIn) return <Navigate to={redirectTo} />;

//   return element;
// };


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
        {/* Public Routes */}
        {renderRoutes({ path: "", component: <MainLayout /> }, [
          { path: "/", element: <Home /> },
        ])}

        {renderRoutes({ path: "auth", component: <AuthLayout /> }, [
          { path: "login", element: <Login /> },
          { path: "logout", element: <Login /> },
          { path: "signup", element: <Signup /> },
        ])}

        {/* Protected Admin Routes */}
        {renderRoutes({ path: "admin", component: <AdminLayout /> }, [
          { path: "dashboard", element: <ProtectedRoute element={<Dashboard />} /> },
          { path: "company", element: <ProtectedRoute element={<Company />} /> },
          { path: "company/:action", element: <ProtectedRoute element={<Company />} /> },
          { path: "superdistributor", element: <ProtectedRoute element={<SuperDistributor />} /> },
          { path: "superdistributor/:action/:any", element: <ProtectedRoute element={<SuperDistributor />} /> },
          { path: "distributor", element: <ProtectedRoute element={<Distributor />} /> },
          { path: "distributor/:action/:any", element: <ProtectedRoute element={<Distributor />} /> },
          { path: "retailer", element: <ProtectedRoute element={<Retailer />} /> },
          { path: "retailer/:action/:any", element: <ProtectedRoute element={<Retailer />} /> },
          { path: "users", element: <ProtectedRoute element={<Users />} /> },
          { path: "users/:action/:any", element: <ProtectedRoute element={<Users />} /> },
          { path: "onlineplayers", element: <ProtectedRoute element={<OnlinePlayers />} /> },
          { path: "gamehistory", element: <ProtectedRoute element={<GameHistory />} /> },
          { path: "winpercentage", element: <ProtectedRoute element={<WinPercentage />} /> },
          { path: "turnoverreport", element: <ProtectedRoute element={<TurnOverReport />} /> },
          { path: "transactionreport", element: <ProtectedRoute element={<TransactionReport />} /> },
          { path: "commissionpayoutReport", element: <ProtectedRoute element={<CommissionPayout />} /> },
          { path: "admincommissionreport", element: <ProtectedRoute element={<AdminCommissionReport />} /> },
          { path: "logactivities", element: <ProtectedRoute element={<LogActivities />} /> },
          { path: "profile", element: <ProtectedRoute element={<Profile />} /> },
          { path: "*", element: <Navigate to="/admin/dashboard" /> },
        ])}

        {/* Catch-all Redirect for unauthenticated users */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/admin/dashboard" : "/auth/login"} />}
        />
      </Routes>
      <ToastContainers />
    </BrowserRouter>
  );
}
