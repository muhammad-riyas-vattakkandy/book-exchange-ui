import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const signup = (data) => api.post('/signup', data);
export const login = (data) => api.post('/login', data);
export const addBook = (data, token) => api.post('/books', data, {
    headers: { Authorization: `Bearer ${token}` },
});
export const searchBooks = (query) => api.get(`/books/search?${query}`);
