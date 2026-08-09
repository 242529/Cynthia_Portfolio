import { Mail } from 'lucide-react';

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer({ personal }: { personal: any }) {
  // Ensure linkedin is a valid URL
  const linkedinUrl = personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`;
  
  return (
    <footer id="footer" style={{ 
      width: '100%', 
      padding: '4rem 5vw', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      background: 'rgba(0,0,0,0.2)',
      backdropFilter: 'blur(10px)'
    }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--text-main)' }}>Let's Connect</h3>
      
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }} onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-5px)'; }} onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
          <LinkedinIcon size={32} />
          <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>LinkedIn</span>
        </a>
        <a href={personal.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }} onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-5px)'; }} onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
          <GithubIcon size={32} />
          <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>GitHub</span>
        </a>
        <a href={`mailto:${personal.email}`} style={{ color: 'var(--text-muted)', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }} onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-5px)'; }} onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
          <Mail size={32} />
          <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>Email</span>
        </a>
      </div>
      
      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
        © {new Date().getFullYear()} {personal.name}. All rights reserved.
      </p>
    </footer>
  );
}
