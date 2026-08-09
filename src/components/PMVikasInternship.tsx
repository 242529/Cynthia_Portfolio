import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import PMVikasHero from './PMVikasHero';
import PMVikasAbout from './PMVikasAbout';
import PMVikasModules from './PMVikasModules';
import PMVikasSkills from './PMVikasSkills';
import PMVikasObjectives from './PMVikasObjectives';
import PMVikasLog from './PMVikasLog';
import PMVikasProjects from './PMVikasProjects';

export default function PMVikasInternship() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".pm-hero-anim",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      }
    );
  }, { scope: container });

  return (
    <section id="pm-vikas" ref={container} className="pm-vikas-section" style={{ background: 'var(--bg-dark)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 3vw', position: 'relative' }}>

        <PMVikasHero />
        <PMVikasAbout />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          <PMVikasModules />
          <PMVikasSkills />
          <PMVikasProjects />
          <PMVikasObjectives />
          <PMVikasLog />
        </div>

      </div>
    </section>
  );
}
