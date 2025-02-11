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
function AdminLayout() {
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
        { category: "Main", links: [{ to: "/admin/dashboard", icon: "box", label: "Dashboard" }] },
        {
            category: "Management",
            links: [
                { to: "/admin/superdistributer", icon: "users", label: "SuperDistributer" },
                { to: "/admin/distributer", icon: "users", label: "Distributor" },
                { to: "/admin/retailer", icon: "users", label: "Retailer" },
                { to: "/admin/user", icon: "users", label: "Users" },
                { to: "/admin/onlineplayers", icon: "log-in", label: "Online Players" },
            ],
        },
        {
            category: "Game",
            links: [
                { to: "/admin/gamehistory", icon: "inbox", label: "Game History" },
                { to: "/admin/winpercentage", icon: "inbox", label: "Win Percentage" },
            ],
        },
        {
            category: "Reports",
            links: [
                { to: "/admin/turnoverreport", icon: "inbox", label: "TurnOver Report" },
                { to: "/admin/transactionreport", icon: "briefcase", label: "Transaction Report" },
                { to: "/admin/commissionpayoutReport", icon: "briefcase", label: "Commission Payout Report" },
                { to: "/admin/admincommissionreport", icon: "briefcase", label: "Admin Commission Report" },
            ],
        },
        {
            category: "Live Reports",
            links: [
                {
                    to: "#", icon: "download", label: "Live Result", submenu: [
                        { href: "/admin/liveResult/LiveResult12one", label: "Lucky 12 one" },
                        { href: "/admin/liveResult/LiveResult12two", label: "Lucky 12 two" },
                        { href: "/admin/liveResult/LiveResult12three", label: "Lucky 12 coupon" },
                        { href: "/admin/liveResult/LiveResult16", label: "Lucky 16" },
                        { href: "/admin/liveResult/LiveResultTripleChanse", label: "Triple Chance" },
                        { href: "/admin/liveResult/LiveResultRoulette", label: "GK Roulette-36" },
                    ]
                },
            ],
        },
        { category: "Logs Activity", links: [{ to: "/admin/logactivities", icon: "inbox", label: "Logs" }] },
    ];
    // Combine both loading states (session and users loading)
    return (
        <div className="main-wrapper h-screen" id="app">
            <Sidebar menuItems={menuItems} />
            <div className="page-wrapper">
                <Navbar user={authUser} profileLink={"/admin/profile"} />
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

export default AdminLayout;