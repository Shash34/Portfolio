import React from 'react';

const skills = [
  { name: 'Python',         level: 85 },
  { name: 'JavaScript',     level: 70 },
  { name: 'Java',           level: 65 },
  { name: 'Linux',          level: 75 },
  { name: 'Wireshark',      level: 65 },
  { name: 'Network Sec',    level: 70 },
  { name: 'Red Teaming',    level: 60 },
  { name: 'Git',            level: 80 },
  { name: 'Cloud Security', level: 55 },
];

export default function SkillsOption2() {
  return (
    <div style={{ width: '100%' }}>
      <div style={{
        borderBottom: '1.5px solid #1e1b4b',
        marginBottom: '8px',
        paddingBottom: '4px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: '6px', color: '#7c3aed', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Skill
        </span>
        <span style={{ fontSize: '6px', color: '#7c3aed', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Proficiency
        </span>
      </div>

      {skills.map(skill => (
        <div key={skill.name} style={{
          display: 'flex', alignItems: 'center', marginBottom: '6px', gap: '6px',
        }}>
          <span style={{
            fontSize: '7px', color: '#1e1b4b', width: '72px',
            textAlign: 'left', fontWeight: '500', flexShrink: 0,
          }}>
            {skill.name}
          </span>
          <div style={{
            flex: 1, height: '5px', background: '#ede9fe',
            borderRadius: '10px', overflow: 'hidden',
          }}>
            <div style={{
              width: `${skill.level}%`, height: '100%',
              background: 'linear-gradient(90deg, #6d28d9, #a855f7)',
              borderRadius: '10px',
            }} />
          </div>
          <span style={{ fontSize: '5.5px', color: '#94a3b8', width: '18px', textAlign: 'right' }}>
            {skill.level}%
          </span>
        </div>
      ))}
    </div>
  );
}
