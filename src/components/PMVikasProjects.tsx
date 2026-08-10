import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Briefcase } from 'lucide-react';

export default function PMVikasProjects() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".project-card",
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
        },
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out"
      }
    );
  }, { scope: container });

  const projects = [
    { name: "Password Door Lock System", link: "https://github.com/242529/Password-Door-Lock-System" },
    { name: "Smart Parking System", link: "https://github.com/242529/Smart-Parking-System" },
    { name: "Automatic Plant Watering System", link: "https://github.com/242529/Automatic-Plant-Watering-System" },
    { name: "Auto Light + Alarm", link: "https://github.com/242529/Auto-Light-Alarm" },
    { name: "Smart Temperature Fan System", link: "https://github.com/242529/Smart-Temperature-Fan-System" },
    { name: "Automatic Street Light", link: "https://github.com/242529/Automatic-Street-Light-System" }
  ];

  return (
    <div id="pm-projects" ref={container} style={{ padding: '60px 0vw', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '3rem', color: 'white' }}>Completed Projects</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {projects.map((proj, i) => (
          <a
            key={i}
            href={proj.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card glass-panel"
            style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              background: 'rgba(255, 255, 255, 0.02)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              borderTop: '3px solid var(--accent)',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.05)';
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 20px -10px rgba(59, 130, 246, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Briefcase size={20} color="var(--accent)" />
              <h3 style={{ color: 'white', fontSize: '1.2rem', margin: 0 }}>{proj.name}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
