
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ChevronDown } from 'lucide-react';

export default function Skills({ skills }: { skills: any[], certifications: string[] }) {
  const container = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number>(0); // First category opens by default

  useGSAP(() => {
    gsap.fromTo(".skill-anim",
      { scale: 0.9, opacity: 0 },
      {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: "back.out(1.7)"
      }
    );
  }, { scope: container });

  return (
    <section id="skills" ref={container} style={{ paddingTop: '120px', minHeight: '100vh', padding: '120px 5vw 10vh 5vw', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ position: 'relative', display: 'inline-block', marginBottom: '2rem' }}>
        <h2 className="skill-anim" style={{ margin: 0 }}>Core Competencies</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxWidth: '900px' }}>
        {skills.map((skillGroup, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="glass-panel skill-anim"
              style={{
                cursor: 'pointer',
                padding: '1rem',
                transition: 'all 0.3s ease',
                borderLeft: isOpen ? '4px solid var(--accent)' : '4px solid transparent',
                background: isOpen ? 'rgba(0, 246, 255, 0.03)' : 'rgba(255, 255, 255, 0.03)',
                boxShadow: isOpen ? '0 4px 20px rgba(0, 246, 255, 0.1)' : 'none'
              }}
              onClick={() => setOpenIndex(i)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ color: isOpen ? 'var(--accent)' : 'var(--text-main)', margin: 0, fontSize: '1.3rem', transition: 'color 0.3s ease' }}>
                  {skillGroup.category}
                </h3>
                <ChevronDown style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', color: 'var(--accent)' }} />
              </div>

              <div style={{
                maxHeight: isOpen ? '500px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.4s ease, opacity 0.4s ease, margin-top 0.4s ease',
                opacity: isOpen ? 1 : 0,
                marginTop: isOpen ? '1.5rem' : '0'
              }}>
                <ul style={{ listStyleType: 'none', display: 'flex', flexWrap: 'wrap', gap: '0.8rem', padding: 0, margin: 0 }}>
                  {skillGroup.items.map((item: string, j: number) => (
                    <li key={j} style={{
                      background: 'rgba(10, 15, 25, 0.85)',
                      backdropFilter: 'blur(4px)',
                      border: '1px solid var(--accent)',
                      color: '#ffffff',
                      fontWeight: '600',
                      padding: '0.6rem 1.2rem',
                      borderRadius: '6px',
                      fontSize: '0.95rem',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                    }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  )
}
