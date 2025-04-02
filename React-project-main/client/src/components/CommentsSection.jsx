import React, { useEffect, useState } from 'react';
import { getComments, addComment } from '../services/commentService';

const CommentsSection = ({ bookId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const fetchedComments = await getComments(bookId);
                setComments(fetchedComments);
            } catch (err) {
                setError('Failed to load comments. Please try again later.');
            }
        };

        fetchComments();
    }, [bookId]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            await addComment(bookId, newComment);
            setNewComment('');
            const updatedComments = await getComments(bookId);
            setComments(updatedComments);
        } catch (err) {
            setError('Failed to add comment. Please try again.');
        }
    };

    return (
        <div>
            <h3>Comments</h3>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleCommentSubmit}>
                <textarea value={newComment} onChange={handleCommentChange} required />
                <button type="submit">Add Comment</button>
            </form>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>{comment.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default CommentsSection; 