// import { useState } from "react";
// import { useToast } from "@/hooks/use-toast";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { ArrowRight } from "lucide-react";
// import { useNavigate, useSearchParams } from "react-router-dom";

// /**
//  * A component that renders an access code entry screen.
//  *
//  * Props:
//  *  - onAccessGranted: optional callback invoked when access is granted
//  *  - targetRoute: optional string route to navigate to after access (default: "/round1")
//  *
//  * Behavior:
//  *  - If `targetRoute` prop is provided it will be used.
//  *  - Otherwise, if the page URL contains ?round=2 (or ?round=1), the component will navigate to /round2 (or /round1).
//  *  - If neither is present, defaults to "/round1".
//  */
// export default function AccessCode({ onAccessGranted, targetRoute }) {
//   const { toast } = useToast();
//   const [accessCode, setAccessCode] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const navigate = useNavigate();
//   const [params] = useSearchParams();

//   // compute final route at submission time:
//   const computeFinalRoute = () => {
//     // Priority:
//     // 1) explicit prop targetRoute (if provided)
//     // 2) query param ?round=N  -> /roundN
//     // 3) fallback to /round1
//     if (targetRoute && typeof targetRoute === "string") return targetRoute;
//     const roundParam = params.get("round");
//     if (roundParam) {
//       // sanitize: allow only digits (1,2,...). If you expect non-numeric, change accordingly.
//       const sanitized = roundParam.toString().trim();
//       return `/round${sanitized}`;
//     }
//     return "/round1";
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (isLoading) return; // prevent double submit
//     setIsLoading(true);

//     // Basic frontend validation
//     if (!accessCode.trim()) {
//       toast({
//         title: "Error",
//         description: "Please enter your unique access code.",
//         variant: "destructive",
//       });
//       setIsLoading(false);
//       return;
//     }

//     // --- FRONTEND-ONLY SIMULATION ---
//     setTimeout(() => {
//       toast({
//         title: "Access Granted",
//         description: "Loading your test... Good luck!",
//       });

//       // Tell the parent component to switch to the test view
//       if (onAccessGranted) {
//         try {
//           onAccessGranted();
//         } catch (err) {
//           // swallow any parent errors so navigation still occurs
//           console.error("onAccessGranted callback error:", err);
//         }
//       }

//       // navigate to the final route computed from prop or query param
//       const finalRoute = computeFinalRoute();
//       navigate(finalRoute);
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center p-4">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">
//         Hire<span className="text-orange-500">Event</span> Pro
//       </h1>
//       <Card className="w-full max-w-md shadow-lg">
//         <CardHeader>
//           <CardTitle className="text-2xl text-center">Online Assessment</CardTitle>
//           <CardDescription className="text-center">
//             You are about to start Round 1.
//           </CardDescription>
//         </CardHeader>
//         <form onSubmit={handleSubmit}>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="access-code" className="font-semibold">
//                 Enter Access Code
//               </Label>
//               <Input
//                 id="access-code"
//                 placeholder="Enter your unique 8-digit code"
//                 value={accessCode}
//                 onChange={(e) => setAccessCode(e.target.value)}
//                 disabled={isLoading}
//                 className="text-center tracking-widest font-mono text-lg h-12"
//               />
//             </div>
//             <p className="text-xs text-gray-500 text-center px-4">
//               Your unique access code can be found in the test invitation email
//               sent to you.
//             </p>
//           </CardContent>
//           <CardFooter>
//             <Button
//               type="submit"
//               className="w-full bg-orange-500 hover:bg-orange-600 text-lg py-6"
//               disabled={isLoading}
//             >
//               {isLoading ? "Verifying..." : "Start Test"}
//               {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
//             </Button>
//           </CardFooter>
//         </form>
//       </Card>
//       <p className="text-gray-400 text-sm mt-8">Powered by YourPlatformName</p>
//     </div>
//   );
// }

import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AccessCode({ onAccessGranted, targetRoute }) {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const otpRef = useRef(null);
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const computeFinalRoute = () => {
    if (targetRoute && typeof targetRoute === "string") return targetRoute;
    const roundParam = params.get("round");
    if (roundParam) return `/round${roundParam.trim()}`;
    return "/round1";
  };

  const generate8DigitOtp = () =>
    String(Math.floor(10000000 + Math.random() * 90000000));

  // ===================== SEND OTP =====================
  const handleSendOtp = async () => {
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Enter a valid email first.",
        variant: "destructive",
      });
      return;
    }

    const otp = generate8DigitOtp();
    otpRef.current = { value: otp, expiresAt: Date.now() + 10 * 60 * 1000 };

    setSendingOtp(true);

    try {
      // use an absolute URL for quick testing
      const resp = await fetch(
        "https://server-hackathon-qy9t.onrender.com/api/send-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      const json = await resp.json();

      if (!json.success) {
        throw new Error(json.message || "Failed to send OTP");
      }

      setOtpSent(true);

      toast({
        title: "OTP Sent",
        description: `An 8-digit OTP has been sent to ${email}`,
      });
    } catch (err) {
      toast({
        title: "Failed",
        description: err.message,
        variant: "destructive",
      });
      otpRef.current = null;
    } finally {
      setSendingOtp(false);
    }
  };

  // ===================== VERIFY OTP =====================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!otpSent) {
      toast({
        title: "OTP Not Sent",
        description: "Click on 'Send OTP' first.",
        variant: "destructive",
      });
      return;
    }

    if (!/^\d{8}$/.test(accessCode)) {
      toast({
        title: "Invalid Code",
        description: "Enter the 8-digit OTP sent to your email.",
        variant: "destructive",
      });
      return;
    }

    const record = otpRef.current;
    if (!record) {
      toast({
        title: "Error",
        description: "No OTP found. Send a new one.",
        variant: "destructive",
      });
      return;
    }

    if (Date.now() > record.expiresAt) {
      toast({
        title: "Expired",
        description: "OTP expired. Request a new one.",
        variant: "destructive",
      });
      otpRef.current = null;
      setOtpSent(false);
      return;
    }

    if (accessCode.trim() !== record.value) {
      toast({
        title: "Incorrect OTP",
        description: "The OTP you entered is wrong.",
        variant: "destructive",
      });
      return;
    }

    // OTP verified
    toast({ title: "Access Granted", description: "Loading your test..." });

    const finalRoute = computeFinalRoute();
    navigate(finalRoute);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Hire<span className="text-orange-500">Event</span> Pro
      </h1>

      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Online Assessment
          </CardTitle>
          <CardDescription className="text-center">
            You are about to start Round 1.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* EMAIL INPUT */}
            <div className="space-y-2">
              <Label className="font-semibold">Email</Label>
              <Input
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading || sendingOtp}
                className="text-center font-mono h-12"
              />
            </div>

            {/* SEND OTP BUTTON */}
            <Button
              type="button"
              onClick={handleSendOtp}
              disabled={sendingOtp || isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-lg py-4"
            >
              {sendingOtp ? "Sending OTP..." : "Send OTP"}
            </Button>

            {/* OTP INPUT */}
            <div className="space-y-2">
              <Label htmlFor="access-code" className="font-semibold">
                Enter Access Code (OTP)
              </Label>
              <Input
                id="access-code"
                placeholder="Enter 8-digit OTP"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                disabled={isLoading}
                className="text-center tracking-widest font-mono text-lg h-12"
              />
            </div>

            <p className="text-xs text-gray-500 text-center px-4">
              Your 8-digit OTP will be sent to your email.
            </p>
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-lg py-6"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Start Test"}
              {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <p className="text-gray-400 text-sm mt-8">Powered by YourPlatformName</p>
    </div>
  );
}
