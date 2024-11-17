// This module is for listing books on the home page

import React, { useState, useEffect } from 'react';
import './Home.css';


const Home = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');
    const [editingBookId, setEditingBookId] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('User is not authenticated. Please log in.');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/books', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setBooks(data.books || []); 
                } else {
                    const errData = await response.json();
                    setError(errData.message || 'Failed to fetch books.');
                    if (errData.msg === 'Token has expired') {
                        localStorage.removeItem('token');
                        window.location.href = '/'; 
                    }
                }
            } catch (err) {
                
                setError('Error connecting to the server. Please try again later.');
            }
        };

        fetchBooks();
    }, []);

    const handleEditClick = (bookId) => {
        setEditingBookId(bookId);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Book Exchange Platform</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!error && books.length > 0 && (
                <table border="1" style={{ width: '100%', textAlign: 'left' }}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Condition</th>
                            <th>Availability</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.genre}</td>
                                <td>{book.item_condition}</td>
                                <td>{book.availability}</td>
                                <td>
                                    <button onClick={() => handleEditClick(book.id)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {!error && books.length === 0 && <p>No books available. Add some books to get started!</p>}
        </div>
    );
};

export default Home;
