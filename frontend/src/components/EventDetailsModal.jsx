
import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { eventsData } from '../pages/Events'; 

export default function EventDetailsModal({ isOpen, onClose, eventId }) {
  const event = eventsData.find((e) => e.id === eventId);
  const { user, dispatch } = useContext(AuthContext); 

  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

 
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/events/${eventId}/registrations`);
        setRegisteredUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (isOpen && eventId) {
      
      setError(null);
      setSuccess(null);
      setIsLoading(false);
      
      if (user) {
        setIsRegistered(user.registeredEvents.includes(eventId));
      } else {
        setIsRegistered(false);
      }
      
      fetchRegistrations();
    }
  }, [isOpen, eventId, user]); 

  const handleRegister = async () => {
    if (!user) {
      setError("Please log in to register.");
      return; 
    }
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await axios.post(
        `http://localhost:5000/api/events/${eventId}/register`,
        { userId: user._id } 
      );
      setIsRegistered(true);
      setSuccess("You're all set!");
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.user });

      if (!registeredUsers.includes(user.username)) {
        setRegisteredUsers([...registeredUsers, user.username]);
      }
    } catch (err) {
      setError(err.response ? err.response.data : 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!event) return null;

  const modalStyle = {
    overlay: { backgroundColor: 'rgba(0, 0, 0, 0.85)', zIndex: 1002 },
    content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', transform: 'translate(-50%, -50%)', background: '#0f1724', border: '1px solid #334155', borderRadius: '12px', padding: '30px', maxWidth: '600px', width: '90%', color: 'white', maxHeight: '90vh', overflowY: 'auto' },
  };
  const buttonStyle = { padding: '10px 20px', background: 'linear-gradient(90deg,#f59e0b,#fbbf24)', border: 'none', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Poppins, sans-serif', color: '#07101a', fontWeight: 600, fontSize: '15px', width: '100%', marginTop: '20px'};
  const registeredButtonStyle = { ...buttonStyle, background: '#374151', color: '#9ca3af', cursor: 'default'};

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyle}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <h2 style={{ fontFamily: 'Orbitron, sans-serif', color: '#f59e0b', marginBottom: '15px', lineHeight: 1.3 }}>{event.title}</h2>
          <button onClick={onClose} style={{background: 'none', border: 'none', color: '#9ca3af', fontSize: '1.5rem', cursor: 'pointer', padding: 0}}>×</button>
      </div>

      <img src={event.img} alt={event.title} style={{ width: '100%', borderRadius: '8px', marginBottom: '20px', maxHeight: '300px', objectFit: 'cover' }} />

      <div style={{marginBottom: '15px', color: '#9ca3af'}}><span>📅 {event.date}</span></div>

      <p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>{event.description}</p>

      {/* Register Button */}
      {!user ? (
        <p style={{ color: '#ef4444', marginTop: '20px', textAlign: 'center' }}>Please log in to register for this ride.</p>
      ) : isRegistered ? (
        <button style={registeredButtonStyle} disabled>✅ Registered</button>
      ) : (
        <button onClick={handleRegister} style={buttonStyle} disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register Now'}
        </button>
      )}

      {error && <p style={{ color: '#ef4444', marginTop: '10px' }}>{error}</p>}
      {success && <p style={{ color: '#22c55e', marginTop: '10px' }}>{success}</p>}

      {/* Attendee List */}
      <hr style={{ border: '1px solid #1e293b', margin: '30px 0' }} />
      <h3 style={{ fontFamily: 'Orbitron, sans-serif', color: '#fbbf24', marginBottom: '15px', fontSize: '1.1rem' }}>Registered Riders ({registeredUsers.length})</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {registeredUsers.length > 0 ? registeredUsers.map((u, i) => (
            <span key={i} style={{ background: '#1e293b', padding: '5px 10px', borderRadius: '15px', fontSize: '0.9rem', color: '#cbd5e1' }}>{u}</span>
        )) : <p style={{color: '#64748b'}}>Be the first to join!</p>}
      </div>
    </Modal>
  );
}