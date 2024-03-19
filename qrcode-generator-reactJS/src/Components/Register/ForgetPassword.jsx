import React, { useEffect, useState } from 'react';
import axios from 'axios';
import url from '../../Config';
import "./Register.css";
import "./Teacherform.css"
import { useNavigate } from 'react-router-dom';

function ForgetPassword() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${url}/alltablename`);
        setTables(result.data); 
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Basic input validation
      if (!phoneNumber && !email) {
        setError('Please provide either phone number or email.');
        return;
      }

      // Make API request to reset password
      const response = await axios.post(`${url}/auth/forgotPassword`, {
        phoneNumber,
        email,
        registeredEvent:selectedTable,
        newPassword:password
        // Additional data you may need to provide, such as registered event or new password
      });

      // Handle successful response
      setMessage(response.data.message);
      setError('');
      navigate("/certificateLoging")
    } catch (error) {
      // Handle error response
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('Internal Server Error');
      }
    }
  };

  return (
    <div className='container_form'>

      <h2>Forgot Password</h2>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
      <form onSubmit={handleSubmit} className="form-container">
          <label className="label">Phone Number:</label>
          <input  className="input-field" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          <label className="label">Email:</label>
          <input className="input-field"  type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label className="input-label">
        Select Table:
        <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)} className="input-field">
          <option value="">Select a table</option>
          {tables.map((table, index) => (
            <option key={index} value={table}>
              {table}
            </option>
          ))}
        </select>
          <label className="label">New Password:</label>
          <input  className="input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
        <button type="submit" className="button">Submit</button>
      </form>
          </div>
  );
}

export default ForgetPassword
