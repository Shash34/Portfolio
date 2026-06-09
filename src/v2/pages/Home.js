import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

function Starburst() {
  const size = 420;
  const center = size / 2;
  const innerR = size * 0.11;
  const outerR = size * 0.47;
  const count = 28;
  const lines = [];
  for (let i = 0; i < count; i++) {
    const angle = (i * 360 / count) * (Math.PI / 180);
    lines.push({
      x1: center + innerR * Math.cos(angle), y1: center + innerR * Math.sin(angle),
      x2: center + outerR * Math.cos(angle), y2: center + outerR * Math.sin(angle),
    });
  }
  return (
    <svg width={size} height={size} style={{ opacity: 0.12, pointerEvents: 'none' }}>
      <circle cx={center} cy={center} r={innerR} fill="none" stroke="#0D9488" strokeWidth="1.5" strokeDasharray="4 4" />
      {lines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#0D9488" strokeWidth="1" strokeDasharray="6 5" />
      ))}
    </svg>
  );
}

const sections = [
  { to: '/about',      label: 'About Me',        desc: 'Background, interests, and what drives me.' },
  { to: '/experience', label: 'Experience',       desc: 'Internships and roles I\'ve held.' },
  { to: '/skills',     label: 'Skills',           desc: 'Languages, tools, and concepts I work with.'},
  { to: '/projects',   label: 'Projects',         desc: 'Things I\'ve built.'},
  { to: '/education',  label: 'Education',        desc: 'Ohio State CSE, cybersecurity focus.'},
];

export default function Home() {
  return (
    <div className="v2-page">
      {/* Hero */}
      <section style={{
        minHeight: 'calc(100vh - var(--nav-h))',
        display: 'flex', alignItems: 'center',
        padding: '60px 0',
      }}>
        <div className="v2-container" style={{ display: 'flex', alignItems: 'center', gap: 60, width: '100%' }}>

          {/* Left */}
          <div style={{ flex: 1 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'var(--accent-light)', border: '1px solid var(--accent-mid)',
              borderRadius: 30, padding: '5px 14px', marginBottom: 24,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)' }}>Open to opportunities</span>
            </div>

            <h1 style={{
              fontSize: 58, fontWeight: 900, lineHeight: 1.05,
              letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 16,
            }}>
              Shashank<br />
              <span style={{ color: 'var(--accent)' }}>Kesavamatham</span>
            </h1>

            <p style={{ fontSize: 18, color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.5 }}>
              CSE student at Ohio State,<br />focused on <strong style={{ color: 'var(--text)' }}>Cybersecurity</strong> and <strong style={{ color: 'var(--text)' }}>AI</strong>.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
              {['Machine Learning', 'Cryptography', 'RAG & LLMs', 'Cybersecurity', 'Computer Vision'].map(tag => (
                <span key={tag} className="v2-tag">{tag}</span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
              <Link to="/projects" className="v2-btn v2-btn-primary">View Projects →</Link>
              <a href="/Shashank Kesavamatham_Resume.pdf" target="_blank" rel="noreferrer" className="v2-btn v2-btn-outline">Download Resume ↗</a>
            </div>

            <div style={{ display: 'flex', gap: 16 }}>
              {[
                { icon: <FaLinkedin size={20} />, href: 'https://www.linkedin.com/in/shashankkes3' },
                { icon: <FaGithub size={20} />,   href: 'https://github.com/Shash34' },
                { icon: <FaInstagram size={20} />, href: 'https://www.instagram.com/shashankk10111?igsh=b2t0cHhrN3VjeTM4' },
              ].map(({ icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noreferrer" style={{
                  width: 40, height: 40, borderRadius: '50%',
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

          {/* Right — Starburst decoration */}
          <div style={{ flexShrink: 0, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Starburst />
            <div style={{
              position: 'absolute',
              width: 160, height: 160, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-light), var(--accent-mid))',
              border: '2px solid var(--accent-mid)',
            }}>
            </div>
          </div>
        </div>
      </section>

      <div className="v2-divider" />

      {/* Section cards */}
      <section className="v2-section">
        <div className="v2-container">
          <p className="v2-section-label">Explore</p>
          <h2 className="v2-section-title">What's inside</h2>
          <p className="v2-section-sub" style={{ marginBottom: 48 }}>Navigate to any section below or use the navbar above.</p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 20,
          }}>
            {sections.map(s => (
              <Link key={s.to} to={s.to} className="v2-card" style={{ padding: 24, display: 'block' }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text)', marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5 }}>{s.desc}</div>
                <div style={{ marginTop: 16, fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>View →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
