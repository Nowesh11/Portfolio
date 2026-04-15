'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Terminal, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await signIn('credentials', { username, password, redirect: false });
    if (res?.ok) router.push('/admin/dashboard');
    else { setError('Invalid credentials. Please try again.'); setLoading(false); }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)',
      backgroundImage: 'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
      backgroundSize: '40px 40px',
    }}>
      {/* Glow blob */}
      <div style={{
        position: 'fixed', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ width: '100%', maxWidth: 420, padding: '0 20px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 60, height: 60, borderRadius: 18,
            background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))',
            border: '1px solid rgba(0,212,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px', boxShadow: '0 0 30px rgba(0,212,255,0.15)',
          }}>
            <Terminal size={26} color="#00d4ff" />
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.8rem', color: '#e2e8f0', marginBottom: 8 }}>
            Admin Access
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#64748b', letterSpacing: '0.05em' }}>
            // portfolio management system
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(17,24,39,0.8)', border: '1px solid #1e2d40',
          borderRadius: 20, padding: 32, backdropFilter: 'blur(12px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        }}>
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#64748b', marginBottom: 8, letterSpacing: '0.1em' }}>
                USERNAME
              </label>
              <div style={{ position: 'relative' }}>
                <User size={14} color="#64748b" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text" value={username} onChange={e => setUsername(e.target.value)}
                  placeholder="admin" required
                  style={{
                    width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid #1e2d40',
                    borderRadius: 10, padding: '11px 12px 11px 36px',
                    color: '#e2e8f0', fontFamily: 'var(--font-mono)', fontSize: '0.875rem',
                    outline: 'none', transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = '#00d4ff'}
                  onBlur={e => e.target.style.borderColor = '#1e2d40'}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#64748b', marginBottom: 8, letterSpacing: '0.1em' }}>
                PASSWORD
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={14} color="#64748b" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type={showPass ? 'text' : 'password'} value={password}
                  onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                  style={{
                    width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid #1e2d40',
                    borderRadius: 10, padding: '11px 40px 11px 36px',
                    color: '#e2e8f0', fontFamily: 'var(--font-mono)', fontSize: '0.875rem',
                    outline: 'none', transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = '#00d4ff'}
                  onBlur={e => e.target.style.borderColor = '#1e2d40'}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 10, padding: '10px 14px', marginBottom: 16,
                fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#ef4444',
              }}>{error}</div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading}
              style={{
                width: '100%', background: 'linear-gradient(135deg, #00d4ff, #0ea5e9)',
                color: '#030712', border: 'none', borderRadius: 10, padding: '13px',
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem',
                cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'transform 0.2s',
              }}>
              {loading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Lock size={14} />}
              {loading ? 'Authenticating...' : 'Access Dashboard'}
            </button>
          </form>
        </div>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <a href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#2a4060', textDecoration: 'none' }}>
            ← Back to Portfolio
          </a>
        </div>
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
