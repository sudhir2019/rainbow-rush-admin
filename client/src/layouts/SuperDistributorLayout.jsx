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

function SuperDistributorLayout() {
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
    console.log(authUser.companie);
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
        { category: "Main", links: [{ to: "/superdistributer/dashboard", icon: "box", label: "Dashboard" }] },
        {
            category: "Management",
            links: [
                { to: "/superdistributer/distributer", icon: "users", label: "Distributor" },
                { to: "/superdistributer/retailer", icon: "users", label: "Retailer" },
                { to: "/superdistributer/user", icon: "users", label: "Users" },
                { to: "/superdistributer/onlineplayers", icon: "log-in", label: "Online Players" },
            ],
        },
        {
            category: "Game",
            links: [
                { to: "/superdistributer/gamehistory", icon: "inbox", label: "Game History" },
                { to: "/superdistributer/winpercentage", icon: "inbox", label: "Win Percentage" },
            ],
        },
        {
            category: "Reports",
            links: [
                { to: "/superdistributer/turnoverreport", icon: "inbox", label: "TurnOver Report" },
                { to: "/superdistributer/transactionreport", icon: "briefcase", label: "Transaction Report" },
                { to: "/superdistributer/commissionpayoutReport", icon: "briefcase", label: "Commission Payout Report" },
                { to: "/superdistributer/admincommissionreport", icon: "briefcase", label: "Admin Commission Report" },
            ],
        },
        {
            category: "Live Reports",
            links: [
                {
                    to: "#", icon: "download", label: "Live Result", submenu: [
                        { href: "/superdistributer/liveResult/LiveResult12one", label: "Lucky 12 one" },
                        { href: "/superdistributer/liveResult/LiveResult12two", label: "Lucky 12 two" },
                        { href: "/superdistributer/liveResult/LiveResult12three", label: "Lucky 12 coupon" },
                        { href: "/superdistributer/liveResult/LiveResult16", label: "Lucky 16" },
                        { href: "/superdistributer/liveResult/LiveResultTripleChanse", label: "Triple Chance" },
                        { href: "/superdistributer/liveResult/LiveResultRoulette", label: "GK Roulette-36" },
                    ]
                },
            ],
        },
        { category: "Logs Activity", links: [{ to: "/superdistributer/logactivities", icon: "inbox", label: "Logs" }] },
    ];
    // Combine both loading states (session and users loading)
    return (
        <div className="main-wrapper h-screen" id="app">
            <Sidebar menuItems={menuItems} />
            <div className="page-wrapper">
                <Navbar user={authUser} profileLink={"/superdistributer/profile"} />
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