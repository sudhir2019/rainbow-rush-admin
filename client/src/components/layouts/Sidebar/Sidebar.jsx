import { useEffect, useState } from "react";
import PerfectScrollbar from "perfect-scrollbar";
import ClipboardJS from "clipboard";
import feather from "feather-icons";
import { Tooltip } from "bootstrap";
import '../../../css/app.css'
import { NavLink } from "react-router-dom";

const menuItems = [
    { category: "Main", links: [{ to: "/admin/dashboard", icon: "box", label: "Dashboard" }] },
    {
        category: "Management",
        links: [
            { to: "/admin/superdistributor", icon: "users", label: "SuperDistributer" },
            { to: "/admin/distributor", icon: "users", label: "Distributer" },
            { to: "/admin/retailer", icon: "users", label: "Retailer" },
            { to: "/admin/users", icon: "users", label: "Users" },
            { to: "/admin/onlinePlayer", icon: "log-in", label: "Online Players" },
        ],
    },
    {
        category: "Game",
        links: [
            { to: "/admin/gameHistory", icon: "inbox", label: "Game History" },
            { to: "/admin/winPercentage", icon: "inbox", label: "Win Percentage" },
        ],
    },
    {
        category: "Reports",
        links: [
            { to: "/admin/turnOverReport", icon: "inbox", label: "TurnOver Report" },
            { to: "/admin/transactionReport", icon: "briefcase", label: "Transaction Report" },
            { to: "/admin/commissionPayoutReport", icon: "briefcase", label: "Commission Payout Report" },
            { to: "/admin/adminCommissionReport", icon: "briefcase", label: "Admin Commission Report" },
        ],
    },
    {
        category: "Live Reports",
        links: [
            {
                to: "#", icon: "download", label: "Live Result", submenu: [
                    { href: "liveResult/LiveResult12one.html", label: "Lucky 12 one" },
                    { href: "liveResult/LiveResult12two.html", label: "Lucky 12 two" },
                    { href: "liveResult/LiveResult12three.html", label: "Lucky 12 coupon" },
                    { href: "liveResult/LiveResult16.html", label: "Lucky 16" },
                    { href: "liveResult/LiveResultTripleChanse.html", label: "Triple Chance" },
                    { href: "liveResult/LiveResultRoulette.html", label: "GK Roulette-36" },
                ]
            },
        ],
    },
    { category: "Logs Activity", links: [{ href: "logActivities.html", icon: "inbox", label: "Logs" }] },
];

function Sidebar() {
    const [active, setActive] = useState(false);
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

    const [activeMenu, setActiveMenu] = useState(null);

    // Function to handle the toggle of a submenu
    const toggleSubmenu = (menuId) => setActiveMenu(activeMenu === menuId ? null : menuId);

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
                    {menuItems.map(({ category, links }, index) => (
                        <>
                            {category && (
                                <li key={`category-${category}`} className="nav-item nav-category">{category}</li>
                            )}
                            {links.map((link, idx) => (
                                <li key={`link-${category}-${link.label}`} className="nav-item ">
                                    {link.submenu ? (
                                        <a
                                            href={link.to}
                                            className="nav-link"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggleSubmenu(category);
                                            }}
                                        >
                                            <i className="link-icon" data-feather={link.icon}></i>
                                            <span className="link-title">{link.label}</span>
                                            <i className="link-arrow" data-feather="chevron-down"></i>
                                        </a>
                                    ) : link.to ? (
                                        <li className={`nav-item ${active ? "active" : ""}`}>
                                            <NavLink
                                                to={link.to}
                                                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                                                style={({ isActive }) => isActive ? { color: 'blue' } : {}}
                                            >
                                                <i className="link-icon" data-feather={link.icon}></i>
                                                <span className="link-title">{link.label}</span>
                                            </NavLink>
                                        </li>
                                    ) : (
                                        <a href={link.href} className="nav-link">
                                            <i className="link-icon" data-feather={link.icon}></i>
                                            <span className="link-title">{link.label}</span>
                                        </a>
                                    )}
                                    {link.submenu && (
                                        <div className={`collapse ${activeMenu === category ? "show" : "hide"}`}>
                                            <ul className="nav sub-menu">
                                                {link.submenu.map((sub, subIdx) => (
                                                    <li key={`submenu-${subIdx}`} className="nav-item">
                                                        <a href={sub.href} className="nav-link">{sub.label}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </li >
                            ))}
                        </>
                    ))}
                </ul>
            </div>
        </nav >
    );
}

export default Sidebar;
