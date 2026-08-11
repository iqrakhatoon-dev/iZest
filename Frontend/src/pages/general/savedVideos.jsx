// pages/SavedVideos.jsx
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Home as HomeIcon, Bookmark, LogOut, Play, Sun, Moon } from "lucide-react";
import API_URL from "../../api.js";

const NAV_ITEMS = [
  { label: "Home",  Icon: HomeIcon, path: "/"      },
  { label: "Saved", Icon: Bookmark, path: "/saved" },
];

// ✅ FIX 1: useTheme hook add kiya — Home.jsx jaisa same logic
const useTheme = () => {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("izest-theme");
    return saved ? saved === "dark" : true;
  });
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("izest-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("izest-theme", "light");
    }
  }, [dark]);
  return [dark, setDark];
};

// ✅ FIX 2: dark + setDark props accept kiye BottomNav mein
const BottomNav = ({ onLogout, dark, setDark }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden items-center justify-around"
      style={{
        height: "62px",
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {NAV_ITEMS.map(({ label, Icon, path }) => {
        const active = pathname === path;
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", padding: "6px 12px",
            }}
          >
            <Icon
              size={22}
              strokeWidth={active ? 2.5 : 1.8}
              fill={active ? "#4ADE1A" : "none"}
              style={{ color: active ? "#4ADE1A" : "rgba(255,255,255,0.45)" }}
            />
            <span style={{
              fontSize: "10px", fontFamily: "'DM Sans', sans-serif",
              color: active ? "#4ADE1A" : "rgba(255,255,255,0.45)",
              fontWeight: active ? 700 : 400,
            }}>
              {label}
            </span>
          </button>
        );
      })}

      {/* ✅ FIX 3: Theme toggle button add kiya BottomNav mein */}
      <button
        onClick={() => setDark(p => !p)}
        style={{
          background: "none", border: "none", cursor: "pointer",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", padding: "6px 12px",
        }}
      >
        {dark
          ? <Sun size={22} strokeWidth={1.8} style={{ color: "rgba(255,255,255,0.45)" }} />
          : <Moon size={22} strokeWidth={1.8} style={{ color: "rgba(255,255,255,0.45)" }} />
        }
        <span style={{ fontSize: "10px", fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.45)" }}>
          {dark ? "Light" : "Dark"}
        </span>
      </button>

      <button
        onClick={onLogout}
        style={{
          background: "none", border: "none", cursor: "pointer",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", padding: "6px 12px",
        }}
      >
        <LogOut size={22} strokeWidth={1.8} style={{ color: "#E8100A" }} />
        <span style={{ fontSize: "10px", fontFamily: "'DM Sans', sans-serif", color: "#E8100A" }}>
          Logout
        </span>
      </button>
    </nav>
  );
};

// ✅ FIX 4: Sidebar mein bhi dark + setDark + theme toggle add kiya
const Sidebar = ({ onLogout, dark, setDark }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div
      className="hidden md:flex flex-col justify-between flex-shrink-0"
      style={{ width: "220px", borderRight: "1px solid var(--border)", padding: "28px 12px",
               background: "var(--bg-card)" }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <p style={{
          fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px",
          letterSpacing: "4px", color: "#4ADE1A", padding: "0 12px", marginBottom: "20px",
        }}>
          iZest
        </p>

        {NAV_ITEMS.map(({ label, Icon, path }) => {
          const active = pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "10px 12px", borderRadius: "10px", border: "none",
                cursor: "pointer", width: "100%",
                background: active ? "rgba(74,222,26,0.12)" : "transparent",
              }}
            >
              <Icon
                size={20}
                strokeWidth={active ? 2.5 : 1.8}
                fill={active ? "rgba(74,222,26,0.2)" : "none"}
                style={{ color: active ? "#4ADE1A" : "var(--text-muted)", flexShrink: 0 }}
              />
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
                color: active ? "#4ADE1A" : "var(--text-muted)", fontWeight: active ? 600 : 400,
              }}>
                {label}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <button
          onClick={() => setDark(p => !p)}
          style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px",
                   borderRadius: "10px", border: "1px solid var(--border)", background: "transparent",
                   cursor: "pointer", width: "100%" }}
        >
          {dark
            ? <Sun size={18} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
            : <Moon size={18} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
          }
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px",
                         color: "var(--text-muted)", fontWeight: 500 }}>
            {dark ? "Light mode" : "Dark mode"}
          </span>
        </button>

        <button
          onClick={onLogout}
          style={{
            display: "flex", alignItems: "center", gap: "12px",
            padding: "10px 12px", borderRadius: "10px",
            border: "1px solid #2a0a0a", background: "#160505",
            cursor: "pointer", width: "100%",
          }}
        >
          <LogOut size={18} style={{ color: "#E8100A", flexShrink: 0 }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#E8100A", fontWeight: 500 }}>
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

const SavedCard = ({ item, onUnsave }) => {
  const navigate  = useNavigate();
  const videoRef  = useRef(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (hovering) el.play().catch(() => {});
    else { el.pause(); el.currentTime = 0; }
  }, [hovering]);

  return (
    <div
      style={{ position: "relative", borderRadius: "12px", overflow: "hidden", cursor: "pointer", background: "#111" }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => navigate(`/?highlight=${item.foodItemId?._id || item.foodItemId}`)}
    >
      <div style={{ aspectRatio: "9/16", position: "relative" }}>
        <video
          ref={videoRef}
          src={item.foodItemId?.videoUrl}
          muted
          playsInline
          loop
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)",
          pointerEvents: "none",
        }} />

        {!hovering && (
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{
              width: "40px", height: "40px", borderRadius: "50%",
              background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.15)",
            }}>
              <Play size={16} fill="white" style={{ color: "white", marginLeft: "2px" }} />
            </div>
          </div>
        )}

        <button
          onClick={(e) => { e.stopPropagation(); onUnsave(item._id, item.foodItemId?._id); }}
          style={{
            position: "absolute", top: "8px", right: "8px",
            width: "30px", height: "30px", borderRadius: "50%",
            background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Bookmark size={14} fill="#4ADE1A" style={{ color: "#4ADE1A" }} />
        </button>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "10px" }}>
          <p style={{
            fontFamily: "'Bebas Neue', cursive", fontSize: "15px",
            letterSpacing: "0.8px", color: "white", lineHeight: 1.1,
          }}>
            {item.foodItemId?.name || "Unnamed dish"}
          </p>
        </div>
      </div>
    </div>
  );
};

const SavedVideos = () => {
  const [saves,   setSaves]   = useState(null);
  const [error,   setError]   = useState("");
  const [dark,    setDark]    = useTheme(); // ✅ FIX 5: useTheme hook use kiya
  const navigate  = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/food-items/saved` , { withCredentials: true });
        setSaves(res.data?.saves || []);
      } catch (err) {
        if (err.response?.status === 401) { navigate("/user/login"); return; }
        setError("Couldn't load saved videos.");
        setSaves([]);
      }
    };
    load();
  }, []);

  const handleUnsave = async (saveId, foodItemId) => {
    setSaves((prev) => prev.filter((s) => s._id !== saveId));
    try {
      await axios.post(
        `${API_URL}/api/food-items/save`,
        { foodItemId },
        { withCredentials: true }
      );
    } catch (err) {
      if (err.response?.status === 401) navigate("/user/login");
      const res = await axios.get(`${API_URL}/api/food-items/saved` , { withCredentials: true });
      setSaves(res.data?.saves || []);
    }
  };

  const handleLogout = async () => {
    try { await axios.get(`${API_URL}/api/auth/user/logout`, { withCredentials: true }); } catch {}
    navigate("/user/login");
  };

  // ✅ FIX 6: var(--bg-page) use kiya hardcoded #0D0D0D ki jagah — theme switch hogi
  const shell = (children) => (
    <div style={{ display: "flex", minHeight: "100dvh", background: "var(--bg-page)" }}>
      <Sidebar onLogout={handleLogout} dark={dark} setDark={setDark} />
      <div style={{ flex: 1, padding: "28px 20px 80px", overflowY: "auto" }}>
        {children}
      </div>
      <div className="hidden md:block"
           style={{ width: "220px", flexShrink: 0, borderLeft: "1px solid var(--border)",
                    background: "var(--bg-page)" }} />
      <BottomNav onLogout={handleLogout} dark={dark} setDark={setDark} />
    </div>
  );

  if (saves === null) return shell(
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "70vh", gap: "12px" }}>
      <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px solid #4ADE1A", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
      <p style={{ fontSize: "14px", fontFamily: "'DM Sans', sans-serif", color: "var(--text-muted)" }}>Loading saved…</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );

  if (error) return shell(
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "70vh" }}>
      <p style={{ fontSize: "14px", color: "#E8100A", fontFamily: "'DM Sans', sans-serif" }}>{error}</p>
    </div>
  );

  return shell(
    <>
      <div style={{ marginBottom: "24px" }}>
        <p style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "32px", letterSpacing: "2px",
                    color: "var(--text-main)", lineHeight: 1 }}>
          Saved
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
                    color: "var(--text-muted)", marginTop: "4px" }}>
          {saves.length} {saves.length === 1 ? "video" : "videos"} saved
        </p>
      </div>

      {saves.length === 0 && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "50vh", gap: "12px" }}>
          <Bookmark size={48} strokeWidth={1.2} style={{ color: "var(--text-muted)" }} />
          <p style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "22px",
                      color: "var(--text-main)", letterSpacing: "1px" }}>
            Nothing saved yet
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "var(--text-muted)" }}>
            Tap the bookmark on any reel to save it here
          </p>
          <button
            onClick={() => navigate("/")}
            style={{
              marginTop: "8px", padding: "10px 22px", borderRadius: "24px",
              background: "#4ADE1A", color: "#0D0D0D", border: "none",
              fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, cursor: "pointer",
            }}
          >
            Browse feed →
          </button>
        </div>
      )}

      {saves.length > 0 && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: "10px",
        }}>
          {saves.map((save) => (
            <SavedCard key={save._id} item={save} onUnsave={handleUnsave} />
          ))}
        </div>
      )}
    </>
  );
};

export default SavedVideos;