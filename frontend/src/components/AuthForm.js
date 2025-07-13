// components/AuthForm.jsx
import React from 'react';

const AuthForm = ({ email, password, setEmail, setPassword, onSubmit, label }) => {
    return (
        <form className="auth-form" onSubmit={onSubmit}>
            <h2>{label}</h2>
            <div className="auth-group">
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="auth-group">
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <button type="submit" className="auth-button">{label}</button>
        </form>
    );
};

export default AuthForm;
