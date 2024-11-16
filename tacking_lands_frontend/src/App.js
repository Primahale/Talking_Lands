import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PointsPage from './pages/PointPage';
import PolygonsPage from './pages/PolygonsPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/points" element={<PointsPage />} />
        <Route path="/polygons" element={<PolygonsPage />} />
        <Route path="/" element={<PointsPage />} /> 
      </Routes>
    </Router>
  );
};

export default App;
