'use client';
import { Mail, Phone, MapPin, GitFork, Link2, AtSign, Globe, Send, Terminal } from 'lucide-react';

interface ContactProps {
  email: string; phone: string; location: string;
  github: string; linkedin: string; twitter: string; website: string; name: string;
}

export default function Contact(p: ContactProps) {
  return (
    <section id="contact" style={{ padding: '110px 0 70px', position: 'relative' }}>
      <div className="section-sep" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />
      <div className="orb orb-cyan"   style={{ position: 'absolute', width: 400, height: 400, bottom: '10%', left: '20%', opacity: 0.5 }} />
      <div className="orb orb-violet" style={{ position: 'absolute', width: 300, height: 300, top: '20%', right: '5%',  opacity: 0.5 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-label" style={{ color: 'var(--gold)', marginBottom: 16, justifyContent: 'center' }}>
            GET IN TOUCH
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 14 }}>
            Let&apos;s <span className="text-gradient-gold">Work Together</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: 440, margin: '0 auto' }}>
            Have a project in mind? Let&apos;s discuss how I can help bring your ideas to life.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }} className="contact-grid">

          {/* Left */}
          <div>
            {/* Terminal card */}
            <div className="glass scanline" style={{ borderRadius: 18, overflow: 'hidden', marginBottom: 20, border: '1px solid var(--border-mid)' }}>
              <div className="terminal-chrome">
                <div className="terminal-dot dot-red" />
                <div className="terminal-dot dot-yellow" />
                <div className="terminal-dot dot-green" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', marginLeft: 10 }}>contact.sh</span>
              </div>
              <div style={{ padding: '20px 22px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                  <span className="neon-cyan">$</span> whoami
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--emerald)', marginBottom: 18 }}>
                  {p.name} <span style={{ color: 'var(--text-muted)' }}>—</span> Available for freelance
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 6 }}>
                  <span className="neon-cyan">$</span> cat contact.json
                </div>
                <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '0.73rem', lineHeight: 1.9, margin: 0, whiteSpace: 'pre-wrap' }}>
                  <span style={{ color: 'var(--border-bright)' }}>{'{'}</span>{'\n'}
                  {'  '}<span style={{ color: 'var(--violet-2)' }}>&quot;email&quot;</span><span style={{ color: 'var(--text-dim)' }}>: </span><span style={{ color: 'var(--emerald)' }}>&quot;{p.email}&quot;</span>,{'\n'}
                  {'  '}<span style={{ color: 'var(--violet-2)' }}>&quot;phone&quot;</span><span style={{ color: 'var(--text-dim)' }}>: </span><span style={{ color: 'var(--emerald)' }}>&quot;{p.phone}&quot;</span>,{'\n'}
                  {'  '}<span style={{ color: 'var(--violet-2)' }}>&quot;location&quot;</span><span style={{ color: 'var(--text-dim)' }}>: </span><span style={{ color: 'var(--emerald)' }}>&quot;{p.location}&quot;</span>,{'\n'}
                  {'  '}<span style={{ color: 'var(--violet-2)' }}>&quot;status&quot;</span><span style={{ color: 'var(--text-dim)' }}>: </span><span style={{ color: 'var(--gold)' }}>&quot;available&quot;</span>{'\n'}
                  <span style={{ color: 'var(--border-bright)' }}>{'}'}</span>
                </pre>
              </div>
            </div>

            {/* Contact cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: <Mail size={16} />, label: 'Email', value: p.email, href: `mailto:${p.email}`, color: 'var(--cyan)', glow: 'rgba(0,229,255,0.12)' },
                { icon: <Phone size={16} />, label: 'Phone', value: p.phone, href: `tel:${p.phone}`, color: 'var(--violet-2)', glow: 'rgba(167,139,250,0.12)' },
                { icon: <MapPin size={16} />, label: 'Location', value: p.location, href: '', color: 'var(--emerald)', glow: 'rgba(0,245,160,0.12)' },
              ].filter(c => c.value).map((c, i) => (
                <a key={i} href={c.href || undefined} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  background: 'rgba(8,18,36,0.6)', border: '1px solid var(--border)',
                  borderRadius: 14, padding: '14px 18px', textDecoration: 'none',
                  backdropFilter: 'blur(8px)', transition: 'all 0.25s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = c.color.replace('var(--','').replace(')',''); e.currentTarget.style.background = c.glow; e.currentTarget.style.transform = 'translateX(6px)'; e.currentTarget.style.boxShadow = `0 6px 24px ${c.glow}`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(8,18,36,0.6)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: `${c.glow}`, border: `1px solid ${c.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color, flexShrink: 0 }}>
                    {c.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 2, letterSpacing: '0.08em' }}>{c.label}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text)' }}>{c.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* CTA */}
            <div className="glass gradient-border" style={{
              borderRadius: 20, padding: 36, textAlign: 'center', flex: 1,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18,
              background: 'linear-gradient(135deg, rgba(0,229,255,0.04), rgba(167,139,250,0.04))',
              border: '1px solid var(--border-mid)',
            }}>
              <div style={{
                width: 68, height: 68, borderRadius: 20,
                background: 'linear-gradient(135deg, rgba(0,229,255,0.12), rgba(167,139,250,0.12))',
                border: '1px solid rgba(0,229,255,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 30px rgba(0,229,255,0.1)',
              }}>
                <Terminal size={28} color="var(--cyan)" />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.4rem', color: 'var(--text)', marginBottom: 10 }}>
                  Ready to Start?
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.65, maxWidth: 290 }}>
                  Send me an email and let&apos;s talk about your next big project.
                </p>
              </div>
              <a href={`mailto:${p.email}`} className="btn-primary">
                <Send size={14} /> Send Email
              </a>
            </div>

            {/* Socials grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { href: p.github,   icon: <GitFork size={18} />, label: 'GitHub',   col: 'var(--text)' },
                { href: p.linkedin, icon: <Link2 size={18} />,   label: 'LinkedIn', col: '#0a66c2' },
                { href: p.twitter,  icon: <AtSign size={18} />,  label: 'Twitter',  col: '#1d9bf0' },
                { href: p.website,  icon: <Globe size={18} />,   label: 'Website',  col: 'var(--emerald)' },
              ].filter(s => s.href).map((s, i) => (
                <a key={i} href={s.href.startsWith('http') ? s.href : `https://${s.href}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    background: 'rgba(8,18,36,0.6)', border: '1px solid var(--border)',
                    borderRadius: 12, padding: '13px 16px', textDecoration: 'none',
                    color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                    backdropFilter: 'blur(8px)', transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-mid)'; e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-dim)'; e.currentTarget.style.transform = 'none'; }}
                >
                  {s.icon}{s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 64, paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div className="glow-divider" style={{ position: 'absolute', left: 24, right: 24, marginTop: -28 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} {p.name}. Built with Next.js + MongoDB Atlas.
          </span>
          <a href="/admin" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--border-bright)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--cyan)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--border-bright)'}
          >admin ↗</a>
        </div>
      </div>

      <style>{`@media(max-width:768px){.contact-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
