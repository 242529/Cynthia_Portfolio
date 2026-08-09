import { useState, useRef, useEffect } from 'react'
import { cvData } from './data/cvData.ts'
import Header from './components/Header.tsx'
import PMVikasHeader from './components/PMVikasHeader.tsx'
import Cursor from './components/Cursor.tsx'

import Hero from './components/Hero.tsx'
import About from './components/About.tsx'
import Skills from './components/Skills.tsx'
import Certifications from './components/Certifications.tsx'
import Projects from './components/Projects.tsx'
import Experience from './components/Experience.tsx'
import Education from './components/Education.tsx'
import Achievements from './components/Achievements.tsx'
import Leadership from './components/Leadership.tsx'
import Footer from './components/Footer.tsx'
import PMVikasInternship from './components/PMVikasInternship.tsx'
import './styles/globals.css'

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [activeView, setActiveView] = useState<'portfolio' | 'vikas'>('portfolio');
  const [animationClass, setAnimationClass] = useState('');
  
  const portfolioRef = useRef<HTMLButtonElement>(null);
  const vikasRef = useRef<HTMLButtonElement>(null);
  const [pillStyle, setPillStyle] = useState({ width: 0, transform: 'translateX(0)' });

  useEffect(() => {
    if (activeView === 'portfolio' && portfolioRef.current) {
      setPillStyle({
        width: portfolioRef.current.offsetWidth,
        transform: 'translateX(0)'
      });
    } else if (activeView === 'vikas' && vikasRef.current && portfolioRef.current) {
      setPillStyle({
        width: vikasRef.current.offsetWidth,
        transform: `translateX(${portfolioRef.current.offsetWidth}px)`
      });
    }
  }, [activeView]);

  const handleToggle = (view: 'portfolio' | 'vikas') => {
    if (view === activeView) return;
    setAnimationClass('animate-flip-out');
    setTimeout(() => {
      setActiveView(view);
      window.scrollTo(0, 0);
      setAnimationClass('animate-flip-in');
      
      setTimeout(() => {
        setAnimationClass('');
        // Force GSAP to recalculate pin spacings and offsets 
        // after the 3D transform is removed and DOM is settled.
        setTimeout(() => {
          ScrollTrigger.refresh(true);
        }, 50);
      }, 600);
      
    }, 400); 
  };

  return (
    <>
      <div className="mode-toggle-container">
        <div className="toggle-pill" style={pillStyle}></div>
        <button 
          ref={portfolioRef}
          className={`mode-btn ${activeView === 'portfolio' ? 'active' : ''}`}
          onClick={() => handleToggle('portfolio')}
        >
          Portfolio
        </button>
        <button 
          ref={vikasRef}
          className={`mode-btn ${activeView === 'vikas' ? 'active' : ''}`}
          onClick={() => handleToggle('vikas')}
        >
          PM Vikas Log
        </button>
      </div>

      <div className={`app-container ${animationClass}`}>
        <Cursor />
        {activeView === 'portfolio' ? (
          <>
            <Header />
            <div className="ui-layer">
              <Hero data={cvData.personal} />
              <About data={cvData.personal} />
              <Skills skills={cvData.skills} certifications={cvData.certifications} />
              <Certifications certifications={cvData.certifications} />
              <Projects projects={cvData.projects} />
              <Experience internships={cvData.internships} />
              <Education education={cvData.education} />
              <Leadership leadership={cvData.leadership} />
              <Achievements achievements={cvData.achievements} />
              <Footer personal={cvData.personal} />
            </div>
          </>
        ) : (
          <>
            <PMVikasHeader />
            <PMVikasInternship />
            <Footer personal={cvData.personal} />
          </>
        )}
      </div>
    </>
  )
}

export default App
