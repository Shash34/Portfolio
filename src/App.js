import React, { useState, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './AppNew.css';
import {
  FaChevronRight,
  FaChevronLeft,
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from 'react-icons/fa';
import image1 from './images/image1.jpg';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Projects from './projects';
import Navbar from './NavBar';
import Certificates from './Certificates';
import Contact from './Contact';
import PostCardFront from './images/postcardfront.png';
import PostCardBack from './images/postcardback.png';
import Classified from './images/classifiedtransparent.png';
import Background from './BackgroundNew';
import SkillsDisplay from './SkillsOption5';
import HackingPlatforms from './HackingPlatforms';
import Education from './Education';




function WorkCard({ title, company, date, emoji, zoomStyle, description }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const transformValue = `${isZoomed ? zoomStyle : ''} ${isFlipped ? 'rotateY(180deg)' : ''}`.trim();


  return (
    <div className="card" style={{ transform: transformValue, zIndex: isZoomed ? 10 : 1 }}>
      {isFlipped ? (
        <div className="card-back">
          <h4>{title}</h4>
          <p style={{ whiteSpace: 'pre-line' }}>{description}</p>
          <div className="buttonContainer">
            <button className="flipButton" onClick={() => setIsFlipped(!isFlipped)}>Flip</button>
            <button className="zoomButton" onClick={() => setIsZoomed(!isZoomed)}>Zoom</button>
          </div>
        </div>
      ) : (
        <div className="card-front">
          <h4 className="card-title">{title}</h4>
          <p className="card-company">{company}</p>
          <p className="card-date">{date}</p>
          <h5>{emoji}</h5>
          <div className="buttonContainer">
            <button className="flipButton" onClick={() => setIsFlipped(!isFlipped)}>Flip</button>
            <button className="zoomButton" onClick={() => setIsZoomed(!isZoomed)}>Zoom</button>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const flipBookRef = useRef();

  const handleFlip = (e) => {
    setCurrentPage(e.data);
  };

  const [isDeclassified, setIsDeclassified] = useState(false);
  const [isZoom, setIsZoom] = useState(false);


  return (
    <Router>
            <Background /> {/* Background behind everything */}
      <Routes>
        <Route path="/projects" element={<Projects />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path = "/Contact" element={<Contact />} />


        <Route
          path="/"
          element={
            <>
              <Navbar />

              <div className="hero-section">
                <h1 className="hero-name">Shashank Kesavamatham</h1>
                <p className="hero-tagline">CS & Engineering · Ohio State University · Cybersecurity & AI</p>
              </div>

              <div
                className="book-wrapper"
                style={{
                  transform: currentPage === 0 ? 'translateX(-150px)' : 'translateX(0) scale(1.6)',
                  transition: 'transform 0.8s ease'
                }}
              >
                <HTMLFlipBook
                  ref={flipBookRef}
                  width={300}
                  height={400}
                  showCover={true}
                  flippingTime={1000}
                  useMouseEvents={false}
                  startPage={0}
                  className="book"
                  onFlip={handleFlip}
                >
                  <div className="page-cover" onClick={() => flipBookRef.current.pageFlip().flipNext()}>
                    <div className="cover-frame">

                      <div className="cover-deco-row">
                        <span className="cover-deco-line" />
                        <span className="cover-deco-gem">◆</span>
                        <span className="cover-deco-line" />
                      </div>

                      <div className="cover-title-section">
                        <p className="cover-eyebrow">Welcome To My</p>
                        <h1 className="cover-title">Digital<br />Book</h1>
                      </div>

                      <div className="cover-mid-divider">
                        <span className="cover-deco-line" />
                        <span className="cover-deco-star">✦</span>
                        <span className="cover-deco-line" />
                      </div>

                      <div className="cover-author-section">
                        <h2 className="cover-name">Shashank Kesavamatham</h2>
                        <div className="cover-tags">
                          <span className="cover-tag">Cybersecurity</span>
                          <span className="cover-tag-dot">•</span>
                          <span className="cover-tag">AI</span>
                        </div>
                      </div>

                      <p className="cover-click">Click to see my journey →</p>

                      <div className="cover-deco-row">
                        <span className="cover-deco-line" />
                        <span className="cover-deco-gem">◆</span>
                        <span className="cover-deco-line" />
                      </div>

                    </div>
                  </div>

                  <div className="page about-me">
                    <div className="page-inner">
                      <h2>About Me</h2>
                      <img src={image1} className="image1" alt="About Me" />
                      <h3>Shashank Kesavamatham</h3>
                      <h4>Student @ The Ohio State University</h4>
                      <div className="logos">
                        <FaLinkedin className="logo-icon" />
                        <FaGithub className="logo-icon" />
                        <FaInstagram className="logo-icon" />
                      </div>
                      <p>
                        I am a Computer Science & Engineering student at The Ohio State University, expected to graduate in Spring 2027,
                        with a strong interest in Cybersecurity and AI, particularly in red teaming, cloud security, and security operations.
                      </p>
                      <p>
                        My interest in cybersecurity developed through hands-on platforms such as TryHackMe and Hack The Box,
                        where I gained experience thinking from an attacker's perspective and analyzing real-world security scenarios.
                      </p>
                      <p>
                        I am currently seeking new graduate or full-time opportunities for Summer 2027 and beyond, where I can continue
                        building technical depth, contribute to impactful security work, and grow within the industry.
                      </p>
                      <p>
                        Outside of tech, I enjoy working out and listening to indie and alternative R&B. Some of my favorite artists include
                        CAS, Giveon, and Bruno Mars.
                      </p>
                    </div>
                    <FaChevronLeft className="arrow-icon-left" onClick={() => flipBookRef.current.pageFlip().flipPrev()} />
                  </div>

                  <div className="page">
                    <div className="page-inner">
                      <h2>Education</h2>
                      <Education />
                    </div>
                    <FaChevronRight className="arrow-icon-right" onClick={() => flipBookRef.current.pageFlip().flipNext()} />
                  </div>

                  <div className="page work-experience">
                    <div className="page-inner">
                      <h2>Work Experience</h2>
                      <div className="card-grid">
                        <WorkCard
                          title="Viceroy Envoy Cybersecurity Intern"
                          company="Griffiss Institute"
                          date="August 2025 - current"
                          emoji="🧑‍🏫📚🖥️"
                          description={`
                            • Helped students grasp core CS concepts and debug code

                            • Led weekly office hours and lab sessions

                            • Graded assignments and provided constructive feedback

                            • Supported learning in data structures and algorithms
                          `}
                          zoomStyle="scale(2) translateX(50px) translateY(20px)"
                        />
                        <WorkCard
                          title="Cybersecurity Intern"
                          company="Triangle Cyber"
                          date="August 2025 - Date"
                          emoji="🔐💻🛡️"
                          zoomStyle="scale(2) translateY(20px)"
                        />
                        <WorkCard
                          title="Crew Member"
                          company="Cinemark"
                          date="August 2025 - Date"
                          emoji="🎬🍿🎟️"
                          zoomStyle="scale(2) translateX(-50px) translateY(20px)"
                          description={`
                            • Provided customer service at box office, concessions, and ticket scanning

                            • Maintained cleanliness and safety standards across all theater areas

                            • Assisted guests with questions and resolved issues in a fast-paced environment

                            • Operated point-of-sale systems and handled transactions accurately
                          `}
                        />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <a
                          href="/resume.pdf"
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            fontSize: '7px', fontWeight: '700', padding: '5px 18px',
                            borderRadius: '20px', border: '1px solid #7c3aed',
                            color: '#7c3aed', background: 'transparent',
                            textDecoration: 'none', letterSpacing: '0.06em',
                            textTransform: 'uppercase', cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={e => { e.target.style.background = '#7c3aed'; e.target.style.color = '#fff'; }}
                          onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#7c3aed'; }}
                        >
                          Learn More
                        </a>
                      </div>
                    </div>
                    <FaChevronLeft className="arrow-icon-left" onClick={() => flipBookRef.current.pageFlip().flipPrev()} />
                    <FaChevronRight className="arrow-icon-right" onClick={() => flipBookRef.current.pageFlip().flipNext()} />
                  </div>

                  <div className="page">
                    <div className="page-inner">
                      <h2>Skills</h2>
                      <SkillsDisplay />
                    </div>
                    <FaChevronLeft className="arrow-icon-left" onClick={() => flipBookRef.current.pageFlip().flipPrev()} />
                    <FaChevronRight className="arrow-icon-right" onClick={() => flipBookRef.current.pageFlip().flipNext()} />
                  </div>

                  <div className="page">
                    <div className="page-inner">
                      <h2>Current Project</h2>
                      <div className="current-project">
                      <h5>Cloud SOC + Attack Simulation Platform</h5>
                      <h6>Description:</h6>
                      <p>Developing a cloud-based cybersecurity lab environment focused on security monitoring, attack simulation, and incident detection using AWS infrastructure and SOC workflows.</p>

                      <p>Purpose is to gain hands-on experience with cloud security operations, threat detection, and defensive security analysis through realistic attack and monitoring scenarios.</p>

                      <h6>Technologies:</h6>
                        <ul>
                          <li>AWS</li>
                          <li>Linux</li>
                          <li>Python</li>
                          <li>SIEM / Log Analysis Tools</li>
                          <li>Networking & Security Monitoring Tools</li>
                        </ul>
                         </div>
                    </div>
                    <FaChevronRight className="arrow-icon-right" onClick={() => flipBookRef.current.pageFlip().flipNext()} />
                  </div>
                 










                  <div className="page">
                    <div className="page-inner">
                      <h2>Hacking Platforms</h2>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', width: '100%' }}>
                        <div style={{ width: '100%' }}>
                          <HackingPlatforms />
                        </div>
                      </div>
                    </div>
                    <FaChevronLeft className="arrow-icon-left" onClick={() => flipBookRef.current.pageFlip().flipPrev()} />
                  </div>




                </HTMLFlipBook>
              </div>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
