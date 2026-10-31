import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { Logo } from "../components/layout/Logo";

const CD = "'Clash Display', sans-serif";

const SAT = "'Satoshi', sans-serif";

export function Signup() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <main className="min-h-screen bg-[#FFFFFF] flex items-center justify-center py-20 px-4 md:px-6 lg:px-8" style={{ fontFamily: SAT }}>
      <div className="w-full max-w-[448px]">
        <div className="flex justify-center mb-8">
          <Link to="/">
            <Logo scale={1.4} color="#082D4D" />
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-[0_4px_24px_rgba(8,45,77,0.08)] border border-[#0F4C82]/06 p-8">
          <div className="text-center mb-7">
            <h1 className="text-[#082D4D] mb-1" style={{ fontFamily: CD, fontSize: "1.875rem", fontWeight: 400 }}>
              Create Your Account
            </h1>
            <p className="text-[#082D4D]/70">Join the community of creators and backers</p>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3 mb-6">
            <button
              type="button"
              onClick={() => navigate("/onboarding")}
              className="flex items-center justify-center gap-3 h-12 w-full border-2 border-[#0F4C82]/20 rounded-full text-[#082D4D] font-medium hover:border-[#0F4C82] hover:bg-[#0F4C82]/03 transition-all duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.566 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.96L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
            <button
              type="button"
              onClick={() => navigate("/onboarding")}
              className="flex items-center justify-center gap-3 h-12 w-full border-2 border-[#0F4C82]/20 rounded-full text-[#082D4D] font-medium hover:border-[#0F4C82] hover:bg-[#0F4C82]/03 transition-all duration-200"
            >
              <svg width="16" height="18" viewBox="0 0 814 1000" fill="#082D4D">
                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-42.8-155.5-127.4C46.7 790.7 0 663.6 0 541.8c0-194.3 127.4-297.5 252.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
              </svg>
              Continue with Apple
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-[#0F4C82]/10" />
            <span className="text-sm text-[#082D4D]/50">Or sign up with email</span>
            <div className="flex-1 h-px bg-[#0F4C82]/10" />
          </div>

          <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); navigate("/onboarding"); }}>
            {[
              { key: "name", label: "Name", type: "text", placeholder: "Alex Johnson" },
              { key: "email", label: "Email", type: "email", placeholder: "you@example.com" },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-bold text-[#082D4D] mb-1.5">{label}</label>
                <input
                  type={type}
                  value={(form as Record<string, string>)[key]}
                  onChange={set(key)}
                  placeholder={placeholder}
                  className="w-full h-12 px-4 rounded-xl border border-[#0F4C82]/20 bg-[#FFFFFF] text-[#082D4D] placeholder:text-[#082D4D]/30 outline-none focus:border-[#0F4C82] transition-colors text-sm"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-bold text-[#082D4D] mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={set("password")}
                  placeholder="••••••••"
                  className="w-full h-12 px-4 pr-11 rounded-xl border border-[#0F4C82]/20 bg-[#FFFFFF] text-[#082D4D] placeholder:text-[#082D4D]/30 outline-none focus:border-[#0F4C82] transition-colors text-sm"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#082D4D]/40 hover:text-[#082D4D]">
                  {showPass ? <EyeSlash size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <p className="text-xs text-[#082D4D]/50 leading-relaxed">
              By signing up, you agree to our{" "}
              <Link to="/legal?tab=terms" className="text-[#0F4C82] hover:underline">Terms of Service</Link> and{" "}
              <Link to="/legal?tab=privacy" className="text-[#0F4C82] hover:underline">Privacy Policy</Link>.
            </p>

            <button
              type="submit"
              className="mt-1 h-12 w-full bg-[#0F4C82] text-white font-bold rounded-full hover:bg-[#082D4D] transition-colors shadow-[0_4px_12px_rgba(15,76,130,0.3)]"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-[#082D4D]/60 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#0F4C82] font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
