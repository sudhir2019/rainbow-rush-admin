import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Footer from '../components/layouts/Home/Footer';
import Navbar from '../components/layouts/Home/Navbar';
import Loader from '../components/Loader/Loader';
import Home from '../pages/Home/Home';
function MainLayout() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleLoadComplete = () => setLoading(false);
        const timer = setTimeout(handleLoadComplete, 2000); // Simulate loading time

        return () => clearTimeout(timer); // Cleanup
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black">
            <Navbar />
            <main>
                {loading ? (
                    <Loader />
                ) : (

                    // <Outlet />
                    <Home />
                )}
            </main >
            <Footer />
        </div>
    );
}

export default MainLayout;
