// hooks/useButtonFx.js
// Ek baar import karo, sab buttons pe lagao
import { useEffect } from "react";
import gsap from "gsap";

const useButtonFx = () => {
  useEffect(() => {
    const buttons = document.querySelectorAll(".btn-fx");

    const onEnter = (e) => {
      gsap.to(e.currentTarget, {
        scale: 1.045,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const onLeave = (e) => {
      gsap.to(e.currentTarget, {
        scale: 1,
        duration: 0.25,
        ease: "elastic.out(1.2, 0.5)",
      });
    };

    const onDown = (e) => {
      gsap.to(e.currentTarget, {
        scale: 0.94,
        duration: 0.1,
        ease: "power3.in",
      });
    };

    const onUp = (e) => {
      gsap.to(e.currentTarget, {
        scale: 1,
        duration: 0.3,
        ease: "elastic.out(1.4, 0.5)",
      });
    };

    buttons.forEach((btn) => {
      btn.addEventListener("mouseenter", onEnter);
      btn.addEventListener("mouseleave", onLeave);
      btn.addEventListener("mousedown", onDown);
      btn.addEventListener("mouseup", onUp);
    });

    return () => {
      buttons.forEach((btn) => {
        btn.removeEventListener("mouseenter", onEnter);
        btn.removeEventListener("mouseleave", onLeave);
        btn.removeEventListener("mousedown", onDown);
        btn.removeEventListener("mouseup", onUp);
      });
    };
  }, []);
};

export default useButtonFx;