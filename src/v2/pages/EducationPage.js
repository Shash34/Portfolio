import React, { useState } from 'react';

const courses = [
  { name: 'Information Security',  desc: 'Cryptography, secure systems design, and threat modeling fundamentals.' },
  { name: 'Data Structures',       desc: 'Algorithms, complexity analysis, and core data organization techniques.' },
  { name: 'Databases',             desc: 'Relational design, SQL, normalization, and data management systems.' },
  { name: 'Discrete Math',         desc: 'Logic, proofs, set theory, and mathematical foundations of CS.' },
  { name: 'Discrete Structures',   desc: 'Graph theory, combinatorics, and formal language theory.' },
  { name: 'Systems Programming',   desc: 'C programming, memory management, pointers, assembly language, and computer organization.' },
];

export default function EducationPage() {
  const [tab, setTab] = useState('overview');
  const [open, setOpen] = useState(null);

  return (
    <div className="v2-page">
      <section className="v2-section">
        <div className="v2-container" style={{ maxWidth: 700 }}>
          <p className="v2-section-label">Education</p>
          <h2 className="v2-section-title">Academic Background</h2>
          <div className="v2-divider" style={{ margin: '32px 0 40px' }} />

          {/* Header card */}
          <div style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #134e4a 100%)',
            borderRadius: 'var(--radius)', padding: '28px 32px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 28, boxShadow: 'var(--shadow-lg)',
          }}>
            <div>
              <div style={{ fontSize: 11, color: '#5eead4', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>
                Student Record
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 4 }}>
                The Ohio State University
              </div>
              <div style={{ fontSize: 13, color: '#99f6e4' }}>Columbus, OH</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              {/*
                <div style={{
                fontSize: 12, background: '#fde68a', color: '#92400e',
                borderRadius: 20, padding: '4px 14px', fontWeight: 700,
              }}>
                Dean's List 2025
              </div> */}
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '2px solid var(--border)', marginBottom: 32 }}>
            {[{ id: 'overview', label: 'Overview' }, { id: 'courses', label: 'Coursework' }].map(t => (
              <button key={t.id} onClick={() => { setTab(t.id); setOpen(null); }} style={{
                padding: '10px 24px', border: 'none', background: 'transparent',
                fontWeight: 700, fontSize: 14, cursor: 'pointer',
                color: tab === t.id ? 'var(--accent)' : 'var(--text-muted)',
                borderBottom: tab === t.id ? '2px solid var(--accent)' : '2px solid transparent',
                marginBottom: '-2px', transition: 'all 0.2s',
              }}>
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { label: 'Degree',     value: 'B.S. Computer Science & Engineering' },
                  { label: 'Graduating', value: 'Summer 2027'   },
                  { label: 'Status',     value: 'In Progress'   },
                  { label: 'Standing',   value: 'Senior'        },
                ].map(s => (
                  <div key={s.label} className="v2-card" style={{ padding: '18px 22px' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{s.label}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>{s.value}</div>
                  </div>
                ))}
              </div>
              <div className="v2-card" style={{ padding: '20px 24px' }}>
                <div style={{ fontSize: 11, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Concentration</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--accent)' }}>Information & Computation Assurance</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Cybersecurity</div>
              </div>
            </div>
          )}

          {tab === 'courses' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>Click a course to expand its description.</p>
              {courses.map(c => (
                <div key={c.name} onClick={() => setOpen(open === c.name ? null : c.name)}
                  className="v2-card" style={{
                    padding: 0, cursor: 'pointer', overflow: 'hidden',
                    border: open === c.name ? '1px solid var(--accent)' : undefined,
                    transform: 'none',
                  }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '14px 20px',
                    background: open === c.name ? 'var(--accent-light)' : '#fff',
                  }}>
                    <span style={{ fontWeight: 600, fontSize: 15, color: 'var(--accent)' }}>{c.name}</span>
                    <span style={{ fontSize: 18, color: 'var(--accent)', fontWeight: 700 }}>{open === c.name ? '−' : '+'}</span>
                  </div>
                  {open === c.name && (
                    <div style={{
                      padding: '12px 20px 16px', borderTop: '1px solid var(--accent-mid)',
                      background: 'var(--accent-light)', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6,
                    }}>
                      {c.desc}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
