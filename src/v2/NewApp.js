import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../v2/styles/global.css';

import Navbar        from './components/Navbar';
import Home          from './pages/Home';
import About         from './pages/About';
import ExperiencePage from './pages/ExperiencePage';
import SkillsPage    from './pages/SkillsPage';
import EducationPage from './pages/EducationPage';
import ProjectsPage      from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ContactPage      from './pages/ContactPage';
import CertificatesPage from './pages/CertificatesPage';

export default function NewApp() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/"           element={<Home />}           />
        <Route path="/about"      element={<About />}          />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/skills"     element={<SkillsPage />}     />
        <Route path="/education"  element={<EducationPage />}  />
        <Route path="/projects"        element={<ProjectsPage />}      />
        <Route path="/projects/:slug"  element={<ProjectDetailPage />} />
<Route path="/certificates" element={<CertificatesPage />} />
        <Route path="/contact"      element={<ContactPage />}     />
      </Routes>
    </Router>
  );
}
