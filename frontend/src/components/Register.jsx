
import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bike, setBike] = useState('');


  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError(null);
    setSuccess(null);

   
    const newUser = {
      username,
      email,
      password,
      bike: bike || 'My Trusty Steed', 
    };

    try {
      
      await axios.post(
        'http://localhost:5000/api/auth/register',
        newUser
      );
      
      
      setSuccess('Registration successful! Please switch to the "Log In" tab.');
      setUsername('');
      setEmail('');
      setPassword('');
      setBike('');

    } catch (err) {
      
      const errMsg = err.response ? err.response.data : 'Something went wrong.';
      setError(errMsg);
    }
  };

 
  const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '10px 0 20px 0',
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '6px',
    color: 'white',
    fontFamily: 'Poppins, sans-serif',
  };
  const buttonStyle = {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(90deg,#f59e0b,#fbbf24)',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
    color: '#07101a',
    fontWeight: 600,
    fontSize: '16px',
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="reg-username">Username</label>
        <input
          type="text"
          id="reg-username"
          style={inputStyle}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="reg-email">Email</label>
        <input
          type="email"
          id="reg-email"
          style={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="reg-password">Password</label>
        <input
          type="password"
          id="reg-password"
          style={inputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="reg-bike">What do you ride? (Optional)</label>
        <input
          type="text"
          id="reg-bike"
          style={inputStyle}
          value={bike}
          onChange={(e) => setBike(e.target.value)}
        />
      </div>
      <button type="submit" style={buttonStyle}>
        Create Account
      </button>

      {/* Feedback Messages */}
      {error && (
        <p style={{ color: '#ef4444', marginTop: '15px' }}>{error}</p>
      )}
      {success && (
        <p style={{ color: '#22c55e', marginTop: '15px' }}>{success}</p>
      )}
    </form>
  );
}