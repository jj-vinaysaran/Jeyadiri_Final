import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import axios from 'axios';
import './Register.css'; // Import CSS file for styling
import url from '../../Config';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${url}/admin/register`, { username, password });
      alert('Admin registered successfully!');
      navigate("/events")
    } catch (error) {
      console.error('Error registering admin:', error);
      alert('Failed to register admin');
    }
  };

  return (
    <div className="admin-register-page">

    <div className="admin-register-container">
      <h1>{searchParams.get('name')}</h1>
      <h1 className="admin-register-heading">Admin Register</h1>
      <form onSubmit={handleSubmit} className="admin-register-form">
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="admin-register-input"  required/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="admin-register-input" required />
        <button type="submit" className="admin-register-button">Register</button>
      </form>
      <p className="admin-register-login-text">Already have an account? <Link to="/">Login</Link></p>
    </div>
    </div>  
  );
};

export default Register;
