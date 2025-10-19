import { supabase } from "../../../lib/supabaseClient.js";

export default function GithubSignInButton() {
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (error) console.error("Error:", error.message);
  };

  return (
    <button
      className="px-4 py-2 bg-green-500 rounded-xl text-white cursor-pointer"
      onClick={handleLogin}
    >
      Sign in with GitHub
    </button>
  );
}
