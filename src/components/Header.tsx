import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'footer', label: 'Contact' }
];

export default function Header() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Keep track of which sections are currently intersecting
    const visibleSections = new Set<string>();

    const observer = new IntersectionObserver((entries) => {
      let changed = false;
      
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSections.add(entry.target.id);
          changed = true;
        } else {
          if (visibleSections.has(entry.target.id)) {
            visibleSections.delete(entry.target.id);
            changed = true;
          }
        }
      });

      if (changed && visibleSections.size > 0) {
        // Find the section that appears first in the navItems array
        const activeItem = navItems.find(item => visibleSections.has(item.id));
        if (activeItem) {
          setActiveSection(activeItem.id);
        }
      } else if (changed && visibleSections.size === 0 && window.scrollY === 0) {
        // Fallback to hero if at top and nothing intersecting (rare)
        setActiveSection('hero');
      }
    }, { 
      threshold: 0.2, // Lower threshold so it triggers earlier
      rootMargin: '-10% 0px -40% 0px' // Focus on the middle/top of the screen
    });

    // Small delay to let GSAP and React finish initial layout
    setTimeout(() => {
      navItems.forEach(item => {
        const element = document.getElementById(item.id);
        if (element) observer.observe(element);
      });
    }, 100);

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`} style={{ justifyContent: 'center' }}>

      {/* Desktop Horizontal Navigation */}
      <nav className="desktop-nav" style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.3rem', borderRadius: '9999px', gap: '0.2rem', alignItems: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
        {navItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => scrollTo(item.id)} 
            className="nav-link" 
            style={{ 
              background: item.id === activeSection ? '#3b82f6' : 'transparent', 
              color: item.id === activeSection ? 'white' : 'var(--text-muted)', 
              padding: '0.5rem 0.8rem', 
              borderRadius: '9999px', 
              fontSize: '0.85rem' 
            }}
            onMouseOver={(e) => { if(item.id !== activeSection) e.currentTarget.style.color = 'var(--text-main)' }}
            onMouseOut={(e) => { if(item.id !== activeSection) e.currentTarget.style.color = 'var(--text-muted)' }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Hamburger Menu Toggle (Mobile) */}
      <div className="mobile-menu-btn" style={{ position: 'relative' }}>
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ 
            background: 'rgba(255, 255, 255, 0.05)', 
            border: '1px solid rgba(255,255,255,0.1)', 
            borderRadius: '8px', 
            padding: '0.6rem', 
            color: 'white', 
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <nav style={{ 
            position: 'absolute', 
            top: '120%', 
            right: 0, 
            background: 'rgba(15, 23, 42, 0.95)', 
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '1rem',
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.5rem',
            minWidth: '220px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}>
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollTo(item.id)} 
                className="nav-link" 
                style={{ 
                  textAlign: 'left', 
                  padding: '0.8rem 1rem', 
                  background: item.id === activeSection ? '#3b82f6' : 'transparent', 
                  color: item.id === activeSection ? 'white' : 'var(--text-muted)', 
                  borderRadius: '8px', 
                  fontSize: '1rem' 
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
