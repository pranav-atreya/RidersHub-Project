import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Profile() {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();


  const [editMode, setEditMode] = useState(false);
  
  const [bike, setBike] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [bikePic, setBikePic] = useState('');

 
  useEffect(() => {
    if (user) {
      setBike(user.bike || '');
      setProfilePic(user.profilePic || '');
      setBikePic(user.bikePic || '');
    }
  }, [user]); 

  if (!user) {
    return <Navigate to="/" />;
  }

  // --- API CALLS ---

  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" }); 

    const updatedInfo = {
      bike,
      profilePic,
      bikePic,
    };

    try {
      // --- SECURE UPDATE API CALL ---
      const res = await axios.put(
        `http://localhost:5000/api/users/${user._id}`,
        updatedInfo,
        {
          headers: { token: `Bearer ${user.token}` }, 
        }
      );

      
      dispatch({ type: "LOGIN_SUCCESS", payload: { ...res.data, token: user.token } });
      setEditMode(false);
    } catch (err) {
      console.error(err.response.data);
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("ARE YOU SURE? This will delete your account AND all your posts permanently.")) {
      return;
    }

    try {
      // --- SECURE DELETE API CALL ---
      await axios.delete(
        `http://localhost:5000/api/users/${user._id}`,
        {
          headers: { token: `Bearer ${user.token}` }, 
        }
      );
      
      dispatch({ type: "LOGOUT" });
      navigate('/');

    } catch (err) {
      console.error(err.response.data);
      alert("Error: " + err.response.data);
    }
  };

  // --- STYLING ---
  const profileBox = { maxWidth: '900px', margin: '100px auto', padding: '40px', background: '#0f1724', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.6)'};
  const profileContainer = { display: 'flex', gap: '40px', flexWrap: 'wrap' };
  const leftColumn = { flex: 1, minWidth: '250px' };
  const rightColumn = { flex: 2, minWidth: '300px' };
  const profileImage = { width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', background: '#1e293b', border: '2px solid #334155' };
  const bikeImage = { width: '100%', height: '250px', borderRadius: '8px', objectFit: 'cover', background: '#1e293b', border: '2px solid #334155' };
  const inputStyle = { width: '100%', padding: '12px', margin: '5px 0 15px 0', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: 'white', fontFamily: 'Poppins, sans-serif'};
  const buttonStyle = { padding: '10px 20px', background: 'linear-gradient(90deg,#f59e0b,#fbbf24)', border: 'none', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins, sans-serif', color: '#07101a', fontWeight: 600, fontSize: '15px'};
  const secondaryButtonStyle = { ...buttonStyle, background: '#334155', color: '#cbd5e1', marginLeft: '10px' };
  const deleteButtonStyle = { ...buttonStyle, background: '#ef4444', color: 'white', marginTop: '30px' };

  const placeholderBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9ca3af',
    fontSize: '0.9rem',
    fontFamily: 'Poppins, sans-serif'
  };

  // --- RENDER FUNCTION ---
  return (
    <div style={profileBox}>
      {/* --- HEADER --- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '20px', marginBottom: '30px' }}>
        <h1 style={{ fontFamily: 'Orbitron, sans-serif', color: '#f0600cff', margin: 0 }}>
          {editMode ? "Edit Your Profile" : "Your Profile"}
        </h1>
        {!editMode && (
          <button style={buttonStyle} onClick={() => setEditMode(true)}>
            Edit Profile
          </button>
        )}
      </div>

      {/* --- CONDITIONAL CONTENT (VIEW OR EDIT) --- */}
      {editMode ? (
        // --- EDIT MODE ---
        <form onSubmit={handleUpdate}>
          <label htmlFor="profilePic">Profile Picture URL</label>
          <input type="text" id="profilePic" style={inputStyle} value={profilePic} onChange={(e) => setProfilePic(e.target.value)} placeholder="https://i.imgur.com/your-face.jpg" />
          
          <label htmlFor="bikePic">Bike Picture URL</label>
          <input type="text" id="bikePic" style={inputStyle} value={bikePic} onChange={(e) => setBikePic(e.target.value)} placeholder="https://i.imgur.com/your-bike.jpg" />

          <label htmlFor="bike">Your Ride</label>
          <input type="text" id="bike" style={inputStyle} value={bike} onChange={(e) => setBike(e.target.value)} />

          <button type="submit" style={buttonStyle}>Save Changes</button>
          <button type="button" style={secondaryButtonStyle} onClick={() => setEditMode(false)}>Cancel</button>
        </form>
      ) : (
        // --- VIEW MODE ---
        <div style={profileContainer}>
          {/* Left Column */}
          <div style={leftColumn}>
            {/* 
              We now check if user.profilePic exists.
              If yes, show the <img>.
              If no, show a styled <div> placeholder.
            */}
            {user.profilePic ? (
              <img 
                src={user.profilePic} 
                alt="Profile" 
                style={profileImage} 
              />
            ) : (
              <div style={{...profileImage, ...placeholderBoxStyle}}>
                No Profile Pic
              </div>
            )}
            
            <h2 style={{ color: 'white', marginTop: '20px', fontFamily: 'Orbitron, sans-serif' }}>{user.username}</h2>
            <p style={{ color: '#cbd5e1', fontSize: '1rem', margin: '5px 0' }}>{user.email}</p>
            <p style={{ color: '#9ca3af', fontSize: '0.8rem', wordBreak: 'break-all' }}>User ID: {user._id}</p>
          </div>
          {/* Right Column */}
          <div style={rightColumn}>
            <h3 style={{ color: 'white', fontFamily: 'Orbitron, sans-serif' }}>Your Bike</h3>
            {/* 
              Same logic as above for the bike picture.
            */}
            {user.bikePic ? (
              <img 
                src={user.bikePic} 
                alt="Bike" 
                style={bikeImage} 
              />
            ) : (
              <div style={{...bikeImage, ...placeholderBoxStyle}}>
                No Bike Pic
              </div>
            )}

            <p style={{ color: '#cbd5e1', fontSize: '1.2rem', marginTop: '15px' }}>
              {user.bike}
            </p>
          </div>
        </div>
      )}

      {/* --- DELETE ACCOUNT SECTION (Always shows) --- */}
      <hr style={{ border: '1px solid #1e293b', margin: '40px 0' }} />
      <div>
        <h3 style={{ fontFamily: 'Orbitron, sans-serif', color: '#ef4444' }}>Danger Zone</h3>
        <p style={{ color: '#9ca3af', margin: '10px 0' }}>Deleting your account is permanent and will remove all your posts.</p>
        <button style={deleteButtonStyle} onClick={handleDelete}>
          Delete Account
        </button>
      </div>
    </div>
  );
}