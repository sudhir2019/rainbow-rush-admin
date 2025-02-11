import { useEffect, useState } from "react";
import feather from "feather-icons";
import ClipboardJS from "clipboard";
import { Tooltip } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import favicon from "../../../assets/favicon.ico";
import { NavLink } from "react-router-dom";
import useLogout from "../../../hooks/Authentication/useLogout ";
import { useDispatch } from "react-redux";
import { setSelectedCompany } from "../../../stores/slices/companieSlice";
import { useSelector } from "react-redux";
function Header({ user, profileLink, company }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedCompany, setSelectedCompanyState] = useState(""); // Local state for selected company
    const handleLogout = useLogout();
    const dispatch = useDispatch();
    const { companiesLoading, selectedCompanyId } = useSelector((state) => state.companies)
    // Initialize Feather Icons
    useEffect(() => {
        feather.replace();
    }, []);

    // Set the first company as the selected one on component mount
    useEffect(() => {
        if (company.length > 0) {
            setSelectedCompanyState(company[0]._id); // Set local state
            dispatch(setSelectedCompany(company[0]._id)); // Dispatch to Redux
        }
    }, [company, dispatch]); // Runs when `company` data is available

    // Handle change event for the select dropdown

    const handleCompanyChange = (e) => {
        const companyId = e.target.value;
        dispatch(setSelectedCompany(companyId)); // Update Redux state
    };

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
            clipboard.destroy();
        };
    }, []);

    return (
        <nav className="navbar dark">
            <NavLink to="#" className="sidebar-toggler">
                <i data-feather="menu"></i>
            </NavLink>
            <div className="navbar-content">
                {/* Company Dropdown */}
                <div className="mt-2">
                    {companiesLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                            <svg className="w-6 h-6 text-blue-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0"></path>
                            </svg>
                            <span className="text-gray-500 text-sm">Loading companies...</span>
                        </div>
                    ) : (
                        <select
                            className="block w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-crimson-500"
                            value={selectedCompanyId || ""}
                            onChange={handleCompanyChange}
                        >
                            <option value="" disabled>Select a company</option>
                            {company.map((comp) => (
                                <option key={comp?._id || "1"} value={comp?._id || "loding"}>
                                    {comp?.name || "Loding..."}
                                </option>
                            ))}
                        </select>
                    )}
                </div>


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
                                        <p className="name font-weight-bold mb-0">{user.username}</p>
                                    </div>
                                </div>
                                <div className="dropdown-body">
                                    <ul className="profile-nav p-0 pt-3">
                                        <li className="nav-item">
                                            <NavLink to={profileLink} className="nav-link">
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
                                                    handleLogout(user._id);
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

export default Header;
