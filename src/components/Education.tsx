import { GraduationCap } from 'lucide-react';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default function Education({ education }: { education: any[] }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.fromTo(".edu-anim", 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      }
    );
  }, { scope: container });

  return (
    <section id="education" ref={container} style={{ paddingTop: '50px', paddingBottom: '100px', width: '100%' }}>
      <div className="education-section" style={{ padding: '0 5vw' }}>
        <h2 className="edu-anim" style={{ margin: 0, marginBottom: '2rem' }}>Education</h2>
        <div className="grid-container" style={{ marginBottom: '6rem' }}>
          {education.map((edu, i) => (
            <div key={i} className="glass-panel edu-anim" style={{ textAlign: 'center', padding: '2.5rem' }}>
              <GraduationCap size={40} color="var(--accent)" style={{ margin: '0 auto 1.5rem auto' }} />
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.8rem' }}>{edu.degree}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '1.5rem' }}>{edu.institution}</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem', fontSize: '0.95rem', fontFamily: 'var(--font-mono)' }}>
                <span style={{ color: 'var(--text-main)' }}>{edu.duration}</span>
                <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{edu.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
