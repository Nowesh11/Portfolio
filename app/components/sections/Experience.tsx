'use client';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';

interface ExpItem { company: string; role: string; duration: string; description: string; }
interface EduItem { institution: string; degree: string; year: string; }

export default function Experience({ experience, education }: { experience: ExpItem[]; education: EduItem[] }) {
  if (!experience.length && !education.length) return null;
  return (
    <section id="experience" style={{ padding: '110px 0', position: 'relative' }}>
      <div className="section-sep" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: experience.length && education.length ? '1fr 1fr' : '1fr', gap: 60 }} className="exp-grid">

          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(0,229,255,0.1)' }}>
                  <Briefcase size={17} color="var(--cyan)" />
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.9rem', color: 'var(--text)' }}>Experience</h2>
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: 7, top: 10, bottom: 0, width: 1, background: 'linear-gradient(180deg,var(--cyan),rgba(0,229,255,0.1),transparent)' }} />
                {experience.map((exp, i) => (
                  <div key={i} style={{ paddingLeft: 30, marginBottom: 28, position: 'relative' }}>
                    <div className="timeline-dot-cyan" style={{ position: 'absolute', left: 0, top: 10, width: 15, height: 15, borderRadius: '50%' }} />
                    <div className="glass card-lift" style={{ borderRadius: 16, padding: 22, border: '1px solid var(--border)', transition: 'all 0.3s ease' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.3)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,229,255,0.08)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                        <div>
                          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--text)', marginBottom: 3 }}>{exp.role}</h3>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--cyan)' }}>{exp.company}</span>
                        </div>
                        <div className="badge badge-cyan" style={{ whiteSpace: 'nowrap' }}>
                          <Calendar size={9} />{exp.duration}
                        </div>
                      </div>
                      {exp.description && <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.65, marginTop: 8 }}>{exp.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(167,139,250,0.1)' }}>
                  <GraduationCap size={17} color="var(--violet-2)" />
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.9rem', color: 'var(--text)' }}>Education</h2>
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: 7, top: 10, bottom: 0, width: 1, background: 'linear-gradient(180deg,var(--violet-2),rgba(167,139,250,0.1),transparent)' }} />
                {education.map((edu, i) => (
                  <div key={i} style={{ paddingLeft: 30, marginBottom: 28, position: 'relative' }}>
                    <div className="timeline-dot-violet" style={{ position: 'absolute', left: 0, top: 10, width: 15, height: 15, borderRadius: '50%' }} />
                    <div className="glass card-lift" style={{ borderRadius: 16, padding: 22, border: '1px solid var(--border)', transition: 'all 0.3s ease' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(167,139,250,0.3)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(167,139,250,0.08)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                        <div>
                          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--text)', marginBottom: 3 }}>{edu.degree}</h3>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--violet-2)' }}>{edu.institution}</span>
                        </div>
                        <div className="badge badge-violet" style={{ whiteSpace: 'nowrap' }}>
                          <Calendar size={9} />{edu.year}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`@media(max-width:768px){.exp-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
