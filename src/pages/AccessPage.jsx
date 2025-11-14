import { useState } from "react";
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
import { useNavigate } from "react-router-dom";

/**
 * A component that renders an access code entry screen.
 * It's designed to be shown *before* the Round1 component.
 *
 * @param {object} props
 * @param {() => void} props.onAccessGranted - A callback function to call when
 * the user successfully enters a code.
 * This should handle switching the view
 * to the Round1 test page.
 */


export default function AccessCode({ onAccessGranted }) {
  const { toast } = useToast();
  const [accessCode, setAccessCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic frontend validation
    if (!accessCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter your unique access code.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // --- REAL-WORLD SCENARIO ---
    // In a real app, you would send `accessCode` to your backend (e.g., Supabase)
    // to verify it.
    //
    // const { data, error } = await supabase
    //   .from('access_codes')
    //   .select()
    //   .eq('code', accessCode)
    //   .eq('round_id', roundId) // Make sure it's for the right round
    //   .single();
    //
    // if (error || !data) {
    //   toast({ title: "Invalid Code", description: "That code is incorrect or expired." });
    //   setIsLoading(false);
    //   return;
    // }

    // --- FRONTEND-ONLY SIMULATION ---
    // For this demo, we'll just simulate a successful entry after a short delay.
    setTimeout(() => {
      toast({
        title: "Access Granted",
        description: "Loading your test... Good luck!",
      });
      // Tell the parent component to switch to the test view
      if (onAccessGranted) {
        onAccessGranted();
      }
      navigate("/round1")
    }, 1000);
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
            <div className="space-y-2">
              <Label htmlFor="access-code" className="font-semibold">Enter Access Code</Label>
              <Input
                id="access-code"
                placeholder="Enter your unique 8-digit code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                disabled={isLoading}
                className="text-center tracking-widest font-mono text-lg h-12"
              />
            </div>
            <p className="text-xs text-gray-500 text-center px-4">
              Your unique access code can be found in the test invitation
              email sent to you.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-lg py-6"
              disabled={isLoading}
              onSubmit={handleSubmit}
            >
              {isLoading ? "Verifying..." : "Start Test"}
              {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <p className="text-gray-400 text-sm mt-8">
        Powered by YourPlatformName
      </p>
    </div>
  );
}