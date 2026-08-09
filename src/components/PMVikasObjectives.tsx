import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Target } from 'lucide-react';

export default function PMVikasObjectives() {
  const container = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const objectives = [
    "Build a strong foundation in electronics components, measurement and circuit behaviour.",
    "Understand networking and communication protocols used across IoT deployments.",
    "Gain practical microcontroller programming ability with the Arduino platform.",
    "Assemble, wire, program and troubleshoot complete IoT nodes in the lab.",
    "Prepare for the industry job role of an IoT Assistant with employment-ready skills."
  ];

  // Auto-play the slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % objectives.length);
    }, 5000); // Cross-fade every 5 seconds
    return () => clearInterval(interval);
  }, [objectives.length]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(".obj-anim",
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

  const handleNext = () => setActiveIndex((current) => (current + 1) % objectives.length);
  const handlePrev = () => setActiveIndex((current) => (current - 1 + objectives.length) % objectives.length);

  return (
    <div id="pm-objectives" ref={container} style={{ marginBottom: '4rem', paddingTop: '4rem', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2 className="obj-anim" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '3rem', color: 'white' }}>What this program builds?</h2>

      <div className="glass-panel obj-anim" style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 2rem 5rem 2rem', overflow: 'hidden' }}>

        {/* Grid Container for Slides (auto-sizes to tallest slide) */}
        <div style={{ display: 'grid', width: '100%', padding: '0 5rem' }}>
          {objectives.map((objective, i) => (
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
              <Target size={64} color="#f59e0b" style={{ flexShrink: 0, opacity: 0.9 }} />
              <span style={{ color: 'white', fontSize: '1.5rem', lineHeight: '1.7', textAlign: 'left', fontWeight: '400' }}>
                {objective}
              </span>
            </div>
          ))}
        </div>

        {/* Navigation Controls (Absolute) */}
        <button
          onClick={handlePrev}
          style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#f59e0b', zIndex: 10, transition: 'all 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
        >
          <ChevronLeft size={28} />
        </button>

        <button
          onClick={handleNext}
          style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#f59e0b', zIndex: 10, transition: 'all 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
        >
          <ChevronRight size={28} />
        </button>

        {/* Progress Indicators (Bottom) */}
        <div style={{ position: 'absolute', bottom: '2rem', display: 'flex', gap: '0.8rem' }}>
          {objectives.map((_, i) => (
            <div
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{
                width: i === activeIndex ? '40px' : '10px',
                height: '8px',
                borderRadius: '4px',
                background: i === activeIndex ? '#f59e0b' : 'rgba(255,255,255,0.2)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer'
              }}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
