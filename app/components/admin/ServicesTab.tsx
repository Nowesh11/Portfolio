'use client';
import { useState } from 'react';
import { Save, Plus, X } from 'lucide-react';

const iconOptions = ['Globe','Smartphone','Monitor','Brain','Gamepad2','Box','Layers','Code2','Database','Server','Shield','Palette','Zap','Cpu','Terminal','GitBranch'];
const gradients = ['linear-gradient(135deg,#00d4ff,#0ea5e9)','linear-gradient(135deg,#7c3aed,#a855f7)','linear-gradient(135deg,#10b981,#34d399)','linear-gradient(135deg,#f59e0b,#f97316)','linear-gradient(135deg,#ec4899,#f43f5e)','linear-gradient(135deg,#3b82f6,#6366f1)'];

function Field({ label, value, onChange, placeholder, multiline = false }: any) {
  return (
    <div>
      <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#64748b', marginBottom: 5, letterSpacing: '0.1em' }}>
        {label.toUpperCase()}
      </label>
      {multiline ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3}
          style={{
            width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid #1e2d40',
            borderRadius: 8, padding: '8px 12px', color: '#e2e8f0',
            fontSize: '0.85rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit',
            transition: 'border-color 0.2s',
          }}
          onFocus={e => e.target.style.borderColor = '#7c3aed'}
          onBlur={e => e.target.style.borderColor = '#1e2d40'}
        />
      ) : (
        <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          style={{
            width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid #1e2d40',
            borderRadius: 8, padding: '8px 12px', color: '#e2e8f0',
            fontSize: '0.85rem', outline: 'none', transition: 'border-color 0.2s',
          }}
          onFocus={e => e.target.style.borderColor = '#7c3aed'}
          onBlur={e => e.target.style.borderColor = '#1e2d40'}
        />
      )}
    </div>
  );
}

export default function ServicesTab({ portfolio, onSave }: { portfolio: any; onSave: (d: any) => void }) {
  const [services, setServices] = useState<{ title: string; description: string; icon: string }[]>(
    portfolio.services || []
  );

  function update(i: number, key: string, val: string) {
    const s = [...services];
    s[i] = { ...s[i], [key]: val };
    setServices(s);
  }

  function addService() {
    setServices(s => [...s, { title: 'New Service', description: 'Service description here.', icon: 'Zap' }]);
  }

  function removeService(i: number) {
    setServices(s => s.filter((_, j) => j !== i));
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem', color: '#e2e8f0' }}>
          Services
        </h2>
        <button onClick={() => onSave({ services })} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#7c3aed', color: '#fff', border: 'none',
          padding: '10px 20px', borderRadius: 10, fontFamily: 'var(--font-display)',
          fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
        }}>
          <Save size={14} /> Save Services
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16, marginBottom: 20 }}>
        {services.map((svc, i) => {
          const grad = gradients[i % gradients.length];
          return (
            <div key={i} style={{
              background: 'rgba(17,24,39,0.7)', border: '1px solid #1e2d40',
              borderRadius: 16, padding: 20, position: 'relative',
            }}>
              {/* Gradient preview strip */}
              <div style={{ height: 4, background: grad, borderRadius: 4, marginBottom: 16 }} />

              <button onClick={() => removeService(i)} style={{
                position: 'absolute', top: 20, right: 16,
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                color: '#ef4444', borderRadius: 6, padding: '3px 6px',
                cursor: 'pointer', display: 'flex', alignItems: 'center',
              }}>
                <X size={11} />
              </button>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingRight: 32 }}>
                <Field label="Title" value={svc.title} onChange={(v: string) => update(i, 'title', v)} placeholder="Service name" />
                <Field label="Description" value={svc.description} onChange={(v: string) => update(i, 'description', v)} placeholder="What you offer..." multiline />

                {/* Icon selector */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#64748b', marginBottom: 6, letterSpacing: '0.1em' }}>
                    ICON
                  </label>
                  <select value={svc.icon} onChange={e => update(i, 'icon', e.target.value)}
                    style={{
                      width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid #1e2d40',
                      borderRadius: 8, padding: '8px 12px', color: '#e2e8f0',
                      fontSize: '0.85rem', outline: 'none',
                    }}>
                    {iconOptions.map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add card */}
        <button onClick={addService} style={{
          background: 'transparent', border: '2px dashed #1e2d40',
          borderRadius: 16, padding: 20, cursor: 'pointer',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 8, minHeight: 180, transition: 'all 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#7c3aed44'}
          onMouseLeave={e => e.currentTarget.style.borderColor = '#1e2d40'}
        >
          <Plus size={24} color="#2a4060" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#64748b' }}>
            Add Service
          </span>
        </button>
      </div>

      <div style={{ textAlign: 'right' }}>
        <button onClick={() => onSave({ services })} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#7c3aed', color: '#fff', border: 'none',
          padding: '12px 28px', borderRadius: 10, fontFamily: 'var(--font-display)',
          fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer',
        }}>
          <Save size={14} /> Save All Services
        </button>
      </div>
    </div>
  );
}
