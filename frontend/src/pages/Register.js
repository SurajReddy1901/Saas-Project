import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import API from '../api';
import { setToken, setUserEmail } from '../auth';
import { toast } from 'react-toastify';

const Register = ({ setAuth }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/register', { email, password });
            toast.success("Registration successful! Please log in.");
            navigate('/');
        } catch (err) {
            toast.error(err?.response?.data?.msg || 'Registration failed');
        }
    };


    return (
        <>
            <AuthForm email={email} password={password} setEmail={setEmail} setPassword={setPassword} onSubmit={handleSubmit} label="Register" />
            <p className="link">Already have an account? <Link to="/">Login</Link></p>
        </>
    );
};

export default Register;
