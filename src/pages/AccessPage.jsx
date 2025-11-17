import { useState } from "react"; // Removed useRef
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

/**
 * A component that renders an access code entry screen.
 *
 * Props:
 * - onAccessGranted: optional callback invoked when access is granted
 * - targetRoute: optional string route to navigate to after access (default: "/round1")
 */
export default function AccessCode({ onAccessGranted, targetRoute }) {
  const { toast } = useToast();
  // Removed email, sendingOtp, otpSent state
  const [accessCode, setAccessCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Removed otpRef
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const computeFinalRoute = () => {
    if (targetRoute && typeof targetRoute === "string") return targetRoute;
    const roundParam = params.get("round");
    if (roundParam) return `/round${roundParam.trim()}`;
    return "/round1";
  };

  // Removed generate8DigitOtp and handleSendOtp functions

  // ===================== VERIFY ACCESS CODE =====================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLoading) return; // prevent double submit
    setIsLoading(true);

    const PROTECTED_CODE = "88120888";

    // We add a short delay to simulate a verification check
    setTimeout(() => {
      if (accessCode.trim() === PROTECTED_CODE) {
        // --- SUCCESS ---
        toast({
          title: "Access Granted",
          description: "Loading your test... Good luck!",
        });

        // Call parent callback if provided
        if (onAccessGranted) {
          try {
            onAccessGranted();
          } catch (err) {
            console.error("onAccessGranted callback error:", err);
          }
        }

        // Navigate to the test
        const finalRoute = computeFinalRoute();
        navigate(finalRoute);
      } else {
        // --- FAILURE ---
        toast({
          title: "Access Denied",
          description: "The access code you entered is incorrect.",
          variant: "destructive",
        });
        setIsLoading(false); // Reset button on failure
      }
    }, 1000); // 1-second simulation
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
            {/* EMAIL INPUT AND SEND OTP BUTTON REMOVED */}

            {/* ACCESS CODE INPUT */}
            <div className="space-y-2">
              <Label htmlFor="access-code" className="font-semibold">
                Enter Access Code
              </Label>
              <Input
                id="access-code"
                placeholder="Enter your 8-digit code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                disabled={isLoading}
                className="text-center tracking-widest font-mono text-lg h-12"
              />
            </div>

            <p className="text-xs text-gray-500 text-center px-4">
              Your unique access code can be found in the test invitation email
              sent to you.
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