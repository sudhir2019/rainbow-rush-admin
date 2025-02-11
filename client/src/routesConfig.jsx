import Dashboard from "./pages/Dashboard/Dashboard";
import GameMaster from "./pages/Dashboard/GameMaster";
import Company from "./pages/Dashboard/Company";
import Admin from "./pages/Dashboard/admin";
import SuperDistributor from "./pages/Dashboard/SuperDistributor";
import Distributor from "./pages/Dashboard/Distributor";
import Retailer from "./pages/Dashboard/Retailer";
import Users from "./pages/Dashboard/Users";
import OnlinePlayers from "./pages/Dashboard/OnlinePlayers";
import GameHistory from "./pages/Dashboard/GameHistory";
import WinPercentage from "./pages/Dashboard/WinPercentage";
import TurnOverReport from "./pages/Dashboard/TurnOverReport";
import TransactionReport from "./pages/Dashboard/TransactionReport";
import CommissionPayout from "./pages/Dashboard/CommissionPayout";
import AdminCommissionReport from "./pages/Dashboard/AdminCommissionReport";
import LogActivities from "./pages/Dashboard/LogActivities";
import Profile from "./pages/Dashboard/Profile";

// Role-Based Routes
const roleBasedRoutes = {
    superadmin: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "gamemaster", element: <GameMaster /> },
        { path: "gamemaster/:action", element: <GameMaster /> },
        { path: "gamemaster/:action/:any", element: <GameMaster /> },
        { path: "company", element: <Company /> },
        { path: "company/:action", element: <Company /> },
        { path: "company/:action/:any", element: <Company /> },
        { path: "admin", element: <Admin /> },
        { path: "admin/:action", element: <Admin /> },
        { path: "admin/:action/:any", element: <Admin /> },
        { path: "superdistributer", element: <SuperDistributor /> },
        { path: "superdistributer/:action", element: <SuperDistributor /> },
        { path: "superdistributer/:action/:any", element: <SuperDistributor /> },
        { path: "distributer", element: <Distributor /> },
        { path: "distributer/:action", element: <Distributor /> },
        { path: "distributer/:action/:any", element: <Distributor /> },
        { path: "retailer", element: <Retailer /> },
        { path: "retailer/:action", element: <Retailer /> },
        { path: "retailer/:action/:any", element: <Retailer /> },
        { path: "user", element: <Users /> },
        { path: "user/:action", element: <Users /> },
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
    ],
    admin: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "superdistributer", element: <SuperDistributor /> },
        { path: "superdistributer/:action", element: <SuperDistributor /> },
        { path: "superdistributer/:action/:any", element: <SuperDistributor /> },
        { path: "distributer", element: <Distributor /> },
        { path: "distributer/:action", element: <Distributor /> },
        { path: "distributer/:action/:any", element: <Distributor /> },
        { path: "retailer", element: <Retailer /> },
        { path: "retailer/:action", element: <Retailer /> },
        { path: "retailer/:action/:any", element: <Retailer /> },
        { path: "user", element: <Users /> },
        { path: "user/:action", element: <Users /> },
        { path: "user/:action/:any", element: <Users /> },
        { path: "onlineplayers", element: <OnlinePlayers /> },
        { path: "gamehistory", element: <GameHistory /> },
        { path: "winpercentage", element: <WinPercentage /> },
        { path: "turnoverreport", element: <TurnOverReport /> },
        { path: "transactionreport", element: <TransactionReport /> },
        { path: "commissionpayoutReport", element: <CommissionPayout /> },
        { path: "admincommissionreport", element: <AdminCommissionReport /> },
        { path: "logactivities", element: <LogActivities /> },
    ],
    superdistributer: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "distributer", element: <Distributor /> },
        { path: "distributer/:action", element: <Distributor /> },
        { path: "distributer/:action/:any", element: <Distributor /> },
        { path: "retailer", element: <Retailer /> },
        { path: "retailer/:action", element: <Retailer /> },
        { path: "retailer/:action/:any", element: <Retailer /> },
        { path: "user", element: <Users /> },
        { path: "user/:action", element: <Users /> },
        { path: "user/:action/:any", element: <Users /> },
        { path: "onlineplayers", element: <OnlinePlayers /> },
        { path: "gamehistory", element: <GameHistory /> },
        { path: "winpercentage", element: <WinPercentage /> },
        { path: "turnoverreport", element: <TurnOverReport /> },
        { path: "transactionreport", element: <TransactionReport /> },
        { path: "commissionpayoutReport", element: <CommissionPayout /> },
        { path: "logactivities", element: <LogActivities /> },
    ],
    distributer: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "retailer", element: <Retailer /> },
        { path: "retailer/:action", element: <Retailer /> },
        { path: "retailer/:action/:any", element: <Retailer /> },
        { path: "user", element: <Users /> },
        { path: "user/:action", element: <Users /> },
        { path: "user/:action/:any", element: <Users /> },
        { path: "onlineplayers", element: <OnlinePlayers /> },
        { path: "gamehistory", element: <GameHistory /> },
        { path: "winpercentage", element: <WinPercentage /> },
        { path: "turnoverreport", element: <TurnOverReport /> },
        { path: "transactionreport", element: <TransactionReport /> },
        { path: "commissionpayoutReport", element: <CommissionPayout /> },
        { path: "logactivities", element: <LogActivities /> },
    ],
    retailer: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "user", element: <Users /> },
        { path: "user/:action", element: <Users /> },
        { path: "user/:action/:any", element: <Users /> },
        { path: "onlineplayers", element: <OnlinePlayers /> },
        { path: "profile", element: <Profile /> },
    ],
};

export default roleBasedRoutes;
