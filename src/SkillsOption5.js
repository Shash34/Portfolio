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

export default function SkillsOption5() {
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
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Group Tabs */}
      <div style={{ display: 'flex', borderBottom: '1.5px solid #e2e8f0', marginBottom: '5px' }}>
        {groupKeys.map(g => (
          <button
            key={g}
            onClick={() => handleGroupChange(g)}
            style={{
              flex: 1,
              fontSize: '6.5px',
              padding: '5px 2px',
              border: 'none',
              borderBottom: activeGroup === g
                ? `2.5px solid ${color}`
                : '2.5px solid transparent',
              background: 'transparent',
              color: activeGroup === g ? color : '#94a3b8',
              fontWeight: activeGroup === g ? '700' : '400',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              transition: 'all 0.2s',
              marginBottom: '-1.5px',
            }}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Sub-tabs, only shown if more than one */}
      {subKeys.length > 1 ? (
        <div style={{ display: 'flex', gap: '4px', marginBottom: '8px', justifyContent: 'center' }}>
          {subKeys.map(s => {
            const subColor = groups[activeGroup].sub[s].color;
            return (
              <button
                key={s}
                onClick={() => setActiveSub(s)}
                style={{
                  fontSize: '6px',
                  padding: '3px 8px',
                  borderRadius: '10px',
                  border: `1px solid ${subColor}`,
                  background: activeSub === s ? subColor : 'transparent',
                  color: activeSub === s ? '#fff' : subColor,
                  fontWeight: '600',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em',
                  transition: 'all 0.2s',
                }}
              >
                {s}
              </button>
            );
          })}
        </div>
      ) : (
        <div style={{ marginBottom: '4px' }} />
      )}

      {/* Circular Stamps */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '7px',
        justifyContent: 'center', alignItems: 'center', padding: '4px 0',
      }}>
        {skills.map(s => (
          <div key={s.label} style={{
            width: '52px', height: '52px',
            borderRadius: '50%',
            border: `2px dashed ${color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `rotate(${s.rotate}deg)`,
            flexShrink: 0,
            backgroundColor: `${color}10`,
            transition: 'all 0.3s',
          }}>
            <span style={{
              fontSize: '6px',
              fontWeight: '700',
              color: color,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              textAlign: 'center',
              lineHeight: 1.25,
              padding: '4px',
            }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
