import { Outlet } from 'react-router-dom';
import Footer from '../components/layouts/Footer/Footer';
import Navbar from '../components/layouts/Navbar/Navbar';
import Loader from '../components/Loader/Loader';
import Sidebar from '../components/layouts/Sidebar/Sidebar';
import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import useFetchAllUsers from '../hooks/admin/users/useFetchAllUsers';
import useFetchAllWallets from '../hooks/admin/wallets/useFetchAllWallets';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useEffect, useState } from 'react';

function SuperAdminLayout() {
    const { isLoadingSession, authUser } = useSelector((state) => state.auth);
    const { fetchAllUsers } = useFetchAllUsers();
    const { fetchAllWallets } = useFetchAllWallets();

    const [hasFetchedUsers, setHasFetchedUsers] = useState(false); // State to track if the API has been called

    // Fetch users data when the component mounts and isLoadingSession is false (only once)
    useEffect(() => {
        if (isLoadingSession) {
            setHasFetchedUsers(false)
        }
        if (!isLoadingSession && !hasFetchedUsers) {
            fetchAllUsers();
            fetchAllWallets();
            setHasFetchedUsers(true); // Set flag to true after fetching
        }
    }, [isLoadingSession, hasFetchedUsers, fetchAllUsers, fetchAllWallets]);
    const menuItems = [
        { category: "Main", links: [{ to: "/distributor/dashboard", icon: "box", label: "Dashboard" }] },
        {
            category: "Management",
            links: [
                { to: "/distributor/retailer", icon: "users", label: "Retailer" },
                { to: "/distributor/users", icon: "users", label: "Users" },
                { to: "/distributor/onlineplayers", icon: "log-in", label: "Online Players" },
            ],
        },
        {
            category: "Game",
            links: [
                { to: "/distributor/gamehistory", icon: "inbox", label: "Game History" },
                { to: "/distributor/winpercentage", icon: "inbox", label: "Win Percentage" },
            ],
        },
        {
            category: "Reports",
            links: [
                { to: "/distributor/turnoverreport", icon: "inbox", label: "TurnOver Report" },
                { to: "/distributor/transactionreport", icon: "briefcase", label: "Transaction Report" },
                { to: "/distributor/commissionpayoutReport", icon: "briefcase", label: "Commission Payout Report" },
                { to: "/distributor/admincommissionreport", icon: "briefcase", label: "Admin Commission Report" },
            ],
        },
        {
            category: "Live Reports",
            links: [
                {
                    to: "#", icon: "download", label: "Live Result", submenu: [
                        { href: "/distributor/liveResult/LiveResult12one", label: "Lucky 12 one" },
                        { href: "/distributor/liveResult/LiveResult12two", label: "Lucky 12 two" },
                        { href: "/distributor/liveResult/LiveResult12three", label: "Lucky 12 coupon" },
                        { href: "/distributor/liveResult/LiveResult16", label: "Lucky 16" },
                        { href: "/distributor/liveResult/LiveResultTripleChanse", label: "Triple Chance" },
                        { href: "/distributor/liveResult/LiveResultRoulette", label: "GK Roulette-36" },
                    ]
                },
            ],
        },
        { category: "Logs Activity", links: [{ to: "/distributor/logactivities", icon: "inbox", label: "Logs" }] },
    ];
    // Combine both loading states (session and users loading)
    return (
        <div className="main-wrapper h-screen" id="app">
            <Sidebar menuItems={menuItems} />
            <div className="page-wrapper">
                <Navbar user={authUser} />
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