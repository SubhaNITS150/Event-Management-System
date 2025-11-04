import React from "react";
import { supabase } from "../../../lib/supabaseClient.js";

const GoogleSignInButton = () => {
  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) console.error("Error:", error);
    else console.log("Redirecting to Google login...");
  };

  return (
    <button
      className="px-4 py-2 bg-green-500 rounded-xl text-white cursor-pointer"
      onClick={signInWithGoogle}
    >
      Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;