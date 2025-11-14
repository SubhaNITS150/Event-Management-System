// import { useState } from "react";

// import { Card } from "../components/ui/card";
// import { Button } from "../components/ui/button";
// import { Clock, Send, FileText } from "lucide-react";
// import { useToast } from "../hooks/use-toast";
// import { Textarea } from "../components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../components/ui/select";

// export default function Round2() {
//   const { toast } = useToast();
//   const [code, setCode] = useState("");
//   const [language, setLanguage] = useState("python");
//   const [timeRemaining] = useState("01:45:30");

//   const handleSubmit = () => {
//     console.log("Submitted code:", code, "Language:", language);
//     toast({
//       title: "Round 2 Submitted!",
//       description:
//         "Your solution has been submitted successfully. Results will be announced soon.",
//     });
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
     
//       <main className="flex-1 py-8 bg-card">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
//             <div>
//               <h1 className="font-[Poppins] font-bold text-3xl mb-1">
//                 Round 2: Problem Solving
//               </h1>
//               <p className="text-muted-foreground">Advanced Coding Challenge</p>
//             </div>
//             <div className="flex items-center gap-2 px-4 py-2 bg-chart-3/10 rounded-lg border border-chart-3">
//               <Clock className="h-5 w-5 text-chart-3" />
//               <span
//                 className="font-mono text-lg font-bold text-chart-3"
//                 data-testid="text-timer"
//               >
//                 {timeRemaining}
//               </span>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
//             <div className="lg:col-span-2">
//               <Card className="p-6 sticky top-20">
//                 <div className="flex items-center gap-2 mb-4">
//                   <FileText className="h-5 w-5 text-primary" />
//                   <h3 className="font-[Poppins] font-semibold text-xl">
//                     Problem Statement
//                   </h3>
//                 </div>

//                 <div className="space-y-4 text-sm max-h-[calc(100vh-250px)] overflow-y-auto">
//                   <div>
//                     <h4 className="font-semibold mb-2">Design a Social Network</h4>
//                     <p className="text-muted-foreground">
//                       You are tasked with designing a simplified social network
//                       system. Implement a class that supports the following
//                       operations:
//                     </p>
//                   </div>

//                   <div>
//                     <h4 className="font-semibold mb-2">Requirements:</h4>
//                     <ul className="list-disc list-inside text-muted-foreground space-y-2">
//                       <li>Add a user to the network</li>
//                       <li>Create a friendship connection between two users</li>
//                       <li>Find mutual friends between two users</li>
//                       <li>Suggest friends based on mutual connections</li>
//                       <li>Find the shortest connection path between two users</li>
//                     </ul>
//                   </div>

//                   <div>
//                     <h4 className="font-semibold mb-2">Example Usage:</h4>
//                     <pre className="bg-secondary/50 p-3 rounded-lg font-mono text-xs overflow-x-auto">
// {`network = SocialNetwork()
// network.add_user("Alice")
// network.add_user("Bob")
// network.add_friend("Alice", "Bob")
// network.get_mutual_friends("Alice", "Bob")
// // Returns: []

// network.add_user("Charlie")
// network.add_friend("Alice", "Charlie")
// network.suggest_friends("Bob")
// // Returns: ["Charlie"]`}
//                     </pre>
//                   </div>

//                   <div>
//                     <h4 className="font-semibold mb-2">Constraints:</h4>
//                     <ul className="list-disc list-inside text-muted-foreground space-y-1">
//                       <li>1 ≤ number of users ≤ 10⁵</li>
//                       <li>User names are unique strings</li>
//                       <li>Friendship is bidirectional</li>
//                       <li>Optimize for time complexity</li>
//                     </ul>
//                   </div>

//                   <div>
//                     <h4 className="font-semibold mb-2">Scoring:</h4>
//                     <ul className="list-disc list-inside text-muted-foreground space-y-1">
//                       <li>Correctness: 40%</li>
//                       <li>Time Complexity: 30%</li>
//                       <li>Code Quality: 20%</li>
//                       <li>Edge Cases: 10%</li>
//                     </ul>
//                   </div>
//                 </div>
//               </Card>
//             </div>

//             <div className="lg:col-span-3">
//               <Card className="p-6">
//                 <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
//                   <h3 className="font-[Poppins] font-semibold text-xl">Code Editor</h3>
//                   <Select value={language} onValueChange={setLanguage}>
//                     <SelectTrigger
//                       className="w-40"
//                       data-testid="select-language"
//                     >
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="python">Python</SelectItem>
//                       <SelectItem value="java">Java</SelectItem>
//                       <SelectItem value="cpp">C++</SelectItem>
//                       <SelectItem value="javascript">JavaScript</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <Textarea
//                   value={code}
//                   onChange={(e) => setCode(e.target.value)}
//                   placeholder={`# Write your ${language} code here...\n\nclass SocialNetwork:\n    def __init__(self):\n        pass\n    \n    def add_user(self, user):\n        pass\n    \n    def add_friend(self, user1, user2):\n        pass`}
//                   className="font-mono text-sm min-h-[500px]"
//                   data-testid="textarea-code"
//                 />

//                 <div className="flex flex-wrap gap-2 mt-4">
//                   <Button
//                     variant="outline"
//                     className="gap-2"
//                     data-testid="button-run"
//                   >
//                     Run Code
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="gap-2"
//                     data-testid="button-test"
//                   >
//                     Test Cases
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="gap-2"
//                     data-testid="button-debug"
//                   >
//                     Debug
//                   </Button>
//                   <Button
//                     className="ml-auto bg-chart-3 hover:bg-chart-3 text-white border-chart-3 gap-2"
//                     onClick={handleSubmit}
//                     data-testid="button-submit-round2"
//                   >
//                     <Send className="h-4 w-4" />
//                     Submit Solution
//                   </Button>
//                 </div>

//                 <Card className="mt-4 p-4 bg-secondary/50">
//                   <h4 className="font-semibold text-sm mb-2">Test Results</h4>
//                   <p className="text-sm text-muted-foreground">
//                     Run your code to see test results here...
//                   </p>
//                 </Card>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </main>
      
//     </div>
//   );
// }
// import { useState } from "react";

// import { Card } from "../components/ui/card";
// import { Button } from "../components/ui/button";
// import { Clock, Send, FileText } from "lucide-react";
// import { useToast } from "../hooks/use-toast";
// import { Textarea } from "../components/ui/textarea";
// import { Input } from "../components/ui/input";
// import { Label } from "../components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../components/ui/select";

// export default function Round2() {
//   const { toast } = useToast();
//   const [code, setCode] = useState("");
//   const [language, setLanguage] = useState("python");
//   const [timeRemaining] = useState("01:45:30");

//   // New form fields
//   const [problemNumber, setProblemNumber] = useState("1");
//   const [brief, setBrief] = useState("");
//   const [completeIdea, setCompleteIdea] = useState("");
//   const [githubLink, setGithubLink] = useState("");

//   const handleSubmit = () => {
//     // Collect everything and send to backend later
//     const payload = {
//       problemNumber,
//       brief,
//       completeIdea,
//       githubLink,
//       language,
//       code,
//     };

//     console.log("Round 2 submission payload:", payload);

//     toast({
//       title: "Round 2 Submitted!",
//       description:
//         "Your submission (idea + code) has been recorded. Results will be announced soon.",
//     });

//     // Optional: clear fields or keep them (kept as-is)
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <main className="flex-1 py-8 bg-card">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
//             <div>
//               <h1 className="font-[Poppins] font-bold text-3xl mb-1">
//                 Round 2: Problem Submission
//               </h1>
//               <p className="text-muted-foreground">
//                 Submit your idea, design and (optional) code
//               </p>
//             </div>

//             <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/40 to-white/10 rounded-lg border border-gray-200 shadow-sm">
//               <Clock className="h-5 w-5 text-chart-3" />
//               <span
//                 className="font-mono text-lg font-bold text-chart-3"
//                 data-testid="text-timer"
//               >
//                 {timeRemaining}
//               </span>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
//             {/* LEFT: Submission Form */}
//             <div className="lg:col-span-2">
//               <Card className="p-6 sticky top-20 space-y-4 shadow-md border">
//                 <div className="flex items-center gap-3">
//                   <FileText className="h-6 w-6 text-primary" />
//                   <div>
//                     <h3 className="font-[Poppins] font-semibold text-lg">
//                       Submission Details
//                     </h3>
//                     <p className="text-sm text-muted-foreground">
//                       Fill the form below with a brief & complete idea. GitHub
//                       link and code are optional but recommended.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Problem Number */}
//                 <div className="space-y-2">
//                   <Label className="text-sm">Problem Statement Number</Label>
//                   <Select value={problemNumber} onValueChange={setProblemNumber}>
//                     <SelectTrigger className="w-full">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {/* Example list — adjust count as needed */}
//                       <SelectItem value="1">Problem 1</SelectItem>
//                       <SelectItem value="2">Problem 2</SelectItem>
//                       <SelectItem value="3">Problem 3</SelectItem>
//                       <SelectItem value="4">Problem 4</SelectItem>
//                       <SelectItem value="5">Problem 5</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {/* Brief */}
//                 <div className="space-y-2">
//                   <Label className="text-sm">Brief about your solution</Label>
//                   <Input
//                     placeholder="One-line summary (max 150 chars)"
//                     value={brief}
//                     onChange={(e) => setBrief(e.target.value)}
//                     maxLength={150}
//                   />
//                   <p className="text-xs text-muted-foreground">
//                     Keep it short and punchy — what your approach is at a glance.
//                   </p>
//                 </div>

//                 {/* Complete Idea */}
//                 <div className="space-y-2">
//                   <Label className="text-sm">Complete idea / design</Label>
//                   <Textarea
//                     placeholder="Explain your approach, data structures, algorithms, complexity, and edge-cases. Be thorough."
//                     value={completeIdea}
//                     onChange={(e) => setCompleteIdea(e.target.value)}
//                     className="min-h-[200px] font-mono text-sm"
//                   />
//                   <p className="text-xs text-muted-foreground">
//                     This section is for full explanation — clarity helps scoring.
//                   </p>
//                 </div>

//                 {/* GitHub Link */}
//                 <div className="space-y-2">
//                   <Label className="text-sm">GitHub Link (optional)</Label>
//                   <Input
//                     placeholder="https://github.com/your-repo"
//                     value={githubLink}
//                     onChange={(e) => setGithubLink(e.target.value)}
//                   />
//                 </div>

//                 <div className="flex gap-2 pt-2">
//                   <Button
//                     className="flex-1"
//                     variant="outline"
//                     onClick={() => {
//                       // quick preview (client-side)
//                       toast({
//                         title: "Preview",
//                         description: "Check console for preview of your submission.",
//                       });
//                       console.log({
//                         problemNumber,
//                         brief,
//                         completeIdea,
//                         githubLink,
//                       });
//                     }}
//                   >
//                     Preview
//                   </Button>

//                   <Button
//                     className="flex-1 bg-chart-3 text-white"
//                     onClick={handleSubmit}
//                   >
//                     <Send className="h-4 w-4 mr-2" />
//                     Submit Idea
//                   </Button>
//                 </div>
//               </Card>
//             </div>

            
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
// import { useState, useEffect } from "react";
// import { Card } from "../components/ui/card";
// import { Button } from "../components/ui/button";
// import { Clock, Send, FileText } from "lucide-react";
// import { useToast } from "../hooks/use-toast";
// import { Textarea } from "../components/ui/textarea";
// import { Input } from "../components/ui/input";
// import { Label } from "../components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../components/ui/select";

// export default function Round2() {
//   const { toast } = useToast();
//   const [timeRemaining] = useState("01:45:30");

//   // Form fields
//   const [problemNumber, setProblemNumber] = useState("1");
//   const [brief, setBrief] = useState("");
//   const [completeIdea, setCompleteIdea] = useState("");
//   const [githubLink, setGithubLink] = useState("");

//   // Mock problems data
//   const mockProblems = {
//     "1": {
//       title: "Design a Social Network",
//       description:
//         "Implement a SocialNetwork class supporting add_user, add_friend, get_mutual_friends, suggest_friends, and shortest_path between users. Optimize for up to 100k users.",
//       example: `network = SocialNetwork()
// network.add_user("Alice")
// network.add_user("Bob")
// network.add_friend("Alice", "Bob")`,
//       constraints: [
//         "1 ≤ number of users ≤ 100000",
//         "User names are unique strings",
//         "Friendship is bidirectional",
//         "Prefer O(1)/O(log n) operations where possible",
//       ],
//     },
//     "2": {
//       title: "Real-time Leaderboard",
//       description:
//         "Design a leaderboard that supports adding scores, querying top-K players and getting player rank in realtime with many updates.",
//       example: `leaderboard.add_score("user1", 250)
// leaderboard.top_k(10)`,
//       constraints: [
//         "Up to 10^6 score updates",
//         "Top-K queries should be efficient",
//         "Handle ties deterministically",
//       ],
//     },
//     "3": {
//       title: "URL Shortener with Analytics",
//       description:
//         "Build a URL shortener that returns short aliases and tracks usage (clicks, geo, device). Include APIs for stats.",
//       example: `short = Shortener()
// short.create("https://example.com") -> "aBc123"`,
//       constraints: [
//         "Scale to 1M+ shortened URLs",
//         "Analytics must be stored with low write latency",
//       ],
//     },
//     "4": {
//       title: "Task Scheduler",
//       description:
//         "Design a distributed task scheduler that can schedule jobs with delays, retries, and priorities. Support at-least-once delivery guarantee.",
//       example: `scheduler.schedule(job, delay=60, priority=5)`,
//       constraints: [
//         "High availability",
//         "Support millions of scheduled tasks",
//         "Ensure retry/backoff logic",
//       ],
//     },
//     "5": {
//       title: "Document Search Engine (mini)",
//       description:
//         "Implement an inverted-index-based search for documents supporting add/remove documents and boolean queries (AND / OR).",
//       example: `index.add(doc_id=1, text="hello world")
// index.search("hello AND world")`,
//       constraints: [
//         "Index should support dynamic updates",
//         "Return top relevant docs quickly",
//       ],
//     },
//   };

//   // Selected problem object derived from mockProblems
//   const [selectedProblem, setSelectedProblem] = useState(
//     mockProblems[problemNumber]
//   );

//   useEffect(() => {
//     setSelectedProblem(mockProblems[problemNumber]);
//   }, [problemNumber]);

//   const handleSubmit = () => {
//     const payload = {
//       problemNumber,
//       problemTitle: selectedProblem?.title,
//       brief,
//       completeIdea,
//       githubLink,
//     };

//     console.log("Round 2 submission payload:", payload);

//     toast({
//       title: "Round 2 Submitted!",
//       description:
//         "Your submission (idea + details) has been recorded. Results will be announced soon.",
//     });

//     // keep fields as-is (or uncomment to clear)
//     // setBrief(""); setCompleteIdea(""); setGithubLink("");
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <main className="flex-1 py-8 bg-card">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
//             <div>
//               <h1 className="font-[Poppins] font-bold text-3xl mb-1">
//                 Round 2: Problem Submission
//               </h1>
//               <p className="text-muted-foreground">
//                 Pick a problem, read the statement and submit your idea.
//               </p>
//             </div>

//             <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/40 to-white/10 rounded-lg border border-gray-200 shadow-sm">
//               <Clock className="h-5 w-5 text-chart-3" />
//               <span
//                 className="font-mono text-lg font-bold text-chart-3"
//                 data-testid="text-timer"
//               >
//                 {timeRemaining}
//               </span>
//             </div>
//           </div>

//           {/* Single-column layout: Problem viewer on top, form below */}
//           <div className="grid grid-cols-1 gap-6">
//             {/* Problem Statement Card */}
//             <Card className="p-6 shadow-md border">
//               <div className="flex items-start justify-between gap-4">
//                 <div className="flex items-center gap-3">
//                   <FileText className="h-6 w-6 text-primary" />
//                   <div>
//                     <h3 className="font-[Poppins] font-semibold text-lg">
//                       {selectedProblem?.title}
//                     </h3>
//                     <p className="text-sm text-muted-foreground mt-1">
//                       Problem #{problemNumber}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="w-40">
//                   <Label className="text-sm mb-2">Problem Statement Number</Label>
//                   <Select value={problemNumber} onValueChange={setProblemNumber}>
//                     <SelectTrigger className="w-full">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="1">Problem 1</SelectItem>
//                       <SelectItem value="2">Problem 2</SelectItem>
//                       <SelectItem value="3">Problem 3</SelectItem>
//                       <SelectItem value="4">Problem 4</SelectItem>
//                       <SelectItem value="5">Problem 5</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               <div className="mt-4 space-y-4 text-sm">
//                 <p className="text-muted-foreground">{selectedProblem?.description}</p>

//                 {selectedProblem?.example && (
//                   <div>
//                     <h4 className="font-semibold mb-1">Example</h4>
//                     <pre className="bg-secondary/50 p-3 rounded-lg font-mono text-xs overflow-x-auto">
// {selectedProblem.example}
//                     </pre>
//                   </div>
//                 )}

//                 {selectedProblem?.constraints && (
//                   <div>
//                     <h4 className="font-semibold mb-1">Constraints</h4>
//                     <ul className="list-disc list-inside text-muted-foreground space-y-1">
//                       {selectedProblem.constraints.map((c, i) => (
//                         <li key={i}>{c}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             </Card>

//             {/* Submission Form Card */}
//             <Card className="p-6 shadow-md border">
//               <div className="flex items-center gap-3 mb-4">
//                 <h3 className="font-[Poppins] font-semibold text-lg">Your Submission</h3>
//                 <p className="text-sm text-muted-foreground">Explain your approach clearly.</p>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <Label className="text-sm">Brief about your solution</Label>
//                   <Input
//                     placeholder="One-line summary (max 150 chars)"
//                     value={brief}
//                     onChange={(e) => setBrief(e.target.value)}
//                     maxLength={150}
//                   />
//                   <p className="text-xs text-muted-foreground mt-1">
//                     Short summary — helpful for quick scoring.
//                   </p>
//                 </div>

//                 <div>
//                   <Label className="text-sm">Complete idea / design</Label>
//                   <Textarea
//                     placeholder="Explain your approach, data structures, algorithms, complexity, and edge-cases."
//                     value={completeIdea}
//                     onChange={(e) => setCompleteIdea(e.target.value)}
//                     className="min-h-[220px] font-mono text-sm"
//                   />
//                   <p className="text-xs text-muted-foreground mt-1">
//                     Be thorough — this is the main part the judges will read.
//                   </p>
//                 </div>

//                 <div>
//                   <Label className="text-sm">GitHub Link (optional)</Label>
//                   <Input
//                     placeholder="https://github.com/your-repo"
//                     value={githubLink}
//                     onChange={(e) => setGithubLink(e.target.value)}
//                   />
//                 </div>

//                 <div className="flex gap-2 pt-2">
//                   <Button
//                     className="flex-1"
//                     variant="outline"
//                     onClick={() => {
//                       toast({
//                         title: "Preview",
//                         description: "Preview logged to console. Check console to inspect submission.",
//                       });
//                       console.log({
//                         problemNumber,
//                         problemTitle: selectedProblem?.title,
//                         brief,
//                         completeIdea,
//                         githubLink,
//                       });
//                     }}
//                   >
//                     Preview
//                   </Button>

//                   <Button
//                     className="flex-1 bg-chart-3 text-white"
//                     onClick={handleSubmit}
//                   >
//                     <Send className="h-4 w-4 mr-2" />
//                     Submit Idea
//                   </Button>
//                 </div>
//               </div>
//             </Card>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { FileText, Send } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export default function Round2() {
  const { toast } = useToast();

  const [problemNumber, setProblemNumber] = useState("1");
  const [brief, setBrief] = useState("");
  const [completeIdea, setCompleteIdea] = useState("");
  const [githubLink, setGithubLink] = useState("");

  // Mock problem data
  const mockProblems = {
    "1": {
      title: "Design a Social Network",
      description:
        "Implement a SocialNetwork class supporting add_user, add_friend, get_mutual_friends, suggest_friends, and shortest_path between users. Optimize for up to 100k users.",
      example: `network = SocialNetwork()
network.add_user("Alice")
network.add_user("Bob")
network.add_friend("Alice", "Bob")`,
      constraints: [
        "1 ≤ number of users ≤ 100000",
        "User names are unique strings",
        "Friendship is bidirectional",
        "Prefer O(1)/O(log n) operations where possible",
      ],
    },
    "2": {
      title: "Real-time Leaderboard",
      description:
        "Design a leaderboard supporting millions of updates, fast top-K queries and realtime rank calculation.",
      example: `leaderboard.add_score("user1", 250)
leaderboard.top_k(10)`,
      constraints: ["Handle 1M+ updates", "Efficient top-K queries"],
    },
    "3": {
      title: "URL Shortener with Analytics",
      description:
        "Build a scalable URL shortener with tracking and stats APIs.",
      example: `shortener.create("https://google.com")`,
      constraints: ["1M URLs", "Low-latency redirects"],
    },
  };

  const [selectedProblem, setSelectedProblem] = useState(
    mockProblems[problemNumber]
  );

  useEffect(() => {
    setSelectedProblem(mockProblems[problemNumber]);
  }, [problemNumber]);

  const handleSubmit = () => {
    const payload = {
      problemNumber,
      problemTitle: selectedProblem.title,
      brief,
      completeIdea,
      githubLink,
    };

    console.log("Submission:", payload);

    toast({
      title: "Submitted!",
      description: "Your idea has been recorded successfully.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Title */}
          <div className="mb-8">
            <h1 className="font-[Poppins] font-bold text-3xl">
              Round 2: Problem Submission
            </h1>
            <p className="text-muted-foreground">
              Pick a problem, view details, and submit your idea.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* Problem Statement Block */}
            <Card className="p-8 shadow-md border">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <h3 className="font-[Poppins] text-2xl font-semibold">
                      {selectedProblem.title}
                    </h3>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Problem #{problemNumber}
                  </p>
                </div>

                {/* Problem Dropdown (More spacing added) */}
                <div className="w-48 ml-6">
                  <Label className="text-sm mb-2 block">
                    Problem Statement Number
                  </Label>

                  <div className="mt-2"> {/* Extra spacing added here */}
                    <Select
                      value={problemNumber}
                      onValueChange={setProblemNumber}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Problem" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Problem 1</SelectItem>
                        <SelectItem value="2">Problem 2</SelectItem>
                        <SelectItem value="3">Problem 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Problem Description */}
              <div className="mt-6 space-y-5 text-sm">
                <p className="text-muted-foreground">
                  {selectedProblem.description}
                </p>

                {/* Example */}
                {selectedProblem.example && (
                  <div>
                    <h4 className="font-semibold mb-1">Example</h4>
                    <pre className="bg-secondary/50 p-4 rounded-lg font-mono text-xs overflow-x-auto">
{selectedProblem.example}
                    </pre>
                  </div>
                )}

                {/* Constraints */}
                <div>
                  <h4 className="font-semibold mb-1">Constraints</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    {selectedProblem.constraints.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            {/* Submission Form */}
            <Card className="p-8 shadow-md border">
              <h3 className="font-[Poppins] text-xl font-semibold mb-4">
                Your Submission
              </h3>

              <div className="space-y-6">
                {/* Brief */}
                <div>
                  <Label className="text-sm">Brief about your solution</Label>
                  <Input
                    placeholder="One-line summary"
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                  />
                </div>

                {/* Complete Idea */}
                <div>
                  <Label className="text-sm">Complete idea / explanation</Label>
                  <Textarea
                    className="min-h-[220px] font-mono text-sm"
                    placeholder="Write full explanation here..."
                    value={completeIdea}
                    onChange={(e) => setCompleteIdea(e.target.value)}
                  />
                </div>

                {/* GitHub Link */}
                <div>
                  <Label className="text-sm">GitHub Link (optional)</Label>
                  <Input
                    placeholder="https://github.com/your-repo"
                    value={githubLink}
                    onChange={(e) => setGithubLink(e.target.value)}
                  />
                </div>

                {/* Submit */}
                <Button
                  className="w-full bg-chart-3 text-white hover:bg-chart-3/90"
                  onClick={handleSubmit}
                >
                  <Send className="h-4 w-4 mr-2" /> Submit Idea
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
