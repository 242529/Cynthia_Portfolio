import { Briefcase } from 'lucide-react';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Experience({ internships }: { internships: any[] }) {
  const container = useRef<HTMLDivElement>(null);
  const internshipsWrapper = useRef<HTMLDivElement>(null);
  const scrollContainer = useRef<HTMLDivElement>(null);

  // Guarantee no horizontal scrolling on the body to prevent trackpad drift
  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    return () => { document.body.style.overflowX = 'auto'; };
  }, []);

  // Sort internships in ASCENDING order (oldest first)
  const sortedInternships = [...internships].sort((a, b) => {
    const dateA = new Date(a.duration.split(' - ')[0]);
    const dateB = new Date(b.duration.split(' - ')[0]);
    return dateA.getTime() - dateB.getTime();
  });

  useGSAP(() => {
    // 1. Horizontal Scroll for Internships (Reverse direction of Projects)
    // We start fully shifted left (looking at the rightmost item)
    gsap.set(scrollContainer.current, {
      xPercent: -100 * ((sortedInternships.length - 1) / sortedInternships.length)
    });

    // We animate to 0, which translates the container to the RIGHT, meaning the viewport moves LEFT!
    gsap.to(scrollContainer.current, {
      xPercent: 0,
      ease: "none",
      scrollTrigger: {
        trigger: internshipsWrapper.current,
        start: "top 120px", // Pin well below the 80px header
        end: () => `+=${window.innerWidth * sortedInternships.length * 1.2}`,
        pin: true,
        pinSpacing: true, // EXPLICITLY push the next sections down
        scrub: 1.5,
        snap: {
          snapTo: 1 / (sortedInternships.length - 1),
          duration: { min: 0.2, max: 0.6 },
          delay: 0.1,
          ease: "power1.inOut"
        },
        invalidateOnRefresh: true,
      }
    });

    // Initial fade in for internship cards
    gsap.fromTo(".intern-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: internshipsWrapper.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: container });

  return (
    // Explicit width: 100% to prevent GSAP pin spacer from expanding
    // Removed overflow: hidden because it breaks GSAP pinSpacing for children!
    <section id="experience" ref={container} style={{ paddingTop: '30px', minHeight: '100vh', padding: '30px 0 50px 0', width: '100%' }}>

      {/* Pinned Wrapper for Internships */}
      <div id="internships-wrapper" ref={internshipsWrapper} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ paddingLeft: '5vw', marginBottom: '3rem', flexShrink: 0 }}>
          <h2 style={{ margin: 0 }}>Internships & Trainings</h2>
        </div>

        {/* Horizontal Track for Internships (Moving opposite direction) */}
        <div
          ref={scrollContainer}
          style={{
            display: 'flex',
            flexDirection: 'row-reverse', // Oldest item is placed on the far RIGHT
            width: `${sortedInternships.length * 100}%`,
            alignItems: 'flex-start'
          }}
        >
          {sortedInternships.map((internship, i) => (
            <div
              key={i}
              style={{
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                padding: '0 5vw',
                boxSizing: 'border-box'
              }}
            >
              {/* Added maxHeight: 75vh and overflowY: auto so boxes never hide below screen */}
              <div className="glass-panel intern-card custom-scrollbar" style={{ borderLeft: '2px solid var(--accent)', position: 'relative', width: '100%', maxWidth: '1000px', maxHeight: '75vh', overflowY: 'auto', padding: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{internship.role}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent)', fontSize: '1.1rem' }}>
                      <Briefcase size={16} />
                      <span>{internship.company}</span>
                    </div>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '0.4rem 0.8rem', borderRadius: '4px' }}>
                    {internship.duration}
                  </span>
                </div>
                <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)', fontSize: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {internship.points.map((point: string, j: number) => (
                    <li key={j} style={{ lineHeight: '1.6' }}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
