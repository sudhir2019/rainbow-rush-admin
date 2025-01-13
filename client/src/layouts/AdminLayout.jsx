import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Footer from '../components/layouts/Footer/Footer';
import Navbar from '../components/layouts/Navbar/Navbar';
import Loader from '../components/Loader/Loader';
import Sidebar from '../components/layouts/Sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function AdminLayout() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleLoadComplete = () => setLoading(false);
        const timer = setTimeout(handleLoadComplete, 2000); // Simulate loading time
        return () => clearTimeout(timer); // Cleanup
    }, []);


    return (
        <div className="main-wrapper h-screen" id="app">
            <Sidebar />
            <div className="page-wrapper">
                <Navbar />
                <div className="page-content overflow-auto">
                    {loading ? (
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
