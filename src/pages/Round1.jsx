import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useToast } from "../hooks/use-toast";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Clock, Send, Loader2 } from "lucide-react"; // ✅ Added Loader icon
import { Textarea } from "../components/ui/textarea";

export default function Round1() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true); // ✅ Loader state
  const [mcqQuestions, setMcqQuestions] = useState([]);
  const [codingQuestion, setCodingQuestion] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [code, setCode] = useState("");
  const [testResults, setTestResults] = useState([]);
  const [timeRemaining] = useState("02:45:30");

  // ✅ Fetch Round 1 questions
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

        if (roundError || !roundData) throw new Error("Round 1 not found");
        const roundId = roundData.round_id;

        // 2️⃣ Fetch MCQ questions and options
        const { data: mcqData, error: mcqError } = await supabase
          .from("questions")
          .select("question_id, question_text, mcq_options(option_text)")
          .eq("round_id", roundId)
          .not("mcq_options", "is", null);

        if (mcqError) throw mcqError;
        setMcqQuestions(mcqData || []);

        // 3️⃣ Fetch coding questions (and pick one randomly)
        const { data: codingData, error: codingError } = await supabase
          .from("questions")
          .select(
            "question_id, question_text, coding_problems(problem_statement, testcases(input_data, expected_output))"
          )
          .eq("round_id", roundId)
          .not("coding_problems", "is", null);

        if (codingError) throw codingError;
        if (codingData.length > 0) {
          const random = codingData[Math.floor(Math.random() * codingData.length)];
          setCodingQuestion(random);
        }

        // toast({
        //   title: "Questions Loaded",
        //   description: "MCQs and coding challenge fetched successfully!",
        // });
      } catch (error) {
        console.error("❌ Error fetching questions:", error);
        toast({
          title: "Error",
          description: "Failed to load questions from database.",
        });
      } finally {
        setLoading(false); // ✅ Stop loader
      }
    };

    fetchQuestions();
  }, []);

  // ✅ Simulate code execution
  // ✅ Simulate code execution
  const handleRunCode = () => {
    if (!codingQuestion) return;
    if (!code.trim()) {
      toast({ title: "No code", description: "Please write some code first." });
      return;
    }

    // FIX: Access coding_problems array (first item)
    const problemData = codingQuestion.coding_problems?.[0];

    if (!problemData) {
      toast({ title: "Error", description: "Problem data missing." });
      return;
    }

    const results = problemData.testcases.map((tc) => {
      const passed = code.includes(tc.expected_output);
      return { ...tc, passed };
    });
    setTestResults(results);

    const passedCount = results.filter((r) => r.passed).length;
    toast({
      title: "Run Results",
      description: `${passedCount}/${results.length} test case(s) passed.`,
    });
  };

  const handleSubmit = () => {
    console.log("✅ Submitted answers:", selectedAnswers, "Code:", code);
    toast({
      title: "Round 1 Submitted!",
      description: "Your answers were successfully recorded.",
    });
  };

  // ✅ Loader UI
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500 mb-3" />
        <p className="text-gray-600 text-sm font-medium">Loading Round 1 Questions...</p>
      </div>
    );
  }

  // ✅ Main UI (shown after loading)
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Round 1: Online Test</h1>
        <div className="flex items-center gap-2 border px-4 py-2 rounded-md bg-orange-50">
          <Clock className="h-5 w-5 text-orange-500" />
          <span className="text-orange-600 font-mono font-semibold">
            {timeRemaining}
          </span>
        </div>
      </div>

      <Tabs defaultValue="mcq">
        <TabsList>
          <TabsTrigger value="mcq">MCQs</TabsTrigger>
          <TabsTrigger value="coding">Coding</TabsTrigger>
        </TabsList>

        {/* 🧩 MCQ Section */}
        <TabsContent value="mcq" className="space-y-6 mt-4">
          {mcqQuestions.length === 0 ? (
            <p className="text-gray-600 text-center">No MCQ questions available.</p>
          ) : (
            mcqQuestions.map((q, index) => (
              <Card key={q.question_id} className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  {index + 1}. {q.question_text}
                </h3>
                <RadioGroup
                  value={selectedAnswers[q.question_id]}
                  onValueChange={(val) =>
                    setSelectedAnswers({ ...selectedAnswers, [q.question_id]: val })
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
          {codingQuestion ? (
            <>
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {codingQuestion.question_text}
                </h3>
                <p className="text-sm text-gray-600 whitespace-pre-line">
                  {codingQuestion.coding_problems.problem_statement}
                </p>
              </Card>

              <Card className="p-6">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="// Write your code here..."
                  className="min-h-[300px] font-mono text-sm"
                />
                <div className="flex gap-3 mt-4">
                  <Button onClick={handleRunCode}>Run Code</Button>
                  <Button variant="secondary" onClick={() => setTestResults([])}>
                    Clear
                  </Button>
                </div>
                {testResults.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Test Results:</h4>
                    {testResults.map((tc, i) => (
                      <div
                        key={i}
                        className={`p-3 mb-2 border rounded ${
                          tc.passed ? "bg-green-50" : "bg-red-50"
                        }`}
                      >
                        <p>Input: {tc.input_data}</p>
                        <p>Expected: {tc.expected_output}</p>
                        <p>
                          Result:{" "}
                          <strong
                            className={tc.passed ? "text-green-600" : "text-red-600"}
                          >
                            {tc.passed ? "Passed ✅" : "Failed ❌"}
                          </strong>
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </>
          ) : (
            <p className="text-gray-600 text-center">No coding question found.</p>
          )}
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-8">
        <Button onClick={handleSubmit} className="bg-orange-500 text-white">
          <Send className="mr-2 h-5 w-5" /> Submit Round 1
        </Button>
      </div>
    </div>
  );
}
