'use client';
import { useState } from 'react';
import { Layers, Code2, Brain, Database, Gamepad2, Box, Smartphone, Monitor, Cpu, GitBranch, Terminal, Palette } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  'Web Development': <Code2 size={18} />, 'Mobile & Desktop': <Smartphone size={18} />,
  'AI & Backend': <Brain size={18} />, 'Languages': <Terminal size={18} />,
  'Game & 3D': <Gamepad2 size={18} />, 'Databases': <Database size={18} />,
  'Desktop': <Monitor size={18} />, '3D Design': <Box size={18} />,
  'DevOps': <GitBranch size={18} />, 'Hardware': <Cpu size={18} />, 'Design': <Palette size={18} />,
};

const PALETTE = [
  { bg: 'rgba(0,229,255,0.06)',   border: 'rgba(0,229,255,0.25)',   color: '#00e5ff', glow: 'rgba(0,229,255,0.12)' },
  { bg: 'rgba(167,139,250,0.06)', border: 'rgba(167,139,250,0.25)', color: '#a78bfa', glow: 'rgba(167,139,250,0.12)' },
  { bg: 'rgba(0,245,160,0.06)',   border: 'rgba(0,245,160,0.25)',   color: '#00f5a0', glow: 'rgba(0,245,160,0.12)' },
  { bg: 'rgba(251,191,36,0.06)',  border: 'rgba(251,191,36,0.25)',  color: '#fbbf24', glow: 'rgba(251,191,36,0.12)' },
  { bg: 'rgba(244,114,182,0.06)', border: 'rgba(244,114,182,0.25)', color: '#f472b6', glow: 'rgba(244,114,182,0.12)' },
  { bg: 'rgba(59,130,246,0.06)',  border: 'rgba(59,130,246,0.25)',  color: '#3b82f6', glow: 'rgba(59,130,246,0.12)' },
  { bg: 'rgba(251,146,60,0.06)',  border: 'rgba(251,146,60,0.25)',  color: '#fb923c', glow: 'rgba(251,146,60,0.12)' },
  { bg: 'rgba(52,211,153,0.06)',  border: 'rgba(52,211,153,0.25)',  color: '#34d399', glow: 'rgba(52,211,153,0.12)' },
];

export default function Skills({ skills }: { skills: { category: string; items: string[] }[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="skills" style={{ padding: '110px 0', position: 'relative' }}>
      <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
      <div className="orb orb-cyan" style={{ position: 'absolute', width: 500, height: 500, top: '20%', right: '-10%', opacity: 0.6 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <div className="section-label" style={{ color: 'var(--cyan)', marginBottom: 16 }}>
            TECHNICAL SKILLS
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Tech Stack &amp; <span className="text-gradient-main">Expertise</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(278px,1fr))', gap: 18 }}>
          {skills.map((cat, i) => {
            const pal = PALETTE[i % PALETTE.length];
            const on = hovered === i;
            return (
              <div key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: on ? pal.bg : 'rgba(8,18,36,0.6)',
                  border: `1px solid ${on ? pal.border : 'var(--border)'}`,
                  borderRadius: 18, padding: 24,
                  transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                  transform: on ? 'translateY(-6px)' : 'none',
                  boxShadow: on ? `0 12px 40px ${pal.glow}, 0 0 0 1px ${pal.border}` : 'none',
                  backdropFilter: 'blur(12px)',
                  cursor: 'default', position: 'relative', overflow: 'hidden',
                }}
              >
                {/* Top accent bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${pal.color}, transparent)`, opacity: on ? 1 : 0, transition: 'opacity 0.3s' }} />

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 18 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 11,
                    background: pal.bg, border: `1px solid ${pal.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: pal.color, flexShrink: 0,
                    boxShadow: on ? `0 0 16px ${pal.glow}` : 'none',
                    transition: 'box-shadow 0.3s',
                  }}>
                    {iconMap[cat.category] || <Layers size={18} />}
                  </div>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: on ? pal.color : 'var(--text)' , transition: 'color 0.3s' }}>
                    {cat.category}
                  </span>
                  <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                    {cat.items.length}
                  </span>
                </div>

                {/* Chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {cat.items.map((item, j) => (
                    <span key={j} style={{
                      background: on ? `${pal.color}14` : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${on ? pal.border : 'var(--border)'}`,
                      color: on ? pal.color : 'var(--text-dim)',
                      padding: '3px 11px', borderRadius: 100,
                      fontSize: '0.7rem', fontFamily: 'var(--font-mono)',
                      transition: 'all 0.25s ease',
                    }}>{item}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
