import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import axios from 'axios';
import LoginForm from './LoginForm';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const DetailedFeedback = () => {
    const { id } = useParams();
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const navigate = useNavigate();
    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean']
        ],
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ];

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                fetchFeedback();
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                navigate('/')
            }
        };

        checkAuthentication();
    }, [id]);

    const fetchFeedback = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/feedbacks/${id}`);
            setFeedback(response.data.feedback);
            setComments(response.data.feedback.comments);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error fetching feedback:', error);
        }
    };

    const handleAddComment = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.post(`http://127.0.0.1:8000/api/v1/feedbacks/${id}/comments`, {
                content: newComment
            }, config);
            fetchFeedback();
            setNewComment('');
            setLoading(false);

        } catch (error) {
            setLoading(false);
            console.error('Error adding comment:', error);
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="container mt-5">
            {isAuthenticated ? (
                feedback && (
                    <>
                        <h2 className="mb-4"><i className="bi bi-arrow-left" onClick={handleGoBack}></i> Feedback Details</h2>
                        <div className="row">
                            <div className="col-md-8">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <h2 className="card-title">{feedback.title}</h2>
                                        <p className="card-text">{feedback.description}</p>
                                        <h5 className="card-subtitle mb-2 text-muted">Category: {feedback.category}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-8">
                                <h3>Comments</h3>
                                <div>
                                    {comments.map((comment) => (
                                        <div key={comment.id} className="mb-3">
                                            <div className="p-3 bg-light rounded">
                                                <p className="fw-bold mb-2">{comment.user.name}</p>
                                                <div dangerouslySetInnerHTML={{ __html: comment.content }} />
                                                <p className="text-muted">Added on: {new Date(comment.created_at).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <ReactQuill
                            value={newComment}
                            onChange={setNewComment}
                            modules={modules}
                            formats={formats}
                            placeholder="Add a comment"
                            className="mb-3"
                        />
                        <button onClick={handleAddComment} className="btn btn-primary">Add Comment</button>
                        {loading && <Loader />}
                    </>
                )
            ) : (
                <>
                    {/* {!isAuthenticated && <LoginForm />} */}
                </>
            )}
        </div>
    );
};

export default DetailedFeedback;
