import React, { useState } from 'react';
import BDAA from '../../images/BDAA.jpg';
import FreeCodeCamp from '../../images/Freecodecamp.png';
import CodePath from '../../images/CodePathCYB101.png';

const certificates = [
  { title: 'CompTIA Security+',        category: 'CompTIA',  tags: ['comptia', 'security'],    image: null   },
  { title: 'CompTIA Network+',         category: 'CompTIA',  tags: ['comptia', 'network'],     image: null   },
  { title: 'CompTIA PenTest+',         category: 'CompTIA',  tags: ['comptia', 'pentest'],     image: null   },
  { title: 'BDAA 1st Place',           category: 'Other',    tags: ['bdaa', 'award'],          image: BDAA   },
  { title: 'FreeCodeCamp — AI & ML',   category: 'Other',    tags: ['freecodecamp', 'ai'],     image: FreeCodeCamp },
  { title: 'CodePath Cybersecurity',   category: 'Other',    tags: ['codepath', 'cyber'],      image: CodePath },
];

function CertCard({ title, image }) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <>
      <div className="v2-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center', textAlign: 'center' }}>
        {image ? (
          <div style={{
            width: '100%', height: 140, borderRadius: 8, overflow: 'hidden',
            background: 'var(--border-light)', cursor: 'zoom-in', border: '1px solid var(--border)',
          }} onClick={() => setZoomed(true)}>
            <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ) : (
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'var(--accent-light)', border: '2px solid var(--accent-mid)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24,
          }}>
            🏅
          </div>
        )}
        <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>{title}</div>
        {image && (
          <button onClick={() => setZoomed(true)} style={{
            fontSize: 12, fontWeight: 600, padding: '5px 16px',
            borderRadius: 20, border: '1.5px solid var(--accent)',
            background: 'transparent', color: 'var(--accent)', cursor: 'pointer',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.target.style.background = 'var(--accent)'; e.target.style.color = '#fff'; }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--accent)'; }}
          >
            View ↗
          </button>
        )}
      </div>

      {/* Lightbox */}
      {zoomed && (
        <div onClick={() => setZoomed(false)} style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'zoom-out', padding: 32,
        }}>
          <img src={image} alt={title} style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: 12, boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }} />
        </div>
      )}
    </>
  );
}

export default function CertificatesPage() {
  const [search, setSearch] = useState('');

  const filtered = certificates.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.tags.some(t => t.includes(search.toLowerCase()))
  );

  const comptia = filtered.filter(c => c.category === 'CompTIA');
  const other   = filtered.filter(c => c.category === 'Other');

  return (
    <div className="v2-page">
      <section className="v2-section">
        <div className="v2-container">
          <p className="v2-section-label">Certificates</p>
          <h2 className="v2-section-title">Credentials & Awards</h2>

          <div style={{ margin: '32px 0 48px' }}>
            <input
              type="text" placeholder="Search certificates..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{
                padding: '11px 20px', borderRadius: 30, fontSize: 14,
                border: '1.5px solid var(--border)', background: 'var(--bg-input)', color: 'var(--text)',
                width: '100%', maxWidth: 400, outline: 'none', transition: 'border 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          {comptia.length > 0 && (
            <div style={{ marginBottom: 56 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 24, paddingBottom: 12, borderBottom: '2px solid var(--border)' }}>
                CompTIA
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
                {comptia.map(c => <CertCard key={c.title} {...c} />)}
              </div>
            </div>
          )}

          {other.length > 0 && (
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 24, paddingBottom: 12, borderBottom: '2px solid var(--border)' }}>
                Other
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
                {other.map(c => <CertCard key={c.title} {...c} />)}
              </div>
            </div>
          )}

          {filtered.length === 0 && (
            <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>No certificates match "{search}"</p>
          )}

        </div>
      </section>
    </div>
  );
}
