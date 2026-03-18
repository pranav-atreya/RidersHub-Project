import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 

function Navbar({ onJoinClick }) { 
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate('/');
  };

 
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Community", path: "/community" },
    { label: "Wiki", path: "/wiki" }, 
    { label: "Events", path: "/events" },
    { label: "Contact", path: "/contact" },
  ];

  
  const linkStyle = {
    margin: "0 10px",
    background: "none",
    border: "none",
    color: "white", 
    cursor: "pointer",
    fontFamily: "Poppins, sans-serif",
    fontSize: 15,
    textDecoration: 'none',
    padding: '5px' 
  };
  const activeLinkStyle = {
    ...linkStyle,
    color: '#f59e0b',
    borderBottom: '2px solid #f59e0b'
  };
  const buttonLinkStyle = {
    ...linkStyle,
  };
  
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 32px",
        background: "rgba(0, 0, 0, 1)", 
        backdropFilter: "blur(6px)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo Link */}
      <h1 style={{ fontFamily: "Orbitron, sans-serif", color: "#f59e0b", margin: 0 }}>
        <Link to="/" style={{ textDecoration: 'none', color: "#f59e0b" }}>
            Riders’ Hub
        </Link>
      </h1>

      {/* Navigation Links */}
      <div>
        {/* Render common links */}
        {navItems.map((item) => (
          <Link 
            key={item.label} 
            to={item.path} 
            style={currentPath === item.path ? activeLinkStyle : linkStyle}
            onMouseOver={(e) => (e.target.style.color = "#fbbf24")}
            onMouseOut={(e) => (e.target.style.color = currentPath === item.path ? '#f59e0b' : 'white')}
          >
            {item.label}
          </Link>
        ))}

        {/* CONDITIONAL RENDERING: */}
        {user ? (
          
          <>
            <Link 
              to="/create-post" 
              style={currentPath === '/create-post' ? activeLinkStyle : linkStyle}
              onMouseOver={(e) => (e.target.style.color = "#fbbf24")}
              onMouseOut={(e) => (e.target.style.color = currentPath === '/create-post' ? '#f59e0b' : 'white')}
            >
              Create Post
            </Link>
            <Link 
              to="/profile" 
              style={currentPath === '/profile' ? activeLinkStyle : linkStyle}
              onMouseOver={(e) => (e.target.style.color = "#fbbf24")}
              onMouseOut={(e) => (e.target.style.color = currentPath === '/profile' ? '#f59e0b' : 'white')}
            >
              Profile
            </Link>
            <button 
              onClick={handleLogout} 
              style={buttonLinkStyle}
              onMouseOver={(e) => (e.target.style.color = "#fbbf24")}
              onMouseOut={(e) => (e.target.style.color = "white")}
            >
              Logout
            </button>
          </>
        ) : (
          
          <button 
            onClick={onJoinClick} 
            style={buttonLinkStyle}
            onMouseOver={(e) => (e.target.style.color = "#fbbf24")}
            onMouseOut={(e) => (e.target.style.color = "white")}
          >
            Join
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;