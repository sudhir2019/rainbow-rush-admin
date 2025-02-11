import React from 'react';

function Footer() {
    return (
        <footer className="footer d-flex flex-column flex-md-row align-items-center justify-content-between">
            <p className="text-muted text-center text-md-left">
                Copyright © 2025 <a href="#" target="_blank" rel="noopener noreferrer">Welcome RainbowRush Casino</a>.
                All rights reserved.
            </p>
            <p className="text-muted text-center text-md-left mb-0 d-none d-md-block">
                Handcrafted With <span className="mb-1 text-primary ml-1 icon-small" data-feather="heart"></span>
            </p>
        </footer>
    );
}

export default Footer;
