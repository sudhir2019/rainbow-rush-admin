import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import ClipboardJS from "clipboard";
import feather from "feather-icons";
import { Tooltip } from "bootstrap";

function Sidebar({menuItems}) {

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
           // console.log("ok")
            if (window.matchMedia("(min-width: 900px)").matches) {
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
// console.log(isMenuOpen);
    return (
        <nav  className="sidebar">
            <div className="sidebar-header">
                <a href="#" className="sidebar-brand"><span>RainbowRush</span></a>
                <div className="sidebar-toggler not-active">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div className="sidebar-body">
                <ul className="nav" >
                    {menuItems.map(({ category, links }, categoryIndex) => (
                        <div key={`section-${categoryIndex}`}>
                            {category && (
                                <li className="nav-item nav-category">{category}</li>
                            )}
                            {links.map((link, linkIndex) => (
                                <li key={`link-${categoryIndex}-${linkIndex}`} className="nav-item">
                                    {link.submenu ? (
                                        <NavLink
                                            to={link.to}
                                            className="nav-link"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggleSubmenu(`${categoryIndex}-${linkIndex}`); // Use unique key
                                            }}
                                        >
                                            <i className="link-icon" data-feather={link.icon}></i>
                                            <span className="link-title">{link.label}</span>
                                            <i className="link-arrow" data-feather="chevron-down"></i>
                                        </NavLink>
                                    ) : link.to ? (
                                        <NavLink
                                            to={link.to}
                                            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                                            style={({ isActive }) => isActive ? { color: 'blue' } : {}}
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
                        </div>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Sidebar;