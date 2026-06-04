import React, { useState } from 'react';

const courses = [
  { name: 'Information Security',  desc: 'Cryptography, secure systems design, and threat modeling fundamentals.' },
  { name: 'Data Structures',       desc: 'Algorithms, complexity analysis, and core data organization techniques.' },
  { name: 'Databases',             desc: 'Relational design, SQL, normalization, and data management systems.' },
  { name: 'Discrete Math',         desc: 'Logic, proofs, set theory, and mathematical foundations of CS.' },
  { name: 'Discrete Structures',   desc: 'Graph theory, combinatorics, and formal language theory.' },
  { name: 'Systems Programming',   desc: 'C programming, memory management, pointers, assembly language, and computer organization.' },
];

export default function Education() {
  const [tab, setTab] = useState('record');
  const [openCourse, setOpenCourse] = useState(null);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>

      {/* Header card */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5c 100%)',
        borderRadius: '8px', padding: '10px 12px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: '5px', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '2px' }}>
            Student Record
          </div>
          <div style={{ fontSize: '9px', fontWeight: '800', color: '#fff', lineHeight: 1.2 }}>
            The Ohio State<br />University
          </div>
          <div style={{ fontSize: '5.5px', color: '#c4b5fd', marginTop: '2px' }}>Columbus, OH</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontSize: '5.5px', background: '#fde68a', color: '#92400e',
            borderRadius: '20px', padding: '1px 6px', fontWeight: '700',
          }}>
            Dean's List
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1.5px solid #e2e8f0' }}>
        {[{ id: 'record', label: 'Overview' }, { id: 'courses', label: 'Coursework' }].map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); setOpenCourse(null); }} style={{
            flex: 1, fontSize: '6.5px', padding: '4px 2px', border: 'none',
            borderBottom: tab === t.id ? '2.5px solid #2563eb' : '2.5px solid transparent',
            background: 'transparent',
            color: tab === t.id ? '#2563eb' : '#94a3b8',
            fontWeight: tab === t.id ? '700' : '400',
            cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.06em',
            marginBottom: '-1.5px', transition: 'all 0.2s',
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'record' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
            {[
              { label: 'Degree',      value: 'B.S. CSE'          },
              { label: 'Graduating',  value: 'Summer 2027'        },
              { label: 'Status',      value: 'In Progress'        },
              { label: 'Standing',    value: 'Senior'             },
            ].map(s => (
              <div key={s.label} style={{
                background: '#f8fafc', border: '1px solid #dbeafe',
                borderRadius: '6px', padding: '6px 8px',
              }}>
                <div style={{ fontSize: '5px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>
                  {s.label}
                </div>
                <div style={{ fontSize: '8px', fontWeight: '700', color: '#0f172a' }}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background: '#eff6ff', border: '1px solid #bfdbfe',
            borderRadius: '6px', padding: '7px 10px',
          }}>
            <div style={{ fontSize: '5px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px' }}>
              Concentration
            </div>
            <div style={{ fontSize: '7.5px', fontWeight: '700', color: '#1d4ed8', lineHeight: 1.3 }}>
              Information & Computation Assurance
            </div>
            <div style={{ fontSize: '6px', color: '#2563eb', marginTop: '1px' }}>Cybersecurity</div>
          </div>
        </div>
      )}

      {tab === 'courses' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontSize: '6px', color: '#94a3b8', marginBottom: '2px' }}>
            Tap a course to learn more
          </div>
          {courses.map(c => (
            <div
              key={c.name}
              onClick={() => setOpenCourse(openCourse === c.name ? null : c.name)}
              style={{
                borderRadius: '6px', overflow: 'hidden', cursor: 'pointer',
                border: openCourse === c.name ? '1px solid #2563eb' : '1px solid #e2e8f0',
                transition: 'all 0.2s',
              }}
            >
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '5px 8px',
                background: openCourse === c.name ? '#eff6ff' : '#fff',
              }}>
                <span style={{ fontSize: '7px', fontWeight: '600', color: '#0f172a' }}>{c.name}</span>
                <span style={{ fontSize: '8px', color: '#2563eb', fontWeight: '700' }}>
                  {openCourse === c.name ? '−' : '+'}
                </span>
              </div>
              {openCourse === c.name && (
                <div style={{
                  padding: '4px 8px 6px', background: '#eff6ff',
                  fontSize: '6px', color: '#1d4ed8', lineHeight: 1.5,
                  borderTop: '1px solid #bfdbfe',
                }}>
                  {c.desc}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
