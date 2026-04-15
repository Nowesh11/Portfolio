'use client';
import { useState } from 'react';
import { Save, Plus, X, GripVertical } from 'lucide-react';

const iconOptions = ['Globe','Smartphone','Monitor','Brain','Gamepad2','Box','Layers','Code2','Database','Server','Shield','Palette','Zap','Cpu','GitBranch','Terminal'];

export default function SkillsTab({ portfolio, onSave }: { portfolio: any; onSave: (d: any) => void }) {
  const [skills, setSkills] = useState<{ category: string; items: string[] }[]>(
    portfolio.skills || []
  );
  const [newItem, setNewItem] = useState<Record<number, string>>({});

  function updateCategory(i: number, val: string) {
    const s = [...skills];
    s[i] = { ...s[i], category: val };
    setSkills(s);
  }

  function addItem(i: number) {
    const val = (newItem[i] || '').trim();
    if (!val) return;
    const s = [...skills];
    s[i] = { ...s[i], items: [...s[i].items, val] };
    setSkills(s);
    setNewItem(n => ({ ...n, [i]: '' }));
  }

  function removeItem(ci: number, ii: number) {
    const s = [...skills];
    s[ci] = { ...s[ci], items: s[ci].items.filter((_, j) => j !== ii) };
    setSkills(s);
  }

  function addCategory() {
    setSkills(s => [...s, { category: 'New Category', items: [] }]);
  }

  function removeCategory(i: number) {
    setSkills(s => s.filter((_, j) => j !== i));
  }

  const colors = ['#00d4ff','#7c3aed','#10b981','#f59e0b','#ec4899','#3b82f6','#a855f7','#f97316'];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem', color: '#e2e8f0' }}>
          Skills &amp; Technologies
        </h2>
        <button onClick={() => onSave({ skills })} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#00d4ff', color: '#030712', border: 'none',
          padding: '10px 20px', borderRadius: 10, fontFamily: 'var(--font-display)',
          fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
        }}>
          <Save size={14} /> Save Skills
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16, marginBottom: 20 }}>
        {skills.map((cat, i) => {
          const color = colors[i % colors.length];
          return (
            <div key={i} style={{
              background: 'rgba(17,24,39,0.7)', border: `1px solid ${color}25`,
              borderRadius: 16, padding: 20, position: 'relative',
            }}>
              {/* Remove category */}
              <button onClick={() => removeCategory(i)} style={{
                position: 'absolute', top: 12, right: 12,
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                color: '#ef4444', borderRadius: 6, padding: '3px 6px',
                cursor: 'pointer', display: 'flex', alignItems: 'center',
              }}>
                <X size={11} />
              </button>

              {/* Category name */}
              <div style={{ marginBottom: 14, paddingRight: 32 }}>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#64748b', marginBottom: 5, letterSpacing: '0.1em' }}>
                  CATEGORY NAME
                </label>
                <input value={cat.category} onChange={e => updateCategory(i, e.target.value)}
                  style={{
                    width: '100%', background: 'rgba(0,0,0,0.3)', border: `1px solid ${color}30`,
                    borderRadius: 8, padding: '8px 12px', color: color,
                    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', outline: 'none',
                  }} />
              </div>

              {/* Items */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                {cat.items.map((item, j) => (
                  <span key={j} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    background: `${color}12`, border: `1px solid ${color}25`,
                    color: color, padding: '3px 8px 3px 10px', borderRadius: 100,
                    fontSize: '0.72rem', fontFamily: 'var(--font-mono)',
                  }}>
                    {item}
                    <button onClick={() => removeItem(i, j)} style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: color, opacity: 0.6, padding: 0, display: 'flex', alignItems: 'center',
                    }}>
                      <X size={9} />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add item */}
              <div style={{ display: 'flex', gap: 6 }}>
                <input
                  value={newItem[i] || ''}
                  onChange={e => setNewItem(n => ({ ...n, [i]: e.target.value }))}
                  onKeyDown={e => e.key === 'Enter' && addItem(i)}
                  placeholder="Add skill..."
                  style={{
                    flex: 1, background: 'rgba(0,0,0,0.3)', border: '1px solid #1e2d40',
                    borderRadius: 8, padding: '7px 10px', color: '#e2e8f0',
                    fontFamily: 'var(--font-mono)', fontSize: '0.75rem', outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = color}
                  onBlur={e => e.target.style.borderColor = '#1e2d40'}
                />
                <button onClick={() => addItem(i)} style={{
                  background: `${color}20`, border: `1px solid ${color}30`,
                  color: color, borderRadius: 8, padding: '7px 12px',
                  cursor: 'pointer', display: 'flex', alignItems: 'center',
                }}>
                  <Plus size={13} />
                </button>
              </div>
            </div>
          );
        })}

        {/* Add category card */}
        <button onClick={addCategory} style={{
          background: 'transparent', border: '2px dashed #1e2d40',
          borderRadius: 16, padding: 20, cursor: 'pointer',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 8, minHeight: 140, transition: 'all 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#00d4ff44'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e2d40'; }}
        >
          <Plus size={24} color="#2a4060" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#64748b' }}>
            Add Category
          </span>
        </button>
      </div>

      <div style={{ textAlign: 'right' }}>
        <button onClick={() => onSave({ skills })} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#00d4ff', color: '#030712', border: 'none',
          padding: '12px 28px', borderRadius: 10, fontFamily: 'var(--font-display)',
          fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer',
        }}>
          <Save size={14} /> Save All Skills
        </button>
      </div>
    </div>
  );
}
