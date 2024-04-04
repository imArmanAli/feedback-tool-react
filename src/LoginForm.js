import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';
import Loader from './Loader';
import './LoginForm.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                navigate('/');
            }
        };

        checkAuthentication();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('http://127.0.0.1:8000/api/v1/login', { email, password });
            localStorage.setItem('token', response.data.access_token);
            setLoading(false);
            navigate('/');
        } catch (error) {
            setLoading(false);
            setError('Invalid email or password');
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Sign up</Link></p>
            {loading && <Loader />}
        </div>
    );
};

export default LoginForm;
