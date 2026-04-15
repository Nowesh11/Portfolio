'use client';
import { useEffect, useState, useRef } from 'react';
import { Download, GitFork, Link2, AtSign, Globe, ChevronDown, Cpu, Zap, Code2, Sparkles, BrainCircuit } from 'lucide-react';

interface HeroProps {
  name: string; title: string; tagline: string; bio: string;
  github: string; linkedin: string; twitter: string; website: string;
  profileImage: string; profileImageType: string;
  stats: { label: string; value: string }[];
}

const WORDS = (title: string) => [title, 'AI Developer', 'Game Developer', '3D Artist', 'Problem Solver'];

export default function Hero(p: HeroProps) {
  const [typed, setTyped] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);
  const words = WORDS(p.title);

  const [particles] = useState(() =>
    Array.from({ length: 28 }, (_, i) => ({
      x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: 4 + Math.random() * 5,
      delay: Math.random() * 6,
      color: ['#00e5ff','#a78bfa','#00f5a0','#fbbf24'][i % 4],
    }))
  );

  useEffect(() => {
    if (pause) return;
    const word = words[wordIdx];
    const speed = deleting ? 45 : charIdx === word.length ? 1400 : 90;
    const t = setTimeout(() => {
      if (!deleting && charIdx < word.length) {
        setTyped(word.slice(0, charIdx + 1)); setCharIdx(c => c + 1);
      } else if (!deleting && charIdx === word.length) {
        setPause(true);
        setTimeout(() => { setPause(false); setDeleting(true); }, 1800);
      } else if (deleting && charIdx > 0) {
        setTyped(word.slice(0, charIdx - 1)); setCharIdx(c => c - 1);
      } else {
        setDeleting(false); setWordIdx(w => (w + 1) % words.length);
      }
    }, speed);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, pause, words]);

  return (
    <section id="about" style={{
      minHeight: '100vh', position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center',
    }}>
      {/* Circuit grid bg */}
      <div className="circuit-bg" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      {/* Orbs */}
      <div className="orb orb-cyan animate-float" style={{ width: 500, height: 500, top: '-15%', left: '-10%', zIndex: 0 }} />
      <div className="orb orb-violet animate-float" style={{ width: 400, height: 400, bottom: '10%', right: '-8%', zIndex: 0, animationDelay: '2s' }} />
      <div className="orb orb-emerald" style={{ width: 300, height: 300, top: '60%', left: '40%', zIndex: 0, opacity: 0.5 }} />

      {/* Floating particles */}
      {particles.map((pt, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${pt.x}%`, top: `${pt.y}%`,
          width: pt.size, height: pt.size, borderRadius: '50%',
          background: pt.color, opacity: 0.5, zIndex: 0,
          animation: `particleDrift ${pt.duration}s ease-in-out infinite`,
          animationDelay: `${pt.delay}s`,
          boxShadow: `0 0 ${pt.size * 3}px ${pt.color}`,
        }} />
      ))}

      {/* Vertical accent lines */}
      <div style={{ position: 'absolute', top: 0, right: '18%', width: 1, height: '100%', background: 'linear-gradient(180deg,transparent,rgba(0,229,255,0.12),transparent)', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: 0, left: '8%', width: 1, height: '100%', background: 'linear-gradient(180deg,transparent,rgba(167,139,250,0.08),transparent)', zIndex: 0 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '100px 24px 60px', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 60, alignItems: 'center' }} className="hero-grid">

          {/* LEFT */}
          <div style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) both' }}>

            {/* Available badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28, animation: 'fadeInUp 0.6s ease both' }}
              className="badge badge-green">
              <span className="status-dot online" />
              AVAILABLE FOR FREELANCE
            </div>

            {/* Name */}
            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'clamp(2.8rem, 6.5vw, 5rem)', lineHeight: 1.0,
              color: 'var(--text)', marginBottom: 16, letterSpacing: '-0.03em',
            }}>
              {p.name.split(' ').map((word, i) => (
                <span key={i} style={{ display: 'block' }}>
                  {i === (p.name.split(' ').length - 1)
                    ? <span className="text-gradient-main">{word}</span>
                    : word}
                </span>
              ))}
            </h1>

            {/* Typed */}
            <div style={{ height: 48, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 0 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1rem, 2.5vw, 1.35rem)', color: 'var(--cyan)' }}>
                &gt; {typed}
              </span>
              <span className="neon-cyan animate-blink" style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', marginLeft: 2 }}>▋</span>
            </div>

            {/* Tagline */}
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-muted)', letterSpacing: '0.07em', marginBottom: 22 }}>
              <span style={{ color: 'var(--violet-2)' }}>/*</span> {p.tagline} <span style={{ color: 'var(--violet-2)' }}>*/</span>
            </p>

            {/* Bio */}
            <p style={{ fontSize: '1.02rem', color: 'var(--text-dim)', lineHeight: 1.75, maxWidth: 540, marginBottom: 36 }}>
              {p.bio}
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
              <a href="#projects" className="btn-primary">
                <Code2 size={15} /> View Projects
              </a>
              <a href="/api/resume" download className="btn-secondary">
                <Download size={15} /> Download Resume
              </a>
            </div>

            {/* Socials */}
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { href: p.github, icon: <GitFork size={16} />, label: 'GitHub' },
                { href: p.linkedin, icon: <Link2 size={16} />, label: 'LinkedIn' },
                { href: p.twitter, icon: <AtSign size={16} />, label: 'Twitter' },
                { href: p.website, icon: <Globe size={16} />, label: 'Website' },
              ].filter(s => s.href).map(s => (
                <a key={s.label} href={s.href.startsWith('http') ? s.href : `https://${s.href}`}
                  target="_blank" rel="noopener noreferrer" title={s.label}
                  style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: 'rgba(0,229,255,0.04)', border: '1px solid var(--border-mid)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-muted)', textDecoration: 'none',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--cyan)';
                    e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)';
                    e.currentTarget.style.background = 'rgba(0,229,255,0.08)';
                    e.currentTarget.style.boxShadow = '0 0 16px rgba(0,229,255,0.15)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.borderColor = 'var(--border-mid)';
                    e.currentTarget.style.background = 'rgba(0,229,255,0.04)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'none';
                  }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* RIGHT — Profile image */}
          <div style={{ position: 'relative', width: 340, height: 340, flexShrink: 0, animation: 'fadeIn 1s ease both 0.3s' }} className="hero-image-wrap">
            {/* Outer orbit */}
            <div style={{
              position: 'absolute', inset: -36, borderRadius: '50%',
              border: '1px dashed rgba(0,229,255,0.18)',
              animation: 'spinSlow 28s linear infinite',
            }}>
              {[0, 90, 180, 270].map((deg, i) => (
                <div key={deg} style={{
                  position: 'absolute', borderRadius: '50%',
                  width: i % 2 === 0 ? 9 : 6, height: i % 2 === 0 ? 9 : 6,
                  background: i % 2 === 0 ? 'var(--cyan)' : 'var(--violet-2)',
                  top: '50%', left: '50%',
                  transform: `rotate(${deg}deg) translateX(176px) translateY(-50%)`,
                  boxShadow: `0 0 ${i % 2 === 0 ? 10 : 6}px ${i % 2 === 0 ? 'var(--cyan)' : 'var(--violet-2)'}`,
                }} />
              ))}
            </div>

            {/* Middle ring */}
            <div style={{
              position: 'absolute', inset: -14, borderRadius: '50%',
              border: '1px solid rgba(167,139,250,0.25)',
              animation: 'spinSlowReverse 18s linear infinite',
            }}>
              {[45, 225].map((deg, i) => (
                <div key={deg} style={{
                  position: 'absolute', borderRadius: '50%', width: 5, height: 5,
                  background: 'var(--emerald)',
                  top: '50%', left: '50%',
                  transform: `rotate(${deg}deg) translateX(157px) translateY(-50%)`,
                  boxShadow: '0 0 8px var(--emerald)',
                }} />
              ))}
            </div>

            {/* Image circle */}
            <div style={{
              width: '100%', height: '100%', borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(0,229,255,0.1), rgba(167,139,250,0.12))',
              border: '2px solid rgba(0,229,255,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', position: 'relative',
              boxShadow: '0 0 60px rgba(0,229,255,0.15), 0 0 120px rgba(167,139,250,0.08), inset 0 0 40px rgba(0,229,255,0.05)',
            }}>
              {p.profileImage ? (
                <img src={`data:${p.profileImageType};base64,${p.profileImage}`} alt={p.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '5rem', marginBottom: 8 }}>👨‍💻</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>profile.jpg</div>
                </div>
              )}
              {/* Shine overlay */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)',
                pointerEvents: 'none',
              }} />
            </div>

            {/* Floating badges */}
            <div className="glass animate-float" style={{
              position: 'absolute', bottom: -12, right: -18,
              border: '1px solid rgba(0,229,255,0.3)',
              borderRadius: 14, padding: '9px 16px',
              display: 'flex', alignItems: 'center', gap: 7,
              boxShadow: '0 4px 24px rgba(0,229,255,0.15)',
              animationDelay: '0s',
            }}>
              <BrainCircuit size={14} color="var(--cyan)" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--cyan)' }}>AI Powered</span>
            </div>
            <div className="glass animate-float" style={{
              position: 'absolute', top: -8, left: -24,
              border: '1px solid rgba(167,139,250,0.3)',
              borderRadius: 14, padding: '9px 16px',
              display: 'flex', alignItems: 'center', gap: 7,
              boxShadow: '0 4px 24px rgba(167,139,250,0.15)',
              animationDelay: '1.5s',
            }}>
              <Sparkles size={14} color="var(--violet-2)" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--violet-2)' }}>Full-Stack</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: `repeat(${p.stats.length}, 1fr)`,
          marginTop: 64, borderRadius: 20, overflow: 'hidden',
          border: '1px solid var(--border-mid)',
          background: 'rgba(4,12,26,0.6)', backdropFilter: 'blur(12px)',
          boxShadow: '0 0 40px rgba(0,229,255,0.05)',
        }} className="stats-grid">
          {p.stats.map((s, i) => (
            <div key={i} style={{
              padding: '28px 20px', textAlign: 'center',
              borderRight: i < p.stats.length - 1 ? '1px solid var(--border)' : 'none',
              position: 'relative', overflow: 'hidden',
              transition: 'background 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,229,255,0.04)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ fontSize: '0.4rem', color: 'transparent', position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: i % 2 === 0 ? 'linear-gradient(90deg,var(--cyan),var(--violet-2))' : 'linear-gradient(90deg,var(--violet-2),var(--emerald))' }} />
              <div className="stat-number">{s.value}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginTop: 6 }}>
                {s.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <div style={{ textAlign: 'center', marginTop: 44 }}>
          <ChevronDown size={20} color="var(--text-muted)" className="animate-float" style={{ opacity: 0.5 }} />
        </div>
      </div>

      <style>{`
        @keyframes spinSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes spinSlowReverse{from{transform:rotate(360deg)}to{transform:rotate(0deg)}}
        @keyframes particleDrift{0%,100%{transform:translateY(0) translateX(0) scale(1);opacity:.5} 25%{transform:translateY(-20px) translateX(10px) scale(1.1)} 50%{transform:translateY(-35px) translateX(-5px) scale(.9);opacity:.2} 75%{transform:translateY(-20px) translateX(-10px) scale(1.05)}}
        @media(max-width:900px){
          .hero-grid{grid-template-columns:1fr!important;text-align:center}
          .hero-image-wrap{width:260px!important;height:260px!important;margin:0 auto}
          .stats-grid{grid-template-columns:repeat(2,1fr)!important}
        }
      `}</style>
    </section>
  );
}
