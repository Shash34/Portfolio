import React, { useState } from 'react';

const groups = {
  Languages: {
    sub: {
      Languages: {
        color: '#ec4899',
        skills: [
          { label: 'Python', rotate: -4 },
          { label: 'Java',   rotate:  3 },
          { label: 'C',      rotate: -2 },
          { label: 'SQL',    rotate:  4 },
          { label: 'Bash',   rotate: -3 },
        ],
      },
    },
  },
  Security: {
    sub: {
      Defensive: {
        color: '#3b82f6',
        skills: [
          { label: 'DoD STIG',        rotate: -4 },
          { label: 'OpenSCAP',        rotate:  3 },
          { label: 'Nessus',          rotate: -2 },
          { label: 'Vuln Assessment', rotate:  4 },
          { label: 'Remediation',     rotate: -3 },
        ],
      },
      Offensive: {
        color: '#ef4444',
        skills: [
          { label: 'Nmap',          rotate:  3 },
          { label: 'Hydra',         rotate: -4 },
          { label: 'SQL Injection', rotate:  2 },
          { label: 'XSS',           rotate: -2 },
          { label: 'Cmd Injection', rotate:  4 },
        ],
      },
    },
  },
  Infrastructure: {
    sub: {
      'Cloud & Infra': {
        color: '#f97316',
        skills: [
          { label: 'AWS EC2',     rotate:  3 },
          { label: 'VPC Network', rotate: -4 },
          { label: 'Docker',      rotate:  2 },
        ],
      },
      'Identity & Monitoring': {
        color: '#06b6d4',
        skills: [
          { label: 'OpenLDAP', rotate: -3 },
          { label: 'Kerberos', rotate:  4 },
          { label: 'SSSD',     rotate: -2 },
          { label: 'Splunk',   rotate:  3 },
          { label: 'SPL',      rotate: -4 },
        ],
      },
    },
  },
  'AI & Data': {
    sub: {
      'AI / ML': {
        color: '#8b5cf6',
        skills: [
          { label: 'CNNs',       rotate: -4 },
          { label: 'TensorFlow', rotate:  3 },
          { label: 'Keras',      rotate: -2 },
          { label: 'Pandas',     rotate:  4 },
          { label: 'NumPy',      rotate: -3 },
        ],
      },
      'Document Intel': {
        color: '#8b5cf6',
        skills: [
          { label: 'RAG',        rotate:  3 },
          { label: 'LlamaIndex', rotate: -4 },
          { label: 'LangChain',  rotate:  2 },
          { label: 'OCR',        rotate: -2 },
          { label: 'Embeddings', rotate:  4 },
          { label: 'PyMuPDF',    rotate: -3 },
          { label: 'Gradio',     rotate:  3 },
        ],
      },
    },
  },
  Cryptography: {
    sub: {
      Cryptography: {
        color: '#10b981',
        skills: [
          { label: 'AES',           rotate: -4 },
          { label: 'AES-GCM',       rotate:  3 },
          { label: 'PBKDF2',        rotate: -2 },
          { label: 'Steganography', rotate:  4 },
          { label: 'Pillow',        rotate: -3 },
        ],
      },
    },
  },
};

export default function SkillsPage() {
  const groupKeys = Object.keys(groups);
  const [activeGroup, setActiveGroup] = useState(groupKeys[0]);
  const subKeys = Object.keys(groups[activeGroup].sub);
  const [activeSub, setActiveSub] = useState(subKeys[0]);

  const handleGroupChange = (g) => {
    setActiveGroup(g);
    setActiveSub(Object.keys(groups[g].sub)[0]);
  };

  const { color, skills } = groups[activeGroup].sub[activeSub];

  return (
    <div className="v2-page">
      <section className="v2-section">
        <div className="v2-container">
          <p className="v2-section-label">Skills</p>
          <h2 className="v2-section-title">What I work with</h2>
          <div className="v2-divider" style={{ margin: '32px 0 48px' }} />

          {/* Group tabs */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            {groupKeys.map(g => (
              <button
                key={g}
                onClick={() => handleGroupChange(g)}
                style={{
                  padding: '9px 22px', borderRadius: 30,
                  fontWeight: 700, fontSize: 13.5, cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: activeGroup === g ? color : 'var(--bg-card)',
                  color: activeGroup === g ? '#fff' : 'var(--text-muted)',
                  border: `1.5px solid ${activeGroup === g ? color : 'var(--border)'}`,
                  boxShadow: activeGroup === g ? `0 4px 16px ${color}40` : 'none',
                }}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Sub-tabs, only shown when a group has more than one */}
          <div style={{ minHeight: 40, marginBottom: 24, display: 'flex', justifyContent: 'center' }}>
            {subKeys.length > 1 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                {subKeys.map(s => {
                  const subColor = groups[activeGroup].sub[s].color;
                  return (
                    <button
                      key={s}
                      onClick={() => setActiveSub(s)}
                      style={{
                        padding: '6px 16px', borderRadius: 20,
                        fontWeight: 600, fontSize: 12.5, cursor: 'pointer',
                        transition: 'all 0.2s',
                        background: activeSub === s ? subColor : 'transparent',
                        color: activeSub === s ? '#fff' : subColor,
                        border: `1.5px solid ${subColor}`,
                        textTransform: 'uppercase', letterSpacing: '0.03em',
                      }}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Circular stamp badges */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 24,
            justifyContent: 'center', padding: '20px 0',
          }}>
            {skills.map(s => (
              <div key={s.label} style={{
                width: 110, height: 110,
                borderRadius: '50%',
                border: `2.5px dashed ${color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transform: `rotate(${s.rotate}deg)`,
                background: `${color}12`,
                transition: 'all 0.3s',
                cursor: 'default',
                boxShadow: `0 2px 12px ${color}20`,
              }}>
                <span style={{
                  fontSize: 13, fontWeight: 800, color,
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
