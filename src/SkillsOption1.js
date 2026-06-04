import React from 'react';

const categories = [
  {
    label: 'Languages',
    color: '#fef9c3',
    border: '#facc15',
    textColor: '#713f12',
    skills: ['Python', 'Java', 'JavaScript', 'C++', 'SQL', 'Bash'],
  },
  {
    label: 'Security Tools',
    color: '#dbeafe',
    border: '#60a5fa',
    textColor: '#1e3a5f',
    skills: ['Wireshark', 'Nmap', 'Burp Suite', 'Metasploit', 'Linux'],
  },
  {
    label: 'Concepts',
    color: '#fce7f3',
    border: '#f472b6',
    textColor: '#701a44',
    skills: ['Red Teaming', 'Cloud Security', 'OSINT', 'CTF', 'Pen Testing'],
  },
  {
    label: 'Other',
    color: '#dcfce7',
    border: '#4ade80',
    textColor: '#14532d',
    skills: ['Git', 'React', 'AI / ML', 'Data Structures'],
  },
];

export default function SkillsOption1() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '9px' }}>
      {categories.map(cat => (
        <div key={cat.label}>
          <p style={{
            fontSize: '7px', fontWeight: '700', color: '#1e1b4b',
            margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.1em',
          }}>
            {cat.label}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {cat.skills.map(skill => (
              <span key={skill} style={{
                backgroundColor: cat.color,
                border: `1px solid ${cat.border}`,
                color: cat.textColor,
                fontSize: '6.5px',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: '500',
                boxShadow: '1px 1px 2px rgba(0,0,0,0.07)',
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
