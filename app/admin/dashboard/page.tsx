'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import {
  User, Briefcase, FolderOpen, Settings, LogOut, Terminal,
  Home, ChevronRight, Loader2, Menu, X,
} from 'lucide-react';
import ProfileTab from '@/app/components/admin/ProfileTab';
import SkillsTab from '@/app/components/admin/SkillsTab';
import ProjectsTab from '@/app/components/admin/ProjectsTab';
import ExperienceTab from '@/app/components/admin/ExperienceTab';
import ServicesTab from '@/app/components/admin/ServicesTab';

const tabs = [
  { id: 'profile', label: 'Profile', icon: <User size={16} /> },
  { id: 'skills', label: 'Skills', icon: <Settings size={16} /> },
  { id: 'services', label: 'Services', icon: <Terminal size={16} /> },
  { id: 'projects', label: 'Projects', icon: <FolderOpen size={16} /> },
  { id: 'experience', label: 'Experience', icon: <Briefcase size={16} /> },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/admin/login');
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') fetchPortfolio();
  }, [status]);

  async function fetchPortfolio() {
    setLoading(true);
    const res = await fetch('/api/portfolio');
    const data = await res.json();
    setPortfolio(data);
    setLoading(false);
  }

  async function savePortfolio(updates: any) {
    const toastId = toast.loading('Saving...');
    try {
      const res = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setPortfolio(data);
      toast.success('Saved successfully!', { id: toastId });
    } catch {
      toast.error('Failed to save', { id: toastId });
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div style={{ textAlign: 'center' }}>
          <Loader2 size={32} color="#00d4ff" style={{ animation: 'spin 1s linear infinite', marginBottom: 12 }} />
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#64748b' }}>Loading dashboard...</div>
        </div>
        <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg)' }}>
      {/* Sidebar */}
      <aside style={{
        width: 240, flexShrink: 0, background: 'rgba(10,15,30,0.95)',
        borderRight: '1px solid #1e2d40', display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 50,
        transform: sidebarOpen ? 'none' : undefined,
        transition: 'transform 0.3s',
      }} className="sidebar">

        {/* Logo */}
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #1e2d40' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(124,58,237,0.2))',
              border: '1px solid rgba(0,212,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Terminal size={16} color="#00d4ff" />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.9rem', color: '#e2e8f0' }}>
                Admin Panel
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#64748b' }}>
                portfolio.admin
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 10, marginBottom: 2,
                background: activeTab === tab.id ? 'rgba(0,212,255,0.1)' : 'transparent',
                border: activeTab === tab.id ? '1px solid rgba(0,212,255,0.25)' : '1px solid transparent',
                color: activeTab === tab.id ? '#00d4ff' : '#64748b',
                fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
                cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
              }}>
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && <ChevronRight size={12} style={{ marginLeft: 'auto' }} />}
            </button>
          ))}
        </nav>

        {/* Bottom actions */}
        <div style={{ padding: '12px 10px', borderTop: '1px solid #1e2d40', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <a href="/" target="_blank" style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '9px 12px', borderRadius: 10, textDecoration: 'none',
            color: '#64748b', fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#e2e8f0'}
            onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
          >
            <Home size={16} /> View Site
          </a>
          <button onClick={() => signOut({ callbackUrl: '/admin/login' })}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px', borderRadius: 10, background: 'none', border: 'none',
              color: '#64748b', fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
              cursor: 'pointer', textAlign: 'left', transition: 'color 0.2s', width: '100%',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
            onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 40,
        }} />
      )}

      {/* Main content */}
      <main style={{ flex: 1, marginLeft: 240, minHeight: '100vh', display: 'flex', flexDirection: 'column' }} className="main-content">
        {/* Top bar */}
        <div style={{
          padding: '16px 28px', borderBottom: '1px solid #1e2d40',
          background: 'rgba(10,15,30,0.8)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 30,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mobile-menu-btn"
              style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'none' }}>
              <Menu size={20} />
            </button>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: '#e2e8f0' }}>
                {tabs.find(t => t.id === activeTab)?.label}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#64748b' }}>
                Edit your portfolio content
              </div>
            </div>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)',
            borderRadius: 100, padding: '5px 12px',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#10b981' }}>
              {session.user?.email}
            </span>
          </div>
        </div>

        {/* Tab content */}
        <div style={{ flex: 1, padding: 28 }}>
          {portfolio && (
            <>
              {activeTab === 'profile' && <ProfileTab portfolio={portfolio} onSave={savePortfolio} />}
              {activeTab === 'skills' && <SkillsTab portfolio={portfolio} onSave={savePortfolio} />}
              {activeTab === 'services' && <ServicesTab portfolio={portfolio} onSave={savePortfolio} />}
              {activeTab === 'projects' && <ProjectsTab />}
              {activeTab === 'experience' && <ExperienceTab portfolio={portfolio} onSave={savePortfolio} />}
            </>
          )}
        </div>
      </main>

      <style>{`
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @media(max-width:768px){
          .sidebar{transform:translateX(-100%);transform:${sidebarOpen ? 'translateX(0)' : 'translateX(-100%)'}}
          .main-content{margin-left:0!important}
          .mobile-menu-btn{display:flex!important}
        }
      `}</style>
    </div>
  );
}
