import { Zap } from 'lucide-react';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default function Leadership({ leadership }: { leadership: string[] }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.fromTo(".lead-anim", 
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
    <section id="leadership" ref={container} style={{ paddingTop: '50px', paddingBottom: '100px', width: '100%' }}>
      <div className="leadership-section" style={{ padding: '0 5vw' }}>
        <h2 className="leader-anim" style={{ margin: 0, marginBottom: '2rem' }}>Leadership & Organisations</h2>
        <ul className="lead-anim" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', paddingLeft: '0', listStyleType: 'none', maxWidth: '800px' }}>
          {leadership.map((item, i) => (
            <li key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <Zap size={24} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
