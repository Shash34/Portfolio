import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import image1 from '../../images/image1.jpg';

export default function About() {
  return (
    <div className="v2-page">
      <section className="v2-section">
        <div className="v2-container">
          <p className="v2-section-label">About Me</p>
          <h2 className="v2-section-title">Who I am</h2>
          <div className="v2-divider" style={{ margin: '32px 0' }} />

          <div style={{ display: 'flex', gap: 64, alignItems: 'flex-start' }}>

            {/* Photo + socials */}
            <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
              <div style={{
                width: 200, height: 200, borderRadius: '50%',
                border: '3px solid var(--accent-mid)',
                overflow: 'hidden',
                boxShadow: '0 0 0 6px var(--accent-light)',
              }}>
                <img src={image1} alt="Shashank" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 18, textAlign: 'center', color: 'var(--text)' }}>Shashank Kesavamatham</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', marginTop: 4 }}>CSE · Ohio State</div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                {[
                  { icon: <FaLinkedin size={18} />, href: 'https://www.linkedin.com/in/shashankkes3' },
                  { icon: <FaGithub size={18} />,   href: 'https://github.com/Shash34' },
                  { icon: <FaInstagram size={18} />, href: 'https://www.instagram.com/shashankk10111?igsh=b2t0cHhrN3VjeTM4' },
                ].map(({ icon, href }, i) => (
                  <a key={i} href={href} target="_blank" rel="noreferrer" style={{
                    width: 38, height: 38, borderRadius: '50%',
                    border: '1.5px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-muted)', transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                {
                  heading: '👋 Background',
                  text: 'I am a Computer Science & Engineering student at The Ohio State University, expected to graduate in Summer 2027, with a strong interest in Cybersecurity and AI — particularly in cloud security and security operations.',
                },
                {
                  heading: '🔐 Cybersecurity',
                  text: 'My interest in cybersecurity developed through hands-on platforms such as TryHackMe and Hack The Box, where I gained experience thinking from an attacker\'s perspective and analyzing real-world security scenarios.',
                },
                {
                  heading: '🎯 Goals',
                  text: 'I am currently seeking internship opportunities for Summer 2027 and beyond, where I can continue building technical depth, contribute to impactful security work, and grow within the industry.',
                },
                {
                  heading: '🎵 Outside Tech',
                  text: 'Outside of tech, I enjoy working out and listening to indie and alternative R&B. Some of my favorite artists include Giveon and Bruno Mars.',
                },
              ].map(({ heading, text }) => (
                <div key={heading} className="v2-card" style={{ padding: '20px 24px' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, color: 'var(--text)' }}>{heading}</div>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{text}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
