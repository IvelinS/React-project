const baseUrl = 'http://localhost:3030/jsonstore/comments'; 

export const getComments = async (bookId) => {
    try {
        const response = await fetch(`${baseUrl}?bookId=${bookId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        return Object.values(data); 
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};

export const addComment = async (bookId, commentText) => {
    try {
        const auth = localStorage.getItem('auth');
        const userData = auth ? JSON.parse(auth) : null;

        if (!userData || !userData.accessToken) {
            throw new Error('You must be authenticated to add a comment');
        }

        console.log('User ID:', userData.userId); 

        const comment = {
            bookId,
            text: commentText,
            userId: userData.userId, 
        };

        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.accessToken,
            },
            body: JSON.stringify(comment),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to add comment');
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
}; 