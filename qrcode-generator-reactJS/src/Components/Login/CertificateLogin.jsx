import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import "./certificate.css"
import url from '../../Config';

function CertificateLogin() {
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [id, setid] = useState('');
  const [newname, setNewname] = useState("");
  const [askNewName, setAskNewName] = useState(false); // State to manage whether to ask for a new name
  const navigate = useNavigate();
  const [who,setwho]=useState("");
  const [icnumber,seticnumber]=useState("");
  const [fullname,,setfullname]=useState("");
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

  const handleLogin = async () => {
    try {
      if (!selectedTable || !phonenumber || !password) {
        setError('Please provide all required fields.');
        return;
      }
  
      const idResponse = await axios.post(`${url}/findeventid`, {
        "choosentablename": selectedTable
      });
  
      const eventId = idResponse.data.id;
  
      if (!eventId) {
        setError('Failed to retrieve event ID.');
        return;
      }
  
      const loginResponse = await axios.post(`${url}/auth/login`, {
        tablename: `${selectedTable}Attendance`,
        phonenumber,
        password,
      });
  
      if (loginResponse.status === 200) {
        localStorage.setItem('userToken', loginResponse.data.token);
        localStorage.setItem('userId', loginResponse.data.user.id);
        localStorage.setItem('eventId', eventId);
        setwho(loginResponse.data.user.whoami);
        // setfullname(loginResponse.data.user.fullName);
        seticnumber(loginResponse.data.user.icNumber)
        // Ask the user whether to use account username or enter a new name
        const shouldUseAccountName = window.confirm(`Do you want to take your certificate with the name "${loginResponse.data.user.fullName}"?`);
        if (!shouldUseAccountName) {
          setAskNewName(true); // Set the state to ask for a new name
        } else {
          if (loginResponse.data.user.whoami === 'others') {
            navigate(`/createcertificate/${loginResponse.data.user.fullName}/${eventId}/others/${loginResponse.data.user.icNumber}`);
          } else if (loginResponse.data.user.whoami === 'student' || loginResponse.data.user.whoami === 'teacher') {
            navigate(`/createcertificate/${loginResponse.data.user.fullName}/${eventId}/${loginResponse.data.user.icNumber}`);
          }
        }
      } else {
        setError('Login failed');
      }
    } catch (error) {
      setError(`${error.response.data.error}`);
      // setError(`${error}`);
    }
  };
  
  const handleNewNameSubmit = () => {
    // Navigate to the certificate download page with the new name
    if (newname.trim() !== "") {
      if(who==='others')
      {
        navigate(`/createcertificate/${newname}/${localStorage.getItem('eventId')}/others/${icnumber}`);
      }
      else{
        
        navigate(`/createcertificate/${newname}/${localStorage.getItem('eventId')}/${icnumber}`);
      }
    }
  };

  return (
    <div className="admin-login-page">
      <div className="certificate-login-container">
        <h2 className="certificate-login-heading">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form>
          <label className="input-label">
            Phone Number:
            <input type="text" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} className="input-field" />
          </label>
          <label className="input-label">
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" />
          </label>
          <label className="input-label">
            Select Table:
            <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)} className="input-field">
              <option value="">Select your registered event</option>
              {tables.map((table, index) => (
                <option key={index} value={table}>{table}</option>
              ))}
            </select>
          </label>
          <button type="button" onClick={handleLogin} className="login-button">Login</button>
          <div onClick={() => navigate('/certificateLoging/forget')} style={{textAlign: "center", padding: "10px"}}>Forget password?</div>
        </form>
        {askNewName && (
          <div>
            <label className="input-label">
              New Name:
              <input type="text" value={newname} onChange={(e) => setNewname(e.target.value)} className="input-field" />
            </label>
            <button type="button" onClick={handleNewNameSubmit} className="login-button">Submit New Name</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CertificateLogin;
