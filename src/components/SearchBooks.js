// This module is for Searching books

import React, { useState } from 'react';
import './SearchBooks.css';

const SearchBooks = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('title');
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            setError('User is not authenticated. Please log in.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/books/search-books?searchtype=${searchType}&searchvalue=${searchTerm}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setBooks(data.books || []);
                setError('');
            } else {
                const errData = await response.json();
                setError(errData.message || 'Failed to fetch search results.');
                if (errData.msg === 'Token has expired') {
                    localStorage.removeItem('token');
                    window.location.href = '/'; 
                }
            }
        } catch (err) {
            setError('Error connecting to the server. Please try again later.');
        }
    };

    return (
        <div className="search-books">
            <h1>Search Books</h1>
            <form onSubmit={handleSearch} className="search-form">
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="search-select"
                >
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="genre">Genre</option>
                </select>
                <input
                    type="text"
                    placeholder={`Search by ${searchType}`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-button">Search</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {books.length > 0 && (
                <table className="results-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Condition</th>
                            <th>Availability</th>
                            <th>Owner</th>
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
                                <td>{book.username}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {books.length === 0 && !error && <p>No books found. Try a different search!</p>}
        </div>
    );
};

export default SearchBooks;
