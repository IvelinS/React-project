import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById, createBook } from '../../services/bookService';
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
    const navigate = useNavigate();
    const { auth } = useAuth();

    useEffect(() => {
        const fetchBook = async () => {
            const book = await getBookById(id);
            setBookData(book);
        };

        fetchBook();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createBook({ ...bookData, _ownerId: auth.userId });
            navigate(`/books/${id}`); 
        } catch (err) {
            setError('Failed to update book. Please try again.');
        }
    };

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