'use client';
import { Globe, Smartphone, Monitor, Brain, Gamepad2, Box, Zap, Code2, Layers, Server, Shield, Palette, BrainCircuit, Cpu } from 'lucide-react';

const iconComponents: Record<string, React.ReactNode> = {
  Globe:<Globe size={22}/>, Smartphone:<Smartphone size={22}/>, Monitor:<Monitor size={22}/>,
  Brain:<Brain size={22}/>, Gamepad2:<Gamepad2 size={22}/>, Box:<Box size={22}/>,
  Zap:<Zap size={22}/>, Code2:<Code2 size={22}/>, Layers:<Layers size={22}/>,
  Server:<Server size={22}/>, Shield:<Shield size={22}/>, Palette:<Palette size={22}/>,
  BrainCircuit:<BrainCircuit size={22}/>, Cpu:<Cpu size={22}/>,
};

const GRADIENTS = [
  ['#00e5ff','#00b4d8'], ['#a78bfa','#7c3aed'], ['#00f5a0','#00b4d8'],
  ['#fbbf24','#fb923c'], ['#f472b6','#e879f9'], ['#3b82f6','#6366f1'],
];

export default function Services({ services }: { services: { title: string; description: string; icon: string }[] }) {
  return (
    <section id="services" style={{ padding: '110px 0', position: 'relative' }}>
      <div className="section-sep" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />
      <div className="orb orb-violet" style={{ position: 'absolute', width: 500, height: 500, bottom: '0%', left: '-10%', opacity: 0.7 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-label" style={{ color: 'var(--violet-2)', marginBottom: 16, justifyContent: 'center' }}>
            WHAT I OFFER
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 14 }}>
            Services I <span className="text-gradient-violet">Provide</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: 480, margin: '0 auto' }}>
            End-to-end development solutions tailored to bring your ideas to life.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 20 }}>
          {services.map((svc, i) => {
            const [c1, c2] = GRADIENTS[i % GRADIENTS.length];
            return (
              <div key={i}
                className="glass card-lift gradient-border"
                style={{ borderRadius: 20, padding: 28, position: 'relative', overflow: 'hidden' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.4), 0 0 30px ${c1}18`; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
              >
                {/* Corner glow */}
                <div style={{ position: 'absolute', top: 0, right: 0, width: 100, height: 100, background: `radial-gradient(circle at top right, ${c1}14, transparent 70%)`, pointerEvents: 'none' }} />
                {/* Bottom accent line */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${c1}50, transparent)` }} />

                {/* Number */}
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', marginBottom: 18, letterSpacing: '0.12em' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div style={{
                  width: 54, height: 54, borderRadius: 15,
                  background: `linear-gradient(135deg, ${c1}, ${c2})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', marginBottom: 20,
                  boxShadow: `0 6px 24px ${c1}40`,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1) rotate(-4deg)'; e.currentTarget.style.boxShadow = `0 10px 32px ${c1}60`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = `0 6px 24px ${c1}40`; }}
                >
                  {iconComponents[svc.icon] || <Zap size={22} />}
                </div>

                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.08rem', color: 'var(--text)', marginBottom: 10 }}>
                  {svc.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-dim)', lineHeight: 1.7 }}>
                  {svc.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
