import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const TEST_COLOR = '#f97316';

const FAKE_EXTRA = [
  'Placeholder paragraph — exact commands run during remediation, with before/after config diffs for each affected host.',
  'Placeholder paragraph — timeline of the issue, who was looped in, and how it was triaged before the fix landed.',
  'Placeholder paragraph — screenshots / terminal output showing the failure state and the confirmed fix.',
  'Placeholder paragraph — links to internal runbooks, related tickets, and any follow-up hardening tasks still open.',
  'Placeholder paragraph — lessons learned and what would be done differently on the next pass across the fleet.',
];

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

function InfraSection({ innerRef, title, problem, approach, result, tags, extra, extraContent }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      ref={innerRef}
      className="v2-card expand-scroll"
      style={{
        padding: 28, marginBottom: 20, scrollMarginTop: 90,
        maxHeight: expanded ? 460 : 'none',
        overflowY: expanded ? 'auto' : 'visible',
      }}
    >
      <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', marginBottom: 14 }}>{title}</h3>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 8 }}>
        <strong style={{ color: 'var(--text)' }}>Problem: </strong>{problem}
      </p>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 8 }}>
        <strong style={{ color: 'var(--text)' }}>Approach: </strong>{approach}
      </p>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 16 }}>
        <strong style={{ color: 'var(--text)' }}>Result: </strong>{result}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        {tags.map(t => <span key={t} className="v2-tag">{t}</span>)}
      </div>

      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          background: 'none', border: 'none', padding: 0, cursor: 'pointer',
          fontSize: 13, fontWeight: 700, color: 'var(--accent)',
          display: 'inline-flex', alignItems: 'center', gap: 4,
        }}
      >
        {expanded ? '− Show less' : '+ Expand for more detail'}
      </button>

      {expanded && (
        <div style={{ marginTop: 16, paddingTop: 16 }}>
          {extraContent ? extraContent : (
            <>
              <p style={{
                fontSize: 11, fontWeight: 800, color: TEST_COLOR,
                textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10,
              }}>
                Test content — placeholder, not real
              </p>
              {extra.map((para, i) => (
                <p key={i} style={{ fontSize: 13, color: TEST_COLOR, lineHeight: 1.7, marginBottom: 10 }}>
                  {para}
                </p>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

const TECH_STACK = [
  { category: 'Languages & Libraries', items: ['Python', 'requests'] },
  { category: 'Security Tools', items: ['Nessus', 'Nessus REST API', 'Nessus Essentials'] },
  { category: 'SIEM & Monitoring', items: ['Splunk Enterprise', 'Splunk HEC', 'SPL'] },
  { category: 'Infrastructure & OS', items: ['Docker (Volume/Mounts)', 'Linux'] },
  { category: 'Vulnerability Scoring Standards', items: ['CVE', 'CVSS', 'VPR', 'EPSS'] },
  { category: 'Networking/Protocols', items: ['HTTP', 'REST', 'JSON'] },
  { category: 'Automation & Scheduling', items: ['Cron', 'Crontab'] },
];

const OLD_PROCESS_STEPS = ['Run scan in Nessus', 'curl results manually', 'scp to workstation', 'Upload via Splunk web UI'];

const APPROACH_ITEMS = [
  {
    title: 'Fleet-wide scanning',
    body: "Added every device's IP to Nessus so all 8 hosts could be scanned from one place, instead of running scans device-by-device.",
  },
  {
    title: 'Direct API integration',
    body: "Instead of exporting scan results as a file, pulled data straight from Nessus's scan-status endpoints and pushed it to Splunk via HTTP Event Collector.",
  },
  {
    title: 'Built for dashboards, not files',
    body: 'The end goal was never "generate a report" — it was continuous visibility: severity breakdowns, exploitability, and host summaries, all live in Splunk.',
  },
];

const NESSUS_ENDPOINTS = [
  { method: 'POST', path: '/session', desc: 'logs in, returns a token' },
  { method: 'GET',  path: '/scans', desc: 'lists all scans' },
  { method: 'GET',  path: '/scans/{scan_id}', desc: 'returns full details of one scan' },
  { method: 'POST', path: '/scans/{scan_id}/export', desc: 'blocked, paywalled behind Essentials', blocked: true },
];

const DATA_FIELDS = [
  { term: 'Plugin ID', def: "Nessus's internal check ID — Nessus doesn't scan for vulnerabilities directly, it runs thousands of individual plugins, each checking for one specific issue." },
  { term: 'CVE', def: 'The industry-standard public ID for a known vulnerability.' },
  { term: 'CVSS', def: "A 0–10 severity score based on the vulnerability's technical characteristics." },
  { term: 'VPR', def: "Tenable's own priority score, factoring in real-world exploitability rather than just theoretical severity." },
  { term: 'EPSS', def: 'A probability score estimating how likely a vulnerability is to actually be exploited in the next 30 days.' },
  { term: 'Exploit availability', def: 'Whether a known working exploit already exists publicly.' },
  { term: 'Remediation text', def: 'How to fix the issue.' },
];

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

function TimelineStep({ status, label, title, children }) {
  const isFail = status === 'fail';
  const color = isFail ? '#B91C1C' : 'var(--accent)';
  const bg = isFail ? '#FEF2F2' : 'var(--accent-light)';
  const border = isFail ? '#FECACA' : 'var(--accent-mid)';
  const badgeLabel = label || (isFail ? 'Dead end' : 'Breakthrough');

  return (
    <div style={{ display: 'flex', gap: 14, marginBottom: 18 }}>
      <div style={{
        flexShrink: 0, width: 28, height: 28, borderRadius: '50%',
        background: bg, border: `1.5px solid ${border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 800, color,
      }}>
        {isFail ? '✕' : '✓'}
      </div>
      <div style={{ flex: 1, paddingTop: 2, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{title}</span>
          <span style={{
            fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em',
            color, background: bg, border: `1px solid ${border}`, padding: '2px 8px', borderRadius: 10,
          }}>
            {badgeLabel}
          </span>
        </div>
        <p style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{children}</p>
      </div>
    </div>
  );
}

function Callout({ title, children }) {
  return (
    <div style={{
      borderLeft: '3px solid var(--accent)', background: 'var(--accent-light)',
      borderRadius: '0 10px 10px 0', padding: '14px 18px', margin: '18px 0',
    }}>
      {title && (
        <p style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent)', marginBottom: 6 }}>
          {title}
        </p>
      )}
      <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7, margin: 0 }}>{children}</p>
    </div>
  );
}

const METHOD_STYLES = {
  GET:  { bg: '#ECFDF5', color: '#047857', border: '#A7F3D0' },
  POST: { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
};

function EndpointRow({ method, path, desc, blocked }) {
  const m = METHOD_STYLES[method];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
      borderRadius: 8, background: blocked ? '#FEF2F2' : 'var(--bg)',
      border: `1px solid ${blocked ? '#FECACA' : 'var(--border)'}`,
      flexWrap: 'wrap', marginBottom: 8,
    }}>
      <span style={{
        fontSize: 11, fontWeight: 800, padding: '3px 8px', borderRadius: 6,
        background: m.bg, color: m.color, border: `1px solid ${m.border}`,
        fontFamily: 'monospace', flexShrink: 0,
      }}>
        {method}
      </span>
      <code style={{ fontSize: 13, fontWeight: 600, color: blocked ? '#1E293B' : 'var(--text)', flexShrink: 0 }}>{path}</code>
      <span style={{ fontSize: 13, color: blocked ? '#991B1B' : 'var(--text-muted)' }}>→ {desc}</span>
      {blocked && (
        <span style={{
          fontSize: 11, fontWeight: 700, color: '#B91C1C', background: '#FEE2E2',
          border: '1px solid #FECACA', padding: '2px 8px', borderRadius: 10, marginLeft: 'auto',
        }}>
          Paywalled
        </span>
      )}
    </div>
  );
}

function GlossaryCard({ term, def }) {
  return (
    <div style={{
      padding: '12px 16px', borderRadius: 10,
      background: 'var(--bg)', border: '1px solid var(--border)',
    }}>
      <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--accent)', marginBottom: 4 }}>{term}</div>
      <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{def}</div>
    </div>
  );
}

function CodeCheck({ ok, code, note }) {
  const color = ok ? 'var(--accent)' : '#B91C1C';
  const bg = ok ? 'var(--accent-light)' : '#FEF2F2';
  const border = ok ? 'var(--accent-mid)' : '#FECACA';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
      borderRadius: 8, background: bg, border: `1px solid ${border}`,
      marginBottom: 8, flexWrap: 'wrap',
    }}>
      <span style={{
        flexShrink: 0, width: 22, height: 22, borderRadius: '50%',
        background: bg, border: `1.5px solid ${border}`, color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, fontWeight: 800,
      }}>
        {ok ? '✓' : '✕'}
      </span>
      <code style={{ fontSize: 13, fontWeight: 600, color: ok ? 'var(--text)' : '#1E293B' }}>{code}</code>
      <span style={{ fontSize: 12.5, color: ok ? 'var(--text-muted)' : '#991B1B' }}>— {note}</span>
    </div>
  );
}

function DifficultyCard({ badgeLabel, title, hook, teaser, tags, children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="v2-card expand-scroll"
      style={{
        padding: 28, marginBottom: 20,
        maxHeight: expanded ? 560 : 'none',
        overflowY: expanded ? 'auto' : 'visible',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
        <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', margin: 0 }}>{title}</h3>
        <span style={{
          fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em',
          color: 'var(--text-muted)', background: 'var(--border-light)', border: '1px solid var(--border)',
          padding: '2px 9px', borderRadius: 10, flexShrink: 0,
        }}>
          {badgeLabel}
        </span>
      </div>

      <p style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 4, fontStyle: 'italic' }}>
        {hook}
      </p>

      {!expanded && (
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, margin: '14px 0 18px' }}>
          {teaser}
        </p>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: expanded ? 18 : 16, marginTop: expanded ? 14 : 0 }}>
        {tags.map(t => <span key={t} className="v2-tag">{t}</span>)}
      </div>

      {expanded && <div style={{ marginBottom: 4 }}>{children}</div>}

      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          background: 'none', border: 'none', padding: 0, cursor: 'pointer',
          fontSize: 13, fontWeight: 700, color: 'var(--accent)',
          display: 'inline-flex', alignItems: 'center', gap: 4,
        }}
      >
        {expanded ? '− Show less' : '+ Expand for full breakdown'}
      </button>
    </div>
  );
}

const ARCHITECTURE_TABS = [
  { key: 'overview', label: 'System Overview' },
  { key: 'pipeline', label: 'The Pipeline, Function by Function' },
  { key: 'auth', label: 'Scan Authentication' },
  { key: 'data', label: 'Data Destination' },
];

const DATA_DEST_WHY = [
  {
    title: 'Why HEC, not a Universal Forwarder',
    body: "The standard way to get data into Splunk is a Universal Forwarder tailing log files on disk — but there's no log file here, just a Python script generating JSON in memory. HTTP Event Collector exists specifically for this case: a token-authenticated REST endpoint that lets any script or application POST data straight into Splunk over HTTPS, with no forwarder installed at all.",
  },
  {
    title: 'Why a dedicated index',
    body: 'Scan data lands in its own index, nessus_scans, rather than mixing into an existing one. That separation means retention can be controlled independently, access can be restricted independently, and searches stay fast and relevant instead of filtering through unrelated data every time.',
  },
];

function ArchitectureDiagram() {
  return (
    <svg viewBox="0 0 640 170" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <marker id="archArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" style={{ fill: 'var(--text-light)' }} />
        </marker>
      </defs>

      <rect x="10" y="50" width="150" height="70" rx="8" style={{ fill: '#3B82F612', stroke: '#3B82F6' }} strokeWidth="1.5" />
      <text x="85" y="78" textAnchor="middle" fontSize="12" fontWeight="800" style={{ fill: '#3B82F6' }}>Nessus</text>
      <text x="85" y="93" textAnchor="middle" fontSize="8" style={{ fill: 'var(--text-muted)' }}>Authenticated scans</text>
      <text x="85" y="104" textAnchor="middle" fontSize="8" style={{ fill: 'var(--text-muted)' }}>8-device fleet</text>

      <line x1="160" y1="85" x2="235" y2="85" style={{ stroke: 'var(--text-light)' }} strokeWidth="1.5" markerEnd="url(#archArrow)" />
      <text x="197" y="77" textAnchor="middle" fontSize="7.5" style={{ fill: 'var(--text-light)' }}>REST API</text>

      <rect x="245" y="30" width="150" height="110" rx="8" style={{ fill: 'var(--accent-light)', stroke: 'var(--accent)' }} strokeWidth="1.5" />
      <text x="320" y="55" textAnchor="middle" fontSize="12" fontWeight="800" style={{ fill: 'var(--accent)' }}>Python</text>
      <text x="320" y="70" textAnchor="middle" fontSize="8" style={{ fill: 'var(--text)' }}>login()</text>
      <text x="320" y="83" textAnchor="middle" fontSize="8" style={{ fill: 'var(--text)' }}>scan_id()</text>
      <text x="320" y="96" textAnchor="middle" fontSize="8" style={{ fill: 'var(--text)' }}>poll_scan()</text>
      <text x="320" y="109" textAnchor="middle" fontSize="8" style={{ fill: 'var(--text)' }}>send_to_splunk()</text>
      <text x="320" y="125" textAnchor="middle" fontSize="7" style={{ fill: 'var(--text-muted)' }}>CVE · CVSS · VPR · EPSS</text>

      <line x1="395" y1="85" x2="470" y2="85" style={{ stroke: 'var(--text-light)' }} strokeWidth="1.5" markerEnd="url(#archArrow)" />
      <text x="432" y="77" textAnchor="middle" fontSize="7.5" style={{ fill: 'var(--text-light)' }}>HEC</text>

      <rect x="480" y="50" width="150" height="70" rx="8" style={{ fill: '#10B98112', stroke: '#10B981' }} strokeWidth="1.5" />
      <text x="555" y="78" textAnchor="middle" fontSize="12" fontWeight="800" style={{ fill: '#10B981' }}>Splunk</text>
      <text x="555" y="93" textAnchor="middle" fontSize="8" style={{ fill: 'var(--text-muted)' }}>nessus_scans index</text>
      <text x="555" y="104" textAnchor="middle" fontSize="8" style={{ fill: 'var(--text-muted)' }}>Dashboard panels</text>

      <text x="320" y="158" textAnchor="middle" fontSize="9" fontWeight="700" style={{ fill: 'var(--accent)' }}>
        Scan → dashboard visibility: 15 min → under 2 sec
      </text>
    </svg>
  );
}

function ComingSoonPanel() {
  return (
    <div style={{ border: '1.5px dashed var(--border)', borderRadius: 10, padding: '32px 20px', textAlign: 'center' }}>
      <p style={{ fontSize: 13.5, color: 'var(--text-muted)', fontStyle: 'italic', margin: 0 }}>
        More detail coming soon.
      </p>
    </div>
  );
}

function ArchitectureSection() {
  const [tab, setTab] = useState('overview');

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ marginTop: 12, marginBottom: 20, paddingTop: 28, borderTop: '2px solid var(--border)' }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', marginBottom: 8, letterSpacing: '-0.01em' }}>
          Architecture
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
          How the pipeline is put together, broken into four parts.
        </p>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {ARCHITECTURE_TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={tab === t.key ? 'v2-btn v2-btn-primary' : 'v2-btn v2-btn-outline'}
            style={{ fontSize: 13, padding: '8px 16px' }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="v2-card" style={{ padding: 28 }}>
        {tab === 'overview' && (
          <>
            <p style={{ fontSize: 14.5, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 18 }}>
              The pipeline is a straight line from scan to dashboard, with no manual step anywhere in
              between: Nessus runs the scan, a Python script pulls and processes the results, and
              Splunk turns that data into something searchable and visual.
            </p>
            <ArchitectureDiagram />
            <p style={{ fontSize: 14.5, color: 'var(--text-muted)', lineHeight: 1.8, marginTop: 18, marginBottom: 0 }}>
              Nessus handles the actual scanning across all 8 devices in the fleet. Once a scan
              completes, the script authenticates into Nessus's API, pulls the full structured
              results for that scan, and pushes them into Splunk via HTTP Event Collector — landing
              in a dedicated index built for this data specifically. From there, the dashboard is
              just Splunk querying that index.
            </p>
          </>
        )}
        {tab === 'pipeline' && <ComingSoonPanel />}
        {tab === 'auth' && (
          <>
            <p style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.75, fontStyle: 'italic', marginBottom: 20 }}>
              Context: The pipeline actually involves two separate authentication layers that are
              easy to conflate — the Python script's own login into the Nessus API (session-token
              based, using a username/password to obtain a token) is entirely separate from how
              Nessus itself logs into each target device to perform a credentialed scan. This
              section covers the second one: how Nessus authenticates into the fleet, not how the
              script authenticates into Nessus.
            </p>

            <h4 style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>Problem</h4>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 18 }}>
              An unauthenticated scan only sees what's visible externally — open ports, exposed
              services. To get real depth (missing patches, misconfigurations, installed package
              versions), Nessus needs to log into each target and inspect it from the inside. That
              means the scanner itself needs valid credentials across every device in the fleet.
            </p>

            <h4 style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>Approach</h4>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 18 }}>
              Generated a dedicated SSH keypair specifically for scanning — a service credential
              separate from any individual's personal access. Nessus holds the private key; the
              public key was distributed to every device in the fleet. When a scan runs, Nessus
              authenticates into each target using that key and performs a full credentialed scan
              with real system-level visibility.
            </p>

            <Callout title="Why a Separate Key, Not Personal Access">
              Keeping scan credentials as their own dedicated identity — rather than reusing any
              person's individual SSH key — keeps the scanner's access cleanly scoped to exactly
              what it needs to do its job, independent of any one person's account or access changes.
            </Callout>

            <h4 style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginTop: 18, marginBottom: 6 }}>Result</h4>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 0 }}>
              Credentialed scanning enabled across the full fleet, giving Nessus the internal
              visibility needed to surface the 273 findings the pipeline identified.
            </p>
          </>
        )}
        {tab === 'data' && (
          <>
            <p style={{ fontSize: 14.5, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 18 }}>
              Once the script pulls a scan's results, the last step is getting that data into Splunk
              in a form the dashboard can actually query.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12, marginBottom: 20 }}>
              {DATA_DEST_WHY.map(item => (
                <div key={item.title} style={{
                  padding: '16px 18px', borderRadius: 10,
                  background: 'var(--accent-light)', border: '1px solid var(--accent-mid)',
                }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                    {item.body}
                  </div>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 14.5, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 20 }}>
              From there, the dashboard is just SPL queries against that index — severity breakdown,
              exploitability, host-level summaries — all built on the structured fields captured
              earlier (CVE, CVSS, VPR, EPSS).
            </p>

            <Callout title="Gotcha — Null Isn't Actually Null">
              Splunk ingests JSON null values as the literal four-character string "null", not an
              actual null — so standard null-checking logic silently fails against it. The kind of
              thing that breaks a dashboard panel silently rather than throwing an obvious error.
            </Callout>

            <div style={{ marginTop: 4 }}>
              <CodeCheck ok={false} code="isnotnull(field)" note="checks for a real null — silently fails" />
              <CodeCheck ok={true} code='where field!="null"' note="matches the literal string Splunk stores — this is the fix" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function MainProjectView() {
  return (
    <div>
      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px 8px',
        borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
        padding: '16px 0', marginBottom: 32,
      }}>
        <Stat value="99.81%" label="Time-to-visibility reduction" />
        <Stat value="273" label="Total Vulnerabilities Found" />
        <Stat value="24 / 61" label="Critical / high severity" />
        <Stat value="8" label="Devices in fleet" />
      </div>

      {/* Problem */}
      <div className="v2-card" style={{ padding: 28, marginBottom: 20 }}>
        <SectionLabel>The Problem</SectionLabel>
        <p style={{ fontSize: 14.5, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 4 }}>
          Before this pipeline existed, each device in the lab was scanned with Nessus on a weekly
          basis, but getting the results into Splunk was a fully manual process.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, margin: '20px 0 16px' }}>
          {OLD_PROCESS_STEPS.map((step, i) => (
            <React.Fragment key={step}>
              <span style={{
                fontSize: 12.5, fontWeight: 600, color: 'var(--text)',
                background: 'var(--bg)', border: '1px solid var(--border)',
                borderRadius: 20, padding: '7px 14px',
              }}>
                {step}
              </span>
              {i < OLD_PROCESS_STEPS.length - 1 && <span style={{ color: 'var(--text-light)' }}>→</span>}
            </React.Fragment>
          ))}
        </div>

        <span style={{
          display: 'inline-block', fontSize: 11.5, fontWeight: 700, color: '#B91C1C',
          background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 20, padding: '4px 12px',
        }}>
          ~15 min per cycle · no scheduling · inconsistent across the fleet
        </span>
      </div>

      {/* Approach */}
      <div className="v2-card" style={{ padding: 28, marginBottom: 20 }}>
        <SectionLabel>The Approach</SectionLabel>
        <p style={{ fontSize: 14.5, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 18 }}>
          The goal was to close the gap between running a scan and actually seeing results — no
          manual steps in between.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          {APPROACH_ITEMS.map(item => (
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

      {/* Technical Difficulties */}
      <div style={{
        marginTop: 12, marginBottom: 20, paddingTop: 28,
        borderTop: '2px solid var(--border)',
      }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', marginBottom: 8, letterSpacing: '-0.01em' }}>
          Technical Difficulties
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
          Two separate obstacles came up while building this out — solving one had no bearing on
          the other.
        </p>
      </div>

      <DifficultyCard
        badgeLabel="Difficulty 1 of 2"
        title="Nessus Essentials Blocks Data Export"
        hook="The plan was simple: launch scans, export the results, feed them into Splunk. Nessus Essentials had other plans."
        teaser="Resolved by reverse-engineering Nessus's API to find a read-only endpoint that returned the same data — no encrypted files, no XML parsing required."
        tags={['Nessus API', 'CVE/CVSS/VPR/EPSS']}
      >
        <TimelineStep status="fail" title="Raw .nessus file extraction">
          Tried pulling the raw scan output directly from the container filesystem
          (<code style={{ fontSize: 12.5 }}>/opt/nessus/var/nessus/users/&lt;username&gt;/reports/</code>)
          and copying it to the host. Dead end — the files were encrypted and stored in binary,
          readable only by Nessus itself.
        </TimelineStep>

        <TimelineStep status="success" label="Workaround" title="Reverse-engineering the API">
          Turned to Nessus's REST API to see if the same data could be reached a different way.
          Testing endpoint by endpoint revealed a pattern:
        </TimelineStep>

        <div style={{ marginBottom: 4 }}>
          {NESSUS_ENDPOINTS.map(e => <EndpointRow key={e.path + e.method} {...e} />)}
        </div>

        <Callout title="Key Insight">
          Exporting is the paywalled feature — not scanning or reading results.{' '}
          <code style={{ fontSize: 13 }}>GET /scans/&#123;scan_id&#125;</code>, a read-only request,
          returned the same information as the export — just without ever triggering the paywall.
          No XML parsing, no encrypted file handling, just a direct, structured JSON response
          containing everything needed:
        </Callout>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10 }}>
          {DATA_FIELDS.map(f => <GlossaryCard key={f.term} term={f.term} def={f.def} />)}
        </div>
      </DifficultyCard>

      <DifficultyCard
        badgeLabel="Difficulty 2 of 2"
        title="Docker's Phantom-User Bug"
        hook="Deploying Nessus in Docker should have been the easy part — pull the image, run the container, activate. It wasn't."
        teaser="Resolved by running the container fully unmounted — no persistent local storage at all — after two different mount strategies both broke Nessus's activation."
        tags={['Docker', 'Nessus', 'Container Lifecycle']}
      >
        <TimelineStep status="fail" title="Bind-mount the full Nessus data directory">
          Broke immediately — the mount copied over license and registration files, and Tenable's
          server-side license validation rejected the container outright, since registration is
          tied to the original container's identity, not a copy of its files.
        </TimelineStep>

        <TimelineStep status="fail" label="Phantom-user bug" title="Narrow the mount to just users/shash">
          Docker pre-creates a mounted path on the host the moment the container starts, before
          Nessus ever runs its own setup. Nessus's user-existence check reads folder presence under{' '}
          <code style={{ fontSize: 12.5 }}>users/</code> as proof a user already exists, rather than
          checking its actual database — so an empty mounted folder tricked Nessus into thinking the
          <code style={{ fontSize: 12.5 }}> shash</code> user was already registered, corrupting its
          internal state and blocking the real setup wizard, even across full container rebuilds and
          fresh image pulls.
        </TimelineStep>

        <Callout title="Root Cause">
          Any mount created before Nessus had a chance to initialize its own database broke
          activation, no matter how it was scoped. Tenable's own documentation confirmed why —
          Docker deployments of Nessus aren't officially supported for persistent local storage at all.
        </Callout>

        <TimelineStep status="success" label="Resolution" title="Run the container with no mount at all">
          Nessus activates cleanly through the web wizard with a fully disposable container. Since
          scan results flow straight into Splunk via the API pipeline, there was never a need for
          local report files to persist on disk — Splunk became the actual source of truth, not the
          container's filesystem.
        </TimelineStep>
      </DifficultyCard>

      <ArchitectureSection />

      <SectionLabel>Tech Stack</SectionLabel>
      <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap' }}>
        {TECH_STACK.map(group => (
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

function SSHExpandedDetail() {
  return (
    <>
      <h4 style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>Why LDAP</h4>
      <p style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 18 }}>
        Before this, SSH access was managed per-device — every new intern meant manually copying
        their public key into each machine's local <code style={{ fontSize: 12.5 }}>authorized_keys</code>{' '}
        file, one device at a time. That doesn't scale: 8 devices means 8 separate touches for every
        access change. LDAP solves this by centralizing identity — one entry per user controls
        access across the whole fleet, so a key update happens once instead of eight times.
      </p>

      <h4 style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>Directory Structure</h4>
      <p style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 18 }}>
        The LDAP directory is organized hierarchically using standard organizational units to
        separate different types of entries. Each user entry's allowed attributes are governed
        by objectClass definitions — adding SSH key support meant adding the{' '}
        <code style={{ fontSize: 12.5 }}>ldapPublicKey</code> objectClass and its{' '}
        <code style={{ fontSize: 12.5 }}>sshPublicKey</code> attribute to a user's entry, both part
        of the standard <code style={{ fontSize: 12.5 }}>openssh-lpk</code> schema rather than
        something custom-built.
      </p>

      <h4 style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>The Tool: sss_ssh_authorizedkeys</h4>
      <p style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 18 }}>
        SSSD ships its own purpose-built tool for exactly this —{' '}
        <code style={{ fontSize: 12.5 }}>sss_ssh_authorizedkeys</code> — wired into{' '}
        <code style={{ fontSize: 12.5 }}>sshd</code> via{' '}
        <code style={{ fontSize: 12.5 }}>AuthorizedKeysCommand</code>. It queries whatever identity
        provider SSSD is already configured against and fetches the key directly, with no custom
        parsing logic to write or maintain. Confirmed working on one host first, then rolled out
        across the rest of the fleet.
      </p>

      <h4 style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>Result Across the Fleet</h4>
      <p style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 0 }}>
        Centralized key-based auth confirmed working fleet-wide, replacing password-based access
        entirely.
      </p>
    </>
  );
}

function InfraHardeningView() {
  const sshRef = useRef(null);
  const stigRef = useRef(null);
  const migRef = useRef(null);
  const logsRef = useRef(null);

  const navItems = [
    { label: 'SSH & LDAP Auth', ref: sshRef },
    { label: 'STIG Compliance', ref: stigRef },
    { label: 'Legacy Migration', ref: migRef },
    { label: 'System Logs', ref: logsRef },
  ];

  const jumpTo = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div>
      <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 20 }}>
        Infrastructure work that made the main pipeline possible — centralized auth, hardened hosts,
        and a fleet that can actually be scanned consistently.
      </p>

      <nav style={{
        display: 'flex', gap: 28, flexWrap: 'wrap',
        borderBottom: '1px solid var(--border)', paddingBottom: 16, marginBottom: 28,
      }}>
        {navItems.map(item => (
          <button
            key={item.label}
            onClick={() => jumpTo(item.ref)}
            style={{
              background: 'none', border: 'none',
              padding: '2px 0 8px', cursor: 'pointer',
              fontSize: 14, fontWeight: 700, color: 'var(--text)',
              textTransform: 'uppercase', letterSpacing: '0.04em',
              textDecoration: 'underline', textUnderlineOffset: '4px',
              textDecorationColor: 'var(--text-muted)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.textDecorationColor = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.textDecorationColor = 'var(--text-muted)'; }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <InfraSection
        innerRef={sshRef}
        title="Centralized SSH Key Authentication (LDAP / SSSD)"
        problem="Everyone accessed the fleet using password-based authentication, which isn't the most secure method — every access change also meant manually touching each device individually, with no centralized way to manage or revoke credentials. We decided to implement SSH key-based authentication instead."
        approach="Implemented RSA 4096-bit SSH key auth via LDAP/SSSD across the fleet using sss_ssh_authorizedkeys, replacing per-device password access with a single centralized identity source."
        result="Replaced password auth fleet-wide with centralized key-based access, eliminating per-device credential management entirely."
        tags={['OpenLDAP', 'SSSD', 'SSH', 'RSA-4096']}
        extraContent={<SSHExpandedDetail />}
      />

      <InfraSection
        innerRef={stigRef}
        title="DoD STIG Compliance Remediation"
        problem="RHEL 9 hosts needed to meet DoD STIG hardening baselines before being trusted as scan targets or scanner infrastructure."
        approach="Used OpenSCAP/SCAP Workbench with the SSG RHEL 9 tailoring profile to remediate findings across authorized user access, DNS persistence, ungrouped/orphaned files, user namespace restrictions, SSSD certmap config, chrony directives, and SELinux sudoers contexts."
        result="Brought RHEL 9 hosts into STIG compliance, establishing a hardened baseline across the fleet."
        tags={['OpenSCAP', 'SCAP Workbench', 'RHEL 9', 'SELinux']}
        extra={FAKE_EXTRA}
      />

      <InfraSection
        innerRef={migRef}
        title="Legacy Auth Migration (nslcd → SSSD)"
        problem="Older hosts relied on nslcd for LDAP lookups, which doesn't support the SSH key lookup the fleet standardized on."
        approach="Migrated identity management from nslcd to SSSD across multiple hosts, resolving LDAP-based SSH key lookup along the way."
        result="Unified identity management fleet-wide on SSSD, enabling consistent key-based SSH across devices."
        tags={['SSSD', 'LDAP', 'Linux']}
        extra={FAKE_EXTRA}
      />

      <InfraSection
        innerRef={logsRef}
        title="System Logs to Splunk"
        problem="Vulnerability scan data was already flowing into Splunk, but system-level activity — logins, authentication attempts, kernel events — had no centralized visibility. Investigating a potential security event meant manually SSHing into each device individually and grepping through local log files one at a time."
        approach="Deployed Splunk Universal Forwarder across the fleet, forwarding system and authentication logs into a dedicated system_logs index separate from the vulnerability scan data — keeping the two data sources cleanly separated for retention and access control, same reasoning as the dashboard's own indexing strategy."
        result="Centralized system/auth log visibility across the majority of the fleet. What used to require manually connecting to multiple devices and searching local files individually now takes a single Splunk query — cutting time-to-visibility for a basic security check from over a minute and a half down to about 3 seconds, a ~97% reduction."
        tags={['Splunk Universal Forwarder', 'Syslog', 'Auth Log', 'SPL']}
        extra={FAKE_EXTRA}
      />
    </div>
  );
}

export default function ViceroyDetailPage() {
  const [view, setView] = useState(null);

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
                Griffiss Institute &middot; Viceroy Envoy
              </div>
              <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>
                San Antonio, TX
              </span>
            </div>
            <h1 style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 10 }}>
              Automated Vulnerability Management Pipeline
            </h1>
            <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
              Cybersecurity Engineering Intern · June 2026 – August 2026
            </p>
          </div>

          <div className="v2-divider" style={{ marginBottom: 36 }} />

          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 40 }}>
            <button
              onClick={() => setView('main')}
              className={view === 'main' ? 'v2-btn v2-btn-primary' : 'v2-btn v2-btn-outline'}
              style={{ fontSize: 14 }}
            >
              Main Project
            </button>
            <button
              onClick={() => setView('infra')}
              className={view === 'infra' ? 'v2-btn v2-btn-primary' : 'v2-btn v2-btn-outline'}
              style={{ fontSize: 14 }}
            >
              Infrastructure &amp; Hardening
            </button>
          </div>

          {view === 'main' && <MainProjectView />}
          {view === 'infra' && <InfraHardeningView />}

        </div>
      </section>

      <style>{`
        .expand-scroll::-webkit-scrollbar { width: 5px; }
        .expand-scroll::-webkit-scrollbar-track { background: transparent; }
        .expand-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
        .expand-scroll::-webkit-scrollbar-thumb:hover { background: var(--text-light); }
      `}</style>
    </div>
  );
}
