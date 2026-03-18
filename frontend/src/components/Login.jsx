
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function Login({ onModalClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { dispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    dispatch({ type: "LOGIN_START" }); 
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data }); 
      onModalClose(); 
    } catch (err) {
      const errMsg = err.response ? err.response.data : 'Login failed.';
      setError(errMsg);
      dispatch({ type: "LOGIN_FAILURE", payload: errMsg });
    }
  };


  const inputStyle = { width: '100%', padding: '12px', margin: '10px 0 20px 0', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: 'white', fontFamily: 'Poppins, sans-serif'};
  const buttonStyle = { width: '100%', padding: '12px', background: 'linear-gradient(90deg,#f59e0b,#fbbf24)', border: 'none', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins, sans-serif', color: '#07101a', fontWeight: 600, fontSize: '16px'};

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="login-username">Username</label>
        <input type="text" id="login-username" style={inputStyle} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="login-password">Password</label>
        <input type="password" id="login-password" style={inputStyle} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit" style={buttonStyle}>Log In</button>
      {error && <p style={{ color: '#ef4444', marginTop: '15px' }}>{error}</p>}
    </form>
  );
}