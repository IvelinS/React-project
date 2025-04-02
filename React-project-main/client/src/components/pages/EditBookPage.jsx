import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById, updateBook } from '../../services/bookService';
import { useAuth } from '../../Authentication/AuthContext';

const EditBookPage = () => {
    const { id } = useParams();
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        description: '',
        coverUrl: '',
        rating: 0
    });
    const [error, setError] = useState('');
    const { auth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const book = await getBookById(id);
                
            
                if (book._ownerId !== auth.userId) {
                    navigate('/catalog');
                    return;
                }
                
                setBookData(book);
            } catch (err) {
                setError('Failed to fetch book details.');
                navigate('/catalog');
            }
        };

        fetchBook();
    }, [id, auth.userId, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Double check ownership before update
            if (bookData._ownerId !== auth.userId) {
                setError('You do not have permission to edit this book.');
                return;
            }
            
            await updateBook(id, bookData);
            navigate(`/profile`);
        } catch (err) {
            setError('Failed to update book. Please try again.');
        }
    };

    if (!auth?.accessToken) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
            <h2>Edit Book</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" value={bookData.title} onChange={handleChange} required />
                </div>
                <div>
                    <label>Author:</label>
                    <input type="text" name="author" value={bookData.author} onChange={handleChange} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea name="description" value={bookData.description} onChange={handleChange} required />
                </div>
                <div>
                    <label>Cover URL:</label>
                    <input type="url" name="coverUrl" value={bookData.coverUrl} onChange={handleChange} required />
                </div>
                <div>
                    <label>Rating:</label>
                    <input type="number" name="rating" value={bookData.rating} onChange={handleChange} min="0" max="5" step="0.1" required />
                </div>
                <button type="submit">Update Book</button>
            </form>
        </div>
    );
};

export default EditBookPage; 