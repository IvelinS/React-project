const baseUrl = 'http://localhost:3030/jsonstore/catalog';

const initialBooks = [
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        description: "A novel set in the 1920s, 'The Great Gatsby' explores themes of wealth, love, and the American Dream...",
        coverUrl: "https://upload.wikimedia.org/wikipedia/en/e/e8/Game_of_Thrones_Season_1.jpg",
        rating: 4.5
    },
    {
        title: "1984",
        author: "George Orwell",
        description: "A dystopian novel set in a totalitarian regime...",
        coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1532714506i/40961427.jpg",
        rating: 4.8
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        description: "A powerful story of racial injustice and the loss of innocence in the American South...",
        coverUrl: "https://upload.wikimedia.org/wikipedia/en/e/e8/Game_of_Thrones_Season_1.jpg",
        rating: 4.7
    }
];

export const initializeBooks = async () => {
    try {
        const response = await fetch(baseUrl);
       
        if (response.status === 204) {
            console.log('No books found, initializing with default data...');
       
            for (const book of initialBooks) {
                await fetch(baseUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(book)
                });
            }
            console.log('Books initialized successfully');
            return true;
        }

        return false;
    } catch (error) {
        console.error('Error initializing books:', error);
        return false;
    }
};

export const getAllBooks = async () => {
    try {
        const response = await fetch(baseUrl);
        
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        
        const data = await response.json();
        return Object.values(data);
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

export const getBookById = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch book');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

const BASE_URL = 'http://localhost:3030';

export const createBook = async (bookData) => {
    try {
        const auth = localStorage.getItem('auth');
        const userData = auth ? JSON.parse(auth) : null;

        if (!userData || !userData.accessToken) {
            throw new Error('You must be authenticated to create a book');
        }

        const formattedData = {
            title: bookData.title,
            author: bookData.author,
            description: bookData.description,
            coverUrl: bookData.imageUrl,
            rating: parseFloat(bookData.rating),
            _ownerId: userData.userId
        };

        console.log('Formatted Data:', formattedData);

        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.accessToken
            },
            body: JSON.stringify(formattedData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to create book');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error creating book:', error);
        throw error;
    }
};

export const resetBooks = async () => {
    try {
        const response = await fetch(baseUrl);
        if (response.ok && response.status !== 204) {
            const books = await response.json();
            for (const id of Object.keys(books)) {
                await fetch(`${baseUrl}/${id}`, {
                    method: 'DELETE'
                });
            }
        }
        
        await initializeBooks();
        return true;
    } catch (error) {
        console.error('Error resetting books:', error);
        return false;
    }
};
export const initializeDefaultBooks = async () => {
    try {
        const existingBooks = await getAllBooks();
        if (existingBooks.length === 0) {
            for (const book of initialBooks) {
                const auth = localStorage.getItem('auth');
                const userData = auth ? JSON.parse(auth) : null;
                
                if (!userData?.accessToken) {
                    console.error('No authentication token found');
                    return;
                }

                await fetch(baseUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Authorization': userData.accessToken
                    },
                    body: JSON.stringify(book)
                });
            }
        }
    } catch (error) {
        console.error('Error initializing default books:', error);
    }
};

export const deleteBook = async (id) => {
    try {
        const auth = localStorage.getItem('auth');
        const userData = auth ? JSON.parse(auth) : null;

        if (!userData || !userData.accessToken) {
            throw new Error('You must be authenticated to delete a book');
        }

        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'DELETE',
            headers: {
                'X-Authorization': userData.accessToken
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to delete book');
        }
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
};



export const getUserBooks = async (userId) => {
    try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        
        const userBooks = Object.values(data).filter(book => book._ownerId === userId);
        return userBooks;
    } catch (error) {
        console.error('Error fetching user books:', error);
        throw error;
    }
};

export const updateBook = async (id, bookData) => {
    try {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData),
        });

        if (!response.ok) {
            throw new Error('Failed to update book');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating book:', error);
        throw error;
    }
};

