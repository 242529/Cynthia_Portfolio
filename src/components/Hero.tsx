
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Cpu } from 'lucide-react';
import ProfileImg from '../assets/image.png';

export default function Hero({ data }: { data: any }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".hero-anim",
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
    <section id="hero" ref={container} style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: '100vh',
      padding: '0 5vw',
      paddingTop: '80px',
      width: '100%',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="hero-text hero-anim" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '800px', zIndex: 10 }}>

        {/* Profile Image on top */}
        <div style={{ marginBottom: '1rem' }}>
          <img
            src={ProfileImg}
            alt={data.name}
            style={{
              width: '200px',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '50%',
              border: '4px solid #3b82f6',
              boxShadow: '0 0 40px rgba(59, 130, 246, 0.4)'
            }}
          />
        </div>

        {/* Title */}
        <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '1rem', lineHeight: 1.1, fontWeight: 800 }}>
          <span className="text-gradient">{data.name}</span>
        </h1>

        {/* Subtitle */}
        <h2 style={{ color: 'white', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 600, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {data.title}
        </h2>

        {/* Internships/Roles */}
        <div style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span>PM VIKAS IoT Assistant </span>
          <span className="badge-amber">IIIT Kottayam</span>
        </div>

        {/* Quote Block */}
        <div className="quote-block" style={{ marginBottom: '3rem', maxWidth: '600px', textAlign: 'left' }}>
          "Engineering innovation through IoT, Networking and Emerging Technologies."
        </div>



      </div>

      <div className="hero-image-container hero-anim" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', height: '600px' }}>

        {/* Orbit Graphic */}
        <div style={{ position: 'relative', width: '500px', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

          {/* Outer Orbit (Spinning) */}
          <div className="orbit-spin-slow" style={{ position: 'absolute', width: '450px', height: '450px', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '50%' }}>
            {/* Orbital Dots attached to outer orbit */}
            <div style={{ position: 'absolute', top: '50px', left: '50px', width: '12px', height: '12px', background: '#f59e0b', borderRadius: '50%', boxShadow: '0 0 15px #f59e0b' }}></div>
            <div style={{ position: 'absolute', bottom: '50px', right: '50px', width: '12px', height: '12px', background: '#00f6ff', borderRadius: '50%', boxShadow: '0 0 15px #00f6ff' }}></div>
            <div style={{ position: 'absolute', top: '220px', right: '-6px', width: '12px', height: '12px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 15px #10b981' }}></div>
          </div>

          {/* Inner Orbit (Spinning reverse) */}
          <div className="orbit-spin-fast" style={{ position: 'absolute', width: '300px', height: '300px', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '50%' }}>
            <div style={{ position: 'absolute', top: '10px', left: '130px', width: '12px', height: '12px', background: '#3b82f6', borderRadius: '50%', boxShadow: '0 0 15px #3b82f6' }}></div>
            <div style={{ position: 'absolute', bottom: '30px', left: '40px', width: '12px', height: '12px', background: '#8b5cf6', borderRadius: '50%', boxShadow: '0 0 15px #8b5cf6' }}></div>
          </div>

          {/* Center Circle (Static) */}
          <div style={{ position: 'absolute', width: '120px', height: '120px', border: '2px solid #3b82f6', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 30px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.2)' }}>
            <Cpu size={48} color="#3b82f6" />
          </div>

        </div>

      </div>
    </section>
  )
}
