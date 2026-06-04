import React, { useState } from 'react';

const tabs = {
  Languages: ['Python', 'Java', 'JavaScript', 'C++', 'SQL', 'Bash'],
  Tools:     ['Wireshark', 'Nmap', 'Burp Suite', 'Linux', 'Git', 'Metasploit'],
  Concepts:  ['Red Teaming', 'Cloud Security', 'Network Sec', 'OSINT', 'CTF', 'Pen Testing', 'AI / ML'],
};

const tabColors = {
  Languages: '#f59e0b',
  Tools:     '#3b82f6',
  Concepts:  '#ef4444',
};

export default function SkillsOption4() {
  const [active, setActive] = useState('Languages');

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
                ? `2.5px solid ${tabColors[tab]}`
                : '2.5px solid transparent',
              background: 'transparent',
              color: active === tab ? tabColors[tab] : '#94a3b8',
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

      {/* Skills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', alignContent: 'flex-start' }}>
        {tabs[active].map(skill => (
          <span key={skill} style={{
            backgroundColor: `${tabColors[active]}15`,
            color: tabColors[active],
            border: `1px solid ${tabColors[active]}40`,
            fontSize: '7px',
            padding: '3px 8px',
            borderRadius: '20px',
            fontWeight: '500',
          }}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
