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
import SuperAdminLayout from "./layouts/SuperAdminLayout";
import AdminLayout from "./layouts/AdminLayout";
import SuperDistributorLayout from "./layouts/SuperDistributorLayout";
import DistributorLayout from "./layouts/DistributorLayout";
import RetailerLayout from "./layouts/RetailerLayout";

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
import Admin from "./pages/Dashboard/admin";

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

        {/* Protected Super Admin Routes */}
        {renderRoutes({ path: "superadmin", component: <SuperAdminLayout /> }, [
          { path: "dashboard", element: <Dashboard /> },
          { path: "gamemaster", element: <GameMaster /> },
          { path: "gamemaster/:action", element: <GameMaster /> },
          { path: "gamemaster/:action/:any", element: <GameMaster /> },
          { path: "company", element: <Company /> },
          { path: "company/:action", element: <Company /> },
          { path: "company/:action/:any", element: <Company /> },
          { path: "admin", element: <Admin /> },
          { path: "admin/:action/:any", element: <Admin /> },
          { path: "superdistributer", element: <SuperDistributor /> },
          { path: "superdistributer/:action/:any", element: <SuperDistributor /> },
          { path: "distributer", element: <Distributor /> },
          { path: "distributer/:action/:any", element: <Distributor /> },
          { path: "retailer", element: <Retailer /> },
          { path: "retailer/:action/:any", element: <Retailer /> },
          { path: "user", element: <Users /> },
          { path: "user/:action/:any", element: <Users /> },
          { path: "onlineplayers", element: <OnlinePlayers /> },
          { path: "gamehistory", element: <GameHistory /> },
          { path: "winpercentage", element: <WinPercentage /> },
          { path: "turnoverreport", element: <TurnOverReport /> },
          { path: "transactionreport", element: <TransactionReport /> },
          { path: "commissionpayoutReport", element: <CommissionPayout /> },
          { path: "admincommissionreport", element: <AdminCommissionReport /> },
          { path: "logactivities", element: <LogActivities /> },
          { path: "profile", element: <Profile /> },
          { path: "*", element: <Navigate to="/superadmin/dashboard" /> },
        ])}

        {/* Protected Admin Routes */}
        {renderRoutes({ path: "admin", component: <AdminLayout /> }, [
          { path: "dashboard", element: <Dashboard /> },
          { path: "superdistributer", element: <SuperDistributor /> },
          { path: "superdistributer/:action/:any", element: <SuperDistributor /> },
          { path: "distributer", element: <Distributor /> },
          { path: "distributer/:action/:any", element: <Distributor /> },
          { path: "retailer", element: <Retailer /> },
          { path: "retailer/:action/:any", element: <Retailer /> },
          { path: "user", element: <Users /> },
          { path: "user/:action/:any", element: <Users /> },
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
        {/* Protected Super Distributer Rotes */}
        {renderRoutes({ path: "superdistributer", component: <SuperDistributorLayout /> }, [
          { path: "dashboard", element: <Dashboard /> },
          { path: "distributer", element: <Distributor /> },
          { path: "distributer/:action/:any", element: <Distributor /> },
          { path: "retailer", element: <Retailer /> },
          { path: "retailer/:action/:any", element: <Retailer /> },
          { path: "user", element: <Users /> },
          { path: "user/:action/:any", element: <Users /> },
          { path: "onlineplayers", element: <OnlinePlayers /> },
          { path: "gamehistory", element: <GameHistory /> },
          { path: "winpercentage", element: <WinPercentage /> },
          { path: "turnoverreport", element: <TurnOverReport /> },
          { path: "transactionreport", element: <TransactionReport /> },
          { path: "commissionpayoutReport", element: <CommissionPayout /> },
          { path: "admincommissionreport", element: <AdminCommissionReport /> },
          { path: "logactivities", element: <LogActivities /> },
          { path: "profile", element: <Profile /> },
          { path: "*", element: <Navigate to="/superdistributer/dashboard" /> },
        ])}
        {/* Protected Distributor Routes */}
        {renderRoutes({ path: "distributer", component: <DistributorLayout /> }, [
          { path: "dashboard", element: <Dashboard /> },
          { path: "retailer", element: <Retailer /> },
          { path: "retailer/:action/:any", element: <Retailer /> },
          { path: "user", element: <Users /> },
          { path: "user/:action/:any", element: <Users /> },
          { path: "onlineplayers", element: <OnlinePlayers /> },
          { path: "gamehistory", element: <GameHistory /> },
          { path: "winpercentage", element: <WinPercentage /> },
          { path: "turnoverreport", element: <TurnOverReport /> },
          { path: "transactionreport", element: <TransactionReport /> },
          { path: "commissionpayoutReport", element: <CommissionPayout /> },
          { path: "admincommissionreport", element: <AdminCommissionReport /> },
          { path: "logactivities", element: <LogActivities /> },
          { path: "profile", element: <Profile /> },
          { path: "*", element: <Navigate to="/distributer/dashboard" /> },
        ])}
        {/* Protected Retailer Routes */}
        {renderRoutes({ path: "retailer", component: <RetailerLayout /> }, [
          { path: "dashboard", element: <Dashboard /> },
          { path: "user", element: <Users /> },
          { path: "user/:action/:any", element: <Users /> },
          { path: "onlineplayers", element: <OnlinePlayers /> },
          { path: "gamehistory", element: <GameHistory /> },
          { path: "winpercentage", element: <WinPercentage /> },
          { path: "turnoverreport", element: <TurnOverReport /> },
          { path: "transactionreport", element: <TransactionReport /> },
          { path: "commissionpayoutReport", element: <CommissionPayout /> },
          { path: "admincommissionreport", element: <AdminCommissionReport /> },
          { path: "logactivities", element: <LogActivities /> },
          { path: "profile", element: <Profile /> },
          { path: "*", element: <Navigate to="/retailer/dashboard" /> },
        ])}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/" : "/auth/login"} />}
        />
      </Routes>
      <ToastContainers />
    </BrowserRouter>
  );
}
