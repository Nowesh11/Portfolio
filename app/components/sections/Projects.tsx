'use client';
import { useState } from 'react';
import { ExternalLink, Folder, Tag, Lock } from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  description: string;
  link: string;
  category: string;
  tags: string[];
  image: string;
  imageType: string;
  featured: boolean;
  isPrivate: boolean;
}

const categories = ['All', 'Web', 'Mobile', 'Desktop', 'AI', 'Game', '3D', 'Other'];

const catColors: Record<string, string> = {
  Web: '#00d4ff', Mobile: '#7c3aed', Desktop: '#10b981',
  AI: '#f59e0b', Game: '#ec4899', '3D': '#3b82f6', Other: '#64748b',
};

export default function Projects({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);
  const active = categories.filter(c => c === 'All' || projects.some(p => p.category === c));

  return (
    <section id="projects" style={{ padding: '110px 0', position: 'relative' }}>
      <div className="section-sep" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20, marginBottom: 40 }}>
          <div>
            <div className="section-label" style={{ color: 'var(--emerald)', marginBottom: 14 }}>
              PORTFOLIO
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--text)', letterSpacing: '-0.02em' }}>
              Past <span className="text-gradient-emerald">Projects</span>
            </h2>
          </div>

          {/* Filter pills */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {active.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                style={{
                  background: filter === cat ? 'var(--cyan)' : 'transparent',
                  color: filter === cat ? 'var(--bg)' : 'var(--text-muted)',
                  border: `1px solid ${filter === cat ? 'var(--cyan)' : 'var(--border-mid)'}`,
                  padding: '6px 15px', borderRadius: 100,
                  fontSize: '0.73rem', fontFamily: 'var(--font-mono)',
                  cursor: 'pointer', transition: 'all 0.2s',
                  fontWeight: filter === cat ? 700 : 400,
                }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '70px 0' }}>
            <Folder size={48} color="var(--border-mid)" style={{ marginBottom: 16 }} />
            <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
              No projects yet. Add some from the admin panel.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
            {filtered.map((proj) => {
              const color = proj.isPrivate ? '#6366f1' : (catColors[proj.category] || '#64748b');

              return (
                <div key={proj._id}
                  style={{
                    background: proj.isPrivate ? 'rgba(16,14,36,0.85)' : 'rgba(8,18,36,0.7)',
                    border: `1px solid ${proj.isPrivate ? 'rgba(99,102,241,0.2)' : 'var(--border)'}`,
                    borderRadius: 20, overflow: 'hidden',
                    transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                    backdropFilter: 'blur(12px)',
                    display: 'flex', flexDirection: 'column',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = color + '55';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = `0 16px 48px ${color}18`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = proj.isPrivate ? 'rgba(99,102,241,0.2)' : 'var(--border)';
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* ── Image area ── */}
                  <div style={{
                    height: 190, position: 'relative', overflow: 'hidden',
                    background: proj.isPrivate
                      ? 'linear-gradient(135deg, #16133a, #0c0a24)'
                      : `linear-gradient(135deg, ${color}12, rgba(0,0,0,0.4))`,
                  }}>
                    {proj.image ? (
                      <img
                        src={`data:${proj.imageType};base64,${proj.image}`}
                        alt={proj.title}
                        style={{
                          width: '100%', height: '100%', objectFit: 'cover',
                          /* Private: heavy blur + darken */
                          filter: proj.isPrivate ? 'blur(12px) brightness(0.3) saturate(0.5)' : 'none',
                          transform: proj.isPrivate ? 'scale(1.1)' : 'none',
                          transition: 'filter 0.3s, transform 0.3s',
                        }}
                      />
                    ) : (
                      /* No image — placeholder (only shown when public) */
                      !proj.isPrivate && (
                        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                          <div style={{ width: 64, height: 64, borderRadius: 18, background: color + '18', border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Folder size={26} color={color} />
                          </div>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)' }}>{proj.category}</span>
                        </div>
                      )
                    )}

                    {/* ── PRIVATE overlay ── */}
                    {proj.isPrivate && (
                      <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', gap: 12,
                        background: 'rgba(6,4,20,0.6)',
                      }}>
                        {/* Lock circle */}
                        <div style={{
                          width: 58, height: 58, borderRadius: '50%',
                          background: 'rgba(99,102,241,0.15)',
                          border: '1px solid rgba(99,102,241,0.45)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: '0 0 28px rgba(99,102,241,0.3)',
                          animation: 'lockPulse 3s ease-in-out infinite',
                        }}>
                          <Lock size={24} color="#818cf8" />
                        </div>
                        {/* Label */}
                        <div style={{
                          background: 'rgba(99,102,241,0.12)',
                          border: '1px solid rgba(99,102,241,0.35)',
                          borderRadius: 8, padding: '5px 16px',
                        }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#a5b4fc', letterSpacing: '0.14em', fontWeight: 600 }}>
                            COMPANY PROPERTY
                          </span>
                        </div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(148,163,184,0.45)', letterSpacing: '0.06em' }}>
                          NDA — details withheld
                        </span>
                      </div>
                    )}

                    {/* ── Featured badge ── */}
                    {proj.featured && (
                      <div style={{ position: 'absolute', top: 12, left: 12, background: 'var(--gold)', color: 'var(--bg)', padding: '3px 11px', borderRadius: 100, fontSize: '0.62rem', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.08em' }}>
                        ★ FEATURED
                      </div>
                    )}

                    {/* ── Category / Private badge top-right ── */}
                    {proj.isPrivate ? (
                      <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(99,102,241,0.18)', border: '1px solid rgba(99,102,241,0.4)', borderRadius: 100, padding: '3px 10px', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Lock size={8} color="#818cf8" />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#818cf8' }}>Private</span>
                      </div>
                    ) : (
                      <div style={{ position: 'absolute', top: 12, right: 12, background: color + '22', border: `1px solid ${color}44`, color: color, padding: '3px 10px', borderRadius: 100, fontSize: '0.62rem', fontFamily: 'var(--font-mono)' }}>
                        {proj.category}
                      </div>
                    )}
                  </div>

                  {/* ── Content ── */}
                  <div style={{ padding: 22, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Title row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--text)', margin: 0, flex: 1 }}>
                        {proj.title}
                      </h3>
                      {proj.isPrivate && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', color: '#818cf8', padding: '2px 8px', borderRadius: 6, fontSize: '0.58rem', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                          <Lock size={7} /> NDA
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.65, flex: 1, marginBottom: 14 }}>
                      {proj.description}
                    </p>

                    {/* Tags */}
                    {proj.tags.length > 0 && (
                      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 14 }}>
                        {proj.tags.slice(0, 4).map((tag, j) => (
                          <span key={j} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text-dim)', padding: '2px 9px', borderRadius: 6, fontSize: '0.63rem', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 3 }}>
                            <Tag size={7} />{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Footer */}
                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14, marginTop: 'auto' }}>
                      {proj.isPrivate ? (
                        /* Private — no link, just locked notice */
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(99,102,241,0.5)' }}>
                          <Lock size={11} />
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
                            Confidential — not publicly available
                          </span>
                        </div>
                      ) : proj.link ? (
                        /* Public with link */
                        <a
                          href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`}
                          target="_blank" rel="noopener noreferrer"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: color, textDecoration: 'none', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', transition: 'opacity 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                        >
                          <ExternalLink size={12} />
                          {proj.link.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes lockPulse {
          0%,100% { box-shadow: 0 0 28px rgba(99,102,241,0.3); }
          50%      { box-shadow: 0 0 42px rgba(99,102,241,0.55); }
        }
      `}</style>
    </section>
  );
}