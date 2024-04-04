// LogoutButton.js
import React from 'react';

const LogoutButton = () => {
    const handleLogout = () => {
        // Perform logout actions (e.g., clear session, remove token, etc.)
        console.log('Logged out successfully');
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
