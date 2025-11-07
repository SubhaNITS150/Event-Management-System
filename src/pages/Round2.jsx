import { useState } from "react";

import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Clock, Send, FileText } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export default function Round2() {
  const { toast } = useToast();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [timeRemaining] = useState("01:45:30");

  const handleSubmit = () => {
    console.log("Submitted code:", code, "Language:", language);
    toast({
      title: "Round 2 Submitted!",
      description:
        "Your solution has been submitted successfully. Results will be announced soon.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
     
      <main className="flex-1 py-8 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <div>
              <h1 className="font-[Poppins] font-bold text-3xl mb-1">
                Round 2: Problem Solving
              </h1>
              <p className="text-muted-foreground">Advanced Coding Challenge</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-chart-3/10 rounded-lg border border-chart-3">
              <Clock className="h-5 w-5 text-chart-3" />
              <span
                className="font-mono text-lg font-bold text-chart-3"
                data-testid="text-timer"
              >
                {timeRemaining}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2">
              <Card className="p-6 sticky top-20">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-primary" />
                  <h3 className="font-[Poppins] font-semibold text-xl">
                    Problem Statement
                  </h3>
                </div>

                <div className="space-y-4 text-sm max-h-[calc(100vh-250px)] overflow-y-auto">
                  <div>
                    <h4 className="font-semibold mb-2">Design a Social Network</h4>
                    <p className="text-muted-foreground">
                      You are tasked with designing a simplified social network
                      system. Implement a class that supports the following
                      operations:
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Add a user to the network</li>
                      <li>Create a friendship connection between two users</li>
                      <li>Find mutual friends between two users</li>
                      <li>Suggest friends based on mutual connections</li>
                      <li>Find the shortest connection path between two users</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Example Usage:</h4>
                    <pre className="bg-secondary/50 p-3 rounded-lg font-mono text-xs overflow-x-auto">
{`network = SocialNetwork()
network.add_user("Alice")
network.add_user("Bob")
network.add_friend("Alice", "Bob")
network.get_mutual_friends("Alice", "Bob")
// Returns: []

network.add_user("Charlie")
network.add_friend("Alice", "Charlie")
network.suggest_friends("Bob")
// Returns: ["Charlie"]`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Constraints:</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>1 ≤ number of users ≤ 10⁵</li>
                      <li>User names are unique strings</li>
                      <li>Friendship is bidirectional</li>
                      <li>Optimize for time complexity</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Scoring:</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Correctness: 40%</li>
                      <li>Time Complexity: 30%</li>
                      <li>Code Quality: 20%</li>
                      <li>Edge Cases: 10%</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Card className="p-6">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                  <h3 className="font-[Poppins] font-semibold text-xl">Code Editor</h3>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger
                      className="w-40"
                      data-testid="select-language"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={`# Write your ${language} code here...\n\nclass SocialNetwork:\n    def __init__(self):\n        pass\n    \n    def add_user(self, user):\n        pass\n    \n    def add_friend(self, user1, user2):\n        pass`}
                  className="font-mono text-sm min-h-[500px]"
                  data-testid="textarea-code"
                />

                <div className="flex flex-wrap gap-2 mt-4">
                  <Button
                    variant="outline"
                    className="gap-2"
                    data-testid="button-run"
                  >
                    Run Code
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2"
                    data-testid="button-test"
                  >
                    Test Cases
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2"
                    data-testid="button-debug"
                  >
                    Debug
                  </Button>
                  <Button
                    className="ml-auto bg-chart-3 hover:bg-chart-3 text-white border-chart-3 gap-2"
                    onClick={handleSubmit}
                    data-testid="button-submit-round2"
                  >
                    <Send className="h-4 w-4" />
                    Submit Solution
                  </Button>
                </div>

                <Card className="mt-4 p-4 bg-secondary/50">
                  <h4 className="font-semibold text-sm mb-2">Test Results</h4>
                  <p className="text-sm text-muted-foreground">
                    Run your code to see test results here...
                  </p>
                </Card>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
}
