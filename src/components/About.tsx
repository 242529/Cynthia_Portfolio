import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function About({ data }: { data: any }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal the section container
    gsap.fromTo(".about-anim",
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      }
    );

    // AI reader word-by-word highlight effect followed by golden pulse
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 60%",
        once: true // only plays the first time
      }
    });

    // 1. Fast cyan highlight sequence
    tl.fromTo(".highlight-word",
      { color: "rgba(255, 255, 255, 0.2)", textShadow: "none" },
      {
        color: "#ffffff",
        textShadow: "0 0 8px rgba(0, 246, 255, 0.8)",
        duration: 0.1,
        stagger: 0.03, // fast sequential highlight
        ease: "none"
      }
    );

    // 2. Wait 2 seconds, then send a tight, one-by-one golden wave
    tl.to(".highlight-word", {
      keyframes: [
        { color: "#ffd700", textShadow: "0 0 15px rgba(255, 215, 0, 1)", scale: 1.05, y: -2, duration: 0.3, ease: "power1.out" },
        { color: "#ffffff", textShadow: "0 0 8px rgba(0, 246, 255, 0.8)", scale: 1, y: 0, duration: 0.3, ease: "power1.in" }
      ],
      stagger: 0.3 // The next word starts just as the previous one finishes
    }, "+=2");

  }, { scope: container });

  const words = data.summary.split(' ');

  return (
    <section id="about" ref={container} style={{ paddingTop: '120px', minHeight: '100vh', padding: '120px 5vw 50px 5vw' }}>
      <div className="about-section" style={{ display: 'flex', flexDirection: 'column', maxWidth: '800px' }}>
        <h2 className="about-anim" style={{ margin: 0, marginBottom: '2rem', alignSelf: 'flex-start' }}>About Me</h2>
      </div>
      <p className="glass-panel about-anim" style={{ maxWidth: '1200px', fontSize: '1.6rem', marginBottom: '2rem', lineHeight: '1.8', borderLeft: '4px solid var(--accent)' }}>
        {words.map((word: string, index: number) => (
          <span key={index} className="highlight-word" style={{ display: 'inline-block', marginRight: '0.3em' }}>
            {word}
          </span>
        ))}
      </p>
    </section>
  );
}
