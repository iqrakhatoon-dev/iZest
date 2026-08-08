// pages/food-partner/FoodPartnerLogin.jsx
import { Link } from "react-router-dom";
import AnimatedWrapper from "../../components/AnimatedWrapper";
import ThemeToggle from "../../components/ThemeToggle";
import useButtonFx from "../../hooks/useButtonFx";
import axios from "axios";
import {useNavigate} from "react-router-dom"

const FoodPartnerLogin = () => {

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const res = await axios.post(
      "http://localhost:3000/api/auth/food-partner/login",
      { email, password },
      { withCredentials: true }
    );
    console.log("Login success", res.data);
    navigate("/create-food");
  } catch (err) {
    console.error("Login failed", err.response?.data?.message || err.message);
  }
};

  useButtonFx();

  return (
    <AnimatedWrapper>
      <ThemeToggle />

      <div className="min-h-screen flex items-center justify-center p-4"
           style={{ background: "var(--bg-page)" }}>

        <div className="animated-card w-full max-w-4xl flex rounded-2xl overflow-hidden shadow-2xl"
             style={{ border: "1px solid var(--border)" }}>

          <div className="hidden md:flex flex-col justify-between w-1/2 bg-[#0D0D0D] p-10">
            <span className="font-['Bebas_Neue'] text-3xl tracking-widest" style={{ color: "#4ADE1A" }}>iZest</span>
            <div>
              <div className="w-12 h-[3px] bg-[#4ADE1A] mb-4" />
              <p className="text-[#F5F5F0] font-['Bebas_Neue'] text-5xl leading-tight">
                PARTNER<br />PORTAL.
              </p>
              <p className="mt-3 text-[#888880] text-sm font-['DM_Sans']">
                Manage orders, track revenue, grow your restaurant.
              </p>
            </div>
            <div className="flex gap-6">
              <div>
                <p className="text-[#4ADE1A] font-['Bebas_Neue'] text-2xl">12K+</p>
                <p className="text-[#888880] text-xs font-['DM_Sans']">Restaurants</p>
              </div>
              <div>
                <p className="text-[#4ADE1A] font-['Bebas_Neue'] text-2xl">2M+</p>
                <p className="text-[#888880] text-xs font-['DM_Sans']">Orders/month</p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full md:w-1/2 p-10 flex flex-col justify-center gap-6"
            style={{ background: "var(--bg-card)" }}
          >
            <span className="md:hidden font-['Bebas_Neue'] text-2xl tracking-widest animate-item"
                  style={{ color: "var(--lime)" }}>iZest Partner</span>

            <div className="animate-item">
              <h2 className="font-['Bebas_Neue'] text-4xl tracking-wide"
                  style={{ color: "var(--text-main)" }}>Partner Login</h2>
              <p className="text-sm font-['DM_Sans'] mt-1"
                 style={{ color: "var(--text-muted)" }}>Access your restaurant dashboard</p>
            </div>

            <div className="flex flex-col gap-4 animate-item">
              {[["email",    "email",    "Business email"],
                ["password", "password", "Password"]].map(([type, name, ph]) => (
                <input
                  required
                  key={name}
                  type={type}
                  name={name}
                  placeholder={ph}
                  className="outline-none rounded-lg px-4 py-3 text-sm font-['Inter']"
                  style={{ background: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-main)" }}
                  onFocus={e => e.target.style.borderColor = "var(--lime)"}
                  onBlur={e => e.target.style.borderColor = "var(--border)"} />
              ))}
            </div>

            <button
              type="submit"
              className="btn-fx animate-item font-['Inter'] font-semibold py-3 rounded-lg tracking-wide text-sm cursor-pointer"
              style={{ background: "var(--lime)", color: "#0D0D0D" }}>
              Access Dashboard
            </button>

            <p className="animate-item text-sm font-['DM_Sans'] text-center"
               style={{ color: "var(--text-muted)" }}>
              Not a partner yet?{" "}
              <Link to="/food-partner/register" className="hover:underline" style={{ color: "var(--lime)" }}>
                Register your restaurant
              </Link>
            </p>

            <div className="animate-item pt-4" style={{ borderTop: "1px solid var(--border)" }}>
              <p className="text-xs text-center font-['DM_Sans'] mb-3" style={{ color: "var(--text-muted)" }}>Customer?</p>
              <Link to="/user/login"
                className="btn-fx block text-center py-2 rounded-lg text-sm font-['Inter'] font-medium"
                style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                Go to User Login →
              </Link>
            </div>
          </form>

        </div>
      </div>
    </AnimatedWrapper>
  );
};

export default FoodPartnerLogin;