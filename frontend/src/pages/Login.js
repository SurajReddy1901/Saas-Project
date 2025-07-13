import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import API from '../api';
import { setToken, setUserEmail } from '../auth';
import { toast } from 'react-toastify';
const Login = ({ setAuth }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', { email, password });
            setToken(res.data.token);
            setUserEmail(email);
            setAuth(true); // 🔥 key part
            toast.success(res.data.msg)
        } catch (err) {
            toast.error(err?.response?.data?.msg || 'Login failed');
        }
    };


    return (
        <>
            <AuthForm email={email} password={password} setEmail={setEmail} setPassword={setPassword} onSubmit={handleSubmit} label="Login" />
            <p className="link">Don't have an account? <Link to="/register">Register</Link></p>
        </>
    );
};

export default Login;
