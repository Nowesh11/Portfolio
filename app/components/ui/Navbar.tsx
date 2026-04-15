'use client';
import { useState, useEffect } from 'react';
import { Menu, X, Terminal, Download } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navLinks.map(l => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(2,8,23,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px) saturate(1.5)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border-mid)' : 'none',
      boxShadow: scrolled ? '0 4px 30px rgba(0,229,255,0.04)' : 'none',
      transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
    }}>
      {/* Top cyan line when scrolled */}
      {scrolled && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,var(--cyan),var(--violet-2),transparent)', opacity: 0.6 }} />
      )}

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 66 }}>
        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(167,139,250,0.15))',
            border: '1px solid rgba(0,229,255,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 16px rgba(0,229,255,0.12)',
            transition: 'box-shadow 0.3s ease',
          }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 24px rgba(0,229,255,0.3)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 16px rgba(0,229,255,0.12)'}
          >
            <Terminal size={14} color="var(--cyan)" />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--text)' }}>
            {name.split(' ')[0]}<span className="neon-cyan">.</span>
          </span>
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="hidden-mobile">
          {navLinks.map(l => {
            const isActive = active === l.href.slice(1);
            return (
              <a key={l.href} href={l.href} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.73rem',
                color: isActive ? 'var(--cyan)' : 'var(--text-dim)',
                textDecoration: 'none', letterSpacing: '0.06em',
                transition: 'all 0.2s ease', position: 'relative',
                textShadow: isActive ? '0 0 10px rgba(0,229,255,0.4)' : 'none',
              }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = 'var(--text)'; } }}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = 'var(--text-dim)'; } }}
              >
                {isActive && <span style={{ position: 'absolute', bottom: -4, left: 0, right: 0, height: 1, background: 'var(--cyan)', borderRadius: 2, boxShadow: '0 0 6px var(--cyan)' }} />}
                {l.label}
              </a>
            );
          })}
        </div>

        {/* Resume button */}
        <div className="hidden-mobile">
          <a href="/api/resume" download style={{
            display: 'flex', alignItems: 'center', gap: 7,
            background: 'rgba(0,229,255,0.06)', color: 'var(--cyan)',
            border: '1px solid rgba(0,229,255,0.3)', borderRadius: 9,
            padding: '8px 18px', fontSize: '0.73rem',
            fontFamily: 'var(--font-mono)', textDecoration: 'none',
            transition: 'all 0.25s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,229,255,0.12)'; e.currentTarget.style.boxShadow = '0 0 18px rgba(0,229,255,0.18)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,229,255,0.06)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <Download size={12} /> Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)}
          style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer', padding: 4, display: 'none' }}
          className="show-mobile">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: 'rgba(2,8,23,0.97)', backdropFilter: 'blur(20px)',
          padding: '8px 24px 24px', borderBottom: '1px solid var(--border-mid)',
          borderTop: '1px solid var(--border)',
        }}>
          {navLinks.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              display: 'block', padding: '13px 0',
              fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
              color: active === l.href.slice(1) ? 'var(--cyan)' : 'var(--text-dim)',
              textDecoration: 'none', borderBottom: '1px solid var(--border)',
              transition: 'color 0.2s',
            }}>{l.label}</a>
          ))}
          <a href="/api/resume" download style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 18,
            color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', textDecoration: 'none',
          }}><Download size={12} /> Download Resume</a>
        </div>
      )}
    </nav>
  );
}
