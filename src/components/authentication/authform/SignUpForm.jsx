
import React, { useState } from "react";
import { supabase } from "../../../lib/supabaseClient.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../services/authservices/authStore.js";
import { Eye, EyeOff } from "lucide-react";
import FullScreenLoader from "../../Loading.jsx";   // ✅ added loader import

const SignUpForm = () => {
  const navigate = useNavigate();
  const { init } = useAuthStore();
  const { setAuthenticated } = useAuthStore();

  const [userType, setUserType] = useState("participant");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ added loading

  // Email/password signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ show loader

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role: userType },
      },
    });

    const user = data?.user;

    if (user) {
      const { error: insertErr } = await supabase.from("users").insert([
        {
          user_id: user.id,
          email: user.email,
          name: name,
          phone: phone || null,
          role: userType,
        },
      ]);

      if (insertErr) {
        toast.error("Error saving user to database");
        console.error(insertErr);
      } else {
        toast.success("User record saved");
      }
    }

    if (error) {
      setLoading(false); // ✅ hide loader on error
      console.error(error);
      toast.error("Signup failed. Please try again!");
    } else {
      toast.success("Sign up successful. Please verify your email.");
      await init();
      setTimeout(() => navigate("/"), 1500); // ✅ loader auto disappears on navigation
    }
  };

  // OAuth: Google
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {  redirectTo: `${import.meta.env.VITE_APP_BASE_URL}/` },
    });
    if (error) {
      console.error(error);
      toast.error("Google sign-in failed");
    } else {
      toast.loading("Redirecting to Google…");
    }
  };

  // OAuth: GitHub
  const signInWithGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {  redirectTo: `${import.meta.env.VITE_APP_BASE_URL}/` },
    });
    if (error) {
      console.error(error);
      toast.error("GitHub sign-in failed");
    } else {
      toast.loading("Redirecting to GitHub…");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      
      {/* ✅ Loader overlay */}
      {loading && <FullScreenLoader label="Creating your account…" />}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-md border border-gray-200"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>

        {/* User Type Toggle */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            User Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setUserType("participant")}
              className={`rounded-lg h-10 px-4 text-sm font-medium transition-colors ${
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
              className={`rounded-lg h-10 px-4 text-sm font-medium transition-colors ${
                userType === "admin"
                  ? "bg-[#00205B] text-white hover:bg-[#001A47]"
                  : "border border-[#00205B] text-[#00205B] hover:bg-[#E6EAF3]"
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Full Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password + Eye */}
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
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
            >
              {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#00205B] hover:bg-[#001A47] text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Create Account
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="h-px bg-gray-300 flex-1" />
          <span className="text-sm text-gray-500">or</span>
          <div className="h-px bg-gray-300 flex-1" />
        </div>

        {/* OAuth */}
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
            Sign up with GitHub
          </button>
        </div>

        {/* Footnote */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-[#00205B] hover:underline font-medium">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
