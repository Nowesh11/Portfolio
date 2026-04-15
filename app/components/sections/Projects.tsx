'use client';
import { useState } from 'react';
import { ExternalLink, Folder, Tag } from 'lucide-react';

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
}

const categories = ['All', 'Web', 'Mobile', 'Desktop', 'AI', 'Game', '3D', 'Other'];

const catColors: Record<string, string> = {
  Web: '#00d4ff', Mobile: '#7c3aed', Desktop: '#10b981',
  AI: '#f59e0b', Game: '#ec4899', '3D': '#3b82f6', Other: 'var(--text-muted)',
};

export default function Projects({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);
  const active = categories.filter(c => c === 'All' || projects.some(p => p.category === c));

  return (
    <section id="projects" style={{ padding: '100px 0', background: 'rgba(4,12,26,0.6)', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, #2a4060, transparent)',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20, marginBottom: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ height: 1, width: 40, background: '#10b981', opacity: 0.6 }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#10b981', letterSpacing: '0.2em' }}>
                PORTFOLIO
              </span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text)',
              letterSpacing: '-0.02em',
            }}>
              Past <span style={{
                background: 'linear-gradient(135deg, #10b981, #00d4ff)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Projects</span>
            </h2>
          </div>

          {/* Category filter */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {active.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                style={{
                  background: filter === cat ? '#00d4ff' : 'transparent',
                  color: filter === cat ? 'var(--bg)' : 'var(--text-muted)',
                  border: `1px solid ${filter === cat ? '#00d4ff' : 'var(--border)'}`,
                  padding: '6px 14px', borderRadius: 100,
                  fontSize: '0.75rem', fontFamily: 'var(--font-mono)',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >{cat}</button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <Folder size={48} color="var(--border)" style={{ marginBottom: 16 }} />
            <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
              No projects yet. Add some from the admin panel.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
            {filtered.map((proj) => {
              const color = catColors[proj.category] || 'var(--text-muted)';
              return (
                <div key={proj._id} style={{
                  background: 'rgba(17,24,39,0.7)', border: '1px solid var(--border)',
                  borderRadius: 20, overflow: 'hidden',
                  transition: 'all 0.3s ease', backdropFilter: 'blur(8px)',
                  display: 'flex', flexDirection: 'column',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = color + '60';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = `0 12px 40px ${color}15`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Project image or placeholder */}
                  <div style={{
                    height: 180, position: 'relative', overflow: 'hidden',
                    background: `linear-gradient(135deg, ${color}10, rgba(0,0,0,0.3))`,
                  }}>
                    {proj.image ? (
                      <img
                        src={`data:${proj.imageType};base64,${proj.image}`}
                        alt={proj.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{
                        width: '100%', height: '100%',
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', gap: 8,
                      }}>
                        <div style={{
                          width: 60, height: 60, borderRadius: 16,
                          background: color + '20', border: `1px solid ${color}30`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <Folder size={24} color={color} />
                        </div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#2a4060' }}>
                          {proj.category}
                        </span>
                      </div>
                    )}

                    {/* Featured badge */}
                    {proj.featured && (
                      <div style={{
                        position: 'absolute', top: 12, left: 12,
                        background: '#f59e0b', color: 'var(--bg)',
                        padding: '3px 10px', borderRadius: 100,
                        fontSize: '0.65rem', fontFamily: 'var(--font-mono)',
                        fontWeight: 700, letterSpacing: '0.08em',
                      }}>★ FEATURED</div>
                    )}

                    {/* Category badge */}
                    <div style={{
                      position: 'absolute', top: 12, right: 12,
                      background: color + '20', border: `1px solid ${color}40`,
                      color: color, padding: '3px 10px', borderRadius: 100,
                      fontSize: '0.65rem', fontFamily: 'var(--font-mono)',
                    }}>{proj.category}</div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{
                      fontFamily: 'var(--font-display)', fontWeight: 700,
                      fontSize: '1.05rem', color: 'var(--text)', marginBottom: 8,
                    }}>{proj.title}</h3>

                    <p style={{
                      fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6,
                      flex: 1, marginBottom: 14,
                    }}>{proj.description}</p>

                    {/* Tags */}
                    {proj.tags.length > 0 && (
                      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 14 }}>
                        {proj.tags.slice(0, 4).map((tag, j) => (
                          <span key={j} style={{
                            background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
                            color: '#94a3b8', padding: '2px 8px', borderRadius: 6,
                            fontSize: '0.65rem', fontFamily: 'var(--font-mono)',
                            display: 'flex', alignItems: 'center', gap: 3,
                          }}>
                            <Tag size={8} />{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Link */}
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        color: color, textDecoration: 'none',
                        fontSize: '0.8rem', fontFamily: 'var(--font-mono)',
                        borderTop: '1px solid var(--border)', paddingTop: 12, marginTop: 'auto',
                        transition: 'opacity 0.2s',
                      }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                      >
                        <ExternalLink size={12} /> View Project
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
