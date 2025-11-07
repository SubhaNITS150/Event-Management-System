
import React, { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import FullScreenLoader from "../../Loading.jsx";

const LoginForm = () => {
  const [userType, setUserType] = useState("participant");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ added

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ show loader

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false); // ✅ hide loader on error
      console.error(error);
      toast.error("Login Failed");
    } else {
      toast.success(`Logged in as ${data.user?.email} (${userType})`);
      setTimeout(() => navigate("/"), 1000); // unmounts -> loader disappears
    }
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${import.meta.env.VITE_APP_BASE_URL}/` },
    });
    if (error) {
      console.error(error);
      toast.error("Google login failed");
    }
  };

  const signInWithGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: `${import.meta.env.VITE_APP_BASE_URL}/` },
    });
    if (error) {
      console.error(error);
      toast.error("GitHub login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* ✅ loader overlay */}
      {loading && <FullScreenLoader label="Logging you in…" />}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        {/* User Type Toggle */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            User Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setUserType("participant")}
              className={`rounded-lg h-10 px-4 text-sm font-medium transition-colors
                ${
                  userType === "participant"
                    ? "bg-[#00205B] text-white hover:bg-[#001A47]"
                    : "border border-[#00205B] text-[#00205B] hover:bg-[#E6EAF3]"
                }`}
            >
              Participant
            </button>
            <button
              type="button"
              onClick={() => setUserType("admin")}
              className={`rounded-lg h-10 px-4 text-sm font-medium transition-colors
                ${
                  userType === "admin"
                    ? "bg-[#00205B] text-white hover:bg-[#001A47]"
                    : "border border-[#00205B] text-[#00205B] hover:bg-[#E6EAF3]"
                }`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password + Eye toggle */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#00205B] hover:bg-[#001A47] text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="h-px bg-gray-300 flex-1" />
          <span className="text-sm text-gray-500">or</span>
          <div className="h-px bg-gray-300 flex-1" />
        </div>
         

        {/* OAuth buttons */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 
                       hover:bg-gray-100 text-gray-700 font-medium py-2 rounded-lg shadow-sm transition"
          >
            <img
              src="https://www.gstatic.com/images/branding/product/1x/gsa_64dp.png"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <button
            type="button"
            onClick={signInWithGithub}
            className="w-full flex items-center justify-center gap-3 bg-black text-white 
                       hover:bg-gray-800 font-medium py-2 rounded-lg transition shadow-sm"
          >
            <img
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              alt="GitHub"
              className="w-5 h-5 bg-white rounded-full"
            />
            Login with GitHub
          </button>
        </div>
        <div className="text-center mt-1">
  <button
    type="button"
    onClick={() => navigate("/signUp")}
    className="text-sm text-[#00205B] hover:underline font-medium"
  >
    Don’t have an account? Sign Up
  </button>
</div>
      </form>
      
    </div>
  );
};

export default LoginForm;
