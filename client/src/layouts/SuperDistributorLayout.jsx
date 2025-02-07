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

function SuperDistributorLayout() {
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
        { category: "Main", links: [{ to: "/superdistributor/dashboard", icon: "box", label: "Dashboard" }] },
        {
            category: "Management",
            links: [
                { to: "/superdistributor/distributor", icon: "users", label: "Distributor" },
                { to: "/superdistributor/retailer", icon: "users", label: "Retailer" },
                { to: "/superdistributor/users", icon: "users", label: "Users" },
                { to: "/superdistributor/onlineplayers", icon: "log-in", label: "Online Players" },
            ],
        },
        {
            category: "Game",
            links: [
                { to: "/superdistributor/gamehistory", icon: "inbox", label: "Game History" },
                { to: "/superdistributor/winpercentage", icon: "inbox", label: "Win Percentage" },
            ],
        },
        {
            category: "Reports",
            links: [
                { to: "/superdistributor/turnoverreport", icon: "inbox", label: "TurnOver Report" },
                { to: "/superdistributor/transactionreport", icon: "briefcase", label: "Transaction Report" },
                { to: "/superdistributor/commissionpayoutReport", icon: "briefcase", label: "Commission Payout Report" },
                { to: "/superdistributor/admincommissionreport", icon: "briefcase", label: "Admin Commission Report" },
            ],
        },
        {
            category: "Live Reports",
            links: [
                {
                    to: "#", icon: "download", label: "Live Result", submenu: [
                        { href: "/superdistributor/liveResult/LiveResult12one", label: "Lucky 12 one" },
                        { href: "/superdistributor/liveResult/LiveResult12two", label: "Lucky 12 two" },
                        { href: "/superdistributor/liveResult/LiveResult12three", label: "Lucky 12 coupon" },
                        { href: "/superdistributor/liveResult/LiveResult16", label: "Lucky 16" },
                        { href: "/superdistributor/liveResult/LiveResultTripleChanse", label: "Triple Chance" },
                        { href: "/superdistributor/liveResult/LiveResultRoulette", label: "GK Roulette-36" },
                    ]
                },
            ],
        },
        { category: "Logs Activity", links: [{ to: "/superdistributor/logactivities", icon: "inbox", label: "Logs" }] },
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

export default SuperDistributorLayout;