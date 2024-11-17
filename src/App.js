import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import AddBook from './components/AddBook';
import SearchBooks from './components/SearchBooks';
import Home from './components/Home';


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); 
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        setIsLoggedIn(false); 
    };

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <div className="container">
                <Routes>
                    <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Auth onLogin={handleLogin} />} />

                    {/* <Route
                        path="/home"
                        element={isLoggedIn ? <h1>Welcome to Book Exchange Platform</h1> : <Navigate to="/" />}
                    /> */}
                    {isLoggedIn && <Route path="/home" element={<Home />} />}

                    {isLoggedIn && <Route path="/add-book" element={<AddBook />} />}
                    {isLoggedIn && <Route path="/books" element={<SearchBooks />} />}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
