// This module is for login and signup
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Auth({ onLogin }) {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? 'http://localhost:5000/api/user/login' : 'http://localhost:5000/api/user/signup';

        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                
                if (isLogin) {
                    localStorage.setItem('token', data.access_token);
                    onLogin();
                    navigate('/home');
                } else {
                    alert('Signup successful! You can now log in.');
                    setIsLogin(true);
                }
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'An error occurred. Please try again.');
            }
        } catch (error) {
            setErrorMessage('Network error. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <div className="form-box">
                <h2>{isLogin ? 'Login' : 'Signup'}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            required
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
                </form>
                <p className="toggle-link">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Signup' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Auth;
