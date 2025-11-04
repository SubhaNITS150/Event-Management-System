import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Trophy, Medal, Award, Search } from "lucide-react";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export default function Leaderboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRound, setFilterRound] = useState("all");

  // TODO: remove mock functionality
  const leaderboardData = [
    { rank: 1, teamId: "HK2026-002", teamName: "Tech Titans", round1: 92, round2: 88, total: 180 },
    { rank: 2, teamId: "HK2026-015", teamName: "Code Masters", round1: 90, round2: 85, total: 175 },
    { rank: 3, teamId: "HK2026-007", teamName: "Algo Wizards", round1: 88, round2: 86, total: 174 },
    { rank: 4, teamId: "HK2026-001", teamName: "Code Warriors", round1: 85, round2: 82, total: 167 },
    { rank: 5, teamId: "HK2026-023", teamName: "Binary Beasts", round1: 84, round2: 80, total: 164 },
    { rank: 6, teamId: "HK2026-011", teamName: "Stack Overflow", round1: 82, round2: 78, total: 160 },
    { rank: 7, teamId: "HK2026-018", teamName: "Recursion Rangers", round1: 80, round2: 79, total: 159 },
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return null;
    }
  };

  const getRankBadge = (rank) => {
    if (rank <= 3) {
      const colors = ["bg-yellow-500", "bg-gray-400", "bg-amber-600"];
      return <Badge className={`${colors[rank - 1]} text-white`}>#{rank}</Badge>;
    }
    return <Badge variant="secondary">#{rank}</Badge>;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-[Poppins] font-bold text-4xl mb-4">Leaderboard</h1>
            <p className="text-muted-foreground text-lg">Top performing teams in Hackathon 2026</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {leaderboardData.slice(0, 3).map((team, index) => (
              <Card
                key={team.teamId}
                className={`p-6 ${index === 0 ? "ring-2 ring-yellow-500" : ""}`}
                data-testid={`podium-${index + 1}`}
              >
                <div className="text-center">
                  <div className="flex justify-center mb-3">{getRankIcon(team.rank)}</div>
                  <div className="mb-3">{getRankBadge(team.rank)}</div>
                  <h3 className="font-[Poppins] font-semibold text-xl mb-1">{team.teamName}</h3>
                  <p className="text-sm text-muted-foreground font-mono mb-4">{team.teamId}</p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-2xl font-bold text-chart-2">{team.round1}</p>
                      <p className="text-xs text-muted-foreground">Round 1</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-chart-3">{team.round2}</p>
                      <p className="text-xs text-muted-foreground">Round 2</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-chart-4">{team.total}</p>
                      <p className="text-xs text-muted-foreground">Total</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6">
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by team name or ID..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  data-testid="input-search"
                />
              </div>
              <Select value={filterRound} onValueChange={setFilterRound}>
                <SelectTrigger className="w-40" data-testid="select-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rounds</SelectItem>
                  <SelectItem value="round1">Round 1</SelectItem>
                  <SelectItem value="round2">Round 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="pb-3 font-semibold">Rank</th>
                    <th className="pb-3 font-semibold">Team ID</th>
                    <th className="pb-3 font-semibold">Team Name</th>
                    <th className="pb-3 font-semibold text-center">Round 1</th>
                    <th className="pb-3 font-semibold text-center">Round 2</th>
                    <th className="pb-3 font-semibold text-center">Total</th>
                  </tr>
                </thead>
               
                <tbody>
  {leaderboardData
    .filter((team) => {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        team.teamName.toLowerCase().includes(search) ||
        team.teamId.toLowerCase().includes(search);

      if (filterRound === "round1") return matchesSearch && team.round1;
      if (filterRound === "round2") return matchesSearch && team.round2;
      return matchesSearch; // "all"
    })
    .map((team, index) => (
      <tr
        key={team.teamId}
        className={`border-b hover-elevate ${team.rank <= 3 ? "bg-secondary/30" : ""}`}
        data-testid={`team-row-${index}`}
      >
        <td className="py-4">
          <div className="flex items-center gap-2">
            {getRankIcon(team.rank)}
            {getRankBadge(team.rank)}
          </div>
        </td>
        <td className="py-4 font-mono text-sm">{team.teamId}</td>
        <td className="py-4 font-medium">{team.teamName}</td>
        <td className="py-4 text-center">{team.round1}</td>
        <td className="py-4 text-center">{team.round2}</td>
        <td className="py-4 text-center font-bold">{team.total}</td>
      </tr>
    ))}
</tbody>

              </table>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
