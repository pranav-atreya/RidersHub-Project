import React, { useState, useEffect, useContext } from 'react'; 
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; 

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useContext(AuthContext); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get('http://localhost:5000/api/posts');
        setPosts(res.data); 
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError("Failed to load the feed. Try refreshing.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []); 

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        data: { userId: user._id } 
      });

      setPosts(posts.filter((p) => p._id !== postId));

    } catch (err) {
      const errMsg = err.response ? err.response.data : "Delete failed";
      console.error("Delete failed:", errMsg);
      alert("Error: " + errMsg); 
    }
  };

  if (loading) {
    return <div style={{ padding: '100px', textAlign: 'center' }}><h2>Loading feed...</h2></div>;
  }
  if (error) {
    return <div style={{ padding: '100px', textAlign: 'center', color: '#ef4444' }}><h2>{error}</h2></div>;
  }

  return (
    <section
      style={{
        padding: "120px 24px 80px",
        background: "#070816",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h2
          style={{
            color: "#fbbf24",
            fontFamily: "Orbitron, sans-serif",
            marginBottom: 10,
          }}
        >
          Community Feed
        </h2>

        {/* If there are no posts, show a message */}
        {posts.length === 0 ? (
          <p style={{ color: "#cbd5e1", fontFamily: "Poppins, sans-serif" }}>
            The feed is empty. Be the first to post!
          </p>
        ) : (
          <p style={{ color: "#cbd5e1", fontFamily: "Poppins, sans-serif", marginBottom: 28 }}>
            Stories and snapshots from fellow riders.
          </p>
        )}

        {/* We now map over the 'posts' from our state */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            alignItems: 'center', 
          }}
        >
          {posts.map((p) => (
            <article
              key={p._id} 
              style={{
                background: "#0f1724",
                borderRadius: 12,
                padding: 16,
                width: '100%', 
                maxWidth: '700px',
                boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
                position: 'relative', 
              }}
            >
              <img
                
                src={p.img || 'https://via.placeholder.com/800x450.png?text=No+Image'} 
                alt={p.title}
                style={{
                  width: "100%",
                  height: 300,
                  objectFit: "cover",
                  borderRadius: 8,
                  display: "block",
                  marginBottom: 12,
                }}
              />
              <h3
                style={{
                  color: "#f16c13ff",
                  fontFamily: "Orbitron, sans-serif",
                  margin: "8px 0",
                }}
              >
                {p.title}
              </h3>
              <p
                style={{ color: "#cbd5e1", fontFamily: "Poppins, sans-serif", marginBottom: '10px' }}
              >
                {p.desc}
              </p>
              <small style={{ color: '#9ca3af' }}>
                Posted by: {p.username} on {new Date(p.createdAt).toLocaleDateString()}
              </small>

              {/* 6. CONDITIONAL DELETE BUTTON */}
              {/* Show button ONLY if a user is logged in AND their ID matches the post's author ID */}
              {user && user._id === p.userId && (
                <button 
                  onClick={() => handleDelete(p._id)}
                  style={{
                    position: 'absolute',
                    top: '25px', 
                    right: '25px', 
                    background: '#ef4444', 
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%', 
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    lineHeight: '30px',
                    textAlign: 'center'
                  }}
                  onMouseOver={(e) => e.target.style.background = '#dc2626'} 
                  onMouseOut={(e) => e.target.style.background = '#ef4444'}
                >
                  X
                </button>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}