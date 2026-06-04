import React from 'react';

const stamps = [
  { label: 'Python',       color: '#3b82f6', rotate: -4 },
  { label: 'Linux',        color: '#f59e0b', rotate:  3 },
  { label: 'Wireshark',    color: '#10b981', rotate: -2 },
  { label: 'Red Team',     color: '#ef4444', rotate:  4 },
  { label: 'Java',         color: '#8b5cf6', rotate: -3 },
  { label: 'Git',          color: '#f97316', rotate:  2 },
  { label: 'Nmap',         color: '#06b6d4', rotate: -4 },
  { label: 'CTF',          color: '#ec4899', rotate:  3 },
  { label: 'Cloud Sec',    color: '#6366f1', rotate: -2 },
  { label: 'JavaScript',   color: '#eab308', rotate:  2 },
  { label: 'Burp Suite',   color: '#14b8a6', rotate: -3 },
  { label: 'OSINT',        color: '#a855f7', rotate:  4 },
];

export default function SkillsOption3() {
  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', gap: '7px',
      justifyContent: 'center', alignItems: 'center', padding: '4px 0',
    }}>
      {stamps.map(s => (
        <div key={s.label} style={{
          width: '52px', height: '52px',
          borderRadius: '50%',
          border: `2px dashed ${s.color}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `rotate(${s.rotate}deg)`,
          flexShrink: 0,
          backgroundColor: `${s.color}10`,
        }}>
          <span style={{
            fontSize: '6px',
            fontWeight: '700',
            color: s.color,
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
  );
}
