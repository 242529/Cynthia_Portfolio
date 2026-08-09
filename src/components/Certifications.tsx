import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Award } from 'lucide-react';

export default function Certifications({ certifications }: { certifications: string[] }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".cert-anim",
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
    <section id="certifications" ref={container} style={{ paddingTop: '140px', minHeight: '100vh', padding: '120px 5vw 50px 5vw', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ position: 'relative', display: 'inline-block', marginBottom: '3rem' }}>
        <h2 className="cert-anim" style={{ margin: 0 }}>Certifications</h2>
      </div>

      <div className="cert-anim" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', width: '100%', maxWidth: '1000px' }}>
        {certifications.map((cert, i) => (
          <div
            key={i}
            className="glass-panel"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1.5rem',
              borderLeft: '4px solid var(--accent)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 246, 255, 0.15)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{ background: 'rgba(0, 246, 255, 0.1)', padding: '0.8rem', borderRadius: '50%', display: 'flex' }}>
              <Award size={24} color="var(--accent)" />
            </div>
            <span style={{ fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: '600', lineHeight: '1.4' }}>
              {cert}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
