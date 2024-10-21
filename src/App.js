import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SustainabilitySection from './components/SustainabilitySection';
import ImageList from './components/ImageList';
import UpdateImage from './components/UpdateImage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <Navbar onNavigate={handlePageChange} />
      {currentPage === 'home' && (
        <>
          <HeroSection />
          <SustainabilitySection />
        </>
      )}
      {currentPage === 'images' && <ImageList />}
      {currentPage === 'update' && <UpdateImage />}
    </div>
  );
}

export default App;
