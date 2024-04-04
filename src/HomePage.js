import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import axios from 'axios';

const HomePage = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                navigate('/login');
            }
        };

        checkAuthentication();
    }, [navigate]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://127.0.0.1:8000/api/v1/feedbacks?page=${currentPage}`);
                setFeedbacks(response.data.feedbacks.data);
                setTotalPages(response.data.feedbacks.last_page);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching feedbacks:', error);
            }
        };

        fetchFeedbacks();
    }, [currentPage]);

    return (
        <div className="container">
            {isAuthenticated && (
                <>
                    <div className="container">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h1 className="mb-0">Feedbacks</h1>
                            <Link to="/add-feedback" className="btn btn-primary">Add Feedback</Link>
                        </div>
                        {feedbacks.map((feedback) => (
                            <div key={feedback.id} className="card mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">{feedback.title}</h5>
                                    <p className="card-text">{feedback.description}</p>
                                    <p className="card-text"><strong>Category:</strong> {feedback.category}</p>
                                    <Link to={`/feedback/${feedback.id}`} className="btn btn-primary">View Details</Link>
                                </div>
                            </div>
                        ))}
                    </div>


                    <nav aria-label="Feedbacks Pagination">
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                            </li>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                            </li>
                        </ul>
                    </nav>
                    {loading && <Loader />}
                </>
            )}
        </div>
    );
};

export default HomePage;
