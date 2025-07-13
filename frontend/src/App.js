import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardPage from './pages/DashboardPage';
import { isLoggedIn } from './auth';

function App() {
  const [auth, setAuth] = useState(isLoggedIn());

  // Update state on token changes
  useEffect(() => {
    const interval = setInterval(() => {
      setAuth(isLoggedIn());
    }, 500); // small delay to catch localStorage changes

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={true}
      />

      <Router>
        <Routes>
          <Route path="/" element={!auth ? <Login setAuth={setAuth} /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!auth ? <Register setAuth={setAuth} /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={auth ? <DashboardPage /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
