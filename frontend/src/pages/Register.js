import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import API from '../api';
import { setToken, setUserEmail } from '../auth';
import { toast } from 'react-toastify';

const Register = ({ setAuth }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', { email, password });
            setToken(res.data.token);
            toast.success(res.data.msg)
            setUserEmail(email);
            setAuth(true);
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
