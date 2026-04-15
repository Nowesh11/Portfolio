'use client';
import { useState } from 'react';
import { Save, Upload, X, FileText, ImageIcon } from 'lucide-react';

function Field({ label, value, onChange, placeholder, type = 'text', multiline = false }: any) {
  return (
    <div>
      <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#64748b', marginBottom: 6, letterSpacing: '0.1em' }}>
        {label.toUpperCase()}
      </label>
      {multiline ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3}
          style={{
            width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid #1e2d40',
            borderRadius: 10, padding: '10px 14px', color: '#e2e8f0',
            fontSize: '0.875rem', outline: 'none', resize: 'vertical', transition: 'border-color 0.2s',
            fontFamily: 'inherit',
          }}
          onFocus={e => e.target.style.borderColor = '#00d4ff'}
          onBlur={e => e.target.style.borderColor = '#1e2d40'}
        />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          style={{
            width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid #1e2d40',
            borderRadius: 10, padding: '10px 14px', color: '#e2e8f0',
            fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.2s',
          }}
          onFocus={e => e.target.style.borderColor = '#00d4ff'}
          onBlur={e => e.target.style.borderColor = '#1e2d40'}
        />
      )}
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: 'rgba(17,24,39,0.6)', border: '1px solid #1e2d40',
      borderRadius: 16, padding: 24, marginBottom: 20,
    }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: '#00d4ff', marginBottom: 20 }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function ProfileTab({ portfolio, onSave }: { portfolio: any; onSave: (d: any) => void }) {
  const [form, setForm] = useState({
    name: portfolio.name || '',
    title: portfolio.title || '',
    tagline: portfolio.tagline || '',
    bio: portfolio.bio || '',
    email: portfolio.email || '',
    phone: portfolio.phone || '',
    location: portfolio.location || '',
    github: portfolio.github || '',
    linkedin: portfolio.linkedin || '',
    twitter: portfolio.twitter || '',
    website: portfolio.website || '',
    profileImage: portfolio.profileImage || '',
    profileImageType: portfolio.profileImageType || 'image/jpeg',
    resumeFile: portfolio.resumeFile || '',
    resumeFileName: portfolio.resumeFileName || 'resume.pdf',
    stats: portfolio.stats || [],
  });

  function set(key: string) { return (val: any) => setForm(f => ({ ...f, [key]: val })); }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      setForm(f => ({ ...f, profileImage: base64, profileImageType: file.type }));
    };
    reader.readAsDataURL(file);
  }

  function handleResumeUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm(f => ({ ...f, resumeFile: reader.result as string, resumeFileName: file.name }));
    };
    reader.readAsDataURL(file);
  }

  function updateStat(i: number, key: string, val: string) {
    const s = [...form.stats];
    s[i] = { ...s[i], [key]: val };
    setForm(f => ({ ...f, stats: s }));
  }

  function addStat() {
    setForm(f => ({ ...f, stats: [...f.stats, { label: 'New Stat', value: '0+' }] }));
  }

  function removeStat(i: number) {
    setForm(f => ({ ...f, stats: f.stats.filter((_: any, j: number) => j !== i) }));
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem', color: '#e2e8f0' }}>
          Profile Settings
        </h2>
        <button onClick={() => onSave(form)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#00d4ff', color: '#030712', border: 'none',
            padding: '10px 20px', borderRadius: 10, fontFamily: 'var(--font-display)',
            fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
          }}>
          <Save size={14} /> Save Changes
        </button>
      </div>

      {/* Profile Image & Resume */}
      <SectionCard title="📸 Profile & Resume">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="upload-grid">
          {/* Profile Image */}
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#64748b', marginBottom: 10, letterSpacing: '0.1em' }}>
              PROFILE PICTURE
            </label>
            <div style={{
              border: '2px dashed #1e2d40', borderRadius: 14, padding: 20,
              textAlign: 'center', position: 'relative',
              background: 'rgba(0,0,0,0.2)',
            }}>
              {form.profileImage ? (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <img
                    src={`data:${form.profileImageType};base64,${form.profileImage}`}
                    alt="Profile"
                    style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '2px solid #00d4ff40' }}
                  />
                  <button onClick={() => setForm(f => ({ ...f, profileImage: '', profileImageType: 'image/jpeg' }))}
                    style={{
                      position: 'absolute', top: -6, right: -6,
                      width: 22, height: 22, borderRadius: '50%',
                      background: '#ef4444', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                    }}>
                    <X size={10} />
                  </button>
                </div>
              ) : (
                <div style={{ marginBottom: 12 }}>
                  <ImageIcon size={32} color="#2a4060" style={{ marginBottom: 8 }} />
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#64748b' }}>
                    No image uploaded
                  </div>
                </div>
              )}
              <label style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 12,
                background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)',
                color: '#00d4ff', padding: '7px 14px', borderRadius: 8,
                fontFamily: 'var(--font-mono)', fontSize: '0.72rem', cursor: 'pointer',
              }}>
                <Upload size={12} /> {form.profileImage ? 'Replace Image' : 'Upload Image'}
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
              </label>
            </div>
          </div>

          {/* Resume */}
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#64748b', marginBottom: 10, letterSpacing: '0.1em' }}>
              RESUME (PDF)
            </label>
            <div style={{
              border: '2px dashed #1e2d40', borderRadius: 14, padding: 20,
              textAlign: 'center', background: 'rgba(0,0,0,0.2)',
            }}>
              <FileText size={32} color={form.resumeFile ? '#00d4ff' : '#2a4060'} style={{ marginBottom: 8 }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: form.resumeFile ? '#00d4ff' : '#64748b', marginBottom: 12 }}>
                {form.resumeFile ? form.resumeFileName : 'No resume uploaded'}
              </div>
              <label style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)',
                color: '#7c3aed', padding: '7px 14px', borderRadius: 8,
                fontFamily: 'var(--font-mono)', fontSize: '0.72rem', cursor: 'pointer',
              }}>
                <Upload size={12} /> {form.resumeFile ? 'Replace PDF' : 'Upload PDF'}
                <input type="file" accept=".pdf" onChange={handleResumeUpload} style={{ display: 'none' }} />
              </label>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Basic Info */}
      <SectionCard title="👤 Basic Information">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Full Name" value={form.name} onChange={set('name')} placeholder="Your Name" />
          <Field label="Title" value={form.title} onChange={set('title')} placeholder="Full-Stack Developer" />
          <div style={{ gridColumn: '1/-1' }}>
            <Field label="Tagline" value={form.tagline} onChange={set('tagline')} placeholder="Building the future..." />
          </div>
          <div style={{ gridColumn: '1/-1' }}>
            <Field label="Bio" value={form.bio} onChange={set('bio')} placeholder="Tell your story..." multiline />
          </div>
        </div>
      </SectionCard>

      {/* Contact Info */}
      <SectionCard title="📬 Contact Information">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Email" value={form.email} onChange={set('email')} placeholder="you@email.com" type="email" />
          <Field label="Phone" value={form.phone} onChange={set('phone')} placeholder="+60 12 345 6789" />
          <Field label="Location" value={form.location} onChange={set('location')} placeholder="Kuala Lumpur, Malaysia" />
        </div>
      </SectionCard>

      {/* Social Links */}
      <SectionCard title="🔗 Social Links">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="GitHub URL" value={form.github} onChange={set('github')} placeholder="https://github.com/username" />
          <Field label="LinkedIn URL" value={form.linkedin} onChange={set('linkedin')} placeholder="https://linkedin.com/in/username" />
          <Field label="Twitter URL" value={form.twitter} onChange={set('twitter')} placeholder="https://twitter.com/username" />
          <Field label="Website URL" value={form.website} onChange={set('website')} placeholder="https://yoursite.com" />
        </div>
      </SectionCard>

      {/* Stats */}
      <SectionCard title="📊 Statistics">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginBottom: 14 }}>
          {form.stats.map((s: any, i: number) => (
            <div key={i} style={{
              background: 'rgba(0,0,0,0.2)', border: '1px solid #1e2d40',
              borderRadius: 12, padding: 14, position: 'relative',
            }}>
              <button onClick={() => removeStat(i)}
                style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                <X size={12} />
              </button>
              <input value={s.value} onChange={e => updateStat(i, 'value', e.target.value)}
                style={{
                  width: '100%', background: 'transparent', border: 'none',
                  color: '#00d4ff', fontFamily: 'var(--font-display)', fontWeight: 800,
                  fontSize: '1.4rem', outline: 'none', marginBottom: 4,
                }} />
              <input value={s.label} onChange={e => updateStat(i, 'label', e.target.value)}
                style={{
                  width: '100%', background: 'transparent', border: 'none',
                  color: '#64748b', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                  outline: 'none', letterSpacing: '0.05em',
                }} />
            </div>
          ))}
        </div>
        <button onClick={addStat}
          style={{
            background: 'transparent', border: '1px dashed #1e2d40',
            color: '#64748b', padding: '8px 18px', borderRadius: 8,
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem', cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#00d4ff44'; e.currentTarget.style.color = '#00d4ff'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e2d40'; e.currentTarget.style.color = '#64748b'; }}
        >+ Add Stat</button>
      </SectionCard>

      <div style={{ textAlign: 'right' }}>
        <button onClick={() => onSave(form)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#00d4ff', color: '#030712', border: 'none',
            padding: '12px 28px', borderRadius: 10, fontFamily: 'var(--font-display)',
            fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer',
          }}>
          <Save size={14} /> Save All Changes
        </button>
      </div>

      <style>{`
        @media(max-width:640px){
          .upload-grid{grid-template-columns:1fr!important}
        }
      `}</style>
    </div>
  );
}
