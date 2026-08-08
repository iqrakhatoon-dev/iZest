// pages/food-partner/CreateFood.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import API_URL from "../../api.js";

const CreateFood = () => {
  const navigate = useNavigate();
  const formRef  = useRef(null);

  const [name,        setName]        = useState("");
  const [description, setDescription] = useState("");
  const [videoFile,   setVideoFile]   = useState(null);
  const [preview,     setPreview]     = useState(null);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState("");
  const [success,     setSuccess]     = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".dash-card",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
      gsap.fromTo(".dash-item",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power2.out", delay: 0.25 }
      );
    }, formRef);
    return () => ctx.revert();
  }, []);

  const handleVideo = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setVideoFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) { setError("Please select a video."); return; }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("name",        name);
      formData.append("description", description);
      formData.append("videoUrl",    videoFile);

      await axios.post(
        `${API_URL}/api/food-items`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setSuccess("Item uploaded successfully! 🎉");
      setName("");
      setDescription("");
      setVideoFile(null);
      setPreview(null);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={formRef} className="min-h-screen flex items-center justify-center p-4"
         style={{ background: "#0D0D0D" }}>

      <button onClick={() => navigate("/")}
        className="fixed top-5 left-5 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-['Inter'] font-medium"
        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(10px)", border: "1px solid #2a2a2a", color: "#F5F5F0" }}>
        ← Feed
      </button>

      <div className="dash-card w-full max-w-4xl flex rounded-2xl overflow-hidden shadow-2xl"
           style={{ border: "1px solid #1e1e1e" }}>

        {/* Left panel */}
        <div className="hidden md:flex flex-col justify-between w-5/12 p-10 bg-[#0D0D0D]"
             style={{ borderRight: "1px solid #1e1e1e" }}>
          <span className="font-['Bebas_Neue'] text-2xl tracking-widest" style={{ color: "#4ADE1A" }}>
            iZest
          </span>

          <div className="flex flex-col gap-4">
            <div className="rounded-2xl overflow-hidden bg-[#111]"
                 style={{ aspectRatio: "9/16", border: "1px solid #2a2a2a" }}>
              {preview ? (
                <video src={preview} className="w-full h-full object-cover" autoPlay muted loop playsInline />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                  <span className="text-3xl">🎬</span>
                  <p className="text-xs font-['DM_Sans']" style={{ color: "#888880" }}>Preview here</p>
                </div>
              )}
            </div>
            {preview && (
              <button onClick={() => { setPreview(null); setVideoFile(null); }}
                className="text-xs font-['DM_Sans'] text-center hover:opacity-70"
                style={{ color: "#E8100A" }}>
                Remove video ✕
              </button>
            )}
          </div>

          <div>
            <p className="font-['Bebas_Neue'] text-3xl leading-tight mt-2.5" style={{ color: "#F5F5F0" }}>
              SHOW WHAT<br />YOU COOK.
            </p>
            <p className="mt-2 text-xs font-['DM_Sans']" style={{ color: "#888880" }}>
              Upload a short video of your dish. It shows on the main feed.
            </p>
          </div>
        </div>

        {/* Right form panel */}
        <form onSubmit={handleSubmit}
          className="w-full md:w-7/12 p-10 flex flex-col gap-5"
          style={{ background: "#1A1A1A" }}>

          <div className="dash-item">
            <span className="inline-block text-[11px] font-['DM_Sans'] font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-3"
                  style={{ background: "#0D0D0D", color: "#888880" }}>
              Partner Dashboard
            </span>
            <h2 className="font-['Bebas_Neue'] text-4xl tracking-wide leading-none"
                style={{ color: "#F5F5F0" }}>
              Add menu item
            </h2>
            <p className="text-sm font-['DM_Sans'] mt-1.5" style={{ color: "#888880" }}>
              Upload a dish video with name and description
            </p>
          </div>

          {/* Name */}
          <div className="dash-item flex flex-col gap-1.5">
            <label className="text-[11px] font-['DM_Sans'] font-semibold tracking-widest uppercase"
                   style={{ color: "#888880" }}>
              Dish name
            </label>
            <input
              required
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Butter Chicken Naan"
              className="outline-none rounded-xl px-4 py-3 text-sm font-['Inter']"
              style={{ background: "#0D0D0D", border: "1px solid #2a2a2a", color: "#F5F5F0" }}
              onFocus={e => e.target.style.borderColor = "#4ADE1A"}
              onBlur={e => e.target.style.borderColor = "#2a2a2a"}
            />
          </div>

          {/* Description */}
          <div className="dash-item flex flex-col gap-1.5">
            <label className="text-[11px] font-['DM_Sans'] font-semibold tracking-widest uppercase"
                   style={{ color: "#888880" }}>
              Description <span style={{ color: "#444" }}>(optional)</span>
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe the dish — ingredients, taste, what makes it special..."
              className="outline-none rounded-xl px-4 py-3 text-sm font-['Inter'] resize-none"
              style={{ background: "#0D0D0D", border: "1px solid #2a2a2a", color: "#F5F5F0" }}
              onFocus={e => e.target.style.borderColor = "#4ADE1A"}
              onBlur={e => e.target.style.borderColor = "#2a2a2a"}
            />
          </div>

          {/* Video upload */}
          <div className="dash-item flex flex-col gap-1.5">
            <label className="text-[11px] font-['DM_Sans'] font-semibold tracking-widest uppercase"
                   style={{ color: "#888880" }}>
              Dish video
            </label>
            <label className="flex flex-col items-center justify-center gap-2 rounded-xl py-6 cursor-pointer transition-colors"
                   style={{ border: "2px dashed #2a2a2a", background: "#0D0D0D" }}
                   onMouseEnter={e => e.currentTarget.style.borderColor = "#4ADE1A"}
                   onMouseLeave={e => e.currentTarget.style.borderColor = "#2a2a2a"}>
              <span className="text-2xl">{videoFile ? "✅" : "🎥"}</span>
              <p className="text-sm font-['DM_Sans']" style={{ color: "#888880" }}>
                {videoFile ? videoFile.name : "Click to upload video"}
              </p>
              <p className="text-xs font-['DM_Sans']" style={{ color: "#444" }}>
                MP4, MOV, WebM — max 50MB
              </p>
              <input type="file" accept="video/*" className="hidden" onChange={handleVideo} />
            </label>

            {preview && (
              <div className="md:hidden rounded-xl overflow-hidden mt-2"
                   style={{ aspectRatio: "9/16", maxHeight: "300px" }}>
                <video src={preview} className="w-full h-full object-cover" autoPlay muted loop playsInline />
              </div>
            )}
          </div>

          {error && (
            <p className="dash-item text-xs font-['DM_Sans'] text-center"
               style={{ color: "#E8100A" }}>{error}</p>
          )}
          {success && (
            <p className="dash-item text-xs font-['DM_Sans'] text-center"
               style={{ color: "#4ADE1A" }}>{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="dash-item font-['Inter'] font-semibold py-3 rounded-xl text-sm tracking-wide transition-opacity"
            style={{
              background: loading ? "#2a2a2a" : "#4ADE1A",
              color: loading ? "#888880" : "#0D0D0D",
              cursor: loading ? "not-allowed" : "pointer",
            }}>
            {loading ? "Uploading…" : "Upload Dish →"}
          </button>

          <div className="dash-item flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: "#2a2a2a" }} />
            <button type="button" onClick={() => navigate("/")}
              className="text-xs font-['DM_Sans'] hover:opacity-70 transition-opacity"
              style={{ color: "#888880" }}>
              View feed →
            </button>
            <div className="flex-1 h-px" style={{ background: "#2a2a2a" }} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;