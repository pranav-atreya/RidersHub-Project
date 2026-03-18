
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { pastEventsData } from '../pages/Events'; 

export default function PastRideDetailsModal({ isOpen, onClose, eventId }) {
  const event = pastEventsData.find((e) => e.id === eventId);
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    if (isOpen && eventId) {
        const fetchAttendees = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/events/${eventId}/registrations`);
                setAttendees(res.data);
            } catch (err) { console.error(err); }
        };
        fetchAttendees();
    }
  }, [isOpen, eventId]);

  if (!event) return null;

  const modalStyle = {
    overlay: { backgroundColor: 'rgba(0, 0, 0, 0.85)', zIndex: 1002 },
    content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', transform: 'translate(-50%, -50%)', background: '#0f1724', border: '1px solid #334155', borderRadius: '12px', padding: '30px', maxWidth: '600px', width: '90%', color: 'white', maxHeight: '90vh', overflowY: 'auto' },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyle}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
            <h2 style={{ fontFamily: 'Orbitron, sans-serif', color: '#f59e0b', marginBottom: '15px', lineHeight: 1.3 }}>{event.title}</h2>
            <button onClick={onClose} style={{background: 'none', border: 'none', color: '#9ca3af', fontSize: '1.5rem', cursor: 'pointer', padding: 0}}>×</button>
      </div>

      <img src={event.img} alt={event.title} style={{ width: '100%', borderRadius: '8px', marginBottom: '20px', maxHeight: '300px', objectFit: 'cover' }} />

      <div style={{marginBottom: '15px', color: '#9ca3af'}}><span>📅 Completed on: {event.date}</span></div>
      <p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>{event.description}</p>

      <hr style={{ border: '1px solid #1e293b', margin: '30px 0' }} />

      <h3 style={{ fontFamily: 'Orbitron, sans-serif', color: '#fbbf24', marginBottom: '15px', fontSize: '1.1rem' }}>Riders who Attended</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {attendees.length > 0 ? attendees.map((u, i) => (
            <span key={i} style={{ background: '#1e293b', padding: '5px 10px', borderRadius: '15px', fontSize: '0.9rem', color: '#cbd5e1' }}>{u}</span>
        )) : <p style={{color: '#64748b'}}>No attendee data found.</p>}
      </div>
    </Modal>
  );
}