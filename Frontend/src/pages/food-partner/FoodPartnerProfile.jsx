// pages/food-partner/FoodPartnerProfile.jsx
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import { Sun, Moon } from "lucide-react";
import API_URL from "../../api.js";

// ✅ useTheme hook
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

const FoodPartnerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const gridRef  = useRef(null);
  const [dark, setDark] = useTheme(); // ✅ theme hook

  const [partner, setPartner] = useState(null);
  const [videos,  setVideos]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const [partnerRes, videosRes] = await Promise.all([
          axios.get(`${API_URL}/api/food-partner/profile/${id}`,       { withCredentials: true }),
          axios.get(`${API_URL}/api/food-partner/profile/video/${id}`, { withCredentials: true }),
        ]);
        setPartner(partnerRes.data?.partner || partnerRes.data);
        const vids = videosRes.data?.foodItems || videosRes.data?.items || videosRes.data || [];
        setVideos(Array.isArray(vids) ? vids : []);
      } catch (err) {
        setError("Couldn't load this store.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  useEffect(() => {
    if (!partner) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".profile-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
      gsap.fromTo(".stat-item",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out", delay: 0.3 }
      );
      gsap.fromTo(".grid-item",
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.07, ease: "back.out(1.2)", delay: 0.5 }
      );
    });
    return () => ctx.revert();
  }, [partner]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center"
         style={{ background: "var(--bg-page)" }}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 animate-spin"
             style={{ borderColor: "#4ADE1A", borderTopColor: "transparent" }} />
        <p className="text-sm font-['DM_Sans']" style={{ color: "var(--text-muted)" }}>Loading store…</p>
      </div>
    </div>
  );

  if (error || !partner) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4"
         style={{ background: "var(--bg-page)" }}>
      <p className="font-['Bebas_Neue'] text-3xl" style={{ color: "var(--text-main)" }}>Store not found</p>
      <button onClick={() => navigate("/")}
        className="px-5 py-2 rounded-full text-sm font-['Inter'] font-medium"
        style={{ background: "#4ADE1A", color: "#0D0D0D" }}>
        ← Back to feed
      </button>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>

      {/* Back button */}
      <button onClick={() => navigate("/")}
        className="fixed top-5 left-5 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-['Inter'] font-medium"
        style={{ background: "var(--bg-card)", backdropFilter: "blur(10px)",
                 border: "1px solid var(--border)", color: "var(--text-main)" }}>
        ← Back
      </button>

      {/* ✅ Theme toggle button — top right */}
      <button
        onClick={() => setDark(p => !p)}
        className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-['Inter'] font-medium"
        style={{ background: "var(--bg-card)", backdropFilter: "blur(10px)",
                 border: "1px solid var(--border)", color: "var(--text-muted)", cursor: "pointer" }}>
        {dark
          ? <Sun size={15} style={{ color: "var(--text-muted)" }} />
          : <Moon size={15} style={{ color: "var(--text-muted)" }} />
        }
        {dark ? "Light" : "Dark"}
      </button>

      <div className="max-w-2xl mx-auto px-4 pt-20 pb-16">

        {/* Profile Header */}
        <div className="profile-header flex flex-col gap-6">

          {/* Avatar + info */}
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 font-['Bebas_Neue'] text-3xl"
                 style={{ background: "#4ADE1A", color: "#0D0D0D" }}>
              {partner.username?.[0]?.toUpperCase() || "?"}
            </div>

            <div className="flex flex-col gap-1">
              <h1 className="font-['Bebas_Neue'] text-3xl tracking-wide leading-none"
                  style={{ color: "var(--text-main)" }}>
                {partner.username}
              </h1>
              {partner.contactName && (
                <p className="text-sm font-['DM_Sans']" style={{ color: "var(--text-muted)" }}>
                  {partner.contactName}
                </p>
              )}
              {partner.address && (
                <p className="text-xs font-['DM_Sans'] flex items-center gap-1"
                   style={{ color: "var(--text-muted)" }}>
                  <span>📍</span> {partner.address}
                </p>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              [videos.length, "Meals"],
              ["4.8 ⭐",       "Rating"],
              ["500+",        "Served"],
            ].map(([val, label]) => (
              <div key={label}
                className="stat-item flex flex-col items-center justify-center py-4 rounded-2xl gap-1"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <p className="font-['Bebas_Neue'] text-2xl leading-none" style={{ color: "#4ADE1A" }}>{val}</p>
                <p className="text-xs font-['DM_Sans']" style={{ color: "var(--text-muted)" }}>{label}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex gap-3">
            <a href={`mailto:${partner.email}`}
              className="flex-1 text-center py-2.5 rounded-xl text-sm font-['Inter'] font-semibold"
              style={{ background: "#4ADE1A", color: "#0D0D0D" }}>
              Contact Store
            </a>
            {partner.phoneNumber && (
              <a href={`tel:${partner.phoneNumber}`}
                className="flex-1 text-center py-2.5 rounded-xl text-sm font-['Inter'] font-medium"
                style={{ border: "1px solid var(--border)", color: "var(--text-main)" }}>
                📞 Call
              </a>
            )}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            <p className="text-xs font-['DM_Sans'] tracking-widest uppercase"
               style={{ color: "var(--text-muted)" }}>Menu</p>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>
        </div>

        {/* Video Grid */}
        {videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-2">
            <p className="font-['Bebas_Neue'] text-2xl" style={{ color: "var(--text-main)" }}>No items yet</p>
            <p className="text-sm font-['DM_Sans']" style={{ color: "var(--text-muted)" }}>
              This store hasn't uploaded anything.
            </p>
          </div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-3 gap-1 mt-1">
            {videos.map((v) => (
              <VideoThumb key={v._id} item={v} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const VideoThumb = ({ item }) => {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (hovered) el.play().catch(() => {});
    else { el.pause(); el.currentTime = 0; }
  }, [hovered]);

  return (
    <div
      className="grid-item relative overflow-hidden cursor-pointer"
      style={{ aspectRatio: "9/16" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <video ref={videoRef} src={item.videoUrl} muted playsInline loop
             className="w-full h-full object-cover" />
      <div className="absolute inset-0 flex items-end p-2 transition-opacity duration-200"
           style={{
             background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
             opacity: hovered ? 1 : 0,
           }}>
        <p className="text-white text-xs font-['DM_Sans'] font-medium leading-tight line-clamp-2">
          {item.name}
        </p>
      </div>
    </div>
  );
};

export default FoodPartnerProfile;