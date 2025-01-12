import { useEffect } from 'react';
import { useState } from 'react';
import feather from 'feather-icons'; // Import feather icons for SVG replacement
import ClipboardJS from 'clipboard'; // Import ClipboardJS
import { Tooltip } from "bootstrap";
import PerfectScrollbar from "perfect-scrollbar";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS
import favicon from '../../../assets/favicon.ico'


function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Initialize Feather Icons
    useEffect(() => {
        feather.replace();
    }, []);

    // Handle Dropdown toggle
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);

        // console.log(dropdownOpen);
    };

    // ClipboardJS functionality
    useEffect(() => {
        const clipboard = new ClipboardJS('.btn-clipboard');
        clipboard.on('success', (e) => {
            const button = e.trigger;
            button.setAttribute('data-bs-original-title', 'Copied');
            const tooltip = new Tooltip(button);
            tooltip.show();

            setTimeout(() => {
                tooltip.hide();
                button.setAttribute('data-bs-original-title', 'Copy to clipboard');
            }, 1000);
            e.clearSelection();
        });

        return () => {
            clipboard.destroy(); // Cleanup ClipboardJS instance
        };
    }, []);
    return (
        <nav className="navbar dark">
            <a href="#" className="sidebar-toggler">
                <i data-feather="menu"></i>
            </a>
            <div className="navbar-content">
                <ul className="navbar-nav">
                    <li className="nav-item dropdown nav-profile">
                        <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                toggleDropdown();
                            }}
                            id="profileDropdown"
                            role="button"
                            aria-expanded={dropdownOpen ? 'true' : 'false'}
                        >
                            <img src={favicon} alt="profile" />
                        </a>
                        {dropdownOpen && (
                            <div className={`dropdown-menu ${dropdownOpen ? "show" : ""}`} aria-labelledby="profileDropdown">
                                <div className="dropdown-header d-flex flex-column align-items-center">
                                    <div className="figure mb-3">
                                        <img src={favicon} alt="" />
                                    </div>
                                    <div className="info text-center">
                                        <p className="name font-weight-bold mb-0">admin</p>
                                        <p className="email text-muted mb-3">admin@gmail.com</p>
                                    </div>
                                </div>
                                <div className="dropdown-body">
                                    <ul className="profile-nav p-0 pt-3">
                                        <li className="nav-item">
                                            <a href="profile" className="nav-link">
                                                <i data-feather="edit"></i>
                                                <span>Edit Profile</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="logout"
                                                className="nav-link"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    console.log('Logging out...');
                                                    // Add your logout logic here
                                                }}
                                            >
                                                <i data-feather="log-out"></i>
                                                <span>Log Out</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
