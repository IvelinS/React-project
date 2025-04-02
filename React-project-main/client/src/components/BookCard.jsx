import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
    console.log('Book data:', book);

    return (
        <div className="book-card">
            <div className="book-cover">
                <img 
                    src={book.coverUrl || book.imageUrl}
                    alt={book.title}
                    className="book-image"
                    onError={(e) => {
                        console.error('Image failed to load:', book.coverUrl || book.imageUrl);
                        e.target.src = 'https://neonflexmood.com/cdn/shop/files/Game_Over7_1024x1024.png?v=1712936328';
                        e.target.onerror = null;
                    }}
                />
            </div>
            <div className="book-info">
                <h3>{book.title}</h3>
                <p className="author">by {book.author}</p>
                <div className="rating">
                    <span>★</span> {book.rating}/5
                </div>
                <p className="description">
                    {book.description && book.description.length > 100
                        ? `${book.description.substring(0, 100)}...`
                        : book.description}
                </p>
                <Link 
                    to={`/books/${book._id}`}
                    className="details-button"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default BookCard; 