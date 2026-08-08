// components/ThemeToggle.jsx
import { useEffect, useState } from "react";
import gsap from "gsap";

const ThemeToggle = () => {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("izest-theme");
    return saved ? saved === "dark" : true; // default dark
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("izest-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("izest-theme", "light");
    }

    gsap.fromTo(
      ".theme-btn",
      { scale: 0.85 },
      { scale: 1, duration: 0.3, ease: "back.out(2)" }
    );
  }, [dark]);

  return (
    <button
      onClick={() => setDark(prev => !prev)}
      className="theme-btn fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-['Inter'] font-medium tracking-wider shadow-lg"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        color: "var(--text-muted)",
      }}
    >
      <span>{dark ? "☀️" : "🌙"}</span>
      <span>{dark ? "LIGHT" : "DARK"}</span>
    </button>
  );
};

export default ThemeToggle;