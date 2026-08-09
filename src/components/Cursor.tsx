import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      // Move the inner dot instantly
      gsap.set(cursorDot.current, {
        x: e.clientX,
        y: e.clientY
      });
      
      // Move the outer ring with a slight smooth delay
      gsap.to(cursorRing.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out"
      });
    };

    // Add hover effect for clickable elements
    const addHoverEffect = () => {
      gsap.to(cursorRing.current, {
        scale: 1.5,
        backgroundColor: 'rgba(0, 246, 255, 0.1)',
        duration: 0.2
      });
    };

    const removeHoverEffect = () => {
      gsap.to(cursorRing.current, {
        scale: 1,
        backgroundColor: 'transparent',
        duration: 0.2
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    // Attach listeners to all clickable elements. We use a MutationObserver to handle dynamic elements if needed, but a simple interval or event delegation is better. 
    // For simplicity, we just grab them on mount. (Works fine for this static portfolio)
    const attachListeners = () => {
      const clickables = document.querySelectorAll('a, button, .nav-link');
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', addHoverEffect);
        el.addEventListener('mouseleave', removeHoverEffect);
      });
    }
    
    // Slight delay to ensure DOM is fully rendered
    setTimeout(attachListeners, 1000);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      const clickables = document.querySelectorAll('a, button, .nav-link');
      clickables.forEach((el) => {
        el.removeEventListener('mouseenter', addHoverEffect);
        el.removeEventListener('mouseleave', removeHoverEffect);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={cursorDot}></div>
      <div className="cursor-ring" ref={cursorRing}></div>
    </>
  );
}
