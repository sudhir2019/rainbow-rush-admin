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

function AdminLayout() {
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

    // Combine both loading states (session and users loading)
    return (
        <div className="main-wrapper h-screen" id="app">
            <Sidebar />
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

export default AdminLayout;
