import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/',           label: 'Home'       },
  { to: '/about',      label: 'About'      },
  { to: '/experience', label: 'Experience' },
  { to: '/skills',     label: 'Skills'     },
  { to: '/projects',   label: 'Projects'   },
  { to: '/education',  label: 'Education'  },
  { to: '/certificates', label: 'Certificates' },
  { to: '/contact',    label: 'Contact'    },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: 'var(--nav-h)',
      background: scrolled ? 'var(--nav-scrolled-bg)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'all 0.3s ease',
      display: 'flex', alignItems: 'center',
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto', padding: '0 32px',
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link to="/" style={{
          fontWeight: 800, fontSize: 18, color: 'var(--text)',
          letterSpacing: '-0.02em',
        }}>
          SK<span style={{ color: 'var(--accent)' }}>.</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              fontSize: 13, fontWeight: 500,
              padding: '6px 12px', borderRadius: 8,
              color: pathname === l.to ? 'var(--accent)' : 'var(--text-muted)',
              background: pathname === l.to ? 'var(--accent-light)' : 'transparent',
              transition: 'all 0.15s',
            }}
              onMouseEnter={e => { if (pathname !== l.to) e.target.style.color = 'var(--text)'; }}
              onMouseLeave={e => { if (pathname !== l.to) e.target.style.color = 'var(--text-muted)'; }}
            >
              {l.label}
            </Link>
          ))}

          {/* Dark mode toggle */}
          <button
            onClick={() => setDark(d => !d)}
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              marginLeft: 4,
              width: 36, height: 36, borderRadius: '50%',
              border: '1.5px solid var(--border)',
              background: 'transparent',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            {dark ? '☀' : '☾'}
          </button>

          <a href="/Shashank Kesavamatham_Resume.pdf" target="_blank" rel="noreferrer" style={{
            marginLeft: 8, fontSize: 13, fontWeight: 600,
            padding: '7px 18px', borderRadius: 30,
            background: 'var(--accent)', color: '#fff',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => e.target.style.background = 'var(--accent-hover)'}
            onMouseLeave={e => e.target.style.background = 'var(--accent)'}
          >
            Resume ↗
          </a>
        </div>
      </div>
    </nav>
  );
}
