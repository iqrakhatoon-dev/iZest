// pages/user/UserLogin.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedWrapper from "../../components/AnimatedWrapper";
import ThemeToggle from "../../components/ThemeToggle";
import useButtonFx from "../../hooks/useButtonFx";
import axios from "axios";

const UserLogin = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useButtonFx();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email    = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/user/login",
        { email, password },
        { withCredentials: true }
      );
      console.log("Login success", res.data);
      navigate("/"); 
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <AnimatedWrapper>
      <ThemeToggle />

      <div className="min-h-screen flex items-center justify-center p-4"
           style={{ background: "var(--bg-page)" }}>

        <div className="animated-card w-full max-w-4xl flex rounded-2xl overflow-hidden shadow-2xl">

          <div className="hidden md:flex flex-col justify-between w-1/2 bg-[#4ADE1A] p-10">
            <span className="text-[#0D0D0D] font-['Bebas_Neue'] text-3xl tracking-widest">iZest</span>
            <div>
              <p className="text-[#0D0D0D] font-['Bebas_Neue'] text-5xl leading-tight">
                FOOD AT<br />YOUR DOOR.
              </p>
              <p className="mt-3 text-[#1A1A1A]/70 text-sm font-['DM_Sans']">
                Flavors that find you — fast, fresh, real.
              </p>
            </div>
            <p className="text-[#1A1A1A]/40 text-xs font-['DM_Sans']">© 2025 iZest</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full md:w-1/2 p-10 flex flex-col justify-center gap-6"
            style={{ background: "var(--bg-card)" }}
          >
            <span className="md:hidden font-['Bebas_Neue'] text-2xl tracking-widest animate-item"
                  style={{ color: "var(--lime)" }}>iZest</span>

            <div className="animate-item">
              <h2 className="font-['Bebas_Neue'] text-4xl tracking-wide"
                  style={{ color: "var(--text-main)" }}>Welcome back</h2>
              <p className="text-sm font-['DM_Sans'] mt-1"
                 style={{ color: "var(--text-muted)" }}>Sign in to your account</p>
            </div>

            <div className="flex flex-col gap-4 animate-item">
              <input
                required
                type="email"
                name="email"
                placeholder="Email address"
                className="outline-none rounded-lg px-4 py-3 text-sm font-['Inter']"
                style={{ background: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-main)" }}
                onFocus={e => e.target.style.borderColor = "var(--lime)"}
                onBlur={e => e.target.style.borderColor = "var(--border)"} />
              <input
                required
                type="password"
                name="password"
                placeholder="Password"
                className="outline-none rounded-lg px-4 py-3 text-sm font-['Inter']"
                style={{ background: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-main)" }}
                onFocus={e => e.target.style.borderColor = "var(--lime)"}
                onBlur={e => e.target.style.borderColor = "var(--border)"} />
            </div>

            {error && (
              <p className="text-xs font-['DM_Sans'] text-center -mt-2"
                 style={{ color: "var(--crimson)" }}>
                {error}
              </p>
            )}

            <button type="submit"
              className="btn-fx animate-item text-[#F5F5F0] font-['Inter'] font-semibold py-3 rounded-lg tracking-wide text-sm cursor-pointer"
              style={{ background: "var(--crimson)" }}>
              Sign In
            </button>

            <p className="animate-item text-sm font-['DM_Sans'] text-center"
               style={{ color: "var(--text-muted)" }}>
              New here?{" "}
              <Link to="/user/register" className="hover:underline" style={{ color: "var(--lime)" }}>
                Create account
              </Link>
            </p>

            <div className="animate-item pt-4" style={{ borderTop: "1px solid var(--border)" }}>
              <p className="text-xs text-center font-['DM_Sans'] mb-3" style={{ color: "var(--text-muted)" }}>
                Are you a restaurant partner?
              </p>
              <Link to="/food-partner/login"
                className="btn-fx block text-center py-2 rounded-lg text-sm font-['Inter'] font-medium"
                style={{ border: "1px solid var(--lime)", color: "var(--lime)" }}>
                Partner Login →
              </Link>
            </div>
          </form>

        </div>
      </div>
    </AnimatedWrapper>
  );
};

export default UserLogin;