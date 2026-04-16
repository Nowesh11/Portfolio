'use client';
import { useState, useEffect } from 'react';
import {
  Plus, Pencil, Trash2, X, Save, ExternalLink,
  Upload, ImageIcon, Loader2, Star, StarOff, Lock, Globe,
} from 'lucide-react';
import toast from 'react-hot-toast';

const CATEGORIES = ['Web', 'Mobile', 'Desktop', 'AI', 'Game', '3D', 'Other'];
const catColors: Record<string, string> = {
  Web: '#00d4ff', Mobile: '#7c3aed', Desktop: '#10b981',
  AI: '#f59e0b', Game: '#ec4899', '3D': '#3b82f6', Other: '#64748b',
};

function Field({ label, value, onChange, placeholder, multiline = false, type = 'text' }: any) {
  return (
    <div>
      <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#64748b', marginBottom: 5, letterSpacing: '0.1em' }}>
        {label.toUpperCase()}
      </label>
      {multiline ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3}
          style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid #1e2d40', borderRadius: 8, padding: '8px 12px', color: '#e2e8f0', fontSize: '0.85rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit', transition: 'border-color 0.2s' }}
          onFocus={e => e.target.style.borderColor = '#10b981'}
          onBlur={e => e.target.style.borderColor = '#1e2d40'}
        />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid #1e2d40', borderRadius: 8, padding: '8px 12px', color: '#e2e8f0', fontSize: '0.85rem', outline: 'none', transition: 'border-color 0.2s' }}
          onFocus={e => e.target.style.borderColor = '#10b981'}
          onBlur={e => e.target.style.borderColor = '#1e2d40'}
        />
      )}
    </div>
  );
}

const emptyProject = { title: '', description: '', link: '', category: 'Web', tags: '', image: '', imageType: 'image/jpeg', featured: false, isPrivate: false, order: 0 };

export default function ProjectsTab() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>({ ...emptyProject });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => { fetchProjects(); }, []);

  async function fetchProjects() {
    setLoading(true);
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  function openCreate() { setEditing(null); setForm({ ...emptyProject }); setModal(true); }

  function openEdit(proj: any) {
    setEditing(proj);
    setForm({ title: proj.title, description: proj.description, link: proj.link || '', category: proj.category, tags: (proj.tags || []).join(', '), image: proj.image || '', imageType: proj.imageType || 'image/jpeg', featured: proj.featured || false, isPrivate: proj.isPrivate || false, order: proj.order || 0 });
    setModal(true);
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { const r = reader.result as string; setForm((f: any) => ({ ...f, image: r.split(',')[1], imageType: file.type })); };
    reader.readAsDataURL(file);
  }

  async function handleSave() {
    if (!form.title.trim() || !form.description.trim()) { toast.error('Title and description are required'); return; }
    setSaving(true);
    const payload = { ...form, tags: form.tags.split(',').map((t: string) => t.trim()).filter(Boolean) };
    try {
      if (editing) {
        const res = await fetch(`/api/projects/${editing._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!res.ok) throw new Error();
        toast.success('Project updated!');
      } else {
        const res = await fetch('/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!res.ok) throw new Error();
        toast.success('Project created!');
      }
      setModal(false); fetchProjects();
    } catch { toast.error('Failed to save project'); }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this project?')) return;
    setDeleting(id);
    try { const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' }); if (!res.ok) throw new Error(); toast.success('Project deleted'); fetchProjects(); }
    catch { toast.error('Failed to delete'); }
    setDeleting(null);
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem', color: '#e2e8f0', marginBottom: 6 }}>
            Projects <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#64748b', fontWeight: 400 }}>({projects.length})</span>
          </h2>
          <div style={{ display: 'flex', gap: 18 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)', fontSize: '0.63rem', color: '#64748b' }}>
              <Globe size={9} color="#10b981" /> Public — fully visible
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)', fontSize: '0.63rem', color: '#64748b' }}>
              <Lock size={9} color="#818cf8" /> Private — blurred &amp; locked on public site
            </span>
          </div>
        </div>
        <button onClick={openCreate} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#10b981', color: '#030712', border: 'none', padding: '10px 20px', borderRadius: 10, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
          <Plus size={14} /> Add Project
        </button>
      </div>

      {/* List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}><Loader2 size={28} color="#00d4ff" style={{ animation: 'spin 1s linear infinite' }} /></div>
      ) : projects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'rgba(17,24,39,0.6)', border: '1px dashed #1e2d40', borderRadius: 16 }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>📂</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#64748b', marginBottom: 8 }}>No projects yet</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#2a4060', marginBottom: 20 }}>Add your first project to showcase your work</div>
          <button onClick={openCreate} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#10b981', color: '#030712', border: 'none', padding: '10px 20px', borderRadius: 9, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
            <Plus size={13} /> Create First Project
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {projects.map(proj => {
            const color = proj.isPrivate ? '#6366f1' : (catColors[proj.category] || '#64748b');
            return (
              <div key={proj._id} style={{ background: proj.isPrivate ? 'rgba(20,18,40,0.9)' : 'rgba(17,24,39,0.7)', border: `1px solid ${proj.isPrivate ? 'rgba(99,102,241,0.25)' : '#1e2d40'}`, borderRadius: 16, overflow: 'hidden', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = color + '60'}
                onMouseLeave={e => e.currentTarget.style.borderColor = proj.isPrivate ? 'rgba(99,102,241,0.25)' : '#1e2d40'}
              >
                {/* Image */}
                <div style={{ height: 140, position: 'relative', overflow: 'hidden', background: proj.isPrivate ? 'linear-gradient(135deg,#1a1650,#0d0b2e)' : `${color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {proj.image ? (
                    <img src={`data:${proj.imageType};base64,${proj.image}`} alt={proj.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', filter: proj.isPrivate ? 'blur(8px) brightness(0.35)' : 'none', transform: proj.isPrivate ? 'scale(1.08)' : 'none' }} />
                  ) : !proj.isPrivate && <ImageIcon size={32} color={color + '60'} />}

                  {/* Private overlay */}
                  {proj.isPrivate && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'rgba(8,6,24,0.5)' }}>
                      <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(99,102,241,0.2)' }}>
                        <Lock size={18} color="#818cf8" />
                      </div>
                      <div style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 6, padding: '4px 12px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#a5b4fc', letterSpacing: '0.1em' }}>COMPANY PROPERTY</span>
                      </div>
                    </div>
                  )}

                  {/* Top badges */}
                  <div style={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 5 }}>
                    <span style={{ background: color + '25', border: `1px solid ${color}45`, color: color, padding: '2px 9px', borderRadius: 100, fontSize: '0.62rem', fontFamily: 'var(--font-mono)' }}>{proj.category}</span>
                    {proj.featured && <span style={{ background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.4)', color: '#f59e0b', padding: '2px 9px', borderRadius: 100, fontSize: '0.62rem', fontFamily: 'var(--font-mono)' }}>★ Featured</span>}
                  </div>
                  {proj.isPrivate && (
                    <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', borderRadius: 100, padding: '2px 9px', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Lock size={8} color="#818cf8" />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#818cf8' }}>Private</span>
                    </div>
                  )}
                </div>

                {/* Body */}
                <div style={{ padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: '#e2e8f0', flex: 1, margin: 0 }}>{proj.title}</h3>
                    {proj.isPrivate && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', color: '#818cf8', padding: '2px 7px', borderRadius: 6, fontSize: '0.6rem', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                        <Lock size={8} /> NDA
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5, marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{proj.description}</p>

                  {/* Tags */}
                  {proj.tags?.length > 0 && (
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 10 }}>
                      {proj.tags.slice(0, 3).map((t: string, j: number) => (
                        <span key={j} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #1e2d40', color: '#64748b', padding: '1px 7px', borderRadius: 5, fontSize: '0.62rem', fontFamily: 'var(--font-mono)' }}>{t}</span>
                      ))}
                      {proj.tags.length > 3 && <span style={{ fontSize: '0.62rem', color: '#2a4060', fontFamily: 'var(--font-mono)' }}>+{proj.tags.length - 3}</span>}
                    </div>
                  )}

                  {/* Visibility status pill */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, padding: '6px 10px', borderRadius: 8, background: proj.isPrivate ? 'rgba(99,102,241,0.06)' : 'rgba(16,185,129,0.06)', border: `1px solid ${proj.isPrivate ? 'rgba(99,102,241,0.2)' : 'rgba(16,185,129,0.2)'}` }}>
                    {proj.isPrivate ? <Lock size={10} color="#818cf8" /> : <Globe size={10} color="#10b981" />}
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: proj.isPrivate ? '#818cf8' : '#10b981' }}>
                      {proj.isPrivate ? 'Private — blurred with lock on public site' : 'Public — fully visible on public site'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 8, borderTop: '1px solid #1e2d40', paddingTop: 10 }}>
                    {proj.link && !proj.isPrivate && (
                      <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#64748b', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#00d4ff'}
                        onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
                      ><ExternalLink size={11} /> Visit</a>
                    )}
                    <button onClick={() => openEdit(proj)} style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', color: '#00d4ff', borderRadius: 7, padding: '5px 12px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', cursor: 'pointer' }}>
                      <Pencil size={11} /> Edit
                    </button>
                    <button onClick={() => handleDelete(proj._id)} disabled={deleting === proj._id} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', borderRadius: 7, padding: '5px 10px', cursor: 'pointer', opacity: deleting === proj._id ? 0.5 : 1 }}>
                      {deleting === proj._id ? <Loader2 size={11} style={{ animation: 'spin 1s linear infinite' }} /> : <Trash2 size={11} />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
          onClick={e => e.target === e.currentTarget && setModal(false)}>
          <div style={{ background: '#0a0f1e', border: '1px solid #1e2d40', borderRadius: 20, padding: 28, width: '100%', maxWidth: 560, maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 30px 80px rgba(0,0,0,0.7)' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: '#e2e8f0' }}>{editing ? 'Edit Project' : 'New Project'}</h3>
              <button onClick={() => setModal(false)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid #1e2d40', color: '#64748b', borderRadius: 8, padding: '6px 8px', cursor: 'pointer' }}><X size={15} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Field label="Project Title *" value={form.title} onChange={(v: string) => setForm((f: any) => ({ ...f, title: v }))} placeholder="My Awesome Project" />
              <Field label="Description *" value={form.description} onChange={(v: string) => setForm((f: any) => ({ ...f, description: v }))} placeholder="What this project does..." multiline />
              <Field label="Project Link / URL" value={form.link} onChange={(v: string) => setForm((f: any) => ({ ...f, link: v }))} placeholder="https://github.com/you/project" />

              {/* Category */}
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#64748b', marginBottom: 6, letterSpacing: '0.1em' }}>CATEGORY</label>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => setForm((f: any) => ({ ...f, category: cat }))}
                      style={{ background: form.category === cat ? (catColors[cat] + '20') : 'transparent', border: `1px solid ${form.category === cat ? catColors[cat] : '#1e2d40'}`, color: form.category === cat ? catColors[cat] : '#64748b', padding: '5px 13px', borderRadius: 100, fontFamily: 'var(--font-mono)', fontSize: '0.72rem', cursor: 'pointer', transition: 'all 0.15s' }}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <Field label="Tags (comma separated)" value={form.tags} onChange={(v: string) => setForm((f: any) => ({ ...f, tags: v }))} placeholder="Next.js, TypeScript, MongoDB" />
              <Field label="Display Order (lower = first)" value={String(form.order)} onChange={(v: string) => setForm((f: any) => ({ ...f, order: parseInt(v) || 0 }))} placeholder="0" type="number" />

              {/* ── VISIBILITY ── */}
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#64748b', marginBottom: 8, letterSpacing: '0.1em' }}>VISIBILITY</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {/* Public */}
                  <button onClick={() => setForm((f: any) => ({ ...f, isPrivate: false }))}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '14px 10px', borderRadius: 12, cursor: 'pointer', background: !form.isPrivate ? 'rgba(16,185,129,0.1)' : 'rgba(0,0,0,0.2)', border: `2px solid ${!form.isPrivate ? '#10b981' : '#1e2d40'}`, transition: 'all 0.2s' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: !form.isPrivate ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.04)', border: `1px solid ${!form.isPrivate ? '#10b981' : '#1e2d40'}`, boxShadow: !form.isPrivate ? '0 0 16px rgba(16,185,129,0.25)' : 'none' }}>
                      <Globe size={18} color={!form.isPrivate ? '#10b981' : '#64748b'} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.88rem', color: !form.isPrivate ? '#10b981' : '#64748b', marginBottom: 3 }}>Public</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#2a4060', lineHeight: 1.4 }}>Full image, title &amp; link visible</div>
                    </div>
                  </button>

                  {/* Private */}
                  <button onClick={() => setForm((f: any) => ({ ...f, isPrivate: true }))}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '14px 10px', borderRadius: 12, cursor: 'pointer', background: form.isPrivate ? 'rgba(99,102,241,0.1)' : 'rgba(0,0,0,0.2)', border: `2px solid ${form.isPrivate ? '#6366f1' : '#1e2d40'}`, transition: 'all 0.2s' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: form.isPrivate ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.04)', border: `1px solid ${form.isPrivate ? '#6366f1' : '#1e2d40'}`, boxShadow: form.isPrivate ? '0 0 16px rgba(99,102,241,0.3)' : 'none' }}>
                      <Lock size={18} color={form.isPrivate ? '#818cf8' : '#64748b'} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.88rem', color: form.isPrivate ? '#818cf8' : '#64748b', marginBottom: 3 }}>Private</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#2a4060', lineHeight: 1.4 }}>Blurred + locked, no link shown</div>
                    </div>
                  </button>
                </div>

                {form.isPrivate && (
                  <div style={{ marginTop: 10, padding: '10px 14px', borderRadius: 10, background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <Lock size={12} color="#818cf8" style={{ flexShrink: 0, marginTop: 1 }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#818cf8', lineHeight: 1.5 }}>
                      Visitors will see this project with a blurred image, lock icon, and &quot;COMPANY PROPERTY&quot; label. No link will be clickable. The description remains visible.
                    </span>
                  </div>
                )}
              </div>

              {/* Featured */}
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#64748b', marginBottom: 8, letterSpacing: '0.1em' }}>FEATURED</label>
                <button onClick={() => setForm((f: any) => ({ ...f, featured: !f.featured }))}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, background: form.featured ? 'rgba(245,158,11,0.1)' : 'transparent', border: `1px solid ${form.featured ? 'rgba(245,158,11,0.4)' : '#1e2d40'}`, color: form.featured ? '#f59e0b' : '#64748b', padding: '9px 18px', borderRadius: 9, cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', transition: 'all 0.2s' }}>
                  {form.featured ? <Star size={13} /> : <StarOff size={13} />}
                  {form.featured ? '★ Featured Project' : 'Mark as Featured'}
                </button>
              </div>

              {/* Image upload */}
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#64748b', marginBottom: 6, letterSpacing: '0.1em' }}>PROJECT IMAGE (OPTIONAL)</label>
                {form.isPrivate && (
                  <div style={{ marginBottom: 8, padding: '7px 12px', borderRadius: 8, background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.2)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#818cf8', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Lock size={10} /> Image will be blurred on the public site
                  </div>
                )}
                <div style={{ border: '2px dashed #1e2d40', borderRadius: 12, padding: 16, textAlign: 'center', background: 'rgba(0,0,0,0.2)' }}>
                  {form.image ? (
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <img src={`data:${form.imageType};base64,${form.image}`} alt="Preview"
                        style={{ maxWidth: '100%', maxHeight: 150, borderRadius: 8, objectFit: 'cover', filter: form.isPrivate ? 'blur(6px) brightness(0.5)' : 'none' }} />
                      {form.isPrivate && (
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
                          <Lock size={22} color="#818cf8" />
                        </div>
                      )}
                      <button onClick={() => setForm((f: any) => ({ ...f, image: '', imageType: 'image/jpeg' }))}
                        style={{ position: 'absolute', top: -8, right: -8, width: 22, height: 22, borderRadius: '50%', background: '#ef4444', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                        <X size={10} />
                      </button>
                    </div>
                  ) : (
                    <><ImageIcon size={28} color="#2a4060" style={{ marginBottom: 8 }} /><div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#64748b', marginBottom: 10 }}>Upload a screenshot or thumbnail</div></>
                  )}
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', padding: '7px 14px', borderRadius: 8, fontFamily: 'var(--font-mono)', fontSize: '0.72rem', cursor: 'pointer', marginTop: form.image ? 10 : 0 }}>
                    <Upload size={11} /> {form.image ? 'Replace Image' : 'Choose Image'}
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 8, borderTop: '1px solid #1e2d40' }}>
                <button onClick={() => setModal(false)} style={{ background: 'transparent', border: '1px solid #1e2d40', color: '#64748b', padding: '10px 20px', borderRadius: 9, fontFamily: 'var(--font-mono)', fontSize: '0.8rem', cursor: 'pointer' }}>Cancel</button>
                <button onClick={handleSave} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#10b981', color: '#030712', border: 'none', padding: '10px 24px', borderRadius: 9, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.875rem', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
                  {saving ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={14} />}
                  {saving ? 'Saving...' : editing ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}