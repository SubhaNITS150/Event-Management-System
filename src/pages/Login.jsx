import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useToast } from "../hooks/use-toast";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";



export default function Login() {
  const { toast } = useToast();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [userType, setUserType] = useState("participant");

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false);
   const navigate = useNavigate();

  // Handle standard email login
  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });

    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
  title: "Login Successful!",
  description: `Welcome back, ${userType}!`,
   }  );
   console.log("User:", data.user);
  navigate("/dashboard");  // ✅ redirect after success

    }
  };

  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    if (signupPassword !== signupConfirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: signupEmail,
      password: signupPassword,
      options: { data: { role: userType } },
    });

    if (error) {
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
  title: "Account Created!",
  description: "Please check your email to confirm your account.",
});
console.log("New user:", data.user);
navigate("/dashboard");  // ✅ redirect after success

    }
  };

  // OAuth: Google Login
  const handleGoogleLogin = async () => {
     const { error } = await supabase.auth.signInWithOAuth({
  provider: "google",
  options: {
    redirectTo: `${import.meta.env.VITE_APP_BASE_URL}/dashboard`,  // ✅ redirect directly to dashboard
  },
});

    if (error) {
      toast({
        title: "Google Login Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // OAuth: GitHub Login
  const handleGithubLogin = async () => {
      const { error } = await supabase.auth.signInWithOAuth({
  provider: "google",
  options: {
    redirectTo: `${window.location.origin}/dashboard`,  // ✅ redirect directly to dashboard
  },
});

    if (error) {
      toast({
        title: "GitHub Login Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8FA]">
      <main className="flex-1 py-16 flex items-center">
        <div className="max-w-md w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="font-[Poppins] font-bold text-4xl mb-2 text-[#00205B]">
              Welcome Back
            </h1>
            <p className="text-[#6B7280]">Login to access your dashboard</p>
          </div>

          <Card className="p-6 shadow-md border border-gray-200">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 rounded-lg">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-[#00205B] data-[state=active]:text-white rounded-lg"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-[#00205B] data-[state=active]:text-white rounded-lg"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* LOGIN FORM */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label className="text-[#00205B] font-semibold">User Type</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <Button
                        type="button"
                        onClick={() => setUserType("participant")}
                        className={`${
                          userType === "participant"
                            ? "bg-[#00205B] text-white hover:bg-[#001A47]"
                            : "border border-[#00205B] text-[#00205B] hover:bg-[#E6EAF3]"
                        }`}
                      >
                        Participant
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setUserType("admin")}
                        className={`${
                          userType === "admin"
                            ? "bg-[#00205B] text-white hover:bg-[#001A47]"
                            : "border border-[#00205B] text-[#00205B] hover:bg-[#E6EAF3]"
                        }`}
                      >
                        Admin
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="login-email" className="text-[#00205B] font-semibold">
                      Email
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="mt-2 border-gray-300 focus:border-[#00205B] focus:ring-[#00205B]"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Label htmlFor="login-password" className="text-[#00205B] font-semibold">
                      Password
                    </Label>
                    <Input
                      id="login-password"
                      type={showLoginPassword ? "text" : "password"}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="mt-2 border-gray-300 focus:border-[#00205B] focus:ring-[#00205B] pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
                    >
                      {showLoginPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#00205B] hover:bg-[#001A47] text-white text-lg font-semibold rounded-lg"
                  >
                    Login
                  </Button>

                  {/* Divider */}
                  <div className="flex items-center justify-center mt-4">
                    <div className="border-t border-gray-300 w-full"></div>
                    <span className="px-2 text-gray-500 text-sm">or</span>
                    <div className="border-t border-gray-300 w-full"></div>
                  </div>

                  {/* OAuth Buttons */}
                  <div className="flex flex-col gap-3">
                   
                    <Button
      type="button"
     onClick={handleGoogleLogin}
     className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium"
    >
       <img
    src="https://media.wired.com/photos/5926ffe47034dc5f91bed4e8/master/pass/google-logo.jpg"
    alt="Google Logo"
    className="w-10 h-5"
  />
  Continue with Google
</Button>

                    <Button
                      type="button"
                      onClick={handleGithubLogin}
                      className="w-full flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800"
                    >
                      <FaGithub /> Login with GitHub
                    </Button>
                  </div>

                  <div className="text-center text-sm text-[#6B7280]">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-[#00205B] hover:underline font-medium">
                      Register here
                    </Link>
                  </div>
                </form>
              </TabsContent>

              {/* SIGNUP FORM */}
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <Label className="text-[#00205B] font-semibold">User Type</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <Button
                        type="button"
                        onClick={() => setUserType("participant")}
                        className={`${
                          userType === "participant"
                            ? "bg-[#00205B] text-white hover:bg-[#001A47]"
                            : "border border-[#00205B] text-[#00205B] hover:bg-[#E6EAF3]"
                        }`}
                      >
                        Participant
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setUserType("admin")}
                        className={`${
                          userType === "admin"
                            ? "bg-[#00205B] text-white hover:bg-[#001A47]"
                            : "border border-[#00205B] text-[#00205B] hover:bg-[#E6EAF3]"
                        }`}
                      >
                        Admin
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-email" className="text-[#00205B] font-semibold">
                      Email
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="mt-2 border-gray-300 focus:border-[#00205B] focus:ring-[#00205B]"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Label htmlFor="signup-password" className="text-[#00205B] font-semibold">
                      Password
                    </Label>
                    <Input
                      id="signup-password"
                      type={showSignupPassword ? "text" : "password"}
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="••••••••"
                      className="mt-2 border-gray-300 focus:border-[#00205B] focus:ring-[#00205B] pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
                    >
                      {showSignupPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <div className="relative">
                    <Label htmlFor="signup-confirm-password" className="text-[#00205B] font-semibold">
                      Confirm Password
                    </Label>
                    <Input
                      id="signup-confirm-password"
                      type={showSignupConfirmPassword ? "text" : "password"}
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="mt-2 border-gray-300 focus:border-[#00205B] focus:ring-[#00205B] pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupConfirmPassword(!showSignupConfirmPassword)}
                      className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
                    >
                      {showSignupConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#00205B] hover:bg-[#001A47] text-white text-lg font-semibold rounded-lg"
                  >
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
    </div>
  );
}
