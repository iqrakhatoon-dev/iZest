// pages/user/UserRegister.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedWrapper from "../../components/AnimatedWrapper";
import ThemeToggle from "../../components/ThemeToggle";
import useButtonFx from "../../hooks/useButtonFx";
import axios from "axios";

const UserRegister = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useButtonFx();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email    = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/user/register",
        { username, email, password },
        { withCredentials: true }
      );
      console.log("Register success", res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <AnimatedWrapper>
      <ThemeToggle />

      <div className="min-h-screen flex items-center justify-center p-4"
           style={{ background: "var(--bg-page)" }}>

        <div className="animated-card w-full max-w-4xl flex rounded-2xl overflow-hidden shadow-2xl">

          <div className="hidden md:flex flex-col justify-between w-1/2 bg-[#E8100A] p-10">
            <span className="text-[#F5F5F0] font-['Bebas_Neue'] text-3xl tracking-widest">iZest</span>
            <div>
              <p className="text-[#F5F5F0] font-['Bebas_Neue'] text-5xl leading-tight">
                JOIN THE<br />FEAST.
              </p>
              <p className="mt-3 text-[#F5F5F0]/70 text-sm font-['DM_Sans']">
                Create an account and start ordering in seconds.
              </p>
            </div>
            <p className="text-[#F5F5F0]/40 text-xs font-['DM_Sans']">© 2025 iZest</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full md:w-1/2 p-10 flex flex-col justify-center gap-6"
            style={{ background: "var(--bg-card)" }}
          >
            <span className="md:hidden font-['Bebas_Neue'] text-2xl tracking-widest animate-item"
                  style={{ color: "var(--crimson)" }}>iZest</span>

            <div className="animate-item">
              <h2 className="font-['Bebas_Neue'] text-4xl tracking-wide"
                  style={{ color: "var(--text-main)" }}>Create account</h2>
              <p className="text-sm font-['DM_Sans'] mt-1"
                 style={{ color: "var(--text-muted)" }}>It's free. Always will be.</p>
            </div>

            <div className="flex flex-col gap-4 animate-item">
              {[
                ["text",     "username", "Username"],
                ["email",    "email",    "Email address"],
                ["password", "password", "Password"],
              ].map(([type, name, ph]) => (
                <input
                  required
                  key={name}
                  type={type}
                  name={name}
                  placeholder={ph}
                  className="outline-none rounded-lg px-4 py-3 text-sm font-['Inter']"
                  style={{ background: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-main)" }}
                  onFocus={e => e.target.style.borderColor = "var(--crimson)"}
                  onBlur={e => e.target.style.borderColor = "var(--border)"} />
              ))}
            </div>

            {error && (
              <p className="text-xs font-['DM_Sans'] text-center -mt-2"
                 style={{ color: "var(--crimson)" }}>
                {error}
              </p>
            )}

            <button type="submit"
              className="btn-fx animate-item font-['Inter'] font-semibold py-3 rounded-lg tracking-wide text-sm cursor-pointer"
              style={{ background: "var(--lime)", color: "#0D0D0D" }}>
              Create Account
            </button>

            <p className="animate-item text-sm font-['DM_Sans'] text-center"
               style={{ color: "var(--text-muted)" }}>
              Already have an account?{" "}
              <Link to="/user/login" className="hover:underline" style={{ color: "var(--crimson)" }}>
                Sign in
              </Link>
            </p>

            <div className="animate-item pt-4" style={{ borderTop: "1px solid var(--border)" }}>
              <p className="text-xs text-center font-['DM_Sans'] mb-3" style={{ color: "var(--text-muted)" }}>
                Want to list your restaurant?
              </p>
              <Link to="/food-partner/register"
                className="btn-fx block text-center py-2 rounded-lg text-sm font-['Inter'] font-medium"
                style={{ border: "1px solid var(--crimson)", color: "var(--crimson)" }}>
                Become a Partner →
              </Link>
            </div>
          </form>

        </div>
      </div>
    </AnimatedWrapper>
  );
};

export default UserRegister;