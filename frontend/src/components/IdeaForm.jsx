
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export default function IdeaForm() {
  const { user } = useContext(AuthContext);
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.post(
        'http://localhost:5000/api/ideas',
        { text: text },
        { headers: { token: `Bearer ${user.token}` } }
      );
      setSuccess('Thanks for your idea! The admin will review it.');
      setText('');
    } catch (err) {
      const errMsg = err.response ? err.response.data : 'Submission failed.';
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <p style={{ color: '#9ca3af', textAlign: 'center', marginTop: '40px' }}>You must be logged in to submit an idea.</p>;
  }

  const formStyle = { background: '#0f1724', borderRadius: '12px', padding: '25px', marginTop: '40px' };
  const buttonStyle = { padding: '10px 20px', background: 'linear-gradient(90deg,#f59e0b,#fbbf24)', border: 'none', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins, sans-serif', color: '#07101a', fontWeight: 600, fontSize: '15px'};
  const textareaStyle = { width: '100%', padding: '12px', margin: '10px 0 20px 0', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: 'white', fontFamily: 'Poppins, sans-serif', resize: 'vertical', minHeight: '100px' };

  return (
    <div style={formStyle}>
      <h3 style={{ color: 'white', fontFamily: 'Orbitron, sans-serif', marginBottom: '20px' }}>
        Got an Idea for a Future Ride?
      </h3>
      <p style={{ color: '#9ca3af', marginBottom: '20px', fontSize: '0.9rem' }}>Share it with the admins! This is not visible to other users.</p>
      <form onSubmit={handleSubmit}>
        <textarea
          style={textareaStyle}
          placeholder="Share your idea for a future event..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type="submit" style={buttonStyle} disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit Idea'}
        </button>
        {error && <p style={{ color: '#ef4444', marginTop: '15px' }}>{error}</p>}
        {success && <p style={{ color: '#22c55e', marginTop: '15px' }}>{success}</p>}
      </form>
    </div>
  );
}