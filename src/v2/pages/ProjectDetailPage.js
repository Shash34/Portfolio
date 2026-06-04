import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/projects';

function SectionCard({ title, children, accent }) {
  return (
    <div className="v2-card" style={{ padding: 36, position: 'relative', overflow: 'hidden' }}>
      {accent && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 3, background: 'var(--accent)',
          borderRadius: '14px 14px 0 0',
        }} />
      )}
      <h3 style={{
        fontSize: 13, fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: 16,
      }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="v2-page">
        <section className="v2-section">
          <div className="v2-container" style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 48, marginBottom: 16 }}>404</p>
            <h2 style={{ color: 'var(--text)', marginBottom: 8 }}>Project not found</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>This project doesn't exist or the link is broken.</p>
            <Link to="/projects" className="v2-btn v2-btn-primary">← Back to Projects</Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="v2-page">
      <section className="v2-section">
        <div className="v2-container">

          {/* Back button — top */}
          <Link to="/projects" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, fontWeight: 600, color: 'var(--text-muted)',
            padding: '8px 16px', borderRadius: 30,
            border: '1.5px solid var(--border)',
            transition: 'all 0.2s', marginBottom: 48,
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            ← Back to Projects
          </Link>

          {/* Hero */}
          <div style={{ marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 280 }}>
                <p className="v2-section-label" style={{ marginBottom: 10 }}>
                  {project.wip ? 'Work in Progress' : 'Project'}
                </p>
                <h1 style={{
                  fontSize: 48, fontWeight: 900, letterSpacing: '-0.03em',
                  color: 'var(--text)', lineHeight: 1.1, marginBottom: 14,
                }}>
                  {project.title}
                </h1>
                <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 24, maxWidth: 560 }}>
                  {project.tagline}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                  {project.tags.map(t => <span key={t} className="v2-tag">{t}</span>)}
                  {project.wip && (
                    <span style={{
                      fontSize: 12, fontWeight: 700,
                      background: '#FEF3C7', color: '#92400E',
                      padding: '3px 12px', borderRadius: 20,
                      border: '1px solid #FDE68A',
                    }}>
                      In Progress
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer" className="v2-btn v2-btn-primary" style={{ fontSize: 13 }}>
                      Live Demo ↗
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="v2-btn v2-btn-outline" style={{ fontSize: 13 }}>
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="v2-divider" style={{ marginBottom: 48 }} />

          {/* Overview + How It Works */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 24 }}>
            <SectionCard title="Overview" accent>
              <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                {project.overview}
              </p>
            </SectionCard>

            <SectionCard title="How It Works" accent>
              <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                {project.howItWorks}
              </p>
            </SectionCard>
          </div>

          {/* Key Features */}
          <div style={{ marginBottom: 24 }}>
            <SectionCard title="Key Features">
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: 12, marginTop: 4,
              }}>
                {project.features.map(f => (
                  <div key={f} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                    padding: '12px 16px', borderRadius: 10,
                    background: 'var(--accent-light)',
                    border: '1px solid var(--accent-mid)',
                  }}>
                    <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 14, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500, lineHeight: 1.4 }}>{f}</span>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Tech Stack */}
          <div style={{ marginBottom: 64 }}>
            <SectionCard title="Tech Stack">
              <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', marginTop: 8 }}>
                {project.techStack.map(group => (
                  <div key={group.category}>
                    <p style={{
                      fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
                      letterSpacing: '0.1em', color: 'var(--text-light)',
                      marginBottom: 10,
                    }}>
                      {group.category}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                      {group.items.map(item => (
                        <span key={item} style={{
                          fontSize: 13, fontWeight: 600,
                          padding: '5px 14px', borderRadius: 20,
                          background: 'var(--bg)', color: 'var(--text)',
                          border: '1.5px solid var(--border)',
                          display: 'inline-block',
                          width: 'fit-content',
                        }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Bottom navigation */}
          <div className="v2-divider" style={{ marginBottom: 40 }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <Link to="/projects" className="v2-btn v2-btn-outline" style={{ fontSize: 13 }}>
              ← Back to Projects
            </Link>
            <div style={{ display: 'flex', gap: 12 }}>
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer" className="v2-btn v2-btn-primary" style={{ fontSize: 13 }}>
                  Live Demo ↗
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className="v2-btn v2-btn-outline" style={{ fontSize: 13 }}>
                  GitHub
                </a>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
