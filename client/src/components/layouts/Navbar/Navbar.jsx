import { useEffect, useState } from "react";
import feather from "feather-icons"; // Import feather icons for SVG replacement
import ClipboardJS from "clipboard"; // Import ClipboardJS
import { Tooltip } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JS
import favicon from "../../../assets/favicon.ico";
import { NavLink } from "react-router-dom";
import useLogout from "../../../hooks/Authentication/useLogout ";
// Import the useLogout hook

function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const handleLogout = useLogout(); // Get the logout handler from the hook

    // Initialize Feather Icons
    useEffect(() => {
        feather.replace();
    }, []);

    // Handle Dropdown toggle
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // ClipboardJS functionality
    useEffect(() => {
        const clipboard = new ClipboardJS(".btn-clipboard");
        clipboard.on("success", (e) => {
            const button = e.trigger;
            button.setAttribute("data-bs-original-title", "Copied");
            const tooltip = new Tooltip(button);
            tooltip.show();

            setTimeout(() => {
                tooltip.hide();
                button.setAttribute("data-bs-original-title", "Copy to clipboard");
            }, 1000);
            e.clearSelection();
        });

        return () => {
            clipboard.destroy(); // Cleanup ClipboardJS instance
        };
    }, []);

    return (
        <nav className="navbar dark">
            <NavLink to="#" className="sidebar-toggler">
                <i data-feather="menu"></i>
            </NavLink>
            <div className="navbar-content">
                <ul className="navbar-nav">
                    <li className="nav-item dropdown nav-profile">
                        <NavLink
                            to="#"
                            className="nav-link dropdown-toggle"
                            onClick={(e) => {
                                e.preventDefault();
                                toggleDropdown();
                            }}
                            id="profileDropdown"
                            role="button"
                            aria-expanded={dropdownOpen ? "true" : "false"}
                        >
                            <img src={favicon} alt="profile" />
                        </NavLink>
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
                                            <NavLink to="/admin/profile" className="nav-link">
                                                <i data-feather="edit"></i>
                                                <span>Edit Profile</span>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink
                                                to="#"
                                                className="nav-link"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleLogout(); // Call the logout function from the hook
                                                }}
                                            >
                                                <i data-feather="log-out"></i>
                                                <span>Log Out</span>
                                            </NavLink>
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
