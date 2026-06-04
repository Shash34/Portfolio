import React, { useState } from 'react';

const tabs = {
  Languages: {
    color: '#f59e0b',
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
    color: '#3b82f6',
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
    color: '#ef4444',
    skills: [
      { label: 'Red Team',   rotate: -4 },
      { label: 'Cloud Sec',  rotate:  3 },
      { label: 'Network Sec',rotate: -2 },
      { label: 'OSINT',      rotate:  4 },
      { label: 'CTF',        rotate: -3 },
      { label: 'Pen Testing',rotate:  2 },
      { label: 'AI / ML',    rotate: -1 },
    ],
  },
};

export default function SkillsOption5() {
  const [active, setActive] = useState('Languages');
  const { color, skills } = tabs[active];

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1.5px solid #e2e8f0', marginBottom: '10px' }}>
        {Object.keys(tabs).map(tab => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            style={{
              flex: 1,
              fontSize: '7px',
              padding: '5px 2px',
              border: 'none',
              borderBottom: active === tab
                ? `2.5px solid ${tabs[tab].color}`
                : '2.5px solid transparent',
              background: 'transparent',
              color: active === tab ? tabs[tab].color : '#94a3b8',
              fontWeight: active === tab ? '700' : '400',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              transition: 'all 0.2s',
              marginBottom: '-1.5px',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

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
