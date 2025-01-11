import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { Gamepad2, LogIn } from 'lucide-react';

function Navbar() {
    const navigate = useNavigate(); // Initialize the navigate function

    // Function to handle login button click
    const handleLoginClick = () => {
        navigate('/auth/login'); // Navigate to the login page
    };

    return (
        <nav className="bg-black/30 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Gamepad2 className="w-8 h-8 text-purple-400" />
                        <span className="ml-2 text-xl font-bold text-white">GameZone</span>
                    </div>
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-4">
                            <a href="#games" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Games
                            </a>
                            <a href="#winners" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Winners
                            </a>
                            <a href="#results" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Results
                            </a>
                        </div>
                    </div>
                    <button
                        onClick={handleLoginClick}
                        className="inline-flex items-center px-4 py-2 border border-purple-500 rounded-md text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                        <LogIn className="w-4 h-4 mr-2" />
                        Login
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
