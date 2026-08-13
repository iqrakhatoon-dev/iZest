// pages/food-partner/FoorPartnerRegister.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedWrapper from "../../components/AnimatedWrapper";
import ThemeToggle from "../../components/ThemeToggle";
import useButtonFx from "../../hooks/useButtonFx";
import axios from "axios";
import API_URL from "../../api.js";

const FoodPartnerRegister = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useButtonFx();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username    = e.target.username.value;
    const contactName = e.target.contactName.value;
    const phoneNumber = e.target.phoneNumber.value;
    const email       = e.target.email.value;
    const address     = e.target.address.value;
    const password    = e.target.password.value;

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/food-partner/register`,
        { username, contactName, phoneNumber, email, address, password },
        { withCredentials: true }
      );
      navigate("/create-food");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <AnimatedWrapper>
      <ThemeToggle />

      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ background: "var(--bg-page)" }}
      >
        <div className="animated-card w-full max-w-4xl flex rounded-2xl overflow-hidden shadow-2xl">

          {/* Left panel */}
          <div className="hidden md:flex flex-col justify-between w-5/12 p-10"
               style={{ background: "#4ADE1A" }}>
            <span className="font-['Bebas_Neue'] text-2xl tracking-widest text-[#0D0D0D]">
              iZest
            </span>

            <div>
              <p className="font-['Bebas_Neue'] text-5xl leading-none text-[#0D0D0D]">
                Grow<br />with us.
              </p>
              <p className="mt-3 text-[#0D0D0D]/55 text-sm font-['DM_Sans'] leading-relaxed">
                List your restaurant. Zero setup fee.<br />Get orders from day one.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                {[
                  ["ti-check",      "Free to join, no hidden charges"],
                  ["ti-bolt",       "Go live within 48 hours"],
                  ["ti-chart-line", "Real-time order dashboard"],
                ].map(([icon, text]) => (
                  <div key={text} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                         style={{ background: "rgba(13,13,13,0.1)" }}>
                      <i className={`ti ${icon} text-[11px] text-[#0D0D0D]`} />
                    </div>
                    <span className="text-xs font-['DM_Sans'] text-[#0D0D0D]/60">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-7">
              {[["Free","To join"],["48hr","Go live"],["0%","Setup fee"]].map(([val, lbl]) => (
                <div key={lbl}>
                  <p className="font-['Bebas_Neue'] text-3xl text-[#0D0D0D]">{val}</p>
                  <p className="text-[10px] font-['DM_Sans'] text-[#0D0D0D]/45 mt-0.5">{lbl}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel — form */}
          <form
            onSubmit={handleSubmit}
            className="w-full md:w-7/12 p-10 flex flex-col gap-5"
            style={{ background: "var(--bg-card)" }}
          >
            {/* Mobile logo */}
            <span className="md:hidden font-['Bebas_Neue'] text-2xl tracking-widest animate-item"
                  style={{ color: "var(--lime)" }}>
              iZest Partner
            </span>

            {/* Header */}
            <div className="animate-item">
              <span
                className="inline-block text-[11px] font-['DM_Sans'] font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-3"
                style={{ background: "var(--bg-input)", color: "var(--text-muted)" }}
              >
                Partner portal
              </span>
              <h2 className="font-['Bebas_Neue'] text-4xl tracking-wide leading-none"
                  style={{ color: "var(--text-main)" }}>
                List restaurant
              </h2>
              <p className="text-sm font-['DM_Sans'] mt-1.5"
                 style={{ color: "var(--text-muted)" }}>
                Set up your partner account in minutes
              </p>
            </div>

            {/* Fields grid */}
            <div className="grid grid-cols-2 gap-3 animate-item">
              {[
                ["text",  "username",    "Username",       "your_restaurant",     "ti-at"],
                ["text",  "contactName", "Contact name",   "Rahul Sharma",        "ti-user"],
                ["tel",   "phoneNumber", "Phone number",   "+91 98765 43210",     "ti-phone"],
                ["email", "email",       "Business email", "hello@yourplace.com", "ti-mail"],
              ].map(([type, name, label, ph, icon]) => (
                <div key={name} className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-['DM_Sans'] font-semibold tracking-widest uppercase"
                         style={{ color: "var(--text-muted)" }}>
                    {label}
                  </label>
                  <div className="relative">
                    <i className={`ti ${icon} absolute left-3 top-1/2 -translate-y-1/2 text-[15px]`}
                       style={{ color: "var(--text-muted)" }} />
                    <input required type={type} name={name} placeholder={ph}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl text-[13px] font-['Inter'] outline-none"
                      style={{ background: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-main)" }}
                      onFocus={e => e.target.style.borderColor = "var(--lime)"}
                      onBlur={e => e.target.style.borderColor = "var(--border)"} />
                  </div>
                </div>
              ))}

              {/* Address — full width */}
              <div className="col-span-2 flex flex-col gap-1.5">
                <label className="text-[11px] font-['DM_Sans'] font-semibold tracking-widest uppercase"
                       style={{ color: "var(--text-muted)" }}>
                  Business address
                </label>
                <div className="relative">
                  <i className="ti ti-map-pin absolute left-3 top-1/2 -translate-y-1/2 text-[15px]"
                     style={{ color: "var(--text-muted)" }} />
                  <input required type="text" name="address" placeholder="123, MG Road, Lucknow"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl text-[13px] font-['Inter'] outline-none"
                    style={{ background: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-main)" }}
                    onFocus={e => e.target.style.borderColor = "var(--lime)"}
                    onBlur={e => e.target.style.borderColor = "var(--border)"} />
                </div>
              </div>

              {/* Password — full width */}
              <div className="col-span-2 flex flex-col gap-1.5">
                <label className="text-[11px] font-['DM_Sans'] font-semibold tracking-widest uppercase"
                       style={{ color: "var(--text-muted)" }}>
                  Password
                </label>
                <div className="relative">
                  <i className="ti ti-lock absolute left-3 top-1/2 -translate-y-1/2 text-[15px]"
                     style={{ color: "var(--text-muted)" }} />
                  <input required type="password" name="password" placeholder="Min. 8 characters"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl text-[13px] font-['Inter'] outline-none"
                    style={{ background: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-main)" }}
                    onFocus={e => e.target.style.borderColor = "var(--lime)"}
                    onBlur={e => e.target.style.borderColor = "var(--border)"} />
                </div>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-xs font-['DM_Sans'] text-center -mt-2"
                 style={{ color: "var(--crimson)" }}>
                {error}
              </p>
            )}

            {/* Submit */}
            <button type="submit"
              className="btn-fx animate-item font-['Inter'] font-semibold py-3 rounded-xl text-sm cursor-pointer tracking-wide"
              style={{ background: "var(--crimson)", color: "#F5F5F0" }}>
              Register restaurant →
            </button>

            {/* Divider */}
            <div className="animate-item flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
              <span className="text-[11px] font-['DM_Sans']" style={{ color: "var(--text-muted)" }}>
                Already a partner?
              </span>
              <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            </div>

            {/* Bottom actions */}
            <div className="animate-item flex gap-2.5">
              <Link to="/food-partner/login"
                className="btn-fx flex-1 text-center py-2.5 rounded-xl text-xs font-['Inter'] font-medium"
                style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                Sign in to partner portal
              </Link>
              <Link to="/user/register"
                className="btn-fx flex-1 text-center py-2.5 rounded-xl text-xs font-['Inter'] font-medium"
                style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                Create user account →
              </Link>
            </div>
          </form>

        </div>
      </div>
    </AnimatedWrapper>
  );
};

export default FoodPartnerRegister;