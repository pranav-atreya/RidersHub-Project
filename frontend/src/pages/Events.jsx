import React, { useState } from 'react';

import IdeaForm from '../components/IdeaForm';
import EventDetailsModal from '../components/EventDetailsModal';
import PastRideDetailsModal from '../components/PastRideDetailsModal';


export const eventsData = [
  {
    id: 'ranthambore-ride',
    title: "Ranthambore Power Ride",
    date: "Nov 10",
    img: "https://www.ktmindia.com/-/media/ktm/pro-experience/home-page/spotlights/webp/3-desk.webp",
    description: "An adrenaline-fueled ride through the forests of Ranthambore. Join the pack and conquer the wild roads."
  },
  {
    id: 'gir-power-ride',
    title: "Gir Power Ride",
    date: "Nov 17",
    img: "https://www.ktmindia.com/-/media/ktm/pro-experience/home-page/spotlights/webp/1-desk.webp",
    description: "Explore the outskirts of Gir National Park. This ride combines thrilling tarmac with stunning landscapes."
  },
  {
    id: 'maintenance-workshop',
    title: "Bike Maintenance Workshop",
    date: "Nov 25",
    img: "https://cdn.bajajauto.com/-/media/images/ktm/ktm-pro-xp/webp-new/faq_img_1.webp",
    description: "Learn from the pros. This workshop covers everything from basic chain maintenance to pre-ride safety checks."
  },
];


export const pastEventsData = [
  {
    id: 'nandi-hills-run-oct-24',
    title: "Nandi Hills Sunrise Run",
    date: "Oct 15, 2024",
    img: "https://cdn.bajajauto.com/-/media/ktm/pro-experience/home-page/upcoming/pro-getaway-2025/progetaways.webp",
    description: "A classic sunrise run to Nandi Hills. We conquered the twisties and caught the dawn."
  },
  {
    id: 'coorg-overnighter-sep-24',
    title: "Coorg Overnighter",
    date: "Sep 20-21, 2024",
    img: "https://cdn.bajajauto.com/-/media/ktm/pro-experience/pro-getaways/expert/desktop/img-2.jpg",
    description: "An epic 2-day ride through the coffee estates of Coorg. Great roads, great company."
  }
];


function Events() {
  
  const [selectedEventId, setSelectedEventId] = useState(null); 
  const [selectedPastId, setSelectedPastId] = useState(null); 

  return (
    <section
      style={{
        padding: "100px 24px 80px",
        background: "linear-gradient(180deg,#041021,#071026)",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        
        {/* --- 3. UPCOMING EVENTS SECTION --- */}
        <h2
          style={{
            color: "#f76816ff",
            fontFamily: "Orbitron, sans-serif",
            marginBottom: 16,
            borderBottom: '2px solid #334155',
            paddingBottom: '10px'
          }}
        >
          Upcoming Events
        </h2>
        <p
          style={{
            color: "#cbd5e1",
            fontFamily: "Poppins, sans-serif",
            marginBottom: 32,
          }}
        >
          Exciting rides and meetups for our community. Click to register!
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            justifyContent: "center",
          }}
        >
          {eventsData.map((e) => (
           
            <article
              key={e.id}
              onClick={() => setSelectedEventId(e.id)} 
              style={{
                background: "#0f1724",
                borderRadius: 12,
                width: 320,
                boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
                transition: "transform 0.25s, box-shadow 0.25s",
                overflow: "hidden",
                height: '100%',
                cursor: 'pointer',
              }}
              onMouseEnter={(ev) => {
                ev.currentTarget.style.transform = "translateY(-6px)";
                ev.currentTarget.style.boxShadow = "0 12px 34px rgba(0,0,0,0.65)";
              }}
              onMouseLeave={(ev) => {
                ev.currentTarget.style.transform = "translateY(0)";
                ev.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.6)";
              }}
            >
              <img src={e.img} alt={e.title} style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }} />
              <div style={{ padding: 16 }}>
                <h3 style={{ fontFamily: "Orbitron, sans-serif", color: "#f7731bff", marginBottom: 6 }}>
                  {e.title}
                </h3>
                <p style={{ fontFamily: "Poppins, sans-serif", color: "#cbd5e1", margin: 0 }}>
                  {e.date}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* --- 4. PAST RIDES SECTION --- */}
        <h2
          style={{
            color: "#f76816ff",
            fontFamily: "Orbitron, sans-serif",
            marginTop: 80,
            marginBottom: 16,
            borderBottom: '2px solid #334155',
            paddingBottom: '10px'
          }}
        >
          Past Rides & Archives
        </h2>
        <p
          style={{
            color: "#cbd5e1",
            fontFamily: "Poppins, sans-serif",
            marginBottom: 32,
          }}
        >
          Relive the memories from our past adventures.
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            justifyContent: "center",
          }}
        >
          {pastEventsData.map((e) => (
            <article
              key={e.id}
              onClick={() => setSelectedPastId(e.id)} 
              style={{
                background: "#0f1724",
                borderRadius: 12,
                width: 320,
                boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
                transition: "transform 0.25s, box-shadow 0.25s",
                overflow: "hidden",
                height: '100%',
                cursor: 'pointer',
              }}
              onMouseEnter={(ev) => {
                ev.currentTarget.style.transform = "translateY(-6px)";
                ev.currentTarget.style.boxShadow = "0 12px 34px rgba(0,0,0,0.65)";
              }}
              onMouseLeave={(ev) => {
                ev.currentTarget.style.transform = "translateY(0)";
                ev.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.6)";
              }}
            >
              <img src={e.img} alt={e.title} style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }} />
              <div style={{ padding: 16 }}>
                <h3 style={{ fontFamily: "Orbitron, sans-serif", color: "#f7731bff", marginBottom: 6 }}>
                  {e.title}
                </h3>
                <p style={{ fontFamily: "Poppins, sans-serif", color: "#cbd5e1", margin: 0 }}>
                  {e.date}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* --- 5. IDEA BOX SECTION --- */}
        <div style={{ maxWidth: '700px', margin: '80px auto 0 auto' }}>
          <IdeaForm />
        </div>

        {/* --- 6. MODALS (Invisible until triggered) --- */}
        <EventDetailsModal 
            isOpen={!!selectedEventId} 
            eventId={selectedEventId} 
            onClose={() => setSelectedEventId(null)} 
        />
        <PastRideDetailsModal 
            isOpen={!!selectedPastId} 
            eventId={selectedPastId} 
            onClose={() => setSelectedPastId(null)} 
        />

      </div>
    </section>
  );
}

export default Events;