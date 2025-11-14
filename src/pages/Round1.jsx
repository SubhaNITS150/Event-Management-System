import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Send, Loader2, Play } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Editor } from "@monaco-editor/react";
import axios from "axios";

const LANGUAGE_CONFIG = {
  c: {
    label: "C (GCC 10.2.0)",
    pistonRuntime: "c", // API expects "c"
    monacoLanguage: "c", // Editor expects "c"
    boilerplate: `#include <stdio.h>\n\nint main() {\n    // Write C code here\n    int n;\n    if (scanf("%d", &n) != 1) return 0;\n    printf("%d", n);\n    return 0;\n}`,
  },
  cpp: {
    label: "C++ (GCC 10.2.0)",
    pistonRuntime: "c++", // API expects "c++"
    monacoLanguage: "cpp", // Editor expects "cpp"
    boilerplate: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    // Write C++ code here\n    int n;\n    if (!(cin >> n)) return 0;\n    cout << n;\n    return 0;\n}`,
  },
};

export default function Round1() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [code, setCode] = useState(LANGUAGE_CONFIG["c"].boilerplate);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [language, setLanguage] = useState("c"); // ✅ State for submit
  const [mcqQuestions, setMcqQuestions] = useState([]);
  const [codingQuestion, setCodingQuestion] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [testResults, setTestResults] = useState([]);
  const [timeRemaining] = useState("02:45:30");

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    setCode(LANGUAGE_CONFIG[newLang].boilerplate);

    toast({
      title: "Language Changed",
      description: `Switched to ${LANGUAGE_CONFIG[newLang].label}. Code reset.`,
    });
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        // 1️⃣ Get Round 1 ID
        const { data: roundData, error: roundError } = await supabase
          .from("rounds")
          .select("round_id")
          .eq("round_number", 1)
          .single();

        if (roundError || !roundData) {
          // Log the specific Supabase error if it exists
          if (roundError) console.error("Supabase Error Details:", roundError);
          if (!roundData) console.error("Query returned no data for Round 1.");
          throw new Error("Round 1 not found");
        }
        const roundId = roundData.round_id;

        // 2️⃣ Fetch MCQ questions
        const { data: mcqData, error: mcqError } = await supabase
          .from("questions")
          .select("question_id, question_text, mcq_options(option_text)")
          .eq("round_id", roundId)
          .not("mcq_options", "is", null);

        if (mcqError) throw mcqError;
        setMcqQuestions(mcqData || []);

        // 3️⃣ Fetch coding questions AND nested testcases
        const { data: codingData, error: codingError } = await supabase
          .from("questions")
          .select(
            `
            question_id, 
            question_text, 
            coding_problems (
              problem_statement,
              testcases (
                input_data,
                expected_output
              )
            )
          `
          )
          .eq("round_id", roundId)
          .not("coding_problems", "is", null);

        // if (codingError) throw codingError;
        if (codingData && codingData.length > 0) {
          setCodingQuestion(codingData[0]);
          // Optional: Set a default C starter template
          setCode(
            `#include <stdio.h>\n\nint main() {\n    // Write your code here\n    return 0;\n}`
          );
        }
        setLoading(false);

        toast({
          title: "Questions Loaded",
          description: "MCQs and coding challenge fetched successfully!",
        });
      } catch (error) {
        console.error("❌ Error fetching questions:", error);
        toast({
          title: "Error",
          description: "Failed to load questions from database.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [toast]); // Added toast as dependency

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // ✅ Simulate code execution
  const handleRunCode = async () => {
    if (!codingQuestion) return;
    if (!code.trim()) {
      toast({ title: "No code", description: "Please write some code first." });
      return;
    }

    const problem = codingQuestion.coding_problems?.[0];
    const testCases = problem?.testcases;

    if (!testCases || testCases.length === 0) {
      toast({ title: "Error", description: "No test cases found." });
      return;
    }

    setIsRunning(true);
    setTestResults([]); // Clear previous results

    const accumulatedResults = [];

    try {
      const API_URL = "https://emkc.org/api/v2/piston/execute";
      const currentConfig = LANGUAGE_CONFIG[language];

      // 🔄 Loop through test cases ONE BY ONE instead of Promise.all
      for (let i = 0; i < testCases.length; i++) {
        const tc = testCases[i];

        const safeInput = tc.input_data !== null && tc.input_data !== undefined 
          ? String(tc.input_data) 
          : "";

        // Optional: Update UI to show progress (e.g., "Running test case 1/3...")
        toast({
          title: `Running Test Case ${i + 1}/${testCases.length}...`,
          duration: 1000,
        });

        try {
          const response = await axios.post(API_URL, {
            language: currentConfig.pistonRuntime,
            version: "*",
            files: [{ content: code }],
            stdin: tc.input_data || "",
          });

          const result = response.data.run;
          // let passed = false;
          // let actualOutput = "";

          // Handle Compilation/Runtime Errors
          if (result.code !== 0) {
            accumulatedResults.push({
              input: tc.input_data,
              expected: tc.expected_output,
              actual: result.stderr || result.output,
              passed: false,
              isError: true,
            });
          } else {
            // Compare Output
            const actualOutput = result.output.trim();
            const expectedOutput = tc.expected_output.trim();
            const passed = actualOutput === expectedOutput;

            accumulatedResults.push({
              input: tc.input_data,
              expected: expectedOutput,
              actual: actualOutput,
              passed: passed,
              isError: false,
            });
          }
        } catch (err) {
          // Handle specific API errors (like 429) for a specific case
          accumulatedResults.push({
            input: tc.input_data,
            expected: tc.expected_output,
            actual: `Server Error: ${err.response?.status || err.message}`,
            passed: false,
            isError: true,
          });
        }

        // 🛑 CRITICAL: Wait 500ms before sending the next request
        // This prevents the 429 Too Many Requests error
        if (i < testCases.length - 1) {
          await sleep(500);
        }
      }

      // Update state with all results
      setTestResults(accumulatedResults);

      const passedCount = accumulatedResults.filter((r) => r.passed).length;
      toast({
        title: "Execution Complete",
        description: `${passedCount}/${accumulatedResults.length} test cases passed.`,
        variant:
          passedCount === accumulatedResults.length ? "default" : "destructive",
      });
    } catch (error) {
      console.error("Global Execution error:", error);
      toast({
        title: "Error",
        description: "Failed to run code.",
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };

  // ✅ NEW SUBMISSION LOGIC
  // ✅ NEW SUBMISSION LOGIC
  const handleSubmit = async () => {
    setIsSubmitting(true);
    toast({ title: "Submitting...", description: "Recording your answers." });

    try {
      // 1. Get the current user's ID
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        toast({
          title: "Authentication Error",
          description: "You must be logged in to submit.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      const authUserId = user.id; // 2. Get the associated 'team_id' from the 'teams' table

      // ---------------------------------------------------------
      // 👇 FIX IS HERE: I changed 'YOUR_COLUMN...' to 'team_leader_id'
      // Check your Supabase 'teams' table. If the column is named 'user_id', change it here.
      // ---------------------------------------------------------
      const { data: teamData, error: teamError } = await supabase
        .from("teams")
        .select("team_id")
        .eq("team_leader_id", authUserId)
        .single();

      if (teamError || !teamData) {
        console.error("Team lookup error:", teamError);
        throw new Error(
          "Could not find a team for the current user. Ensure you are registered as a team leader."
        );
      }
      const actualTeamId = teamData.team_id; // 3. Format MCQ answers

      const mcqSubmissions = Object.entries(selectedAnswers).map(
        ([q_id, ans_text]) => ({
          submission_id: crypto.randomUUID(),
          team_id: actualTeamId,
          question_id: q_id,
          answer_text: ans_text,
        })
      ); // 4. Format coding answer (if it exists)

      const allSubmissions = [...mcqSubmissions];
      if (codingQuestion && code.trim()) {
        allSubmissions.push({
          submission_id: crypto.randomUUID(),
          team_id: actualTeamId,
          question_id: codingQuestion.question_id,
          answer_text: code,
        });
      }

      if (allSubmissions.length === 0) {
        toast({
          title: "Nothing to submit",
          description: "You haven't answered any questions.",
        });
        setIsSubmitting(false);
        return;
      } // 5. Upsert all submissions

      const { data, error: submitError } = await supabase
        .from("submissions")
        .upsert(allSubmissions, {
          onConflict: "team_id, question_id",
        })
        .select();

      if (submitError) {
        console.error("❌ Supabase Submit Error:", submitError);
        throw new Error(submitError.message);
      }

      toast({
        title: "Round 1 Submitted!",
        description: `Successfully recorded ${data.length} answer(s).`,
      });
    } catch (error) {
      console.error("❌ Error in handleSubmit:", error);
      toast({
        title: "Submission Failed",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Loader UI
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500 mb-3" />
        <p className="text-gray-600 text-sm font-medium">
          Loading Round 1 Questions...
        </p>
      </div>
    );
  }

  // ✅ Main UI
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      {/* Header omitted for brevity */}

      <Tabs defaultValue="coding">
        {" "}
        {/* Changed default for testing */}
        <TabsList>
          <TabsTrigger value="mcq">MCQs</TabsTrigger>
          <TabsTrigger value="coding">Coding</TabsTrigger>
        </TabsList>
        {/* MCQ Section omitted for brevity */}
        {/* 🧩 MCQ Section */}
        <TabsContent value="mcq" className="space-y-6 mt-4">
          {mcqQuestions.length === 0 ? (
            <p className="text-gray-600 text-center">
              No MCQ questions available.
            </p>
          ) : (
            mcqQuestions.map((q, index) => (
              <Card key={q.question_id} className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  {index + 1}. {q.question_text}
                </h3>

                <RadioGroup
                  value={selectedAnswers[q.question_id]}
                  onValueChange={(val) =>
                    setSelectedAnswers({
                      ...selectedAnswers,

                      [q.question_id]: val,
                    })
                  }
                >
                  {q.mcq_options.map((opt, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                    >
                      <RadioGroupItem value={opt.option_text} />

                      <span>{opt.option_text}</span>
                    </label>
                  ))}
                </RadioGroup>
              </Card>
            ))
          )}
        </TabsContent>
        {/* 💻 Coding Section */}
        <TabsContent value="coding" className="space-y-6 mt-4">
          {codingQuestion && codingQuestion.coding_problems?.length > 0 ? (
            <>
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {codingQuestion.question_text}
                </h3>
                <p className="text-sm text-gray-600 whitespace-pre-line bg-gray-100 p-4 rounded-md font-mono">
                  {codingQuestion.coding_problems[0].problem_statement}
                </p>
              </Card>

              <Card className="p-6">
                {/* 4. Update Editor to C language */}

                <div className="flex justify-between items-center mb-3 border-b pb-3">
                  <h3 className="font-semibold text-gray-700">Code Editor</h3>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">Language:</span>
                    <select
                      value={language}
                      onChange={(e) => handleLanguageChange(e.target.value)}
                      className="border rounded px-3 py-1.5 text-sm bg-white focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
                    >
                      {Object.keys(LANGUAGE_CONFIG).map((key) => (
                        <option key={key} value={key}>
                          {LANGUAGE_CONFIG[key].label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Editor
                  height="60vh"
                  language={LANGUAGE_CONFIG[language].monacoLanguage} // "c" or "cpp"
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  theme="vs-dark"
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />

                <div className="flex gap-3 mt-4">
                  <Button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isRunning ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Play className="mr-2 h-4 w-4" />
                    )}
                    {isRunning ? "Compiling & Running..." : "Run Code"}
                  </Button>

                  <Button
                    variant="secondary"
                    onClick={() => setTestResults([])}
                  >
                    Clear Results
                  </Button>
                </div>

                {/* 5. Display Detailed Results */}
                {testResults.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="font-semibold text-gray-700">
                      Test Results:
                    </h4>
                    {testResults.map((res, i) => (
                      <div
                        key={i}
                        className={`p-3 border rounded-md text-sm ${
                          res.passed
                            ? "bg-green-50 border-green-200"
                            : "bg-red-50 border-red-200"
                        }`}
                      >
                        <div className="flex justify-between mb-1">
                          <span className="font-semibold">
                            Test Case #{i + 1}
                          </span>
                          <span
                            className={
                              res.passed
                                ? "text-green-700 font-bold"
                                : "text-red-600 font-bold"
                            }
                          >
                            {res.passed ? "Passed ✅" : "Failed ❌"}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-2 font-mono text-xs">
                          <div>
                            <span className="block text-gray-500">
                              Input (stdin):
                            </span>
                            <div className="bg-white p-1 border rounded">
                              {res.input}
                            </div>
                          </div>
                          <div>
                            <span className="block text-gray-500">
                              Expected Output:
                            </span>
                            <div className="bg-white p-1 border rounded">
                              {res.expected}
                            </div>
                          </div>
                          <div>
                            <span className="block text-gray-500">
                              Your Output:
                            </span>
                            <div
                              className={`p-1 border rounded ${
                                res.isError
                                  ? "text-red-600 bg-red-100"
                                  : "bg-white"
                              }`}
                            >
                              {res.actual}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </>
          ) : (
            <p>No coding questions loaded</p>
          )}
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-8">
        <Button
          onClick={handleSubmit}
          className="bg-orange-500 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Send className="mr-2 h-5 w-5" />
          )}
          Submit Round 1
        </Button>
      </div>
    </div>
  );
}
