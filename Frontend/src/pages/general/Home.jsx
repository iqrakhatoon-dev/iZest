// pages/general/Home.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import API_URL from "../../api.js";
import {
  Home as HomeIcon, Bookmark, LogOut, Heart,
  MessageCircle, Volume2, VolumeX, X,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Home",  Icon: HomeIcon, path: "/"      },
  { label: "Saved", Icon: Bookmark, path: "/saved" },
];

const BottomNav = ({ onLogout }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden items-center justify-around"
      style={{ height:"62px", background:"rgba(0,0,0,0.65)", backdropFilter:"blur(20px)",
               WebkitBackdropFilter:"blur(20px)", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
      {NAV_ITEMS.map(({ label, Icon, path }) => {
        const active = pathname === path;
        return (
          <button key={path} onClick={() => navigate(path)}
            style={{ background:"none", border:"none", cursor:"pointer",
                     display:"flex", flexDirection:"column", alignItems:"center", gap:"3px", padding:"6px 24px" }}>
            <Icon size={22} strokeWidth={active?2.5:1.8} fill={active?"#4ADE1A":"none"}
              style={{ color: active?"#4ADE1A":"rgba(255,255,255,0.45)" }} />
            <span style={{ fontSize:"10px", fontFamily:"'DM Sans',sans-serif",
                           color:active?"#4ADE1A":"rgba(255,255,255,0.45)", fontWeight:active?700:400 }}>
              {label}
            </span>
          </button>
        );
      })}
      <button onClick={onLogout}
        style={{ background:"none", border:"none", cursor:"pointer",
                 display:"flex", flexDirection:"column", alignItems:"center", gap:"3px", padding:"6px 24px" }}>
        <LogOut size={22} strokeWidth={1.8} style={{ color:"#E8100A" }} />
        <span style={{ fontSize:"10px", fontFamily:"'DM Sans',sans-serif", color:"#E8100A" }}>Logout</span>
      </button>
    </nav>
  );
};

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <div className="hidden md:flex flex-col justify-between flex-shrink-0"
      style={{ width:"220px", borderRight:"1px solid #1a1a1a", padding:"28px 12px" }}>
      <div style={{ display:"flex", flexDirection:"column", gap:"4px" }}>
        <p style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"22px",
                    letterSpacing:"4px", color:"#4ADE1A", padding:"0 12px", marginBottom:"20px" }}>
          iZest
        </p>
        {NAV_ITEMS.map(({ label, Icon, path }) => {
          const active = pathname === path;
          return (
            <button key={path} onClick={() => navigate(path)}
              style={{ display:"flex", alignItems:"center", gap:"12px",
                       padding:"10px 12px", borderRadius:"10px", border:"none",
                       cursor:"pointer", width:"100%",
                       background: active?"rgba(74,222,26,0.12)":"transparent" }}>
              <Icon size={20} strokeWidth={active?2.5:1.8} fill={active?"rgba(74,222,26,0.2)":"none"}
                style={{ color:active?"#4ADE1A":"#666", flexShrink:0 }} />
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"14px",
                             color:active?"#4ADE1A":"#888", fontWeight:active?600:400 }}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
      <button onClick={onLogout}
        style={{ display:"flex", alignItems:"center", gap:"12px", padding:"10px 12px",
                 borderRadius:"10px", border:"1px solid #2a0a0a", background:"#160505",
                 cursor:"pointer", width:"100%" }}>
        <LogOut size={18} style={{ color:"#E8100A", flexShrink:0 }} />
        <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"13px", color:"#E8100A", fontWeight:500 }}>
          Logout
        </span>
      </button>
    </div>
  );
};

const CommentDrawer = ({ onClose }) => {
  const [text, setText] = useState("");
  return (
    <div onClick={onClose}
      style={{ position:"absolute", inset:0, zIndex:40, background:"rgba(0,0,0,0.6)",
               backdropFilter:"blur(6px)", display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{ background:"#181818", borderRadius:"20px 20px 0 0",
                 borderTop:"1px solid #2a2a2a", padding:"12px 16px 36px",
                 display:"flex", flexDirection:"column", gap:"12px" }}>
        <div style={{ width:"36px", height:"4px", borderRadius:"2px", background:"#333", margin:"0 auto 4px" }} />
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"15px", fontWeight:600, color:"#F5F5F0" }}>Comments</p>
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer" }}>
            <X size={20} style={{ color:"#666" }} />
          </button>
        </div>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"13px", color:"#555", textAlign:"center", padding:"20px 0" }}>
          Comments coming soon 👀
        </p>
        <div style={{ display:"flex", gap:"8px" }}>
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a comment…"
            style={{ flex:1, borderRadius:"24px", padding:"10px 16px", background:"#0D0D0D",
                     border:"1px solid #2a2a2a", color:"#F5F5F0", fontSize:"13px",
                     fontFamily:"'Inter',sans-serif", outline:"none" }} />
          <button disabled={!text.trim()}
            style={{ padding:"10px 18px", borderRadius:"24px", border:"none",
                     cursor:text.trim()?"pointer":"not-allowed",
                     background:text.trim()?"#4ADE1A":"#222",
                     color:text.trim()?"#0D0D0D":"#555",
                     fontFamily:"'Inter',sans-serif", fontSize:"13px", fontWeight:600 }}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

const ActionBtn = ({ onClick, children, label }) => (
  <button onClick={onClick}
    style={{ background:"none", border:"none", cursor:"pointer",
             display:"flex", flexDirection:"column", alignItems:"center", gap:"5px" }}>
    {children}
    <span style={{ fontSize:"11px", color:"rgba(255,255,255,0.7)",
                   fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>
      {label}
    </span>
  </button>
);

const ReelCard = ({ item, muted, setMuted, likedIds, setLikedIds, savedIds, setSavedIds }) => {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [expanded,    setExpanded]    = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [likeAnim,    setLikeAnim]    = useState(false);
  const [likeCount,   setLikeCount]   = useState(item.likeCount || 0);

  const liked = likedIds.has(item._id);
  const saved = savedIds.has(item._id);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else { el.pause(); el.currentTime = 0; }
      },
      { threshold: 0.6 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  const handleLike = async () => {
    const wasLiked = liked;
    setLikedIds(prev => {
      const next = new Set(prev);
      wasLiked ? next.delete(item._id) : next.add(item._id);
      return next;
    });
    setLikeCount(c => wasLiked ? c - 1 : c + 1);
    if (!wasLiked) { setLikeAnim(true); setTimeout(() => setLikeAnim(false), 350); }
    try {
      await axios.post(`${API_URL}/api/food-items/like`,
        { foodItemId: item._id }, { withCredentials: true });
    } catch (err) {
      if (err.response?.status === 401) { navigate("/user/login"); return; }
      setLikedIds(prev => {
        const next = new Set(prev);
        wasLiked ? next.add(item._id) : next.delete(item._id);
        return next;
      });
      setLikeCount(c => wasLiked ? c + 1 : c - 1);
    }
  };

  const handleSave = async () => {
    const wasSaved = saved;
    setSavedIds(prev => {
      const next = new Set(prev);
      wasSaved ? next.delete(item._id) : next.add(item._id);
      return next;
    });
    try {
      await axios.post(`${API_URL}/api/food-items/save`,
        { foodItemId: item._id }, { withCredentials: true });
    } catch (err) {
      if (err.response?.status === 401) { navigate("/user/login"); return; }
      setSavedIds(prev => {
        const next = new Set(prev);
        wasSaved ? next.add(item._id) : next.delete(item._id);
        return next;
      });
    }
  };

  const formatCount = (n) => n >= 1000 ? (n/1000).toFixed(1)+"k" : String(n);
  const desc        = item.description || "";
  const isLong      = desc.length > 80;
  const displayDesc = !expanded && isLong ? desc.slice(0, 80)+"…" : desc;

  return (
    <div className="relative w-full flex-shrink-0 snap-start overflow-hidden"
      style={{ height:"100dvh", background:"#000" }}>
      <video ref={videoRef} src={item.videoUrl} loop muted playsInline
        style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />
      <div style={{ position:"absolute", inset:0, pointerEvents:"none",
                    background:"linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.1) 55%, transparent 75%)" }} />

      <button onClick={() => setMuted(p => !p)}
        style={{ position:"absolute", top:"16px", right:"16px", zIndex:20,
                 width:"38px", height:"38px", borderRadius:"50%",
                 background:"rgba(0,0,0,0.45)", backdropFilter:"blur(8px)",
                 border:"1px solid rgba(255,255,255,0.12)",
                 display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
        {muted ? <VolumeX size={17} style={{ color:"white" }} /> : <Volume2 size={17} style={{ color:"white" }} />}
      </button>

      <div style={{ position:"absolute", right:"14px", bottom:"220px", zIndex:20,
                    display:"flex", flexDirection:"column", alignItems:"center", gap:"28px" }}>
        <ActionBtn onClick={handleLike} label={formatCount(likeCount)}>
          <Heart size={36} strokeWidth={1.8} fill={liked?"#E8100A":"none"}
            style={{ color:liked?"#E8100A":"white",
                     transform:likeAnim?"scale(1.4)":"scale(1)",
                     transition:"transform 0.25s cubic-bezier(0.34,1.56,0.64,1), color 0.15s",
                     filter:liked?"drop-shadow(0 0 6px rgba(232,16,10,0.7))":"none" }} />
        </ActionBtn>
        <ActionBtn onClick={() => setShowComment(true)} label="Comment">
          <MessageCircle size={36} strokeWidth={1.8} style={{ color:"white" }} />
        </ActionBtn>
        <ActionBtn onClick={handleSave} label="Save">
          <Bookmark size={36} strokeWidth={1.8} fill={saved?"#4ADE1A":"none"}
            style={{ color:saved?"#4ADE1A":"white",
                     filter:saved?"drop-shadow(0 0 6px rgba(74,222,26,0.6))":"none",
                     transition:"color 0.2s, filter 0.2s" }} />
        </ActionBtn>
      </div>

      <div style={{ position:"absolute", bottom:0, left:0, right:"70px", zIndex:10,
                    padding:"0 16px 74px", display:"flex", flexDirection:"column", gap:"10px" }}>
        <p style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"26px", letterSpacing:"1.5px",
                    color:"white", lineHeight:1.1, textShadow:"0 2px 12px rgba(0,0,0,0.9)" }}>
          {item.name}
        </p>
        {desc && (
          <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.82)", fontFamily:"'DM Sans',sans-serif",
                      lineHeight:1.55, textShadow:"0 1px 6px rgba(0,0,0,0.95)" }}>
            {displayDesc}
            {isLong && (
              <button onClick={() => setExpanded(p => !p)}
                style={{ color:"#4ADE1A", background:"none", border:"none",
                         cursor:"pointer", fontSize:"13px", fontWeight:700, marginLeft:"4px" }}>
                {expanded?"less":"more"}
              </button>
            )}
          </p>
        )}
        <button onClick={() => navigate(`/food-partner/profile/${item.foodPartner}`)}
          style={{ alignSelf:"flex-start", padding:"9px 20px", borderRadius:"24px",
                   border:"none", cursor:"pointer", background:"#E8100A", color:"white",
                   fontSize:"13px", fontFamily:"'Inter',sans-serif", fontWeight:600 }}>
          Visit Store →
        </button>
      </div>
      {showComment && <CommentDrawer onClose={() => setShowComment(false)} />}
    </div>
  );
};

// ── Home ─────────────────────────────────────────────────────────
const Home = () => {
  const [items,    setItems]    = useState(null);
  const [error,    setError]    = useState("");
  const [muted,    setMuted]    = useState(true);
  const [likedIds, setLikedIds] = useState(new Set());
  const [savedIds, setSavedIds] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const loadFeed = async () => {
      try {
        const [feedRes, savedRes, likedRes] = await Promise.all([
          axios.get(`${API_URL}/api/food-items`, { withCredentials: true }),
          axios.get(`${API_URL}/api/food-items/saved`, { withCredentials: true })
               .catch(() => ({ data: { saves: [] } })),
          axios.get(`${API_URL}/api/food-items/liked`, { withCredentials: true })
               .catch(() => ({ data: { likes: [] } })),
        ]);

        const foodItems = feedRes.data?.foodItems;
        if (!foodItems) { navigate("/user/login"); return; }
        setItems(Array.isArray(foodItems) ? foodItems : []);

        const saves = savedRes.data?.saves || [];
        setSavedIds(new Set(
          saves.map(s => {
            if (typeof s.foodItemId === "object") return s.foodItemId?._id;
            return s.foodItemId;
          }).filter(Boolean)
        ));

        const likes = likedRes.data?.likes || [];
        setLikedIds(new Set(
          likes.map(l => {
            if (typeof l.foodItemId === "object") return l.foodItemId?._id;
            return l.foodItemId;
          }).filter(Boolean)
        ));

      } catch (err) {
        if (err.response?.status === 401) { navigate("/user/login"); return; }
        setError("Couldn't load feed. Try again.");
        setItems([]);
      }
    };
    loadFeed();
  }, []);

  const handleLogout = async () => {
    try { await axios.get(`${API_URL}/api/auth/user/logout`, { withCredentials: true }); } catch {}
    navigate("/user/login");
  };

  const shell = (children) => (
    <div style={{ display:"flex", height:"100dvh", background:"#0D0D0D" }}>
      <Sidebar onLogout={handleLogout} />
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", background:"#0a0a0a" }}>
        <div style={{ width:"100%", maxWidth:"400px", height:"100dvh" }}>
          {children}
        </div>
      </div>
      <div className="hidden md:block" style={{ width:"220px", flexShrink:0, borderLeft:"1px solid #1a1a1a" }} />
      <BottomNav onLogout={handleLogout} />
    </div>
  );

  if (items === null) return shell(
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", gap:"12px" }}>
      <div style={{ width:"32px", height:"32px", borderRadius:"50%", border:"2px solid #4ADE1A",
                    borderTopColor:"transparent", animation:"spin 0.8s linear infinite" }} />
      <p style={{ fontSize:"14px", fontFamily:"'DM Sans',sans-serif", color:"#888" }}>Loading feed…</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );

  if (error) return shell(
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100%" }}>
      <p style={{ fontSize:"14px", color:"#E8100A", fontFamily:"'DM Sans',sans-serif" }}>{error}</p>
    </div>
  );

  if (items.length === 0) return shell(
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", gap:"8px" }}>
      <p style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"28px", color:"#F5F5F0" }}>No food yet 👀</p>
      <p style={{ fontSize:"13px", color:"#555", fontFamily:"'DM Sans',sans-serif" }}>Check back soon.</p>
    </div>
  );

  return shell(
    <div style={{ height:"100dvh", overflowY:"scroll", scrollSnapType:"y mandatory" }}>
      {items.map((item) => (
        <ReelCard key={item._id} item={item} muted={muted} setMuted={setMuted}
          likedIds={likedIds} setLikedIds={setLikedIds}
          savedIds={savedIds} setSavedIds={setSavedIds} />
      ))}
    </div>
  );
};

export default Home;