import React from 'react';
import './App.css';

const Loader = () => {
    return (
        <div className="loader-overlay">
            <div className="d-flex justify-content-center align-items-center loader-container">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
};

export default Loader;
