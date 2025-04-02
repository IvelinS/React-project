import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
    return (
        <div className="book-card">
            <div className="book-cover">
                <img 
                    src={book.coverUrl || book.imageUrl}
                    alt={book.title}
                    className="book-image"
                    onError={(e) => {
                        e.target.src = 'https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/gotposterbig.png';
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