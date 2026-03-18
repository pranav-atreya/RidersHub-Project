
import React, { useState } from 'react';
import Modal from 'react-modal';
import Login from './Login';
import Register from './Register';

export default function AuthModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('login'); 

  
  const modalStyle = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 1001,
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: '#0f1724',
      border: '1px solid #334155',
      borderRadius: '12px',
      padding: '30px',
      maxWidth: '450px',
      width: '90%',
      color: 'white',
    },
  };

  const tabButtonStyle = (isActive) => ({
    fontFamily: 'Orbitron, sans-serif',
    fontSize: '1.2rem',
    color: isActive ? '#f59e0b' : '#9ca3af',
    background: 'none',
    border: 'none',
    padding: '10px 15px',
    cursor: 'pointer',
    borderBottom: isActive ? '2px solid #f59e0b' : '2px solid transparent',
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyle}
      contentLabel="Auth Modal"
    >
      {/* Tabs */}
      <div style={{ display: 'flex', marginBottom: '25px' }}>
        <button 
          style={tabButtonStyle(activeTab === 'login')} 
          onClick={() => setActiveTab('login')}
        >
          Log In
        </button>
        <button 
          style={tabButtonStyle(activeTab === 'register')} 
          onClick={() => setActiveTab('register')}
        >
          Register
        </button>
      </div>

      {/* Form Content */}
      {activeTab === 'login' ? (
        <Login onModalClose={onClose} />
      ) : (
        <Register />
      )}
    </Modal>
  );
}