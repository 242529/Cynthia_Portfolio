import { Wrench } from 'lucide-react';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Projects({ projects }: { projects: any[] }) {
  const container = useRef<HTMLDivElement>(null);
  const scrollContainer = useRef<HTMLDivElement>(null);

  // Guarantee no horizontal scrolling on the body to prevent any trackpad drift
  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    return () => { document.body.style.overflowX = 'auto'; };
  }, []);

  useGSAP(() => {
    const getScrollAmount = () => {
      if (!scrollContainer.current) return 0;
      return -(scrollContainer.current.scrollWidth - window.innerWidth);
    };

    gsap.to(scrollContainer.current, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top 60px",
        end: () => `+=${window.innerWidth * projects.length * 1.2}`, // Slowed scroll slightly
        pin: true,
        scrub: 1.5,
        snap: {
          snapTo: 1 / (projects.length - 1),
          duration: { min: 0.2, max: 0.5 },
          delay: 0.1,
          ease: "power1.inOut"
        },
        invalidateOnRefresh: true,
      }
    });

    // Fade-in animation for cards
    gsap.fromTo(".proj-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: container });

  return (
    <section id="projects" ref={container} style={{ paddingTop: '30px', minHeight: '100vh', padding: '30px 0 5vh 0', width: '100%', overflow: 'hidden' }}>
      <div style={{ paddingLeft: '5vw', marginBottom: '3rem' }}>
        <h2 style={{ margin: 0 }}>Engineering Projects</h2>
      </div>

      {/* Horizontal Scrolling Track */}
      <div
        ref={scrollContainer}
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: 'max-content',
          height: '100%',
        }}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            style={{
              width: '100vw', // Each slot takes exactly 1 viewport width
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start', // Align to top so it doesn't get pushed down
              padding: '0 5vw',
              boxSizing: 'border-box'
            }}
          >
            {/* 
              THE FIX FOR THE HIDDEN BOX:
              Added maxHeight: '70vh' and overflowY: 'auto'. 
              This guarantees the box will NEVER be hidden off the bottom of the screen.
              If the text is too long, the card itself will just get a scrollbar inside it!
            */}
            <div className="glass-panel proj-card custom-scrollbar" style={{ position: 'relative', width: '100%', maxWidth: '1000px', maxHeight: '75vh', overflowY: 'auto', padding: '2.5rem' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '6px', height: '100%', background: 'var(--accent)' }} />

              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.6rem' }}>{project.title}</h3>
              <p style={{ color: 'var(--accent)', fontStyle: 'italic', marginBottom: '1.2rem', fontSize: '1.05rem' }}>{project.subtitle}</p>

              <ul style={{ paddingLeft: '1.2rem', marginBottom: '1.8rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {project.points.map((point: string, j: number) => (
                  <li key={j} style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>{point}</li>
                ))}
              </ul>

              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <Wrench size={18} color="var(--accent)" />
                {project.tools.map((tool: string, j: number) => (
                  <span key={j} style={{ background: 'rgba(56, 189, 248, 0.1)', color: 'var(--accent)', padding: '0.3rem 0.8rem', borderRadius: '4px', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
