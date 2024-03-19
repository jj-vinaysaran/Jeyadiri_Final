import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import url from '../../Config';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const eventname = queryParams.get('eventname');
    const queryParamValue = queryParams.get('who');
    const certificate = queryParams.get('certificate');
    
    if (queryParamValue === "Student" || queryParamValue === "Teacher" || queryParamValue === "Others") {
      navigate(`/${eventname}/${queryParamValue}`);
    }
    if(certificate=='true')
    {
      navigate(`/certificateLoging`);

    }
  }, [location.search, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${url}/admin/login`, { username, password });
      alert('Login successful!');
      navigate('/events');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Invalid credentials');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <h1 className="admin-login-heading">Admin Login</h1>
        <form onSubmit={handleSubmit} className="admin-login-form">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="admin-login-input" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="admin-login-input" />
          <button type="submit" className="admin-login-button">Login</button>
        </form>
        <p className="admin-login-register-text">Do not have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
