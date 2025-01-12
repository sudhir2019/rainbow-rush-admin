import Footer from '../components/layouts/Home/Footer';
import Navbar from '../components/layouts/Home/Navbar';
import Home from '../pages/Home/Home';
function MainLayout() {
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
