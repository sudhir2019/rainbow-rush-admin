import { useState } from 'react';
import Footer from '../components/layouts/Home/Footer';
import Navbar from '../components/layouts/Home/Navbar';
import Home from '../pages/Home/Home';

function MainLayout() {

    const [isMenuOpen, setIsMenuOpen] = useState(false); // Manage sidebar state
    const handleMenuToggle = () => {
        setIsMenuOpen((prevState) => !prevState); // Toggle menu open state
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black">
            <Navbar />
            <main>
                <Home />
            </main >
            <Footer />
        </div>
    );
}

export default MainLayout;
