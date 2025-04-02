import React, { useState, useEffect } from 'react';
import { createBook } from '../services/bookService';
import './CreateBook.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Authentication/AuthContext';

function CreateBook() {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    description: '',
    imageUrl: '',
    rating: 0
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    if (!auth?.accessToken) {
      navigate('/login');
    }
  }, [auth, navigate]);

  if (!auth?.accessToken) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!bookData.title || !bookData.author || !bookData.description || !bookData.imageUrl) {
        throw new Error('All fields are required');
      }

      const rating = parseFloat(bookData.rating);
      if (isNaN(rating) || rating < 0 || rating > 5) {
        throw new Error('Rating must be between 0 and 5');
      }

      await createBook(bookData);
      navigate('/catalog', { replace: true });
    } catch (error) {
      console.error('Error creating book:', error);
      setError(error.message || 'Failed to create book');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="create-book-container">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit} className="create-book-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={bookData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={bookData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating (0-5):</label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="0"
            max="5"
            step="0.1"
            value={bookData.rating}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>Add Book</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default CreateBook;
