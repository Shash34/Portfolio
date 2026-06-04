import React, { useState } from 'react';

const platforms = {
  TryHackMe: {
    color: '#5cb85c',
    dimColor: '#5cb85c22',
    stats: [
      { label: 'Rank',        value: 'Hacker'  },
      { label: 'Rooms Done',  value: '45+'     },
      { label: 'Points',      value: '12.5K'   },
      { label: 'Global Top',  value: '5%'      },
    ],
    badges: ['Pre-Security', 'Jr Pentester', 'Web Fundamentals'],
    url: 'https://tryhackme.com',
  },
  HackTheBox: {
    color: '#9fef00',
    dimColor: '#9fef0022',
    stats: [
      { label: 'Rank',       value: 'Hacker' },
      { label: 'Machines',   value: '12'     },
      { label: 'Challenges', value: '8'      },
      { label: 'Points',     value: '650'    },
    ],
    badges: ['Hacker', 'Script Kiddie', 'Pro Hacker'],
    url: 'https://hackthebox.com',
  },
};

export default function HackingPlatforms() {
  const [active, setActive] = useState('TryHackMe');
  const [hovered, setHovered] = useState(null);
  const p = platforms[active];

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>

      {/* Toggle */}
      <div style={{
        display: 'flex', borderRadius: '8px', overflow: 'hidden',
        border: '1px solid #1e293b', background: '#0f172a',
      }}>
        {Object.keys(platforms).map(name => (
          <button
            key={name}
            onClick={() => setActive(name)}
            style={{
              flex: 1, padding: '5px 0', border: 'none', cursor: 'pointer',
              fontSize: '6.5px', fontWeight: '700', letterSpacing: '0.05em',
              textTransform: 'uppercase', transition: 'all 0.25s',
              background: active === name ? platforms[name].color : 'transparent',
              color: active === name ? '#0f172a' : '#64748b',
            }}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
        {p.stats.map(s => (
          <div
            key={s.label}
            onMouseEnter={() => setHovered(s.label)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: hovered === s.label ? p.dimColor : '#0f172a',
              border: `1px solid ${hovered === s.label ? p.color : '#1e293b'}`,
              borderRadius: '6px', padding: '6px 8px',
              transition: 'all 0.2s', cursor: 'default',
            }}
          >
            <div style={{ fontSize: '5px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>
              {s.label}
            </div>
            <div style={{ fontSize: '11px', fontWeight: '700', color: p.color, fontFamily: 'monospace' }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div>
        <div style={{ fontSize: '5.5px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
          Badges / Paths
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {p.badges.map(b => (
            <span key={b} style={{
              fontSize: '6px', padding: '2px 7px', borderRadius: '20px',
              border: `1px solid ${p.color}55`, color: p.color,
              background: p.dimColor, fontWeight: '600',
            }}>
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Visit Profile */}
      <a
        href={p.url}
        target="_blank"
        rel="noreferrer"
        style={{
          display: 'block', textAlign: 'center', padding: '5px 0',
          borderRadius: '6px', border: `1px solid ${p.color}`,
          color: p.color, fontSize: '6.5px', fontWeight: '700',
          textDecoration: 'none', letterSpacing: '0.05em',
          textTransform: 'uppercase', background: p.dimColor,
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.target.style.background = p.color; e.target.style.color = '#0f172a'; }}
        onMouseLeave={e => { e.target.style.background = p.dimColor; e.target.style.color = p.color; }}
      >
        Visit Profile →
      </a>

    </div>
  );
}
