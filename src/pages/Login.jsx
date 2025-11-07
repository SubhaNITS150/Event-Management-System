

import { useState } from "react";
import { useToast } from "../hooks/use-toast";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import Authform from "../../components/authform/Authform";

export default function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();

  // shared
  const [userType, setUserType] = useState("participant");

  // login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // signup state
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false);

  // Handle standard email login
  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });

    if (error) {
      toast({ title: "Login Failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Login Successful!", description: `Welcome back, ${userType}!` });
      console.log("User:", data.user);
      navigate("/dashboard");
    }
  };

  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    if (signupPassword !== signupConfirmPassword) {
      toast({ title: "Error", description: "Passwords do not match", variant: "destructive" });
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: signupEmail,
      password: signupPassword,
      options: { data: { role: userType } },
    });

    if (error) {
      toast({ title: "Signup Failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Account Created!", description: "Please check your email to confirm your account." });
      console.log("New user:", data.user);
      navigate("/dashboard");
    }
  };

  // OAuth: Google Login
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${import.meta.env.VITE_APP_BASE_URL}/dashboard` },
    });
    if (error) toast({ title: "Google Login Failed", description: error.message, variant: "destructive" });
  };

  // OAuth: GitHub Login (logic kept exactly as in your file)
  const handleGithubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
    if (error) toast({ title: "GitHub Login Failed", description: error.message, variant: "destructive" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8FA]">
      <main className="flex-1 py-16 flex items-center">
        <div className="max-w-md w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="font-[Poppins] font-bold text-4xl mb-2 text-[#00205B]">Welcome Back</h1>
            <p className="text-[#6B7280]">Login to access your dashboard</p>
          </div>

          <Authform
            // shared
            userType={userType}
            setUserType={setUserType}
            // login
            loginEmail={loginEmail}
            setLoginEmail={setLoginEmail}
            loginPassword={loginPassword}
            setLoginPassword={setLoginPassword}
            showLoginPassword={showLoginPassword}
            toggleLoginPassword={() => setShowLoginPassword((v) => !v)}
            onLoginSubmit={handleLogin}
            onGoogle={handleGoogleLogin}
            onGithub={handleGithubLogin}
            // signup
            signupEmail={signupEmail}
            setSignupEmail={setSignupEmail}
            signupPassword={signupPassword}
            setSignupPassword={setSignupPassword}
            signupConfirmPassword={signupConfirmPassword}
            setSignupConfirmPassword={setSignupConfirmPassword}
            showSignupPassword={showSignupPassword}
            toggleSignupPassword={() => setShowSignupPassword((v) => !v)}
            showSignupConfirmPassword={showSignupConfirmPassword}
            toggleSignupConfirmPassword={() => setShowSignupConfirmPassword((v) => !v)}
            onSignupSubmit={handleSignup}
          />
        </div>
      </main>
    </div>
  );
}
