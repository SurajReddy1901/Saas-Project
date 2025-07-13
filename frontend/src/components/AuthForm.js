import React from 'react';

const AuthForm = ({ email, password, setEmail, setPassword, onSubmit, label }) => (
    <form onSubmit={onSubmit} className="auth-form">
        <h2>{label}</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">{label}</button>
    </form>
);

export default AuthForm;
