import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Authentication/AuthContext';
import { getUserBooks, deleteBook } from '../../services/bookService';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const { auth, logout } = useAuth();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedBook, setSelectedBook] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                console.log('Fetching books for user ID:', auth.userId);
                const userBooks = await getUserBooks(auth.userId);
                console.log('Fetched books:', userBooks);
                setBooks(userBooks);
            } catch (err) {
                setError('Failed to load books. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (auth.userId) {
            fetchBooks();
        }
    }, [auth.userId]);

    const handleBookClick = (book) => {
        setSelectedBook(book);
    };

    const handleDelete = async (bookId) => {
        try {
            await deleteBook(bookId);
            setBooks(books.filter(book => book._id !== bookId));
            setSelectedBook(null);
        } catch (error) {
            console.error('Error deleting book:', error);
            setError('Failed to delete book. Please try again.');
        }
    };

    const handleEdit = (book) => {
        navigate(`/edit/${book._id}`);
    };

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            <p><strong>Email:</strong> {auth.email}</p>
            <p><strong>User ID:</strong> {auth.userId}</p>
            <button onClick={logout}>Logout</button>

            <h3>Your Books</h3>
            {loading && <p>Loading books...</p>}
            {error && <p className="error">{error}</p>}
            {books.length === 0 && !loading && <p>No books found.</p>}
            <ul>
                {books.map((book) => (
                    <li key={book._id} onClick={() => handleBookClick(book)} style={{ cursor: 'pointer' }}>
                        <h4>{book.title}</h4>
                        <p><strong>Author:</strong> {book.author}</p>
                        <p><strong>Description:</strong> {book.description}</p>
                        <img src={book.coverUrl} alt={book.title} style={{ width: '100px' }} />
                        <p><strong>Rating:</strong> {book.rating}</p>
                    </li>
                ))}
            </ul>

            {selectedBook && (
                <div>
                    <h4>Selected Book: {selectedBook.title}</h4>
                    <button onClick={() => handleDelete(selectedBook._id)}>Delete</button>
                    <button onClick={() => handleEdit(selectedBook)}>Edit</button>
                </div>
            )}
        </div>
    );
};

export default ProfilePage; 