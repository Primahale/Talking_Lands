import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={navStyle}>
      <Link to="/points" style={linkStyle}>Points</Link>
      <Link to="/polygons" style={linkStyle}>Polygons</Link>
    </nav>
  );
};

const navStyle = {
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: '#333',
  padding: '10px',
};

const linkStyle = {
  color: 'white',
  padding: '0 15px',
  textDecoration: 'none',
};

export default Navbar;
