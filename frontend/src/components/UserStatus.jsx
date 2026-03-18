
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function UserStatus() {
  const { user } = useContext(AuthContext);

  const style = {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    background: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(5px)',
    color: user ? '#22c55e' : '#9ca3af',
    padding: '5px 10px',
    borderRadius: '6px',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '0.8rem',
    zIndex: 999,
  };

  return (
    <div style={style}>
      {user ? `Logged in as: ${user.username}` : 'Status: Logged Out'}
    </div>
  );
}