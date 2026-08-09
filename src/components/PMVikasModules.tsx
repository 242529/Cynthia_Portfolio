import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Zap, Cpu, Network, Cloud, Wifi } from 'lucide-react';

export default function PMVikasModules() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".module-card",
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out"
      }
    );
  }, { scope: container });

  const modules = [
    {
      title: "Week 1: Electronics",
      desc: "Passive and active components, Ohm's law, semiconductor devices, breadboarding, sensors and signal conditioning.",
      Icon: Zap,
      iconColor: "#f59e0b",
      color: "rgba(245, 158, 11, 0.1)",
      borderColor: "rgba(245, 158, 11, 0.3)"
    },
    {
      title: "Week 2: Embedded System",
      desc: "Microcontrollers, hardware interfacing, digital/analog I/O, timers, interrupts, and low-level C/C++ programming.",
      Icon: Cpu,
      iconColor: "#10b981",
      color: "rgba(16, 185, 129, 0.1)",
      borderColor: "rgba(16, 185, 129, 0.3)"
    },
    {
      title: "Week 3: Computer Networking",
      desc: "Routing and switching fundamentals, IP networking, network configuration, and data communication protocols.",
      Icon: Network,
      iconColor: "#3b82f6",
      color: "rgba(59, 130, 246, 0.1)",
      borderColor: "rgba(59, 130, 246, 0.3)"
    },
    {
      title: "Week 4: Cloud Computing",
      desc: "Deploying cloud instances, MQTT/HTTP messaging architectures, database storage, and cloud connectivity.",
      Icon: Cloud,
      iconColor: "#8b5cf6",
      color: "rgba(139, 92, 246, 0.1)",
      borderColor: "rgba(139, 92, 246, 0.3)"
    },
    {
      title: "Week 5: IoT",
      desc: "End-to-end IoT builds: sensor node assembly, dashboard integration, remote control, and real-time monitoring.",
      Icon: Wifi,
      iconColor: "#06b6d4",
      color: "rgba(6, 182, 212, 0.1)",
      borderColor: "rgba(6, 182, 212, 0.3)"
    }
  ];

  return (
    <div id="pm-modules" ref={container} style={{ minHeight: '80vh', padding: '85px 0vw', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2 className="module-card" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '3rem', color: 'white' }}>Program Modules</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {modules.map((mod, i) => (
          <div
            key={i}
            className="module-card glass-panel"
            style={{
              padding: '1rem',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              borderTop: `4px solid ${mod.borderColor.replace('0.3', '0.8')}`,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'default'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = `0 15px 30px -10px ${mod.color}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Background Glow */}
            <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', background: mod.color, filter: 'blur(30px)', borderRadius: '50%', zIndex: 0 }}></div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', zIndex: 1 }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: mod.color,
                border: `1px solid ${mod.borderColor}`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexShrink: 0
              }}>
                <mod.Icon size={24} color={mod.iconColor} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <span style={{ fontSize: '0.8rem', color: mod.iconColor, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
                  {mod.title.split(': ')[0]}
                </span>
                <h3 style={{ color: 'white', margin: 0, fontSize: '1.3rem', lineHeight: '1.2' }}>
                  {mod.title.split(': ')[1]}
                </h3>
              </div>
            </div>

            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-muted)', margin: 0, zIndex: 1 }}>
              {mod.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
