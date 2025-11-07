import Navbar from "../components/navigationbars/NavbarDesktop";
import Footer from "../components/footer/FooterDesktop";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  CheckCircle2,
  Clock,
  Trophy,
  Users,
  FileText,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "../components/ui/progress";
import { supabase } from "../lib/supabaseClient";
import { useState } from "react";

export default function ParticipantDashboard() {
  const [userName, setUserName] = useState("");
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserAndTeam = async () => {
    setLoading(true);
    try {
      // 1️⃣ Get logged-in user
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) throw error;
      if (!user) {
        console.warn("User not logged in");
        setLoading(false);
        return;
      }

      // 2️⃣ Get user profile (name)
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("name")
        .eq("user_id", user.id)
        .single();

      if (profileError) throw profileError;
      setUserName(profile.name);

      // 3️⃣ Find which team this user belongs to
      const { data: teamMemberRecord, error: memberErr } = await supabase
        .from("team_members")
        .select("team_id, role")
        .eq("user_id", user.id)
        .maybeSingle();

      if (memberErr) throw memberErr;
      if (!teamMemberRecord) {
        setTeamData(null);
        console.log("User not part of any team yet");
        setLoading(false);
        return;
      }

      const team_id = teamMemberRecord.team_id;

      // 4️⃣ Fetch the team details
      const { data: team, error: teamErr } = await supabase
        .from("teams")
        .select("team_id, team_name, registration_date")
        .eq("team_id", team_id)
        .single();

      if (teamErr) throw teamErr;

      // 5️⃣ Fetch all members of the team
      const { data: members, error: membersErr } = await supabase
        .from("team_members")
        .select("user_id, role, college, aadhar, users(name, email)")
        .eq("team_id", team_id);

      if (membersErr) throw membersErr;

      // Combine all into final object
      const formattedTeam = {
        id: team.team_id,
        name: team.team_name,
        registrationDate: team.registration_date,
        members: members.map((m) => ({
          name: m.users?.name,
          email: m.users?.email,
          role: m.role,
        })),
      };

      setTeamData(formattedTeam);
    } catch (err) {
      console.error("Error fetching team:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🚀 Trigger data load (once, without useEffect)
  if (!userName && !loading) fetchUserAndTeam();

  //todo: remove mock functionality
  // const teamData = {
  //   name: "Code Warriors",
  //   id: "HK2026-001",
  //   members: ["John Doe", "Jane Smith", "Bob Johnson"],
  //   registrationStatus: "confirmed",
  //   qualified: ["Round 1"],
  // };

  // const upcomingTasks = [
  //   {
  //     title: "Round 2: Problem Solving",
  //     date: "Mar 16, 2026",
  //     time: "10:00 AM",
  //     status: "upcoming",
  //   },
  // ];

  // Backend data
  const fetchUser = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      console.error(error);
      return;
    }

    if (user) {
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("name")
        .eq("user_id", user.id)
        .single();

      if (profileError) console.error(profileError);
      else setUserName(profile?.name || "");
    }
  };

  if (!userName) {
    // Call it once when not loaded
    fetchUser();
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* <Navbar /> */}
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-8">
            <h1 className="font-poppins font-extrabold text-5xl tracking-tight text-gray-900 mb-2">
              {userName ? `Welcome, ${userName}` : "Participant Dashboard"}
            </h1>
            <p className="text-muted-foreground text-lg">
              Welcome back! Here's your team status
            </p>
          </div>

          {loading ? (
            <div className="text-center text-gray-500 text-lg py-10">
              Loading your team details...
            </div>
          ) : teamData ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Left big card */}
              <Card className="p-6 lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                  <div>
                    <h2 className="font-poppins font-semibold text-2xl text-gray-900 mb-1">
                      {teamData.name}
                    </h2>
                    <p className="text-muted-foreground font-mono text-sm">
                      Team ID: {teamData.id}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <Badge className="inline-flex items-center gap-2 bg-emerald-500 text-white rounded-full px-3 py-1 text-sm shadow-sm">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Registered</span>
                    </Badge>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-3 text-gray-800">
                      <Users className="h-5 w-5 text-gray-700" />
                      Team Members
                    </h3>

                    {teamData.members?.length > 0 ? (
                      <div className="space-y-3">
                        {teamData.members.map((member, i) => {
                          const initials = member.name
                            ? member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                            : "NA";
                          return (
                            <div
                              key={i}
                              className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg shadow-inner"
                            >
                              <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-semibold">
                                {initials}
                              </div>
                              <div>
                                <p className="text-gray-800 font-medium">
                                  {member.name || "Unknown"}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {member.email || "No email linked"}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">
                        No members found for this team.
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <div className="text-center text-gray-500 text-lg py-10">
              You haven’t joined or created a team yet.
            </div>
          )}

          {/* Progress Card */}
          <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-poppins font-semibold text-xl mb-4 text-gray-800">
              Progress Overview
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-800">
                    Overall Progress
                  </span>
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
                  <p className="text-sm text-muted-foreground mb-1">
                    Round 1 Score
                  </p>
                  <p className="text-2xl font-bold text-emerald-500">85/100</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">
                    Current Rank
                  </p>
                  <p className="text-2xl font-bold text-blue-600">#42</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">
                    Rounds Qualified
                  </p>
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
