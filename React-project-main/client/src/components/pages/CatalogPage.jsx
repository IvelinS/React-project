import { useState, useEffect } from 'react';
import { getAllBooks } from '../../services/bookService';
import BookCard from '../BookCard';

const CatalogPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAllBooks();
            setBooks(data);
        } catch (err) {
            console.error('Error fetching books:', err);
            setError('Failed to load books. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading books...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="catalog-container">
            {books.length === 0 ? (
                <p>No books available. Be the first to add one!</p>
            ) : (
                <div className="books-grid">
                    {books.map(book => (
                        <BookCard key={book._id} book={book} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CatalogPage; 