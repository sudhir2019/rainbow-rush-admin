import { Outlet } from 'react-router-dom';
import Footer from '../components/layouts/Footer/Footer';
import Navbar from '../components/layouts/Navbar/Navbar';
import Loader from '../components/Loader/Loader';
import Sidebar from '../components/layouts/Sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCompany } from "../stores/slices/companieSlice";
import useFetchCompanieIdUsers from '../hooks/admin/users/useFetchCompanieIdUsers';
import useFetchAllWallets from '../hooks/admin/wallets/useFetchAllWallets';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useEffect, useState } from 'react';

function SuperAdminLayout() {
    const dispatch = useDispatch();
    const { isLoadingSession, authUser } = useSelector((state) => state.auth);
    const { selectedCompanyId } = useSelector((state) => state.companies)
    const { fetchCompanieIdUsers } = useFetchCompanieIdUsers();
    const { fetchAllWallets } = useFetchAllWallets();
    const [hasFetchedUsers, setHasFetchedUsers] = useState(false); // State to track if the API has been called
    // Set the first company as the selected one on component mount
    useEffect(() => {
        dispatch(setSelectedCompany(authUser.companie)); // Dispatch to Redux
    }, [authUser, dispatch]); // Runs when `company` data is available

    // Fetch users data when the component mounts and isLoadingSession is false (only once)
    useEffect(() => {
        if (isLoadingSession) {
            setHasFetchedUsers(false);
        }

        if (!isLoadingSession && !hasFetchedUsers && selectedCompanyId) {
            fetchCompanieIdUsers(selectedCompanyId); // Pass the selected company ID
            fetchAllWallets();
            setHasFetchedUsers(true);
        }
    }, [isLoadingSession, selectedCompanyId, fetchCompanieIdUsers, fetchAllWallets]); // Track selectedCompanyId changes

    const menuItems = [
        { category: "Main", links: [{ to: "/retailer/dashboard", icon: "box", label: "Dashboard" }] },
        {
            category: "Management",
            links: [
                { to: "/retailer/user", icon: "users", label: "Users" },
                { to: "/retailer/onlineplayers", icon: "log-in", label: "Online Players" },
            ],
        },
        {
            category: "Game",
            links: [
                { to: "/retailer/gamehistory", icon: "inbox", label: "Game History" },
                { to: "/retailer/winpercentage", icon: "inbox", label: "Win Percentage" },
            ],
        },
        {
            category: "Reports",
            links: [
                { to: "/retailer/turnoverreport", icon: "inbox", label: "TurnOver Report" },
                { to: "/retailer/transactionreport", icon: "briefcase", label: "Transaction Report" },
                { to: "/retailer/commissionpayoutReport", icon: "briefcase", label: "Commission Payout Report" },
                { to: "/retailer/admincommissionreport", icon: "briefcase", label: "Admin Commission Report" },
            ],
        },
        {
            category: "Live Reports",
            links: [
                {
                    to: "#", icon: "download", label: "Live Result", submenu: [
                        { href: "/retailer/liveResult/LiveResult12one", label: "Lucky 12 one" },
                        { href: "/retailer/liveResult/LiveResult12two", label: "Lucky 12 two" },
                        { href: "/retailer/liveResult/LiveResult12three", label: "Lucky 12 coupon" },
                        { href: "/retailer/liveResult/LiveResult16", label: "Lucky 16" },
                        { href: "/retailer/liveResult/LiveResultTripleChanse", label: "Triple Chance" },
                        { href: "/retailer/liveResult/LiveResultRoulette", label: "GK Roulette-36" },
                    ]
                },
            ],
        },
        { category: "Logs Activity", links: [{ to: "/retailer/logactivities", icon: "inbox", label: "Logs" }] },
    ];
    // Combine both loading states (session and users loading)
    return (
        <div className="main-wrapper h-screen" id="app">
            <Sidebar menuItems={menuItems} />
            <div className="page-wrapper">
                <Navbar user={authUser} profileLink={"/retailer/profile"} />
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