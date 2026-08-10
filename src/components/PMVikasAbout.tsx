import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function PMVikasAbout() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal the section container
    gsap.fromTo(".pm-about-anim",
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

    // AI reader word-by-word highlight effect followed by pulse
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 60%",
        once: true // only plays the first time
      }
    });

    // 1. Fast highlight sequence (Orange glow to match PM Vikas theme)
    tl.fromTo(".highlight-word-pm",
      { color: "rgba(255, 255, 255, 0.2)", textShadow: "none" },
      {
        color: "#ffffff",
        textShadow: "0 0 8px rgba(245, 158, 11, 0.8)",
        duration: 0.1,
        stagger: 0.03, // fast sequential highlight
        ease: "none"
      }
    );

    // 2. Wait 2 seconds, then send a tight, one-by-one blue wave
    tl.to(".highlight-word-pm", {
      keyframes: [
        { color: "#3b82f6", textShadow: "0 0 15px rgba(59, 130, 246, 1)", scale: 1.05, y: -2, duration: 0.3, ease: "power1.out" },
        { color: "#ffffff", textShadow: "0 0 8px rgba(245, 158, 11, 0.8)", scale: 1, y: 0, duration: 0.3, ease: "power1.in" }
      ],
      stagger: 0.3 // The next word starts just as the previous one finishes
    }, "+=2");

  }, { scope: container });

  const text = "PM VIKAS is the Government of India's convergent skilling and entrepreneurship scheme run by the Ministry of Minority Affairs, which merges earlier skilling programmes into a single mission focused on employment-linked training. IIIT Kottayam delivers the IoT Assistant skilling track under this scheme, training participants for the industry job role of an IoT Assistant through structured modules in electronics, networking, microcontroller programming and applied IoT project work for 300 hours duration.";
  const words = text.split(' ');

  return (
    <div id="pm-about" ref={container} style={{
      minHeight: '100vh',
      padding: '80px 0vw 50px 0vw'
    }}>
      <div className="pm-about-anim" style={{ display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', margin: 0, marginBottom: '2rem', alignSelf: 'flex-start', color: 'white' }}>About the Program</ h2>
      </div>

      <p className="glass-panel pm-about-anim" style={{ maxWidth: '1200px', fontSize: '1.6rem', marginBottom: '2rem', lineHeight: '1.8', borderLeft: '4px solid #f59e0b', padding: '3rem' }}>
        {words.map((word: string, index: number) => (
          <span key={index} className="highlight-word-pm" style={{ display: 'inline-block', marginRight: '0.3em' }}>
            {word}
          </span>
        ))}
      </p>
    </div>
  );
}
