import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Send, Loader2, Play, AlertTriangle, ShieldAlert, Maximize, Lock, Camera, Mic } from "lucide-react";
import { Editor } from "@monaco-editor/react";
import axios from "axios";

const LANGUAGE_CONFIG = {
  c: {
    label: "C (GCC 10.2.0)",
    pistonRuntime: "c",
    monacoLanguage: "c",
    boilerplate: `#include <stdio.h>\n\nint main() {\n    // Write C code here\n    int n;\n    if (scanf("%d", &n) != 1) return 0;\n    printf("%d", n);\n    return 0;\n}`,
  },
  cpp: {
    label: "C++ (GCC 10.2.0)",
    pistonRuntime: "c++",
    monacoLanguage: "cpp",
    boilerplate: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    // Write C++ code here\n    int n;\n    if (!(cin >> n)) return 0;\n    cout << n;\n    return 0;\n}`,
  },
};

const MAX_WARNINGS = 3;

export default function Round1() {
  const { toast } = useToast();
  
  // Standard State
  const [loading, setLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [code, setCode] = useState(LANGUAGE_CONFIG["c"].boilerplate);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [language, setLanguage] = useState("c");
  const [mcqQuestions, setMcqQuestions] = useState([]);
  const [codingQuestion, setCodingQuestion] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [testResults, setTestResults] = useState([]);
  
  // 🛡️ Proctoring State
  const [hasStarted, setHasStarted] = useState(false);
  const [warnings, setWarnings] = useState(0);
  const [isTerminated, setIsTerminated] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 🎥 Media State
  const [mediaStream, setMediaStream] = useState(null);
  const [isMediaGranted, setIsMediaGranted] = useState(false);
  const videoRef = useRef(null); // Reference for the video element

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // ------------------------------------------------------------
  // 🎥 MEDIA SETUP LOGIC
  // ------------------------------------------------------------
  const requestMediaPermissions = async () => {
    try {
        // Request both video and audio
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { width: 320, height: 240 }, // Low res is fine for proctoring
            audio: true 
        });
        setMediaStream(stream);
        setIsMediaGranted(true);
        return true;
    } catch (err) {
        console.error("Media Error:", err);
        toast({
            title: "Permission Denied",
            description: "You must allow Camera and Microphone access to proceed.",
            variant: "destructive"
        });
        return false;
    }
  };

  // Cleanup media on unmount or termination
  useEffect(() => {
    return () => {
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
        }
    };
  }, [mediaStream]);

  // Attach stream to video element whenever state changes
  useEffect(() => {
    if (videoRef.current && mediaStream) {
        videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream, hasStarted]);

  // ------------------------------------------------------------
  // 🚀 SUBMISSION LOGIC
  // ------------------------------------------------------------
  const handleSubmit = useCallback(async (autoSubmitReason = null) => {
    setIsSubmitting(true);
    
    // Stop Camera on submit
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
    }

    if (autoSubmitReason) {
      toast({
        title: "Test Terminated",
        description: `Auto-submitting due to: ${autoSubmitReason}`,
        variant: "destructive",
      });
    } else {
      toast({ title: "Submitting...", description: "Recording your answers." });
    }

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error("Authentication required");

      const { data: teamData, error: teamError } = await supabase
        .from("teams")
        .select("team_id")
        .eq("team_leader_id", user.id)
        .single();

      if (teamError || !teamData) throw new Error("Team not found.");
      const actualTeamId = teamData.team_id;

      const mcqSubmissions = Object.entries(selectedAnswers).map(
        ([q_id, ans_text]) => ({
          submission_id: crypto.randomUUID(),
          team_id: actualTeamId,
          question_id: q_id,
          answer_text: ans_text,
        })
      );

      const allSubmissions = [...mcqSubmissions];
      if (codingQuestion && code.trim()) {
        allSubmissions.push({
          submission_id: crypto.randomUUID(),
          team_id: actualTeamId,
          question_id: codingQuestion.question_id,
          answer_text: code,
        });
      }

      if (allSubmissions.length > 0) {
        const { error: submitError } = await supabase
          .from("submissions")
          .upsert(allSubmissions, { onConflict: "team_id, question_id" });

        if (submitError) throw submitError;
      }

      if (!autoSubmitReason) {
        toast({ title: "Round 1 Submitted!", description: "Successfully recorded." });
      }
      
      setIsTerminated(true);

    } catch (error) {
      console.error("Submit Error:", error);
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      if (!autoSubmitReason && document.fullscreenElement) {
        document.exitFullscreen().catch(console.error);
      }
    }
  }, [code, codingQuestion, selectedAnswers, toast, mediaStream]);

  // ------------------------------------------------------------
  // 🛡️ PROCTORING LOGIC
  // ------------------------------------------------------------
  
  const handleViolation = useCallback((reason) => {
    if (isTerminated || isSubmitting) return;

    setWarnings((prev) => {
      const newCount = prev + 1;
      
      if (newCount >= MAX_WARNINGS) {
        setIsTerminated(true);
        handleSubmit(`Too many violations (${newCount}). Disqualified.`);
        if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
        return newCount;
      }

      toast({
        title: "⚠️ PROCTORING WARNING",
        description: `${reason}. Warning ${newCount}/${MAX_WARNINGS}.`,
        variant: "destructive",
        duration: 5000,
      });
      return newCount;
    });
  }, [handleSubmit, isTerminated, isSubmitting, toast]);

  useEffect(() => {
    if (!hasStarted || isTerminated) return;

    const handleVisibilityChange = () => {
      if (document.hidden) handleViolation("Tab switched or minimized");
    };

    const handleFullscreenChange = () => {
      const inFullscreen = !!document.fullscreenElement;
      setIsFullscreen(inFullscreen);

      if (!inFullscreen && !isTerminated) {
        handleViolation("Exited fullscreen mode");
      }
    };

    // Monitor Media Stream Active Status
    const checkMediaStream = setInterval(() => {
        if (mediaStream) {
            const videoTrack = mediaStream.getVideoTracks()[0];
            if (!videoTrack || videoTrack.readyState === 'ended' || !videoTrack.enabled) {
                handleViolation("Camera disabled or blocked");
            }
        }
    }, 5000);

    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey && ["c", "v", "x", "u", "a"].includes(e.key.toLowerCase())) ||
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I")
      ) {
        e.preventDefault();
        handleViolation("Keyboard shortcut disabled");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(checkMediaStream);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasStarted, isTerminated, handleViolation, mediaStream]);

  const handleReEnterFullscreen = async () => {
    try {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
    } catch (err) {
        console.error("Error entering fullscreen", err);
    }
  };

  const startTest = async () => {
    // 1. Check Media first
    const mediaGranted = await requestMediaPermissions();
    if (!mediaGranted) return;

    // 2. Then Fullscreen
    try {
      await document.documentElement.requestFullscreen();
      setHasStarted(true);
      setIsFullscreen(true);
    } catch (err) {
      toast({
        title: "Fullscreen Required",
        description: "You must enable fullscreen to take this test.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const { data: roundData, error: roundError } = await supabase
          .from("rounds")
          .select("round_id")
          .eq("round_number", 1)
          .single();

        if (roundError || !roundData) throw new Error("Round 1 not found");
        const roundId = roundData.round_id;

        const { data: mcqData } = await supabase
          .from("questions")
          .select("question_id, question_text, mcq_options(option_text)")
          .eq("round_id", roundId)
          .not("mcq_options", "is", null);
        setMcqQuestions(mcqData || []);

        const { data: codingData } = await supabase
          .from("questions")
          .select(`
            question_id, question_text, 
            coding_problems (problem_statement, testcases (input_data, expected_output))
          `)
          .eq("round_id", roundId)
          .not("coding_problems", "is", null);

        if (codingData?.length > 0) {
          setCodingQuestion(codingData[0]);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        toast({ title: "Error", description: "Failed to load questions.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [toast]);

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    setCode(LANGUAGE_CONFIG[newLang].boilerplate);
    toast({ title: "Language Changed", description: `Switched to ${LANGUAGE_CONFIG[newLang].label}.` });
  };

  const handleRunCode = async () => {
    if (!codingQuestion || !code.trim()) return;
    setIsRunning(true);
    setTestResults([]);
    const problem = codingQuestion.coding_problems?.[0];
    const testCases = problem?.testcases || [];
    const accumulatedResults = [];

    try {
      for (let i = 0; i < testCases.length; i++) {
        const tc = testCases[i];
        try {
          const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
            language: LANGUAGE_CONFIG[language].pistonRuntime,
            version: "*",
            files: [{ content: code }],
            stdin: tc.input_data || "",
          });
          const result = response.data.run;
          const actualOutput = result.output.trim();
          const expectedOutput = (tc.expected_output || "").trim();
          
          accumulatedResults.push({
            input: tc.input_data,
            expected: expectedOutput,
            actual: result.stderr || actualOutput,
            passed: result.code === 0 && actualOutput === expectedOutput,
            isError: result.code !== 0,
          });
        } catch (err) {
          accumulatedResults.push({
            input: tc.input_data,
            expected: tc.expected_output,
            actual: "Execution Error",
            passed: false,
            isError: true,
          });
        }
        if (i < testCases.length - 1) await sleep(500);
      }
      setTestResults(accumulatedResults);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRunning(false);
    }
  };

  // ------------------------------------------------------------
  // 🖥️ RENDER
  // ------------------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500 mb-3" />
        <p className="text-gray-600 text-sm">Loading Round 1 Questions...</p>
      </div>
    );
  }

  if (isTerminated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-6 text-center">
        <ShieldAlert className="w-16 h-16 text-red-600 mb-4" />
        <h1 className="text-3xl font-bold text-red-700 mb-2">Test Terminated</h1>
        <p className="text-gray-700 max-w-md">
          Your session has been ended due to multiple proctoring violations or successful submission.
        </p>
        <div className="mt-6 p-4 bg-white rounded shadow">
            <p className="font-semibold">Final Warnings Count: {warnings}/{MAX_WARNINGS}</p>
        </div>
        <Button className="mt-8" onClick={() => window.location.reload()}>Return Home</Button>
      </div>
    );
  }

  if (!hasStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
        <Maximize className="w-16 h-16 text-orange-500 mb-6" />
        <h1 className="text-3xl font-bold mb-4">Round 1: Coding & MCQ</h1>
        
        <div className="max-w-lg space-y-4 text-center text-gray-300 mb-8">
          
          <p>This test is <strong>proctored</strong>. Please read the rules carefully:</p>
          <ul className="text-left list-disc pl-6 space-y-2 text-sm">
            <li><strong>Camera & Microphone</strong> access is required.</li>
            <li>Entering <strong>Fullscreen</strong> is required.</li>
            <li>Switching tabs or minimizing the window is a <strong>violation</strong>.</li>
            <li>Copy/Paste and Right-click are <strong>disabled</strong>.</li>
            <li><strong>3 Violations</strong> will result in immediate disqualification.</li>
          </ul>
          
          {/* Instructions for user */}
          {!isMediaGranted && (
            <div className="bg-orange-900/50 border border-orange-500 p-3 rounded text-sm text-orange-200 mt-4 flex items-center gap-3">
                <Camera className="w-5 h-5" />
                <span>You must allow camera access in the next popup.</span>
            </div>
          )}
        </div>

        <Button onClick={startTest} size="lg" className="bg-orange-600 hover:bg-orange-700 text-lg px-8">
          Grant Permissions & Start Test
        </Button>
      </div>
    );
  }

  if (hasStarted && !isFullscreen && !isTerminated) {
    return (
        <div className="fixed inset-0 z-50 bg-gray-900/95 flex flex-col items-center justify-center text-white p-6 text-center backdrop-blur-sm">
            <Lock className="w-16 h-16 text-red-500 mb-6" />
            <h2 className="text-3xl font-bold mb-2">Test Paused</h2>
            <p className="text-gray-300 text-lg max-w-md mb-8">
                You have exited fullscreen mode. This is recorded as a violation. 
                <br/><br/>
                You must return to fullscreen mode immediately to continue the assessment.
            </p>
            <Button 
                onClick={handleReEnterFullscreen} 
                size="lg" 
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-8 py-6"
            >
                <Maximize className="mr-2 h-6 w-6" />
                Rewind to Fullscreen
            </Button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-6 select-none">
      
      {/* 🎥 FLOATING PROCTOR VIDEO FEED */}
      <div className="fixed bottom-4 right-4 z-50 w-48 h-36 bg-black rounded-lg shadow-lg overflow-hidden border-2 border-orange-500">
         
         <video 
            ref={videoRef} 
            autoPlay 
            muted 
            playsInline
            className="w-full h-full object-cover transform scale-x-[-1]" // Mirror effect
         />
         <div className="absolute top-2 left-2 flex gap-1">
            <div className="bg-red-600 w-2 h-2 rounded-full animate-pulse"></div>
            <span className="text-[10px] text-white font-bold bg-black/50 px-1 rounded">REC</span>
         </div>
         <div className="absolute bottom-2 right-2 flex gap-2 text-white/80">
            <Camera size={14} />
            <Mic size={14} />
         </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm border">
        <div>
            <h1 className="text-xl font-bold text-gray-800">Round 1 Assessment</h1>
            {warnings > 0 && (
                <span className="text-red-600 text-xs font-bold flex items-center mt-1">
                    <AlertTriangle className="w-3 h-3 mr-1" /> 
                    Warnings: {warnings}/{MAX_WARNINGS}
                </span>
            )}
        </div>
        <div className="flex items-center gap-2 text-orange-600 font-mono font-bold bg-orange-50 px-3 py-1 rounded">
            <Clock className="w-4 h-4" />
            <span>02:45:30</span>
        </div>
      </div>

      {/* Warning Alert */}
      {warnings > 0 && warnings < MAX_WARNINGS && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-sm animate-pulse flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 mt-0.5" />
            <div>
                <p className="font-bold">Proctoring Alert</p>
                <p className="text-sm">
                   Please stay on this tab and keep fullscreen active. You have {MAX_WARNINGS - warnings} chances left.
                </p>
            </div>
        </div>
      )}

      <Tabs defaultValue="coding">
        <TabsList>
          <TabsTrigger value="mcq">MCQs</TabsTrigger>
          <TabsTrigger value="coding">Coding</TabsTrigger>
        </TabsList>

        <TabsContent value="mcq" className="space-y-6 mt-4">
          {mcqQuestions.map((q, index) => (
            <Card key={q.question_id} className="p-6">
              <h3 className="text-lg font-semibold mb-4">{index + 1}. {q.question_text}</h3>
              <RadioGroup
                value={selectedAnswers[q.question_id]}
                onValueChange={(val) => setSelectedAnswers({ ...selectedAnswers, [q.question_id]: val })}
              >
                {q.mcq_options.map((opt, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 border rounded-md hover:bg-gray-50">
                    <RadioGroupItem value={opt.option_text} id={`${q.question_id}-${i}`} />
                    <label htmlFor={`${q.question_id}-${i}`} className="cursor-pointer w-full">{opt.option_text}</label>
                  </div>
                ))}
              </RadioGroup>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="coding" className="space-y-6 mt-4">
          {codingQuestion && (
            <>
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">{codingQuestion.question_text}</h3>
                <p className="text-sm text-gray-600 whitespace-pre-line bg-gray-100 p-4 rounded-md font-mono">
                  {codingQuestion.coding_problems[0].problem_statement}
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-center mb-3 border-b pb-3">
                  <h3 className="font-semibold text-gray-700">Code Editor</h3>
                  <div className="flex items-center gap-3">
                    <select
                      value={language}
                      onChange={(e) => handleLanguageChange(e.target.value)}
                      className="border rounded px-3 py-1.5 text-sm"
                    >
                      {Object.keys(LANGUAGE_CONFIG).map((key) => (
                        <option key={key} value={key}>{LANGUAGE_CONFIG[key].label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <Editor
                  height="60vh"
                  language={LANGUAGE_CONFIG[language].monacoLanguage}
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  theme="vs-dark"
                  options={{ fontSize: 14, minimap: { enabled: false }, contextmenu: false }}
                />

                <div className="flex gap-3 mt-4">
                  <Button onClick={handleRunCode} disabled={isRunning} className="bg-green-600 hover:bg-green-700">
                    {isRunning ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
                    Run Code
                  </Button>
                  <Button variant="secondary" onClick={() => setTestResults([])}>Clear Results</Button>
                </div>

                {testResults.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {testResults.map((res, i) => (
                      <div key={i} className={`p-3 border rounded-md text-sm ${res.passed ? "bg-green-50" : "bg-red-50"}`}>
                        <div className="font-bold">{res.passed ? "Passed ✅" : "Failed ❌"}</div>
                        <div className="text-xs font-mono mt-1">Input: {res.input} | Expected: {res.expected} | Actual: {res.actual}</div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-8">
        <Button onClick={() => handleSubmit()} className="bg-orange-500 text-white" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : <Send className="mr-2 h-5 w-5" />}
          Submit Round 1
        </Button>
      </div>
    </div>
  );
}