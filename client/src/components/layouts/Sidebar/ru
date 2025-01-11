import React,{ useEffect, useState} from "react";
import PerfectScrollbar from "perfect-scrollbar";
import ClipboardJS from "clipboard";
import feather from "feather-icons";
import { Tooltip } from "bootstrap";
import '../../../css/app.css';
import { NavLink } from "react-router-dom";

const menuItems = [
    { category: "Main", links: [{ to: "/admin/dashboard", icon: "box", label: "Dashboard" }] },
    {
        category: "Management",
        links: [
            { to: "/admin/company", icon: "users", label: "Company" },
            { to: "/admin/superdistributor", icon: "users", label: "SuperDistributer" },
            { to: "/admin/distributor", icon: "users", label: "Distributor" },
            { to: "/admin/retailer", icon: "users", label: "Retailer" },
            { to: "/admin/users", icon: "users", label: "Users" },
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
            { to: "/admin/adminCommissionReport", icon: "briefcase", label: "Admin Commission Report" },
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
    { category: "Logs Activity", links: [{ to: "logActivities.html", icon: "inbox", label: "Logs" }] },
];

function Sidebar() {
    const [activeMenu, setActiveMenu] = useState(null);

    useEffect(() => {
        // Enable feather icons
        feather.replace();

        // Initialize Clipboard
        const clipboard = new ClipboardJS(".btn-clipboard");

        clipboard.on("success", (e) => {
            const button = e.trigger;
            button.setAttribute("data-bs-original-title", "Copied");
            const tooltip = new Tooltip(button); // Use Bootstrap's Tooltip
            tooltip.show();

            setTimeout(() => {
                tooltip.hide();
                button.setAttribute("data-bs-original-title", "Copy to clipboard");
            }, 1000);
            e.clearSelection();
        });

        // Perfect Scrollbar Initialization
        const sidebarBody = document.querySelector(".sidebar-body");
        if (sidebarBody) new PerfectScrollbar(sidebarBody);

        // Sidebar toggle functionality
        const body = document.body;
        const sidebarToggler = document.querySelector(".sidebar-toggler");

        const toggleSidebar = () => {
            if (window.matchMedia("(min-width: 992px)").matches) {
                body.classList.toggle("sidebar-folded");
            } else {
                body.classList.toggle("sidebar-open");
            }
        };

        sidebarToggler.addEventListener("click", toggleSidebar);

        // Cleanup event listeners
        return () => {
            sidebarToggler.removeEventListener("click", toggleSidebar);
            clipboard.destroy();
        };
    }, []);

    // Function to handle the toggle of a submenu
    const toggleSubmenu = (menuId) => {
        setActiveMenu(activeMenu === menuId ? null : menuId); // Toggle visibility of submenu
    };

    return (
        <nav className="sidebar">
            <div className="sidebar-header">
                <a href="#" className="sidebar-brand"><span>RainbowRush</span></a>
                <div className="sidebar-toggler not-active">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div className="sidebar-body">
                <ul className="nav">
                    {menuItems.map(({ category, links }, categoryIndex) => (
                        <React.Fragment key={`category-${categoryIndex}`}>
                            {category && (
                                <li className="nav-item nav-category">{category}</li>
                            )}
                            {links.map((link, linkIndex) => (
                                <li key={`link-${categoryIndex}-${linkIndex}`} className="nav-item">
                                    {link.submenu ? (
                                        <a
                                            href={link.to}
                                            className="nav-link"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggleSubmenu(`${categoryIndex}-${linkIndex}`); // Use unique key
                                            }}
                                        >
                                            <i className="link-icon" data-feather={link.icon}></i>
                                            <span className="link-title">{link.label}</span>
                                            <i className="link-arrow" data-feather="chevron-down"></i>
                                        </a>
                                    ) : link.to ? (
                                        <NavLink
                                            to={link.to}
                                            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                                        >
                                            <i className="link-icon" data-feather={link.icon}></i>
                                            <span className="link-title">{link.label}</span>
                                        </NavLink>
                                    ) : (
                                        <a href={link.href} className="nav-link">
                                            <i className="link-icon" data-feather={link.icon}></i>
                                            <span className="link-title">{link.label}</span>
                                        </a>
                                    )}
                                    {link.submenu && (
                                        <div
                                            className={`submenu ${activeMenu === `${categoryIndex}-${linkIndex}` ? "show" : ""}`}
                                            style={{ display: activeMenu === `${categoryIndex}-${linkIndex}` ? "block" : "none" }}
                                        >
                                            <ul className="nav sub-menu">
                                                {link.submenu.map((sub, subIdx) => (
                                                    <li key={`submenu-${categoryIndex}-${linkIndex}-${subIdx}`} className="nav-item">
                                                        <NavLink to={sub.href} className="nav-link">{sub.label}</NavLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </React.Fragment>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Sidebar;
