// This module is for adding books
import React, { useState } from 'react';
import './AddBook.css';

function AddBook() {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        condition: '',
        location: '',
        availability: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            setMessage('You are not authenticated. Please log in.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMessage('Book added successfully!');
                setFormData({
                    title: '',
                    author: '',
                    genre: '',
                    condition: '',
                    availability: '',
                    location: '',
                });
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Failed to add the book.');
                if (errorData.msg === 'Token has expired') {
                    localStorage.removeItem('token');
                    window.location.href = '/'; 
                }
            }
        } catch (error) {
            setMessage('Error connecting to the server. Please try again later.');
        }
    };

    return (
        <div className="add-book-container">
            <h2>Add a Book</h2>
            <form onSubmit={handleSubmit} className="add-book-form">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="genre"
                    placeholder="Genre"
                    value={formData.genre}
                    onChange={handleChange}
                    required
                />
                <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>
                    Condition
                    </option>
                    <option value="new">New</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>

                </select>
               
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />
                <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>
                    availability
                    </option>
                    <option value="lend">Lend</option>
                    <option value="exchange">Exchange</option>
                    <option value="NotAvailable">Not Available</option>

                </select>
                <button type="submit">Add Book</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default AddBook;
