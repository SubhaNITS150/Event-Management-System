
import Navbar from "../components/navigationbars/NavbarDesktop";
import Footer from "../components/footer/FooterDesktop";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { CheckCircle2, Clock, Trophy, Users, FileText, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "../components/ui/progress";

export default function ParticipantDashboard() {
  //todo: remove mock functionality
  const teamData = {
    name: "Code Warriors",
    id: "HK2026-001",
    members: ["John Doe", "Jane Smith", "Bob Johnson"],
    registrationStatus: "confirmed",
    qualified: ["Round 1"],
  };

  const upcomingTasks = [
    { title: "Round 2: Problem Solving", date: "Mar 16, 2026", time: "10:00 AM", status: "upcoming" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
     {/* <Navbar /> */}
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-8">
            <h1 className="font-poppins font-extrabold text-5xl tracking-tight text-gray-900 mb-2">Participant Dashboard</h1>
            <p className="text-muted-foreground text-lg">Welcome back! Here's your team status</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left big card */}
            <Card className="p-6 lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                <div>
                  <h2 className="font-poppins font-semibold text-2xl text-gray-900 mb-1" data-testid="text-team-name">
                    {teamData.name}
                  </h2>
                  <p className="text-muted-foreground font-mono text-sm" data-testid="text-team-id">
                    Team ID: {teamData.id}
                  </p>
                </div>

                <div className="flex items-center">
                  <Badge className="inline-flex items-center gap-2 bg-emerald-500 text-white rounded-full px-3 py-1 text-sm shadow-sm" data-testid="badge-status">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="capitalize">{teamData.registrationStatus}</span>
                  </Badge>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-3 text-gray-800">
                    <Users className="h-5 w-5 text-gray-700" />
                    Team Members
                  </h3>
                  <div className="space-y-3">
                    {teamData.members.map((member, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg shadow-inner"
                        data-testid={`member-${index}`}
                      >
                        <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-semibold">
                          {member.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span className="text-gray-800">{member}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2 text-gray-800">
                    <Trophy className="h-5 w-5 text-orange-500" />
                    Qualification Status
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border-l-4 border-emerald-400">
                      <span className="text-gray-800">Round 1</span>
                      <Badge className="bg-emerald-500 text-white rounded-full px-3 py-1 text-sm">Qualified</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                      <span className="text-gray-800">Round 2</span>
                      <Badge variant="secondary" className="bg-gray-300 text-gray-700 rounded-full px-3 py-1 text-sm">Pending</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Right column small cards */}
            <div className="space-y-6">
              <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-poppins font-semibold text-xl mb-4 flex items-center gap-3 text-gray-800">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Upcoming Tasks
                </h3>
                <div className="space-y-3">
                  {upcomingTasks.map((task, index) => (
                    <div key={index} className="p-3 bg-gray-100 rounded-lg" data-testid={`task-${index}`}>
                      <p className="font-medium mb-1 text-gray-800">{task.title}</p>
                      <p className="text-sm text-muted-foreground">{task.date}</p>
                      <p className="text-sm text-muted-foreground">{task.time}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-poppins font-semibold text-xl mb-4 text-gray-800">Quick Actions</h3>
                <div className="space-y-3">
                  <Link to="/leaderboard">
                    <Button variant="outline" className="w-full justify-start gap-3 py-3 border rounded-lg bg-white hover:bg-gray-50 text-left" data-testid="button-leaderboard">
                      <Trophy className="h-4 w-4 text-gray-600" />
                      View Leaderboard
                    </Button>
                  </Link>
                  <Link to="/certificates">
                    <Button variant="outline" className="w-full justify-start gap-3 py-3 border rounded-lg bg-white hover:bg-gray-50 text-left" data-testid="button-certificates">
                      <Award className="h-4 w-4 text-gray-600" />
                      Certificates
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" className="w-full justify-start gap-3 py-3 border rounded-lg bg-white hover:bg-gray-50 text-left" data-testid="button-help">
                      <FileText className="h-4 w-4 text-gray-600" />
                      Help & Support
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>

          {/* Progress Card */}
          <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-poppins font-semibold text-xl mb-4 text-gray-800">Progress Overview</h3>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-800">Overall Progress</span>
                  <span className="text-sm text-muted-foreground">50%</span>
                </div>
                {/* progress wrapper */}
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  {/* Using your Progress component; className used to style height and curve */}
                  <Progress value={50} className="h-3 rounded-full" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="p-4 bg-gray-100 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Round 1 Score</p>
                  <p className="text-2xl font-bold text-emerald-500">85/100</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Current Rank</p>
                  <p className="text-2xl font-bold text-blue-600">#42</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Rounds Qualified</p>
                  <p className="text-2xl font-bold text-orange-500">1/2</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
