// components/AnimatedWrapper.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedWrapper = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entry
      gsap.fromTo(
        ".animated-card",
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.4)" }
      );

      // Staggered form items
      gsap.fromTo(
        ".animate-item",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power2.out", delay: 0.25 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return <div ref={containerRef}>{children}</div>;
};

export default AnimatedWrapper;