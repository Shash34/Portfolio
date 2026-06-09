import React, { useState } from 'react';
import griffissLogo from '../../images/griffiss-logo.png';
import triangleLogo from '../../images/triangle-cyber.png';
import cinemarkLogo from '../../images/cinemark.png';
import externLogo from '../../images/Externlogo.png';

function CompanyLogo({ logo, company }) {
  const [errored, setErrored] = useState(false);
  if (logo && !errored) {
    return (
      <div style={{
        width: 72, height: 72, borderRadius: 16,
        background: 'var(--logo-bg)', border: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', padding: 8,
      }}>
        <img
          src={logo}
          alt={company}
          onError={() => setErrored(true)}
          style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }}
        />
      </div>
    );
  }
  return (
    <div style={{
      width: 72, height: 72, borderRadius: 16,
      background: 'var(--accent-light)', border: '1px solid var(--accent-mid)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 22, fontWeight: 800, color: 'var(--accent)',
    }}>
      {company.slice(0, 2).toUpperCase()}
    </div>
  );
}

function WorkCard({ title, company, subtitle, date, logo, description }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div style={{ perspective: 1200, width: 280, height: 360, flexShrink: 0 }}>
      <div style={{
        width: '100%', height: '100%',
        position: 'relative',
        transformStyle: 'preserve-3d',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        transition: 'transform 0.7s cubic-bezier(0.4,0.2,0.2,1)',
      }}>
        {/* Front */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow)',
          padding: 32,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', gap: 12,
        }}>
          <CompanyLogo logo={logo} company={company} />
          <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--text)', lineHeight: 1.3 }}>{title}</div>
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--accent)' }}>{company}</div>
          {subtitle && <div style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic' }}>{subtitle}</div>}
          <div style={{ fontSize: 12, color: 'var(--text-light)', background: 'var(--border-light)', padding: '4px 12px', borderRadius: 20 }}>{date}</div>
          <button onClick={() => setFlipped(true)} style={{
            marginTop: 12, padding: '9px 24px', borderRadius: 30,
            border: '1.5px solid var(--accent)', background: 'transparent',
            color: 'var(--accent)', fontWeight: 600, fontSize: 13,
            cursor: 'pointer', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.target.style.background = 'var(--accent)'; e.target.style.color = '#fff'; }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--accent)'; }}
          >
            See Details →
          </button>
        </div>

        {/* Back */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: '#0F172A',
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow)',
          padding: 28,
          display: 'flex', flexDirection: 'column',
          color: '#F1F5F9',
        }}>
          <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>{title}</div>
          <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 12 }}>{company} · {date}</div>
          <div className="card-scroll" style={{
            flex: 1, fontSize: 12, lineHeight: 1.7, opacity: 0.95,
            whiteSpace: 'pre-line', overflowY: 'auto', wordBreak: 'break-word',
            paddingRight: 4,
          }}>
            {description || 'More details coming soon.'}
          </div>
          <button onClick={() => setFlipped(false)} style={{
            marginTop: 12, padding: '8px 20px', borderRadius: 30,
            border: '1.5px solid rgba(255,255,255,0.6)',
            background: 'transparent', color: '#fff',
            fontWeight: 600, fontSize: 13, cursor: 'pointer',
            transition: 'all 0.2s', alignSelf: 'flex-start',
          }}
            onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.15)'}
            onMouseLeave={e => e.target.style.background = 'transparent'}
          >
            ← Flip Back
          </button>
        </div>
      </div>

      <style>{`
        .card-scroll::-webkit-scrollbar { width: 4px; }
        .card-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.1); border-radius: 4px; }
        .card-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.4); border-radius: 4px; }
        .card-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.65); }
      `}</style>
    </div>
  );
}

const jobs = [
  {
    title: 'Viceroy Envoy Cybersecurity Intern',
    company: 'Griffiss Institute',
    date: 'June 2026 – Present',
    logo: griffissLogo,
    description: `More details coming soon.`,
  },
  {
    title: 'Cloud Security Intern',
    company: 'Triangle Cyber',
    date: 'May 2026 – Present',
    logo: triangleLogo,
    description: `More details coming soon.`,
  },
  {
    title: 'AI Engineering Extern',
    company: 'Extern via Outamation',
    date: 'May 2026 – Jun 2026',
    logo: externLogo,
    description: `• Engineered modular AI document intelligence pipelines in Python to process 200+ page mortgage files, combining PyMuPDF for digital PDF extraction and EasyOCR for scanned documents, with automatic routing logic to select the correct engine per document type\n• Built a RAG-based retrieval system using LlamaIndex, HuggingFace embeddings, and Claude Haiku, with chunk tuning (300-token chunks, 50-token overlap) and metadata filtering to improve retrieval precision across multi-document corpora\n• Deployed an end-to-end document Q&A interface using Gradio, featuring confidence scoring, source citations, and support for both digital and scanned PDFs`,
  },
  {
    title: 'Crew Member',
    company: 'Cinemark',
    date: 'Mar 2024 – Aug 2024',
    logo: cinemarkLogo,
    description: `• Provided customer service at box office, concessions, and ticket scanning\n• Maintained cleanliness and safety standards\n• Assisted guests and resolved issues in a fast-paced environment\n• Operated POS systems and handled transactions accurately`,
  },
];

export default function ExperiencePage() {
  return (
    <div className="v2-page">
      <section className="v2-section">
        <div className="v2-container">
          <p className="v2-section-label">Work Experience</p>
          <h2 className="v2-section-title">Where I've worked</h2>
          <p className="v2-section-sub" style={{ marginBottom: 56 }}>Click any card to flip it and see what I did there.</p>

          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
            {jobs.map(j => <WorkCard key={j.title} {...j} />)}
          </div>

          <div style={{ marginTop: 56, textAlign: 'center' }}>
            <a href="/Shashank Kesavamatham_Resume.pdf" target="_blank" rel="noreferrer" className="v2-btn v2-btn-outline">
              Full Resume ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
