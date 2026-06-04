import './projects.css';
import Navbar from './NavBar'
import { useState } from 'react'



{/* Top should be a search bar */}

function Projects() {

    const [searchTerm, setSearchTerm] = useState('');

    return (
      <>
      <Navbar />

      <div className = "title">
          <h1>Projects Dashboard</h1>
      </div>


      <div className = "search-container">
        <input // Knows to create search bar
          type = "text"
          placeholder = "Search projects:"
          value = {searchTerm}
          onChange = {(e) => setSearchTerm(e.target.value)}
        />
      </div>


      <div className = "project-grid">

        <div className="project-card">
          <div className="project-card-content">
            <div className="project-card-tags">
              <span className="project-card-tag">AI</span>
              <span className="project-card-tag">Web App</span>
              <span className="project-card-tag">Education</span>
            </div>
            <h3 className="project-card-title">Verdict</h3>
            <p className="project-card-desc">
              A college admissions prediction tool that simulates how real admissions committees evaluate applications across 150+ US colleges.
            </p>
            <a href="https://verdict-lake.vercel.app/" target="_blank" rel="noreferrer" className="project-card-btn">
              Live Demo →
            </a>
          </div>
        </div>

        <div className="project-card">Project 2</div>
        <div className="project-card">Project 3</div>

      </div>

      </>
    );
  }

  export default Projects;
