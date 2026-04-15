'use client';
import { useState } from 'react';
import { Save, Plus, X, Briefcase, GraduationCap } from 'lucide-react';

function Field({ label, value, onChange, placeholder, multiline = false, color = '#00d4ff' }: any) {
  return (
    <div>
      <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#64748b', marginBottom: 5, letterSpacing: '0.1em' }}>
        {label.toUpperCase()}
      </label>
      {multiline ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={2}
          style={{
            width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid #1e2d40',
            borderRadius: 8, padding: '8px 12px', color: '#e2e8f0',
            fontSize: '0.85rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit', transition: 'border-color 0.2s',
          }}
          onFocus={e => e.target.style.borderColor = color}
          onBlur={e => e.target.style.borderColor = '#1e2d40'}
        />
      ) : (
        <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          style={{
            width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid #1e2d40',
            borderRadius: 8, padding: '8px 12px', color: '#e2e8f0',
            fontSize: '0.85rem', outline: 'none', transition: 'border-color 0.2s',
          }}
          onFocus={e => e.target.style.borderColor = color}
          onBlur={e => e.target.style.borderColor = '#1e2d40'}
        />
      )}
    </div>
  );
}

export default function ExperienceTab({ portfolio, onSave }: { portfolio: any; onSave: (d: any) => void }) {
  const [experience, setExperience] = useState<any[]>(portfolio.experience || []);
  const [education, setEducation] = useState<any[]>(portfolio.education || []);

  function updateExp(i: number, key: string, val: string) {
    const e = [...experience];
    e[i] = { ...e[i], [key]: val };
    setExperience(e);
  }

  function updateEdu(i: number, key: string, val: string) {
    const e = [...education];
    e[i] = { ...e[i], [key]: val };
    setEducation(e);
  }

  function save() {
    onSave({ experience, education });
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem', color: '#e2e8f0' }}>
          Experience &amp; Education
        </h2>
        <button onClick={save} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#00d4ff', color: '#030712', border: 'none',
          padding: '10px 20px', borderRadius: 10, fontFamily: 'var(--font-display)',
          fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
        }}>
          <Save size={14} /> Save All
        </button>
      </div>

      {/* Experience */}
      <div style={{
        background: 'rgba(17,24,39,0.6)', border: '1px solid #1e2d40',
        borderRadius: 16, padding: 24, marginBottom: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 9, background: 'rgba(0,212,255,0.1)',
              border: '1px solid rgba(0,212,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Briefcase size={15} color="#00d4ff" />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: '#e2e8f0' }}>
              Work Experience
            </h3>
          </div>
          <button onClick={() => setExperience(e => [...e, { company: '', role: '', duration: '', description: '' }])}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)',
              color: '#00d4ff', borderRadius: 9, padding: '7px 14px',
              fontFamily: 'var(--font-mono)', fontSize: '0.75rem', cursor: 'pointer',
            }}>
            <Plus size={12} /> Add Experience
          </button>
        </div>

        {experience.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '32px 0',
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#2a4060',
          }}>
            No experience added yet. Click &quot;Add Experience&quot; to get started.
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {experience.map((exp, i) => (
            <div key={i} style={{
              background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(0,212,255,0.1)',
              borderRadius: 12, padding: 18, position: 'relative',
            }}>
              <button onClick={() => setExperience(e => e.filter((_, j) => j !== i))}
                style={{
                  position: 'absolute', top: 12, right: 12,
                  background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                  color: '#ef4444', borderRadius: 6, padding: '4px 7px',
                  cursor: 'pointer', display: 'flex', alignItems: 'center',
                }}>
                <X size={11} />
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, paddingRight: 40, marginBottom: 12 }}>
                <Field label="Role / Position" value={exp.role} onChange={(v: string) => updateExp(i, 'role', v)} placeholder="Frontend Developer" color="#00d4ff" />
                <Field label="Company" value={exp.company} onChange={(v: string) => updateExp(i, 'company', v)} placeholder="Company Name" color="#00d4ff" />
                <Field label="Duration" value={exp.duration} onChange={(v: string) => updateExp(i, 'duration', v)} placeholder="Jan 2023 – Present" color="#00d4ff" />
              </div>
              <Field label="Description" value={exp.description} onChange={(v: string) => updateExp(i, 'description', v)} placeholder="What you did there..." multiline color="#00d4ff" />
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div style={{
        background: 'rgba(17,24,39,0.6)', border: '1px solid #1e2d40',
        borderRadius: 16, padding: 24, marginBottom: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 9, background: 'rgba(124,58,237,0.1)',
              border: '1px solid rgba(124,58,237,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <GraduationCap size={15} color="#7c3aed" />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: '#e2e8f0' }}>
              Education
            </h3>
          </div>
          <button onClick={() => setEducation(e => [...e, { institution: '', degree: '', year: '' }])}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)',
              color: '#7c3aed', borderRadius: 9, padding: '7px 14px',
              fontFamily: 'var(--font-mono)', fontSize: '0.75rem', cursor: 'pointer',
            }}>
            <Plus size={12} /> Add Education
          </button>
        </div>

        {education.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '32px 0',
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#2a4060',
          }}>
            No education added yet. Click &quot;Add Education&quot; to get started.
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {education.map((edu, i) => (
            <div key={i} style={{
              background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(124,58,237,0.1)',
              borderRadius: 12, padding: 18, position: 'relative',
            }}>
              <button onClick={() => setEducation(e => e.filter((_, j) => j !== i))}
                style={{
                  position: 'absolute', top: 12, right: 12,
                  background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                  color: '#ef4444', borderRadius: 6, padding: '4px 7px',
                  cursor: 'pointer', display: 'flex', alignItems: 'center',
                }}>
                <X size={11} />
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, paddingRight: 40 }}>
                <Field label="Degree / Course" value={edu.degree} onChange={(v: string) => updateEdu(i, 'degree', v)} placeholder="BSc Computer Science" color="#7c3aed" />
                <Field label="Institution" value={edu.institution} onChange={(v: string) => updateEdu(i, 'institution', v)} placeholder="University Name" color="#7c3aed" />
                <Field label="Year" value={edu.year} onChange={(v: string) => updateEdu(i, 'year', v)} placeholder="2020 – 2024" color="#7c3aed" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'right' }}>
        <button onClick={save} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#00d4ff', color: '#030712', border: 'none',
          padding: '12px 28px', borderRadius: 10, fontFamily: 'var(--font-display)',
          fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer',
        }}>
          <Save size={14} /> Save All Changes
        </button>
      </div>
    </div>
  );
}
