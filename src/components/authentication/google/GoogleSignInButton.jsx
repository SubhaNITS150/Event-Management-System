// import React from "react";
// import { supabase } from "../../../lib/supabaseClient.js";

// const GoogleSignInButton = () => {
//   const signInWithGoogle = async () => {
//     const { data, error } = await supabase.auth.signInWithOAuth({
//       provider: "google",
//     });

//     if (error) console.error("Error:", error);
//     else console.log("Redirecting to Google login...");
//   };

//   return (
//     <button
//       className="px-4 py-2 bg-green-500 rounded-xl text-white cursor-pointer"
//       onClick={signInWithGoogle}
//     >
//       Sign in with Google
//     </button>
//   );
// };

// export default GoogleSignInButton;


import React from "react";
import { supabase } from "../../../lib/supabaseClient.js";

const GoogleSignInButton = () => {
  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) console.error("Error:", error);
    else console.log("Redirecting to Google login...");
  };

  return (
    <button
      onClick={signInWithGoogle}
      className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 
      hover:bg-gray-100 text-gray-700 font-medium py-2 rounded-lg shadow-sm transition"
    >
      {/* Google Logo */}
      <img
        src="https://www.gstatic.com/images/branding/product/1x/gsa_64dp.png"
        alt="Google Logo"
        className="w-5 h-5"
      />

      Continue with Google
    </button>
  );
};

export default GoogleSignInButton;
