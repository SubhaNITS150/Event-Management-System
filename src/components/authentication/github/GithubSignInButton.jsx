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

// import { Button } from "../../ui/button";
// import { FaGithub } from "react-icons/fa";

// export default function GithubSignInButton({ onClick }) {
//   return (
//     <Button
//       type="button"
//       onClick={onClick}
//       className="w-full flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800"
//     >
//       <FaGithub /> Login with GitHub
//     </Button>
//   );
// }

