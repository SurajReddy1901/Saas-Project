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
            await API.post('/auth/register', { email, password });
            toast.success('🎉 Registration successful! Logging you in...');

            // Step 2: Then login the user
            const loginRes = await API.post('/auth/login', { email, password });
            setToken(loginRes.data.token);
            setUserEmail(email);
            setAuth(true);
            toast.success("Login Successful")
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
