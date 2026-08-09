import { Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default function Achievements({ achievements }: { achievements: string[] }) {
  const container = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play the slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % achievements.length);
    }, 5000); // Cross-fade every 5 seconds
    return () => clearInterval(interval);
  }, [achievements.length]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.fromTo(".ach-anim", 
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

  const handleNext = () => setActiveIndex((current) => (current + 1) % achievements.length);
  const handlePrev = () => setActiveIndex((current) => (current - 1 + achievements.length) % achievements.length);

  return (
    <section id="achievements" ref={container} style={{ paddingTop: '50px', paddingBottom: '50px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ padding: '0 5vw', width: '100%', maxWidth: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 className="ach-anim" style={{ margin: 0, marginBottom: '3rem', textAlign: 'center' }}>Achievements</h2>
        
        <div className="glass-panel ach-anim" style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem 2rem 4rem 2rem', overflow: 'hidden' }}>
          
          {/* Grid Container for Slides (auto-sizes to tallest slide) */}
          <div style={{ display: 'grid', width: '100%', padding: '0 2rem' }}>
            {achievements.map((achievement, i) => (
              <div 
                key={i} 
                style={{ 
                  gridColumn: 1, 
                  gridRow: 1,
                  display: 'flex', 
                  gap: '2rem', 
                  alignItems: 'center', 
                  justifyContent: 'flex-start',
                  opacity: i === activeIndex ? 1 : 0,
                  transform: i === activeIndex ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                  pointerEvents: i === activeIndex ? 'auto' : 'none'
                }}
              >
                <Award size={64} color="var(--accent)" style={{ flexShrink: 0, opacity: 0.8 }} />
                <span style={{ color: 'var(--text-main)', fontSize: '1.25rem', lineHeight: '1.8', textAlign: 'left', fontWeight: '400' }}>
                  {achievement}
                </span>
              </div>
            ))}
          </div>

          {/* Navigation Controls (Absolute) */}
          <button 
            onClick={handlePrev} 
            style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--accent)', zIndex: 10, transition: 'all 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={handleNext} 
            style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--accent)', zIndex: 10, transition: 'all 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          >
            <ChevronRight size={24} />
          </button>

          {/* Progress Indicators (Bottom) */}
          <div style={{ position: 'absolute', bottom: '1.5rem', display: 'flex', gap: '0.6rem' }}>
            {achievements.map((_, i) => (
              <div 
                key={i} 
                onClick={() => setActiveIndex(i)}
                style={{ 
                  width: i === activeIndex ? '30px' : '8px', 
                  height: '8px', 
                  borderRadius: '4px', 
                  background: i === activeIndex ? 'var(--accent)' : 'rgba(255,255,255,0.2)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer'
                }} 
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
