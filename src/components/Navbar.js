// This module is for Navbar

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isLoggedIn, onLogout }) {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="/logo.png" alt="Book Exchange Logo" />
                <h1>Book Exchange App</h1>
            </div>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                {!isLoggedIn && <li><Link to="/">Login / Signup</Link></li>}
                {isLoggedIn && <li><Link to="/add-book">Add Book</Link></li>}
                {isLoggedIn && <li><Link to="/books">Search Books</Link></li>}
                {isLoggedIn && <li><button onClick={onLogout} className="logout-btn">Logout</button></li>}
            </ul>
        </nav>
    );
}

export default Navbar;
