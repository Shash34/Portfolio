import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const links = [
  { icon: <FaLinkedin size={22} />, label: 'LinkedIn',  href: 'https://www.linkedin.com/in/shashankkes3',                                    handle: 'shashankkes3'     },
  { icon: <FaGithub size={22} />,   label: 'GitHub',    href: 'https://github.com/Shash34',                                                  handle: 'Shash34'          },
  { icon: <FaInstagram size={22} />,label: 'Instagram', href: 'https://www.instagram.com/shashankk10111?igsh=b2t0cHhrN3VjeTM4',             handle: '@shashankk10111'  },
];

export default function ContactPage() {
  return (
    <div className="v2-page">
      <section className="v2-section">
        <div className="v2-container" style={{ maxWidth: 640 }}>
          <p className="v2-section-label">Contact</p>
          <h2 className="v2-section-title">Let's connect</h2>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', marginBottom: 48, lineHeight: 1.7 }}>
            I'm currently open to internship opportunities starting Summer 2027.
            Feel free to reach out — whether it's about a role, a project, or just to connect.
          </p>

          {/* Email CTA */}
          <div className="v2-card" style={{ padding: '32px', marginBottom: 32, textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email</div>
            <a href="mailto:shashankk.college@gmail.com" style={{
              fontSize: 20, fontWeight: 700, color: 'var(--accent)',
              textDecoration: 'none', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--accent-hover)'}
              onMouseLeave={e => e.target.style.color = 'var(--accent)'}
            >
              shashankk.college@gmail.com
            </a>
            <div style={{ marginTop: 20 }}>
              <a href="mailto:shashankk.college@gmail.com" className="v2-btn v2-btn-primary">
                Send Email →
              </a>
            </div>
          </div>

          {/* Social links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {links.map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="v2-card" style={{
                padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 16,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'var(--accent-light)', border: '1px solid var(--accent-mid)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent)', flexShrink: 0,
                }}>
                  {l.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>{l.label}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{l.handle}</div>
                </div>
                <span style={{ marginLeft: 'auto', color: 'var(--text-light)', fontSize: 18 }}>→</span>
              </a>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
