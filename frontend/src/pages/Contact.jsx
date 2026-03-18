import React from 'react';

function Contact() {
  const socials = [
    {
      platform: "Email",
      value: "atreya.390@gmail.com",
      icon: "📧",
      link: "https://mail.google.com/mail/?view=cm&fs=1&to=atreya.390@gmail.com",
    },
    {
      platform: "Instagram",
      value: "@atreya.390",
      icon: "📸",
      link: "https://www.instagram.com/atreya.390",
    },
  ];

  return (
    <section
      style={{
        position: "relative",
        padding: "100px 24px",
        color: "white",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <img
        src="https://cdn.bajajauto.com/-/media/ktm/pro-experience/tours/ladakh-completed-2022-gallery/7.png"
        alt="biker background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.25,
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(3,4,10,0.95) 90%)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            color: "#fbbf24",
            fontFamily: "Orbitron, sans-serif",
            marginBottom: 20,
          }}
        >
          Get in Touch
        </h2>
        <p
          style={{
            color: "#d1d5db",
            fontFamily: "Poppins, sans-serif",
            marginBottom: 40,
          }}
        >
          Have questions, event ideas, or want to collaborate? We’d love to hear
          from you.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 28,
          }}
        >
          {socials.map((s) => (
            <a
              key={s.platform}
              href={s.link}
              target="_blank"
              rel="noreferrer"
              style={{
                background: "rgba(255,255,255,0.06)",
                borderRadius: 12,
                padding: "20px 30px",
                textDecoration: "none",
                color: "white",
                width: 260,
                transition: "transform 0.25s, background 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              }}
            >
              <div style={{ fontSize: 30 }}>{s.icon}</div>
              <h3
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  margin: "8px 0 4px",
                  color: "#f76b1aff",
                }}
              >
                {s.platform}
              </h3>
              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  color: "#cbd5e1",
                  fontSize: 14,
                }}
              >
                {s.value}
              </p>
            </a>
          ))}
        </div>

        <div style={{ marginTop: 60 }}>
          <img
            src="https://cdn.bajajauto.com/-/media/images/ktm/ktm-pro-xp/webp-new/ladakh_adventure_tour.webp"
            alt="riders group"
            style={{
              width: "100%",
              maxWidth: 700,
              borderRadius: 16,
              boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default Contact;