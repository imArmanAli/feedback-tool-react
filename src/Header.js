// Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const isAuthenticated = localStorage.getItem('token') !== null;
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link to="/" className="navbar-brand">Feedback Tool</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {isAuthenticated ? (
                            <div className="d-flex align-items-center">
                                <li className="nav-item">
                                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                                </li>
                            </div>
                        ) : (
                            <div className="d-flex flex-row">
                                <li className="nav-item">
                                    <Link to="/login" className="btn btn-primary me-2 mt-3">Sign In</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="btn btn-outline-primary mt-3">Sign Up</Link>
                                </li>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
