import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Loader from './Loader';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegistrationForm = () => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password_confirmation, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                navigate('/login');
            }
        };

        checkAuthentication();
    }, []);

    const validateForm = () => {
        const errors = {};
        if (!name.trim()) {
            errors.name = "Name is required";
        }
        if (!email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid";
        }
        if (!password.trim()) {
            errors.password = "Password is required";
        } else if (password.length < 8) {
            errors.password = "Password must be at least 8 characters long";
        }
        if (!password_confirmation.trim()) {
            errors.password_confirmation = "Password confirmation is required";
        } else if (password_confirmation !== password) {
            errors.password_confirmation = "Passwords do not match";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                setLoading(true);
                const response = await axios.post('http://127.0.0.1:8000/api/v1/register', { name, email, password, password_confirmation: password });
                console.log('Registration successful:', response.data);
                setLoading(false);
                navigate('/login');
            } catch (error) {
                setLoading(false);
                console.error('Registration failed:', error);
            }
        }
    };

    return (
        <div className="container register">
            <h2 className="text-center mb-4">Sign Up to the Feedback-Tool</h2>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className={`form-control ${errors.name && 'is-invalid'}`} id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className={`form-control ${errors.email && 'is-invalid'}`} id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="input-group">
                                <input type={passwordVisible ? 'text' : 'password'} className={`form-control ${errors.password && 'is-invalid'}`} id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
                                <button className="btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility}>
                                    {passwordVisible ? <i className="bi bi-eye"></i> : <i className="bi bi-eye eye-slash"></i>}
                                </button>
                            </div>
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password_confirmation" className="form-label">Confirm Password</label>
                            <input type="password" className={`form-control ${errors.password_confirmation && 'is-invalid'}`} id="confirmPassword" value={password_confirmation} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" required />
                            {errors.password_confirmation && <div className="invalid-feedback">{errors.password_confirmation}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                    <p>Already have an Account? <Link to="/login">Login</Link></p>
                </div>
            </div>
            {loading && <Loader />}
        </div>
    );
};

export default RegistrationForm;
