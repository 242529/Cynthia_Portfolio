export default function PMVikasHero() {
  return (
    <div id="pm-hero" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0',
      position: 'relative'
    }}>

      {/* Background Glow */}
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: '300px', height: '300px', background: 'rgba(59, 130, 246, 0.15)', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '400px', height: '400px', background: 'rgba(245, 158, 11, 0.1)', filter: 'blur(120px)', zIndex: 0, pointerEvents: 'none' }}></div>

      {/* Left Text Content */}
      <div style={{ flex: '1.2', zIndex: 10, paddingRight: '2rem', transform: 'translateX(-2rem)' }}>
        <div className="pm-hero-anim" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1.5rem', borderRadius: '9999px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', marginBottom: '2rem', boxShadow: '0 0 20px rgba(245, 158, 11, 0.15)', whiteSpace: 'nowrap' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', boxShadow: '0 0 10px #f59e0b', animation: 'pulse 2s infinite', flexShrink: 0 }}></div>
          <span style={{ color: '#f59e0b', fontWeight: 600, fontSize: '1.1rem', letterSpacing: '1px', textTransform: 'uppercase' }}>PM VIKAS • Ministry of Minority Affairs</span>
        </div>

        <h1 className="pm-hero-anim" style={{ fontSize: 'clamp(3.5rem, 6vw, 6.5rem)', marginBottom: '1rem', lineHeight: '1.05', fontWeight: 800 }}>
          <span className="text-gradient" style={{ whiteSpace: 'nowrap' }}>IoT Assistant</span><br />
        </h1>

        <h2 className="pm-hero-anim" style={{ color: 'var(--text-muted)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2.5rem' }}>
          at IIIT Kottayam
        </h2>
      </div>

      {/* Right Visual Content */}
      <div className="pm-hero-anim" style={{ flex: '0.8', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', zIndex: 10, position: 'relative', height: '600px' }}>

        {/* 3D Solar System Container */}
        <div style={{
          position: 'relative',
          width: '550px',
          height: '550px',
          transformStyle: 'preserve-3d',
          transform: 'perspective(1200px) rotateX(55deg) rotateY(-15deg)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>

          {/* Central Sun (Energy Core) */}
          <div style={{
            position: 'absolute',
            width: '100px',
            height: '100px',
            background: 'radial-gradient(circle, rgba(96,165,250,1) 0%, rgba(30,58,138,1) 80%, rgba(15,23,42,1) 100%)',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 0 60px rgba(96, 165, 250, 0.8), 0 0 100px rgba(59, 130, 246, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.6)',
            zIndex: 10,
            transform: 'translateZ(1px)' // Lie flat on the orbit plane to prevent 3D bounding-box clipping artifacts
          }}>
            <div style={{ position: 'absolute', width: '100%', height: '100%', border: '2px solid rgba(255,255,255,0.4)', borderRadius: '50%', animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite', opacity: 0.8 }}></div>
            <div style={{ position: 'absolute', width: '100%', height: '100%', border: '2px solid #3b82f6', borderRadius: '50%', animation: 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite', opacity: 0.5, animationDelay: '1s' }}></div>
          </div>

          {/* Orbit 1 (Inner) */}
          <div className="orbit-spin-slow" style={{ position: 'absolute', width: '280px', height: '280px', border: '2px solid rgba(16, 185, 129, 0.3)', borderRadius: '50%' }}>
            {/* Planet 1 */}
            <div style={{
              position: 'absolute', top: '-12px', left: '50%', marginLeft: '-12px',
              width: '24px', height: '24px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 30px #10b981, 0 0 10px #10b981'
            }}></div>
          </div>

          {/* Orbit 2 (Middle) */}
          <div className="orbit-spin-fast" style={{ position: 'absolute', width: '420px', height: '420px', border: '2px dashed rgba(245, 158, 11, 0.4)', borderRadius: '50%' }}>
            {/* Planet 2 */}
            <div style={{
              position: 'absolute', top: '50%', right: '-15px', marginTop: '-15px',
              width: '30px', height: '30px', background: '#f59e0b', borderRadius: '50%', boxShadow: '0 0 40px #f59e0b, 0 0 15px #f59e0b'
            }}></div>
          </div>

          {/* Orbit 3 (Outer) */}
          <div className="orbit-spin-slow" style={{ position: 'absolute', width: '580px', height: '580px', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '50%', animationDuration: '30s' }}>
            {/* Planet 3 */}
            <div style={{
              position: 'absolute', bottom: '-10px', left: '50%', marginLeft: '-10px',
              width: '20px', height: '20px', background: '#8b5cf6', borderRadius: '50%', boxShadow: '0 0 30px #8b5cf6, 0 0 10px #8b5cf6'
            }}></div>
          </div>

        </div>
      </div>
    </div>
  );
}
