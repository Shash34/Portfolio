import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

function ProjectCard({ slug, title, description, tags, live, github, wip, highlights }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="v2-card"
      style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16, transform: hovered ? 'translateY(-4px)' : 'translateY(0)', transition: 'all 0.2s' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {tags.map(t => <span key={t} className="v2-tag" style={{ fontSize: 11 }}>{t}</span>)}
        </div>
        {wip && (
          <span style={{ fontSize: 11, fontWeight: 700, background: '#FEF3C7', color: '#92400E', padding: '3px 10px', borderRadius: 20, border: '1px solid #FDE68A', flexShrink: 0 }}>
            In Progress
          </span>
        )}
      </div>
      <div>
        <div style={{ fontWeight: 800, fontSize: 20, color: 'var(--text)', marginBottom: 8 }}>{title}</div>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{description}</p>
      </div>

      {highlights && highlights.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingTop: 4 }}>
          {highlights.map(h => (
            <span key={h} style={{
              fontSize: 11, fontWeight: 600,
              padding: '3px 10px', borderRadius: 20,
              background: 'var(--border-light)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border)',
            }}>
              {h}
            </span>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: 10, marginTop: 'auto', flexWrap: 'wrap' }}>
        <Link to={`/projects/${slug}`} className="v2-btn v2-btn-outline" style={{ fontSize: 13, padding: '8px 20px' }}>
          Learn More →
        </Link>
        {live && (
          <a href={live} target="_blank" rel="noreferrer" className="v2-btn v2-btn-primary" style={{ fontSize: 13, padding: '8px 20px' }}>
            Live Demo ↗
          </a>
        )}
        {github && (
          <a href={github} target="_blank" rel="noreferrer" className="v2-btn v2-btn-outline" style={{ fontSize: 13, padding: '8px 20px' }}>
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [search, setSearch] = useState('');
  const filtered = projects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="v2-page">
      <section className="v2-section">
        <div className="v2-container">
          <p className="v2-section-label">Projects</p>
          <h2 className="v2-section-title">Things I've built</h2>

          <div style={{ margin: '32px 0 48px' }}>
            <input
              type="text" placeholder="Search projects..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{
                padding: '11px 20px', borderRadius: 30, fontSize: 14,
                border: '1.5px solid var(--border)', background: 'var(--bg-input)', color: 'var(--text)',
                width: '100%', maxWidth: 400, outline: 'none',
                transition: 'border 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
            {filtered.length > 0
              ? filtered.map(p => <ProjectCard key={p.slug} {...p} />)
              : <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>No projects match "{search}"</p>
            }
          </div>
        </div>
      </section>
    </div>
  );
}
