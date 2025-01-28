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
import GameMaster from "./pages/Dashboard/GameMaster";
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

// Other Components
import ToastContainers from "./components/Toast/ToastContainer";
import Loader from "./components/Loader/Loader";

// const ProtectedRoute = ({ element, redirectTo = "/auth/login" }) => {
//   const { isAdmin, isUser, isSuperdistributers, isRetailers, isDistributers, isLoggedIn, isLoading } = useSession();

//   // While session is loading, show a loader
// if (isLoading) {
//   return <Loader />;
// }

// If user is logged in, render the protected route element
// return isLoggedIn ? element : <Navigate to={redirectTo} />;
// };
// Protected Route Component
// const ProtectedRoute = ({ element, redirectTo = "/auth/login", requiredRoles = [], accessDeniedPath = "/access-denied" }) => {
//   const { isAdmin, isUser, isSuperdistributers, isRetailers, isDistributers, isLoggedIn, isLoadingSession } = useSession();


//   if (isLoadingSession) return <Loader />;

//   if (isLoggedIn) return <Navigate to={redirectTo} />;

//   return element;
// };


export default function App() {
  const { isLoadingSession, isLoggedIn } = useSession();

  if (isLoadingSession) {
    
    return <Loader />;
  }
  // console.log(isLoggedIn);

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
          { path: "dashboard", element: <Dashboard /> },
          { path: "gamemaster", element: <GameMaster /> },
          { path: "gamemaster/:action", element: <GameMaster /> },
          { path: "gamemaster/:action/:any", element: <GameMaster /> },
          { path: "company", element: <Company /> },
          { path: "company/:action", element: <Company /> },
          { path: "company/:action/:any", element: <Company /> },
          { path: "superdistributor", element: <SuperDistributor /> },
          { path: "superdistributor/:action/:any", element: <SuperDistributor /> },
          { path: "distributor", element: <Distributor /> },
          { path: "distributor/:action/:any", element: <Distributor /> },
          { path: "retailer", element: <Retailer /> },
          { path: "retailer/:action/:any", element: <Retailer /> },
          { path: "users", element: <Users /> },
          { path: "users/:action/:any", element: <Users /> },
          { path: "onlineplayers", element: <OnlinePlayers /> },
          { path: "gamehistory", element: <GameHistory /> },
          { path: "winpercentage", element: <WinPercentage /> },
          { path: "turnoverreport", element: <TurnOverReport /> },
          { path: "transactionreport", element: <TransactionReport /> },
          { path: "commissionpayoutReport", element: <CommissionPayout /> },
          { path: "admincommissionreport", element: <AdminCommissionReport /> },
          { path: "logactivities", element: <LogActivities /> },
          { path: "profile", element: <Profile /> },
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
