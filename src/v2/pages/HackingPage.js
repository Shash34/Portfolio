import React, { useState } from 'react';

const platforms = {
  TryHackMe: {
    color: '#16a34a',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    dark: '#0f172a',
    stats: [
      { label: 'Rank',       value: 'Hacker'  },
      { label: 'Rooms Done', value: '45+'     },
      { label: 'Points',     value: '12.5K'   },
      { label: 'Global Top', value: '5%'      },
    ],
    badges: ['Pre-Security', 'Jr Pentester', 'Web Fundamentals'],
    url: 'https://tryhackme.com',
    desc: 'Focused on guided rooms, learning paths, and beginner-to-intermediate CTF-style challenges.',
  },
  HackTheBox: {
    color: '#9fef00',
    bg: '#0d1117',
    border: '#9fef0033',
    dark: '#0d1117',
    stats: [
      { label: 'Rank',       value: 'Hacker' },
      { label: 'Machines',   value: '12'     },
      { label: 'Challenges', value: '8'      },
      { label: 'Points',     value: '650'    },
    ],
    badges: ['Hacker', 'Script Kiddie', 'Pro Hacker'],
    url: 'https://hackthebox.com',
    desc: 'Practicing offensive security through realistic machine exploitation and challenge-based learning.',
  },
};

export default function HackingPage() {
  const [active, setActive] = useState('TryHackMe');
  const p = platforms[active];
  const isDark = active === 'HackTheBox';

  return (
    <div className="v2-page">
      <section className="v2-section">
        <div className="v2-container" style={{ maxWidth: 760 }}>
          <p className="v2-section-label">Hacking Platforms</p>
          <h2 className="v2-section-title">Hands-on Practice</h2>
          <p className="v2-section-sub" style={{ marginBottom: 48 }}>
            Platforms where I sharpen my offensive security skills outside of coursework.
          </p>

          {/* Toggle */}
          <div style={{
            display: 'flex', background: '#f3f4f6',
            borderRadius: 40, padding: 4, gap: 4,
            width: 'fit-content', marginBottom: 40,
          }}>
            {Object.keys(platforms).map(name => (
              <button key={name} onClick={() => setActive(name)} style={{
                padding: '10px 28px', borderRadius: 36,
                border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14,
                transition: 'all 0.25s',
                background: active === name ? platforms[name].color : 'transparent',
                color: active === name ? (name === 'HackTheBox' ? '#0d1117' : '#fff') : 'var(--text-muted)',
                boxShadow: active === name ? `0 2px 12px ${platforms[name].color}50` : 'none',
              }}>
                {name}
              </button>
            ))}
          </div>

          {/* Platform card */}
          <div style={{
            background: isDark ? '#0d1117' : '#fff',
            border: `1px solid ${isDark ? '#1e293b' : 'var(--border)'}`,
            borderRadius: 'var(--radius)', padding: 36,
            boxShadow: 'var(--shadow-lg)',
          }}>
            <p style={{ fontSize: 14, color: isDark ? '#94a3b8' : 'var(--text-muted)', marginBottom: 28, lineHeight: 1.6 }}>
              {p.desc}
            </p>

            {/* Stats grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
              {p.stats.map(s => (
                <div key={s.label} style={{
                  background: isDark ? '#1e293b' : p.bg,
                  border: `1px solid ${p.border}`,
                  borderRadius: 'var(--radius-sm)', padding: '18px 22px',
                  transition: 'all 0.2s',
                }}>
                  <div style={{ fontSize: 11, color: isDark ? '#64748b' : 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: p.color, fontFamily: 'monospace', lineHeight: 1 }}>
                    {s.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Badges */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 11, color: isDark ? '#64748b' : 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
                Badges & Paths
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {p.badges.map(b => (
                  <span key={b} style={{
                    padding: '5px 14px', borderRadius: 20,
                    background: isDark ? '#1e293b' : p.bg,
                    color: p.color, fontWeight: 600, fontSize: 13,
                    border: `1px solid ${p.border}`,
                  }}>
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Visit button */}
            <a href={p.url} target="_blank" rel="noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 28px', borderRadius: 30,
              background: p.color, color: isDark ? '#0d1117' : '#fff',
              fontWeight: 700, fontSize: 14, textDecoration: 'none',
              transition: 'all 0.2s',
              boxShadow: `0 4px 16px ${p.color}40`,
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Visit Profile ↗
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}
