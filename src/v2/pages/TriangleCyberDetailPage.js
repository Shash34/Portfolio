import React from 'react';
import { Link } from 'react-router-dom';

function Stat({ value, label }) {
  return (
    <div style={{ textAlign: 'center', padding: '12px 18px' }}>
      <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 6 }}>
        {label}
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p style={{
      fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
      letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: 16,
    }}>
      {children}
    </p>
  );
}

function AttackCard({ index, title, vector, payload, result, sourcetype, finding }) {
  return (
    <div className="v2-card" style={{ padding: '18px 20px', marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
        <span style={{
          fontSize: 12, fontWeight: 800, color: 'var(--accent)',
          background: 'var(--accent-light)', border: '1px solid var(--accent-mid)',
          borderRadius: 20, padding: '2px 10px',
        }}>
          {index}
        </span>
        <h4 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', margin: 0 }}>{title}</h4>
        {finding && (
          <span style={{
            fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            background: 'var(--accent-light)', border: '1px solid var(--accent-mid)',
            padding: '2px 8px', borderRadius: 10, marginLeft: 'auto',
          }}>
            {finding}
          </span>
        )}
      </div>
      <p style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 6 }}>
        <strong style={{ color: 'var(--text)' }}>Vector: </strong>{vector}
      </p>
      {payload && (
        <p style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 6 }}>
          <strong style={{ color: 'var(--text)' }}>Payload: </strong>
          <code style={{ fontSize: 12.5, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, padding: '1px 6px' }}>
            {payload}
          </code>
        </p>
      )}
      <p style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: sourcetype ? 6 : 0 }}>
        <strong style={{ color: 'var(--text)' }}>Result: </strong>{result}
      </p>
      {sourcetype && (
        <span style={{
          display: 'inline-block', fontSize: 11.5, fontWeight: 600, color: 'var(--text-muted)',
          background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 20, padding: '3px 10px',
        }}>
          Splunk sourcetype: {sourcetype}
        </span>
      )}
    </div>
  );
}

const ATTACKS = [
  {
    index: '01',
    title: 'Reconnaissance',
    vector: 'Nmap scans against the target to map open ports and running services before attempting exploitation.',
    result: 'Recon activity confirmed and correlated across three separate Splunk sourcetypes.',
    sourcetype: 'access_combined · linux_secure · apache_error',
  },
  {
    index: '02',
    title: 'Command Injection',
    vector: 'DVWA input field passed straight to a shell command with no sanitization.',
    payload: '127.0.0.1; whoami',
    result: 'Returned www-data, confirming arbitrary command execution on the target.',
    sourcetype: 'apache_error',
  },
  {
    index: '03',
    title: 'SQL Injection',
    vector: 'UNION-based SQL injection against a DVWA query parameter.',
    payload: 'UNION SELECT',
    result: 'Exfiltrated 5 user accounts, including MD5-hashed passwords.',
    sourcetype: 'access_combined',
  },
  {
    index: '04',
    title: 'Reflected XSS',
    vector: 'Unsanitized input reflected back into the page response.',
    result: 'Injected script confirmed live in the request URI.',
    sourcetype: 'access_combined',
  },
  {
    index: '05',
    title: 'SSH Brute Force',
    vector: 'Hydra dictionary attack against the target’s SSH service.',
    result: 'Brute force failed outright — the target enforces key-only authentication. Logged as a positive security finding, not a gap.',
    sourcetype: 'linux_secure',
    finding: 'Defense held',
  },
];

function MainProjectView() {
  return (
    <div>
      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px 8px',
        borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
        padding: '16px 0', marginBottom: 32,
      }}>
        <Stat value="5 / 5" label="Attack types confirmed in SIEM" />
        <Stat value="3" label="Log sourcetypes correlated" />
        <Stat value="5" label="Dashboard panels" />
      </div>

      {/* Problem */}
      <div className="v2-card" style={{ padding: 28, marginBottom: 20 }}>
        <SectionLabel>The Problem</SectionLabel>
        <p style={{ fontSize: 14.5, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 0 }}>
          A SOC analyst is only as good as their ability to recognize an attack in the logs — not just
          run one. The goal of this lab was to close that loop end-to-end: stand up a deliberately
          vulnerable target on AWS, run a realistic chain of attacks against it, and confirm every
          single one of them was visible and identifiable inside the SIEM, not just successful against
          the target.
        </p>
      </div>

      {/* Approach */}
      <div className="v2-card" style={{ padding: 28, marginBottom: 20 }}>
        <SectionLabel>The Approach</SectionLabel>
        <p style={{ fontSize: 14.5, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 18 }}>
          Rather than treating detection as an afterthought, every attack was run with the Splunk
          side already wired up — so each step could be verified against real log data instead of
          assumed from the attacker's side alone.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          {[
            { title: 'Vulnerable target on AWS', body: 'DVWA deployed on EC2 behind Apache and MariaDB, intentionally exposed to a single authorized attacking IP.' },
            { title: 'Attack simulation', body: 'Ran a five-stage chain — recon through brute force — from Windows/WSL, working around an inaccessible Kali instance.' },
            { title: 'SIEM correlation', body: 'Universal Forwarder shipped target logs into Splunk, where every attack was confirmed against the raw events, not just the attacker-side output.' },
          ].map(item => (
            <div key={item.title} style={{
              padding: '14px 16px', borderRadius: 10,
              background: 'var(--accent-light)', border: '1px solid var(--accent-mid)',
            }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
                {item.title}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {item.body}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Attack chain */}
      <div style={{ marginTop: 12, marginBottom: 20, paddingTop: 28, borderTop: '2px solid var(--border)' }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', marginBottom: 8, letterSpacing: '-0.01em' }}>
          Attack Chain
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
          Five stages, run in order, each one confirmed independently against the SIEM.
        </p>
      </div>

      {ATTACKS.map(a => <AttackCard key={a.index} {...a} />)}

      {/* Detection dashboard */}
      <div style={{ marginTop: 24, marginBottom: 20, paddingTop: 28, borderTop: '2px solid var(--border)' }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', marginBottom: 8, letterSpacing: '-0.01em' }}>
          Detection Dashboard
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
          A single Splunk view built to answer "did we see it?" for every attack in the chain.
        </p>
      </div>

      <div className="v2-card" style={{ padding: 28, marginBottom: 20 }}>
        <p style={{ fontSize: 14.5, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 16 }}>
          Built a 5-panel dashboard, <strong style={{ color: 'var(--text)' }}>SOC Attack Detection Dashboard</strong>,
          with one panel per attack type — so a reviewer can confirm the full chain at a glance instead
          of hunting through raw search results.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['Recon', 'Command Injection', 'SQL Injection', 'XSS', 'Brute Force'].map(t => (
            <span key={t} className="v2-tag">{t}</span>
          ))}
        </div>
      </div>

      {/* Cloud-native monitoring */}
      <div className="v2-card" style={{ padding: 28, marginBottom: 20 }}>
        <SectionLabel>Cloud-Native Monitoring</SectionLabel>
        <p style={{ fontSize: 14.5, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 0 }}>
          CloudTrail and GuardDuty were reviewed alongside the Splunk side of the lab. GuardDuty
          surfaced one finding — Recon:EC2/PortProbeUnprotectedPort — which was investigated and
          attributed to background internet-wide scanning by Censys rather than a real threat, and
          assessed as benign.
        </p>
      </div>

      <SectionLabel>Tech Stack</SectionLabel>
      <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap' }}>
        {[
          { category: 'Cloud', items: ['AWS EC2', 'AWS CloudTrail', 'AWS GuardDuty'] },
          { category: 'SIEM', items: ['Splunk Enterprise', 'Universal Forwarder', 'SPL'] },
          { category: 'Target Stack', items: ['DVWA', 'Apache2', 'MariaDB'] },
          { category: 'Offensive Tools', items: ['Nmap', 'Hydra'] },
          { category: 'Environment', items: ['WSL', 'Windows Terminal'] },
        ].map(group => (
          <div key={group.category}>
            <p style={{
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.08em', color: 'var(--text-light)', marginBottom: 10,
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
                  display: 'inline-block', width: 'fit-content',
                }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TriangleCyberDetailPage() {
  return (
    <div className="v2-page">
      <section className="v2-section">
        <div className="v2-container" style={{ maxWidth: 860 }}>

          <Link to="/experience" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, fontWeight: 600, color: 'var(--text-muted)',
            padding: '8px 16px', borderRadius: 30,
            border: '1.5px solid var(--border)',
            transition: 'all 0.2s', marginBottom: 40,
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            ← Back to Experience
          </Link>

          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center',
                fontSize: 13, fontWeight: 800, color: 'var(--accent)',
                background: 'var(--accent-light)', border: '1px solid var(--accent-mid)',
                padding: '7px 16px', borderRadius: 20,
                textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>
                Triangle Cyber · Cloud Security Intern
              </div>
            </div>
            <h1 style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 10 }}>
              Cloud SOC + Attack Simulation
            </h1>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 560 }}>
              A hands-on cloud security operations lab for practicing threat detection, attack
              simulation, and incident response on real AWS infrastructure.
            </p>
          </div>

          <div className="v2-divider" style={{ marginBottom: 36 }} />

          <MainProjectView />

        </div>
      </section>
    </div>
  );
}