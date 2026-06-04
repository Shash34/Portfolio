// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBarNew.css';


function Navbar() {
  return (
    <div className="navbar-box">
      <nav className="navbar">
        <ul>
          <li><Link to = "/">Home</Link></li>
          <li><a href="/resume.pdf" target="_blank" rel="noreferrer">Resume</a></li>
          <li><Link to = "/projects">Projects</Link></li>
          <li><Link to = "/Certificates">Certificates</Link></li>
          <li> <Link to = "/Contact" >Contact</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;