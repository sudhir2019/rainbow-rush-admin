import { Outlet } from 'react-router-dom';
import Footer from '../components/layouts/Footer/Footer';
import Header from '../components/layouts/Navbar/Header';
import Loader from '../components/Loader/Loader';
import Sidebar from '../components/layouts/Sidebar/Sidebar';
import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import useFetchCompanieIdUsers from '../hooks/admin/users/useFetchCompanieIdUsers';
import useFetchAllWallets from '../hooks/admin/wallets/useFetchAllWallets';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useEffect, useState } from 'react';
import { useFetchCompanies } from '../hooks/admin/companies/useFetchCompanies';

function SuperAdminLayout() {
    const [loadData, setLoadData] = useState(true);
    const { isLoadingSession, authUser } = useSelector((state) => state.auth);
    const { fetchCompanieIdUsers } = useFetchCompanieIdUsers();
    const { fetchAllWallets } = useFetchAllWallets();
    const { companies, fetchAllCompanies } = useFetchCompanies();
    useEffect(() => {
        if (loadData) {
            fetchAllCompanies();
            setLoadData(false);
        }
    }, [loadData]);
    // fetchAllCompanies();
    const [hasFetchedUsers, setHasFetchedUsers] = useState(false); // State to track if the API has been called
    const menuItems = [
        { category: "Main", links: [{ to: "/superadmin/dashboard", icon: "box", label: "Dashboard" }] },
        {
            category: "Management",
            links: [
                { to: "/superadmin/gamemaster", icon: "users", label: "GameMaster" },
                { to: "/superadmin/company", icon: "users", label: "Company" },
                { to: "/superadmin/admin", icon: "users", label: "Admin" },
                { to: "/superadmin/superdistributer", icon: "users", label: "SuperDistributer" },
                { to: "/superadmin/distributer", icon: "users", label: "Distributor" },
                { to: "/superadmin/retailer", icon: "users", label: "Retailer" },
                { to: "/superadmin/user", icon: "users", label: "Users" },
                { to: "/superadmin/onlineplayers", icon: "log-in", label: "Online Players" },
            ],
        },
        {
            category: "Game",
            links: [
                { to: "/superadmin/gamehistory", icon: "inbox", label: "Game History" },
                { to: "/superadmin/winpercentage", icon: "inbox", label: "Win Percentage" },
            ],
        },
        {
            category: "Reports",
            links: [
                { to: "/superadmin/turnoverreport", icon: "inbox", label: "TurnOver Report" },
                { to: "/superadmin/transactionreport", icon: "briefcase", label: "Transaction Report" },
                { to: "/superadmin/commissionpayoutReport", icon: "briefcase", label: "Commission Payout Report" },
                { to: "/superadmin/admincommissionreport", icon: "briefcase", label: "Admin Commission Report" },
            ],
        },
        {
            category: "Live Reports",
            links: [
                {
                    to: "#", icon: "download", label: "Live Result", submenu: [
                        { href: "/superadmin/liveResult/LiveResult12one", label: "Lucky 12 one" },
                        { href: "/superadmin/liveResult/LiveResult12two", label: "Lucky 12 two" },
                        { href: "/superadmin/liveResult/LiveResult12three", label: "Lucky 12 coupon" },
                        { href: "/superadmin/liveResult/LiveResult16", label: "Lucky 16" },
                        { href: "/superadmin/liveResult/LiveResultTripleChanse", label: "Triple Chance" },
                        { href: "/superadmin/liveResult/LiveResultRoulette", label: "GK Roulette-36" },
                    ]
                },
            ],
        },
        { category: "Logs Activity", links: [{ to: "/superadmin/logactivities", icon: "inbox", label: "Logs" }] },
    ];
    // Fetch users data when the component mounts and isLoadingSession is false (only once)
    useEffect(() => {
        if (isLoadingSession) {
            setHasFetchedUsers(false)
        }
        if (!isLoadingSession && !hasFetchedUsers) {
            fetchCompanieIdUsers();
            fetchAllWallets();
            setHasFetchedUsers(true); // Set flag to true after fetching
        }
    }, [isLoadingSession, hasFetchedUsers, fetchCompanieIdUsers, fetchAllWallets]);

    // Combine both loading states (session and users loading)
    return (
        <div className="main-wrapper h-screen" id="app">
            <Sidebar menuItems={menuItems} />
            <div className="page-wrapper">
                <Header user={authUser} profileLink={"/superadmin/profile"} company={companies} />
                <div className="page-content overflow-auto">
                    {isLoadingSession ? (
                        <div className="flex justify-center items-center h-full">
                            <Loader />
                        </div>
                    ) : (
                        <Outlet />
                    )}
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default SuperAdminLayout;