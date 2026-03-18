import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState(''); 
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const newPost = {
      title,
      desc,
      img,
      username: user.username, 
      userId: user._id,
    };

    try {
      await axios.post('http://localhost:5000/api/posts', newPost);
      navigate('/community'); 

    } catch (err) {
      const errMsg = err.response ? err.response.data : 'Something went wrong.';
      console.error('Post creation failed:', errMsg);
      setError(errMsg);
    }
  };

  const formStyle = { maxWidth: '600px', margin: '100px auto', padding: '30px', background: '#0f1724', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.6)'};
  const inputStyle = { width: '100%', padding: '12px', margin: '10px 0 20px 0', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: 'white', fontFamily: 'Poppins, sans-serif'};
  const buttonStyle = { width: '100%', padding: '12px', background: 'linear-gradient(90deg,#f59e0b,#fbbf24)', border: 'none', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins, sans-serif', color: '#07101a', fontWeight: 600, fontSize: '16px'};

  return (
    <div style={formStyle}>
      <h2 style={{ fontFamily: 'Orbitron, sans-serif', color: '#fc621bff', marginBottom: '25px' }}>
        Create a New Post
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" style={inputStyle}
            onChange={(e) => setTitle(e.target.value)} value={title} required 
          />
        </div>
        <div>
          <label htmlFor="desc">Description</label>
          <textarea id="desc" style={{...inputStyle, height: '120px', resize: 'vertical'}}
            onChange={(e) => setDesc(e.target.value)} value={desc} required 
          />
        </div>
        <div>
          <label htmlFor="img">Image URL (Optional)</label>
          <input type="text" id="img" style={inputStyle}
            onChange={(e) => setImg(e.target.value)} value={img} 
            placeholder="e.g., https://i.imgur.com/my-bike.jpg"
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Post to Feed
        </button>
        {error && <p style={{ color: '#ef4444', marginTop: '15px' }}>{error}</p>}
      </form>
    </div>
  );
}