// // // import { useState } from "react";
// // // import Navbar from "../components/Navbar";
// // // import Footer from "../components/Footer";
// // // import { Card } from "../components/ui/card";
// // // import { Button } from "../components/ui/button";
// // // import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
// // // import { Label } from "../components/ui/label";
// // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
// // // import { Clock, Send } from "lucide-react";
// // // import { useToast } from "../hooks/use-toast";
// // // import { Textarea } from "../components/ui/textarea";

// // // export default function Round1() {
// // //   const { toast } = useToast();
// // //   const [selectedAnswers, setSelectedAnswers] = useState({});
// // //   const [code, setCode] = useState("");
// // //   const [timeRemaining] = useState("02:45:30");

// // //   //todo: remove mock functionality
// // //   const mcqQuestions = [
// // //     {
// // //       id: "q1",
// // //       question: "What is the time complexity of binary search?",
// // //       options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
// // //     },
// // //     {
// // //       id: "q2",
// // //       question: "Which data structure uses LIFO principle?",
// // //       options: ["Queue", "Stack", "Tree", "Graph"],
// // //     },
// // //   ];

// // //   const handleSubmit = () => {
// // //     console.log("Submitted answers:", selectedAnswers, "Code:", code);
// // //     toast({
// // //       title: "Round 1 Submitted!",
// // //       description:
// // //         "Your answers have been submitted successfully. Check your dashboard for results.",
// // //     });
// // //   };

// // //   return (
// // //     <div className="min-h-screen flex flex-col">
// // //       <Navbar />
// // //       <main className="flex-1 py-8 bg-card">
// // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //           <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
// // //             <div>
// // //               <h1 className="font-[Poppins] font-bold text-3xl mb-1">
// // //                 Round 1: Online Test
// // //               </h1>
// // //               <p className="text-muted-foreground">MCQ + Coding Challenge</p>
// // //             </div>
// // //             <div className="flex items-center gap-2 px-4 py-2 bg-chart-3/10 rounded-lg border border-chart-3">
// // //               <Clock className="h-5 w-5 text-chart-3" />
// // //               <span
// // //                 className="font-mono text-lg font-bold text-chart-3"
// // //                 data-testid="text-timer"
// // //               >
// // //                 {timeRemaining}
// // //               </span>
// // //             </div>
// // //           </div>

// // //           <Tabs defaultValue="mcq" className="space-y-6">
// // //             <TabsList>
// // //               <TabsTrigger value="mcq" data-testid="tab-mcq">
// // //                 MCQ Questions
// // //               </TabsTrigger>
// // //               <TabsTrigger value="coding" data-testid="tab-coding">
// // //                 Coding Challenge
// // //               </TabsTrigger>
// // //             </TabsList>

// // //             <TabsContent value="mcq">
// // //               <div className="space-y-6">
// // //                 {mcqQuestions.map((q, index) => (
// // //                   <Card key={q.id} className="p-6" data-testid={`mcq-${index}`}>
// // //                     <h3 className="font-semibold text-lg mb-4">
// // //                       {index + 1}. {q.question}
// // //                     </h3>
// // //                     <RadioGroup
// // //                       value={selectedAnswers[q.id]}
// // //                       onValueChange={(value) =>
// // //                         setSelectedAnswers({ ...selectedAnswers, [q.id]: value })
// // //                       }
// // //                     >
// // //                       {q.options.map((option, optIndex) => (
// // //                         <div
// // //                           key={optIndex}
// // //                           className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary/50 cursor-pointer"
// // //                           data-testid={`option-${index}-${optIndex}`}
// // //                         >
// // //                           <RadioGroupItem value={option} id={`${q.id}-${optIndex}`} />
// // //                           <Label
// // //                             htmlFor={`${q.id}-${optIndex}`}
// // //                             className="flex-1 cursor-pointer"
// // //                           >
// // //                             {option}
// // //                           </Label>
// // //                         </div>
// // //                       ))}
// // //                     </RadioGroup>
// // //                   </Card>
// // //                 ))}
// // //               </div>
// // //             </TabsContent>

// // //             <TabsContent value="coding">
// // //               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //                 <Card className="p-6">
// // //                   <h3 className="font-[Poppins] font-semibold text-xl mb-4">
// // //                     Problem Statement
// // //                   </h3>
// // //                   <div className="space-y-4 text-sm">
// // //                     <div>
// // //                       <h4 className="font-semibold mb-2">Two Sum Problem</h4>
// // //                       <p className="text-muted-foreground">
// // //                         Given an array of integers nums and an integer target,
// // //                         return indices of the two numbers such that they add up to
// // //                         target.
// // //                       </p>
// // //                     </div>
// // //                     <div>
// // //                       <h4 className="font-semibold mb-2">Example:</h4>
// // //                       <pre className="bg-secondary/50 p-3 rounded-lg font-mono text-xs overflow-x-auto">
// // // {`Input: nums = [2,7,11,15], target = 9
// // // Output: [0,1]
// // // Explanation: nums[0] + nums[1] == 9`}
// // //                       </pre>
// // //                     </div>
// // //                     <div>
// // //                       <h4 className="font-semibold mb-2">Constraints:</h4>
// // //                       <ul className="list-disc list-inside text-muted-foreground space-y-1">
// // //                         <li>2 ≤ nums.length ≤ 10⁴</li>
// // //                         <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
// // //                         <li>-10⁹ ≤ target ≤ 10⁹</li>
// // //                       </ul>
// // //                     </div>
// // //                   </div>
// // //                 </Card>

// // //                 <Card className="p-6">
// // //                   <h3 className="font-[Poppins] font-semibold text-xl mb-4">
// // //                     Code Editor
// // //                   </h3>
// // //                   <Textarea
// // //                     value={code}
// // //                     onChange={(e) => setCode(e.target.value)}
// // //                     placeholder="// Write your code here..."
// // //                     className="font-mono text-sm min-h-[400px]"
// // //                     data-testid="textarea-code"
// // //                   />
// // //                   <div className="flex gap-2 mt-4">
// // //                     <Button
// // //                       variant="outline"
// // //                       className="flex-1"
// // //                       data-testid="button-run"
// // //                     >
// // //                       Run Code
// // //                     </Button>
// // //                     <Button
// // //                       variant="outline"
// // //                       className="flex-1"
// // //                       data-testid="button-test"
// // //                     >
// // //                       Test Cases
// // //                     </Button>
// // //                   </div>
// // //                 </Card>
// // //               </div>
// // //             </TabsContent>
// // //           </Tabs>

// // //           <div className="mt-8 flex justify-end">
// // //             <Button
// // //               size="lg"
// // //               className="bg-chart-3 hover:bg-chart-3 text-white border-chart-3 gap-2"
// // //               onClick={handleSubmit}
// // //               data-testid="button-submit-round1"
// // //             >
// // //               <Send className="h-5 w-5" />
// // //               Submit Round 1
// // //             </Button>
// // //           </div>
// // //         </div>
// // //       </main>
// // //       <Footer />
// // //     </div>
// // //   );
// // // }
// // import { useState } from "react";
// // import Navbar from "../components/Navbar";
// // import Footer from "../components/Footer";
// // import { Card } from "../components/ui/card";
// // import { Button } from "../components/ui/button";
// // import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
// // import { Label } from "../components/ui/label";
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
// // import { Clock, Send } from "lucide-react";
// // import { useToast } from "../hooks/use-toast";
// // import { Textarea } from "../components/ui/textarea";

// // export default function Round1() {
// //   const { toast } = useToast();
// //   const [selectedAnswers, setSelectedAnswers] = useState({});
// //   const [code, setCode] = useState("");
// //   const [timeRemaining] = useState("02:45:30");

// //   //todo: remove mock functionality
// //   const mcqQuestions = [
// //     {
// //       id: "q1",
// //       question: "What is the time complexity of binary search?",
// //       options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
// //     },
// //     {
// //       id: "q2",
// //       question: "Which data structure uses LIFO principle?",
// //       options: ["Queue", "Stack", "Tree", "Graph"],
// //     },
// //   ];

// //   const handleSubmit = () => {
// //     console.log("Submitted answers:", selectedAnswers, "Code:", code);
// //     toast({
// //       title: "Round 1 Submitted!",
// //       description:
// //         "Your answers have been submitted successfully. Check your dashboard for results.",
// //     });
// //   };

// //   return (
// //     <div className="min-h-screen flex flex-col bg-gray-50">
// //       <Navbar />
// //       <main className="flex-1 py-10">
// //         <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
// //           <div className="flex flex-wrap justify-between items-start mb-8 gap-6">
// //             <div className="flex-1 min-w-0">
// //               <h1 className="font-poppins font-extrabold text-4xl md:text-5xl text-gray-900 leading-tight mb-2">
// //                 Round 1: Online Test
// //               </h1>
// //               <p className="text-muted-foreground text-lg">MCQ + Coding Challenge</p>
// //             </div>

// //             <div className="flex-shrink-0">
// //               <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg border border-orange-300 bg-orange-50">
// //                 <Clock className="h-5 w-5 text-orange-500" />
// //                 <span
// //                   className="font-mono text-lg font-semibold text-orange-600"
// //                   data-testid="text-timer"
// //                 >
// //                   {timeRemaining}
// //                 </span>
// //               </div>
// //             </div>
// //           </div>

// //           <Tabs defaultValue="mcq" className="space-y-6">
// //             <TabsList className="inline-flex gap-2 p-1 rounded-lg bg-transparent">
// //               <TabsTrigger
// //                 value="mcq"
// //                 data-testid="tab-mcq"
// //                 className="px-4 py-2 rounded-md text-sm font-medium bg-white border border-gray-200 shadow-sm"
// //               >
// //                 MCQ Questions
// //               </TabsTrigger>
// //               <TabsTrigger
// //                 value="coding"
// //                 data-testid="tab-coding"
// //                 className="px-4 py-2 rounded-md text-sm font-medium bg-gray-100 border border-gray-100"
// //               >
// //                 Coding Challenge
// //               </TabsTrigger>
// //             </TabsList>

// //             <TabsContent value="mcq">
// //               <div className="space-y-6">
// //                 {mcqQuestions.map((q, index) => (
// //                   <Card
// //                     key={q.id}
// //                     className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
// //                     data-testid={`mcq-${index}`}
// //                   >
// //                     <h3 className="font-semibold text-lg text-gray-900 mb-6">
// //                       {index + 1}. {q.question}
// //                     </h3>

// //                     <RadioGroup
// //                       value={selectedAnswers[q.id]}
// //                       onValueChange={(value) =>
// //                         setSelectedAnswers({ ...selectedAnswers, [q.id]: value })
// //                       }
// //                       className="space-y-3"
// //                     >
// //                       {q.options.map((option, optIndex) => (
// //                         <label
// //                           key={optIndex}
// //                           htmlFor={`${q.id}-${optIndex}`}
// //                           className="flex items-center gap-4 p-4 rounded-lg bg-white border border-transparent hover:bg-gray-50 cursor-pointer transition"
// //                           data-testid={`option-${index}-${optIndex}`}
// //                         >
// //                           <div className="flex items-center justify-center">
// //                             {/* RadioGroupItem renders the actual radio dot */}
// //                             <RadioGroupItem
// //                               value={option}
// //                               id={`${q.id}-${optIndex}`}
// //                               className="mr-2"
// //                             />
// //                           </div>

// //                           <span className="text-gray-800">{option}</span>
// //                         </label>
// //                       ))}
// //                     </RadioGroup>
// //                   </Card>
// //                 ))}
// //               </div>
// //             </TabsContent>

// //             <TabsContent value="coding">
// //               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //                 <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
// //                   <h3 className="font-poppins font-semibold text-xl mb-4 text-gray-900">
// //                     Problem Statement
// //                   </h3>
// //                   <div className="space-y-4 text-sm text-gray-700">
// //                     <div>
// //                       <h4 className="font-semibold mb-2">Two Sum Problem</h4>
// //                       <p className="text-muted-foreground">
// //                         Given an array of integers nums and an integer target,
// //                         return indices of the two numbers such that they add up to
// //                         target.
// //                       </p>
// //                     </div>

// //                     <div>
// //                       <h4 className="font-semibold mb-2">Example:</h4>
// //                       <pre className="bg-gray-100 p-3 rounded-md font-mono text-xs overflow-x-auto">
// // {`Input: nums = [2,7,11,15], target = 9
// // Output: [0,1]
// // Explanation: nums[0] + nums[1] == 9`}
// //                       </pre>
// //                     </div>

// //                     <div>
// //                       <h4 className="font-semibold mb-2">Constraints:</h4>
// //                       <ul className="list-disc list-inside text-muted-foreground space-y-1">
// //                         <li>2 ≤ nums.length ≤ 10⁴</li>
// //                         <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
// //                         <li>-10⁹ ≤ target ≤ 10⁹</li>
// //                       </ul>
// //                     </div>
// //                   </div>
// //                 </Card>

// //                 <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
// //                   <h3 className="font-poppins font-semibold text-xl mb-4 text-gray-900">
// //                     Code Editor
// //                   </h3>
// //                   <Textarea
// //                     value={code}
// //                     onChange={(e) => setCode(e.target.value)}
// //                     placeholder="// Write your code here..."
// //                     className="font-mono text-sm min-h-[400px] p-4 border border-gray-200 rounded-md bg-white"
// //                     data-testid="textarea-code"
// //                   />
// //                   <div className="flex gap-3 mt-4">
// //                     <Button
// //                       variant="outline"
// //                       className="flex-1 py-3 border border-gray-200 bg-white hover:bg-gray-50"
// //                       data-testid="button-run"
// //                     >
// //                       Run Code
// //                     </Button>
// //                     <Button
// //                       variant="outline"
// //                       className="flex-1 py-3 border border-gray-200 bg-white hover:bg-gray-50"
// //                       data-testid="button-test"
// //                     >
// //                       Test Cases
// //                     </Button>
// //                   </div>
// //                 </Card>
// //               </div>
// //             </TabsContent>
// //           </Tabs>

// //           <div className="mt-8 flex justify-end">
// //             <Button
// //               size="lg"
// //               className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-md shadow"
// //               onClick={handleSubmit}
// //               data-testid="button-submit-round1"
// //             >
// //               <Send className="h-5 w-5" />
// //               Submit Round 1
// //             </Button>
// //           </div>
// //         </div>
// //       </main>
// //       <Footer />
// //     </div>
// //   );
// // }
// import { useState } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { Card } from "../components/ui/card";
// import { Button } from "../components/ui/button";
// import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
// import { Label } from "../components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
// import { Clock, Send } from "lucide-react";
// import { useToast } from "../hooks/use-toast";
// import { Textarea } from "../components/ui/textarea";

// export default function Round1() {
//   const { toast } = useToast();
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [code, setCode] = useState("");
//   const [timeRemaining] = useState("02:45:30");

//   // -----------------------------
//   // Mock coding-problem data
//   // Replace this object with data from backend when available.
//   // Example: fetch('/api/problem/round1').then(res => setProblem(await res.json()))
//   // -----------------------------
//   const mockProblem = {
//     id: "problem-2sum",
//     title: "Two Sum Problem",
//     description:
//       "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
//     example: {
//       input: "nums = [2,7,11,15], target = 9",
//       output: "[0,1]",
//       explanation: "nums[0] + nums[1] == 9",
//     },
//     constraints: [
//       "2 ≤ nums.length ≤ 10⁴",
//       "-10⁹ ≤ nums[i] ≤ 10⁹",
//       "-10⁹ ≤ target ≤ 10⁹",
//     ],
//     // simple test-cases for mock-runner; backend can provide full testcases
//     testCases: [
//       { input: "[2,7,11,15], 9", expected: "[0,1]" },
//       { input: "[3,2,4], 6", expected: "[1,2]" },
//       { input: "[3,3], 6", expected: "[0,1]" },
//     ],
//   };
//   // -----------------------------

//   //todo: remove mock functionality
//   const mcqQuestions = [
//     {
//       id: "q1",
//       question: "What is the time complexity of binary search?",
//       options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
//     },
//     {
//       id: "q2",
//       question: "Which data structure uses LIFO principle?",
//       options: ["Queue", "Stack", "Tree", "Graph"],
//     },
//   ];

//   const handleSubmit = () => {
//     console.log("Submitted answers:", selectedAnswers, "Code:", code);
//     toast({
//       title: "Round 1 Submitted!",
//       description:
//         "Your answers have been submitted successfully. Check your dashboard for results.",
//     });
//   };

//   // Mock-run the user's code against mockProblem.testCases.
//   // This is a very simple mock runner: it just checks whether the code string
//   // contains the expected output string. Replace with real evaluator when backend available.
//   const handleRunCode = () => {
//     if (!code.trim()) {
//       toast({ title: "No code", description: "Please write some code before running." });
//       return;
//     }

//     const results = mockProblem.testCases.map((tc) => {
//       // crude check: does user's code include the expected output literal?
//       const passed = code.includes(tc.expected);
//       return { ...tc, passed };
//     });

//     const passedCount = results.filter((r) => r.passed).length;
//     const total = results.length;

//     toast({
//       title: "Run Results",
//       description: `${passedCount}/${total} test case(s) passed.`,
//     });

//     console.log("Mock run results:", results);
//   };

//   const handleShowTestCases = () => {
//     // show a toast with brief info and also log details in console
//     const casesSummary = mockProblem.testCases
//       .map((t, i) => `#${i + 1} input: ${t.input} → expected: ${t.expected}`)
//       .join("\n");
//     toast({
//       title: "Test Cases",
//       description: `${mockProblem.testCases.length} test case(s). Check console for details.`,
//     });
//     console.log("Test cases for problem:", mockProblem.id, "\n", casesSummary);
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Navbar />
//       <main className="flex-1 py-10">
//         <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
//           <div className="flex flex-wrap justify-between items-start mb-8 gap-6">
//             <div className="flex-1 min-w-0">
//               <h1 className="font-poppins font-extrabold text-4xl md:text-5xl text-gray-900 leading-tight mb-2">
//                 Round 1: Online Test
//               </h1>
//               <p className="text-muted-foreground text-lg">MCQ + Coding Challenge</p>
//             </div>

//             <div className="flex-shrink-0">
//               <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg border border-orange-300 bg-orange-50">
//                 <Clock className="h-5 w-5 text-orange-500" />
//                 <span
//                   className="font-mono text-lg font-semibold text-orange-600"
//                   data-testid="text-timer"
//                 >
//                   {timeRemaining}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <Tabs defaultValue="mcq" className="space-y-6">
//             <TabsList className="inline-flex gap-2 p-1 rounded-lg bg-transparent">
//               <TabsTrigger
//                 value="mcq"
//                 data-testid="tab-mcq"
//                 className="px-4 py-2 rounded-md text-sm font-medium bg-white border border-gray-200 shadow-sm"
//               >
//                 MCQ Questions
//               </TabsTrigger>
//               <TabsTrigger
//                 value="coding"
//                 data-testid="tab-coding"
//                 className="px-4 py-2 rounded-md text-sm font-medium bg-gray-100 border border-gray-100"
//               >
//                 Coding Challenge
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="mcq">
//               <div className="space-y-6">
//                 {mcqQuestions.map((q, index) => (
//                   <Card
//                     key={q.id}
//                     className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
//                     data-testid={`mcq-${index}`}
//                   >
//                     <h3 className="font-semibold text-lg text-gray-900 mb-6">
//                       {index + 1}. {q.question}
//                     </h3>

//                     <RadioGroup
//                       value={selectedAnswers[q.id]}
//                       onValueChange={(value) =>
//                         setSelectedAnswers({ ...selectedAnswers, [q.id]: value })
//                       }
//                       className="space-y-3"
//                     >
//                       {q.options.map((option, optIndex) => (
//                         <label
//                           key={optIndex}
//                           htmlFor={`${q.id}-${optIndex}`}
//                           className="flex items-center gap-4 p-4 rounded-lg bg-white border border-transparent hover:bg-gray-50 cursor-pointer transition"
//                           data-testid={`option-${index}-${optIndex}`}
//                         >
//                           <div className="flex items-center justify-center">
//                             <RadioGroupItem
//                               value={option}
//                               id={`${q.id}-${optIndex}`}
//                               className="mr-2"
//                             />
//                           </div>

//                           <span className="text-gray-800">{option}</span>
//                         </label>
//                       ))}
//                     </RadioGroup>
//                   </Card>
//                 ))}
//               </div>
//             </TabsContent>

//             <TabsContent value="coding">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
//                   <h3 className="font-poppins font-semibold text-xl mb-4 text-gray-900">
//                     Problem Statement
//                   </h3>
//                   <div className="space-y-4 text-sm text-gray-700">
//                     <div>
//                       <h4 className="font-semibold mb-2">{mockProblem.title}</h4>
//                       <p className="text-muted-foreground">{mockProblem.description}</p>
//                     </div>

//                     <div>
//                       <h4 className="font-semibold mb-2">Example:</h4>
//                       <pre className="bg-gray-100 p-3 rounded-md font-mono text-xs overflow-x-auto">
// {`Input: ${mockProblem.example.input}
// Output: ${mockProblem.example.output}
// Explanation: ${mockProblem.example.explanation}`}
//                       </pre>
//                     </div>

//                     <div>
//                       <h4 className="font-semibold mb-2">Constraints:</h4>
//                       <ul className="list-disc list-inside text-muted-foreground space-y-1">
//                         {mockProblem.constraints.map((c, i) => (
//                           <li key={i}>{c}</li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 </Card>

//                 <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
//                   <h3 className="font-poppins font-semibold text-xl mb-4 text-gray-900">
//                     Code Editor
//                   </h3>
//                   <Textarea
//                     value={code}
//                     onChange={(e) => setCode(e.target.value)}
//                     placeholder="// Write your code here..."
//                     className="font-mono text-sm min-h-[400px] p-4 border border-gray-200 rounded-md bg-white"
//                     data-testid="textarea-code"
//                   />
//                   <div className="flex gap-3 mt-4">
//                     <Button
//                       variant="outline"
//                       className="flex-1 py-3 border border-gray-200 bg-white hover:bg-gray-50"
//                       data-testid="button-run"
//                       onClick={handleRunCode}
//                     >
//                       Run Code
//                     </Button>
//                     <Button
//                       variant="outline"
//                       className="flex-1 py-3 border border-gray-200 bg-white hover:bg-gray-50"
//                       data-testid="button-test"
//                       onClick={handleShowTestCases}
//                     >
//                       Test Cases
//                     </Button>
//                   </div>
//                 </Card>
//               </div>
//             </TabsContent>
//           </Tabs>

//           <div className="mt-8 flex justify-end">
//             <Button
//               size="lg"
//               className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-md shadow"
//               onClick={handleSubmit}
//               data-testid="button-submit-round1"
//             >
//               <Send className="h-5 w-5" />
//               Submit Round 1
//             </Button>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Clock, Send } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { Textarea } from "../components/ui/textarea";

export default function Round1() {
  const { toast } = useToast();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [code, setCode] = useState("");
  const [timeRemaining] = useState("02:45:30");

  // ✅ Mock coding problem data (to be replaced with backend data later)
  const mockProblem = {
    id: "problem-2sum",
    title: "Two Sum Problem",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    example: {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "nums[0] + nums[1] == 9",
    },
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
    ],
    testCases: [
      { input: "[2,7,11,15], 9", expected: "[0,1]" },
      { input: "[3,2,4], 6", expected: "[1,2]" },
      { input: "[3,3], 6", expected: "[0,1]" },
    ],
  };

  const mcqQuestions = [
    {
      id: "q1",
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    },
    {
      id: "q2",
      question: "Which data structure uses LIFO principle?",
      options: ["Queue", "Stack", "Tree", "Graph"],
    },
  ];

  const [testResults, setTestResults] = useState([]);

  const handleSubmit = () => {
    console.log("Submitted answers:", selectedAnswers, "Code:", code);
    toast({
      title: "Round 1 Submitted!",
      description:
        "Your answers have been submitted successfully. Check your dashboard for results.",
    });
  };

  // ✅ Simulated "Run Code" using mock test cases
  const handleRunCode = () => {
    if (!code.trim()) {
      toast({ title: "No code", description: "Please write some code before running." });
      return;
    }

    const results = mockProblem.testCases.map((tc) => {
      const passed = code.includes(tc.expected);
      return { ...tc, passed };
    });

    setTestResults(results);

    const passedCount = results.filter((r) => r.passed).length;
    const total = results.length;

    toast({
      title: "Run Results",
      description: `${passedCount}/${total} test case(s) passed.`,
    });
  };

  const handleShowTestCases = () => {
    setTestResults(mockProblem.testCases.map((tc) => ({ ...tc, passed: null })));
    toast({
      title: "Test Cases Loaded",
      description: "Showing available test cases below.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-wrap justify-between items-start mb-8 gap-6">
            <div className="flex-1 min-w-0">
              <h1 className="font-poppins font-extrabold text-4xl md:text-5xl text-gray-900 leading-tight mb-2">
                Round 1: Online Test
              </h1>
              <p className="text-muted-foreground text-lg">MCQ + Coding Challenge</p>
            </div>

            <div className="flex-shrink-0">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg border border-orange-300 bg-orange-50">
                <Clock className="h-5 w-5 text-orange-500" />
                <span
                  className="font-mono text-lg font-semibold text-orange-600"
                  data-testid="text-timer"
                >
                  {timeRemaining}
                </span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="mcq" className="space-y-6">
            <TabsList className="inline-flex gap-2 p-1 rounded-lg bg-transparent">
              <TabsTrigger
                value="mcq"
                data-testid="tab-mcq"
                className="px-4 py-2 rounded-md text-sm font-medium bg-white border border-gray-200 shadow-sm"
              >
                MCQ Questions
              </TabsTrigger>
              <TabsTrigger
                value="coding"
                data-testid="tab-coding"
                className="px-4 py-2 rounded-md text-sm font-medium bg-gray-100 border border-gray-100"
              >
                Coding Challenge
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mcq">
              <div className="space-y-6">
                {mcqQuestions.map((q, index) => (
                  <Card
                    key={q.id}
                    className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
                    data-testid={`mcq-${index}`}
                  >
                    <h3 className="font-semibold text-lg text-gray-900 mb-6">
                      {index + 1}. {q.question}
                    </h3>

                    <RadioGroup
                      value={selectedAnswers[q.id]}
                      onValueChange={(value) =>
                        setSelectedAnswers({ ...selectedAnswers, [q.id]: value })
                      }
                      className="space-y-3"
                    >
                      {q.options.map((option, optIndex) => (
                        <label
                          key={optIndex}
                          htmlFor={`${q.id}-${optIndex}`}
                          className="flex items-center gap-4 p-4 rounded-lg bg-white border border-transparent hover:bg-gray-50 cursor-pointer transition"
                          data-testid={`option-${index}-${optIndex}`}
                        >
                          <RadioGroupItem
                            value={option}
                            id={`${q.id}-${optIndex}`}
                            className="mr-2"
                          />
                          <span className="text-gray-800">{option}</span>
                        </label>
                      ))}
                    </RadioGroup>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="coding">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-poppins font-semibold text-xl mb-4 text-gray-900">
                    Problem Statement
                  </h3>
                  <div className="space-y-4 text-sm text-gray-700">
                    <div>
                      <h4 className="font-semibold mb-2">{mockProblem.title}</h4>
                      <p className="text-muted-foreground">{mockProblem.description}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Example:</h4>
                      <pre className="bg-gray-100 p-3 rounded-md font-mono text-xs overflow-x-auto">
{`Input: ${mockProblem.example.input}
Output: ${mockProblem.example.output}
Explanation: ${mockProblem.example.explanation}`}
                      </pre>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Constraints:</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        {mockProblem.constraints.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-poppins font-semibold text-xl mb-4 text-gray-900">
                    Code Editor
                  </h3>
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="// Write your code here..."
                    className="font-mono text-sm min-h-[400px] p-4 border border-gray-200 rounded-md bg-white"
                    data-testid="textarea-code"
                  />

                  <div className="flex gap-3 mt-4">
                    <Button
                      variant="outline"
                      className="flex-1 py-3 border border-gray-200 bg-white hover:bg-gray-50"
                      data-testid="button-run"
                      onClick={handleRunCode}
                    >
                      Run Code
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 py-3 border border-gray-200 bg-white hover:bg-gray-50"
                      data-testid="button-test"
                      onClick={handleShowTestCases}
                    >
                      Test Cases
                    </Button>
                  </div>

                  {/* ✅ Display Test Cases Below */}
                  {testResults.length > 0 && (
                    <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-3">Test Case Results:</h4>
                      <ul className="space-y-2 text-sm">
                        {testResults.map((tc, index) => (
                          <li
                            key={index}
                            className={`p-3 rounded-md flex justify-between items-center ${
                              tc.passed === true
                                ? "bg-green-50 border border-green-200"
                                : tc.passed === false
                                ? "bg-red-50 border border-red-200"
                                : "bg-white border border-gray-100"
                            }`}
                          >
                            <div>
                              <p>
                                <span className="font-medium text-gray-700">
                                  Input:
                                </span>{" "}
                                {tc.input}
                              </p>
                              <p>
                                <span className="font-medium text-gray-700">
                                  Expected:
                                </span>{" "}
                                {tc.expected}
                              </p>
                            </div>
                            {tc.passed !== null && (
                              <span
                                className={`font-semibold ${
                                  tc.passed ? "text-green-600" : "text-red-600"
                                }`}
                              >
                                {tc.passed ? "Passed ✅" : "Failed ❌"}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex justify-end">
            <Button
              size="lg"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-md shadow"
              onClick={handleSubmit}
              data-testid="button-submit-round1"
            >
              <Send className="h-5 w-5" />
              Submit Round 1
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
