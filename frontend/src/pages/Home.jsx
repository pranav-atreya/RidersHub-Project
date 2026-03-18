import React, { useContext } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../context/AuthContext'; 

function Home({ onJoinClick }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); 

  const handleJoinClick = () => {
    if (user) {
      navigate('/community');
    } else {
      onJoinClick();
    }
  };

  return (
    <>
      <style>
      {`
        @keyframes pulse {
          0% { text-shadow: 0 0 10px rgba(255,111,0,0.6); }
          50% { text-shadow: 0 0 25px rgba(255,111,0,1); }
          100% { text-shadow: 0 0 10px rgba(255,111,0,0.6); }
        }
        @keyframes bgZoom {
          from { transform: scale(1); }
          to { transform: scale(1.05); }
        }
      `}
      </style>

     <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 20px 60px",
          color: "#FF6F00",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Background Image */}
        <img
          src="https://cdn.bajajauto.com/-/media/ktm/pro-experience/listing/street-ride/spotlight/d/street-1.jpg"
          alt="background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -2,
            animation: "bgZoom 10s ease-in-out infinite alternate",
          }}
        />
        {/* Dark Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.7))",
            zIndex: -1,
          }}
        />

        {/* Content */}
        <div style={{ zIndex: 2, maxWidth: 900 }}>
          <h2
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "2.4rem",
              margin: "0 0 12px",
            }}
          >
            Welcome to Riders' Hub
          </h2>
          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              color: "#fff59bff",
              lineHeight: 1.6,
            }}
          >
            Connect with passionate bikers, share thrilling rides, and explore new
            roads together. Whether it's a superbike or a street machine, this is
            your community.
          </p>
          <button
            style={{
              marginTop: 20,
              background: "linear-gradient(90deg,#f59e0b,#fbbf24)",
              border: "none",
              padding: "10px 20px",
              fontSize: 15,
              borderRadius: 8,
              cursor: "pointer",
              fontFamily: "Poppins, sans-serif",
              color: "#07101a",
              fontWeight: 600,
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = 0.95)}
            onMouseOut={(e) => (e.currentTarget.style.opacity = 1)}
            onClick={handleJoinClick} 
          >
            Join the Ride 🏍
          </button>
        </div>
      </section>
    </>
  );
}

export default Home;