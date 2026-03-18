import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserStatus from './components/UserStatus';
import AuthModal from './components/AuthModal';

import Home from './pages/Home';
import Community from './pages/Community';
import Events from './pages/Events'; 
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
import Wiki from './pages/Wiki';

export default function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div style={{ minHeight: "100vh" }}> 
      <Navbar onJoinClick={openModal} /> 
      
      <main style={{ marginTop: 72 }}> 
        <Routes>
          <Route path="/" element={<Home onJoinClick={openModal} />} />
          <Route path="/community" element={<Community />} />
          <Route path="/wiki" element={<Wiki />} />
          <Route path="/events" element={<Events />} />
          {/*  */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
      
      <Footer />
      <UserStatus />
      <AuthModal isOpen={modalIsOpen} onClose={closeModal} />
    </div>
  );
}