import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
import LoginForm from './LoginForm'; // Import the LoginForm component

const AddFeedback = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status

    useEffect(() => {
        const checkAuthentication = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                navigate('/');
            }
        };

        checkAuthentication();
    }, []);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        // Validate form fields
        if (!title || !description || !category) {
            setError('All fields are required');
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.post('http://127.0.0.1:8000/api/v1/feedbacks', {
                title,
                description,
                category
            }, config);
            setLoading(false);
            navigate('/');
        } catch (error) {
            console.error('Error adding feedback:', error);
            setLoading(false);
            setError('Failed to add feedback. Please try again later.');
        }
    };

    return (
        <div className="container">
            {isAuthenticated ? (
                <>
                    <h2 className="mb-4"><i className="bi bi-arrow-left" onClick={handleGoBack}></i>Add Feedback</h2>
                    <form onSubmit={handleSubmit}>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" id="description" rows="5" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <select className="form-select" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Select a category</option>
                                <option value="bug report">Bug Report</option>
                                <option value="feature request">Feature Request</option>
                                <option value="improvement">Improvement</option>
                                <option value="question">Question</option>
                                <option value="feedback">General Feedback</option>
                                <option value="complaint">Complaint</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                        <Link to="/" className="btn btn-secondary ms-2">Cancel</Link>
                    </form>
                    {loading && <Loader />}
                </>
            ) : (
                <>
                    {/* <LoginForm /> */}
                </>
            )}
        </div>
    );
};

export default AddFeedback;
