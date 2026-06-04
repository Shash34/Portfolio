import React, { useState } from 'react';

const tabs = {
  Languages: {
    color: '#D97706',
    bg: '#FFFBEB',
    border: '#FDE68A',
    skills: [
      { label: 'Python',     rotate: -4 },
      { label: 'Java',       rotate:  3 },
      { label: 'JavaScript', rotate: -2 },
      { label: 'C++',        rotate:  4 },
      { label: 'SQL',        rotate: -3 },
      { label: 'Bash',       rotate:  2 },
    ],
  },
  Tools: {
    color: '#0D9488',
    bg: '#F0FDFA',
    border: '#99F6E4',
    skills: [
      { label: 'Wireshark',  rotate:  3 },
      { label: 'Nmap',       rotate: -4 },
      { label: 'Burp Suite', rotate:  2 },
      { label: 'Linux',      rotate: -2 },
      { label: 'Git',        rotate:  4 },
      { label: 'Metasploit', rotate: -3 },
    ],
  },
  Concepts: {
    color: '#DC2626',
    bg: '#FEF2F2',
    border: '#FECACA',
    skills: [
      { label: 'Red Team',    rotate: -4 },
      { label: 'Cloud Sec',   rotate:  3 },
      { label: 'Network Sec', rotate: -2 },
      { label: 'OSINT',       rotate:  4 },
      { label: 'CTF',         rotate: -3 },
      { label: 'Pen Testing', rotate:  2 },
      { label: 'AI / ML',     rotate: -1 },
    ],
  },
};

export default function SkillsPage() {
  const [active, setActive] = useState('Languages');
  const tab = tabs[active];

  return (
    <div className="v2-page">
      <section className="v2-section">
        <div className="v2-container">
          <p className="v2-section-label">Skills</p>
          <h2 className="v2-section-title">What I work with</h2>
          <div className="v2-divider" style={{ margin: '32px 0 48px' }} />

          {/* Tab buttons */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 56, justifyContent: 'center' }}>
            {Object.keys(tabs).map(t => (
              <button key={t} onClick={() => setActive(t)} style={{
                padding: '10px 28px', borderRadius: 30, border: 'none',
                fontWeight: 700, fontSize: 14, cursor: 'pointer',
                transition: 'all 0.2s',
                background: active === t ? tabs[t].color : 'var(--bg-card)',
                color: active === t ? '#fff' : 'var(--text-muted)',
                border: `1.5px solid ${active === t ? tabs[t].color : 'var(--border)'}`,
                boxShadow: active === t ? `0 4px 16px ${tabs[t].color}40` : 'none',
              }}>
                {t}
              </button>
            ))}
          </div>

          {/* Circular stamp badges */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 24,
            justifyContent: 'center', padding: '20px 0',
          }}>
            {tab.skills.map(s => (
              <div key={s.label} style={{
                width: 110, height: 110,
                borderRadius: '50%',
                border: `2.5px dashed ${tab.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transform: `rotate(${s.rotate}deg)`,
                background: tab.bg,
                transition: 'all 0.3s',
                cursor: 'default',
                boxShadow: `0 2px 12px ${tab.color}20`,
              }}>
                <span style={{
                  fontSize: 13, fontWeight: 800, color: tab.color,
                  textTransform: 'uppercase', letterSpacing: '0.04em',
                  textAlign: 'center', lineHeight: 1.3, padding: '8px',
                }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
