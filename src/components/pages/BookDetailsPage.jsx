import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBookById, deleteBook } from '../../services/bookService';
import { useAuth } from '../../Authentication/AuthContext';
import CommentsSection from '../CommentsSection';

const BookDetailsPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { auth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const fetchedBook = await getBookById(id);
                setBook(fetchedBook);
            } catch (err) {
                console.error('Error fetching book details:', err);
                setError('Failed to load book details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await deleteBook(id);
                navigate('/catalog');
            } catch (err) {
                console.error('Error deleting book:', err);
                setError('Failed to delete book. Please try again.');
            }
        }
    };

    if (loading) {
        return <div>Loading book details...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="book-details-container">
            <h2>{book.title}</h2>
            <h3>by {book.author}</h3>
            <div className="book-cover">
                <img src={book.coverUrl} alt={book.title} />
            </div>
            <p><strong>Description:</strong> {book.description}</p>
            <p><strong>Rating:</strong> {book.rating}/5</p>
            {auth.userId === book._ownerId && (
                <>
                    <Link to={`/edit/${book._id}`} className="edit-button">Edit</Link>
                    <button onClick={handleDelete} className="delete-button">Delete</button>
                </>
            )}
            <Link to="/catalog" className="back-button">Back to Catalog</Link>
            <CommentsSection bookId={book._id} />
        </div>
    );
};

export default BookDetailsPage; 