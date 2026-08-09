import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CheckCircle2 } from 'lucide-react';

export default function PMVikasSkills() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".skill-chip",
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
        },
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: "back.out(1.7)"
      }
    );
  }, { scope: container });

  const skills = [
    "Internet of Things (IoT)",
    "Embedded Systems",
    "Computer Networking",
    "Cisco Packet Tracer",
    "MQTT & Publish–Subscribe Architecture",
    "TCP/IP & OSI Protocol Layers",
    "AWS (Cloud Fundamentals)",
    "Docker",
    "Golang",
    "Git & GitHub",
    "Ubuntu Linux & Windows",
    "VMware",
    "Tinkercad",
    "Sensors & Actuators",
    "IoT Applications",
    "Mini Project Development",
    "MSME Awareness"
  ];

  return (
    <div id="pm-skills" ref={container} style={{ padding: '60px 0vw', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '3rem', color: 'white' }}>Skills Being Developed</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {skills.map((skill, i) => (
          <div
            key={i}
            className="skill-chip glass-panel"
            style={{
              padding: '0.8rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              borderRadius: '50px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(255, 255, 255, 0.03)',
              transition: 'all 0.3s ease',
              cursor: 'default'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 10px 20px -10px rgba(59, 130, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <CheckCircle2 size={18} color="var(--accent)" />
            <span style={{ color: 'var(--text-main)', fontSize: '1rem', fontWeight: '500' }}>{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
