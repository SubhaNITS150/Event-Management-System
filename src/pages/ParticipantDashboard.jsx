import Navbar from "../components/navigationbars/NavbarDesktop";
import Footer from "../components/footer/FooterDesktop";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { CheckCircle2, Users } from "lucide-react";
import { Progress } from "../components/ui/progress";
import { supabase } from "../lib/supabaseClient";
import { useState, useEffect } from "react";

// ✅ 1. Define cache settings
const CACHE_KEY = "participantDashboardCache";
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

export default function ParticipantDashboard() {
  const [userName, setUserName] = useState("");
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This is the main fetch function, moved inside useEffect
    const fetchUserAndTeam = async () => {
      let fetchedUserName = ""; // Use local vars to ensure cache is set correctly
      let fetchedTeamData = null;

      try {
        // 1️⃣ Get logged-in user
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) throw error;
        if (!user) {
          console.warn("User not logged in");
          return;
        }

        // 2️⃣ Get user profile (name)
        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select("name")
          .eq("user_id", user.id)
          .single();

        if (profileError) throw profileError;
        
        fetchedUserName = profile.name;
        setUserName(fetchedUserName); // Set state for UI

        // 3️⃣ Find which team this user belongs to
        const { data: teamMemberRecord, error: memberErr } = await supabase
          .from("team_members")
          .select("team_id, role")
          .eq("user_id", user.id)
          .limit(1)
          .single();

        if (memberErr) throw memberErr;
        
        if (!teamMemberRecord) {
          // User not part of a team
          console.log("User not part of any team yet");
          setTeamData(null);
          fetchedTeamData = null;
        } else {
          // User IS part of a team, fetch details
          const team_id = teamMemberRecord.team_id;

          // 4️⃣ Fetch the team details
          const { data: teamRows, error: teamErr } = await supabase
            .from("teams")
            .select("team_id, team_name, registration_date")
            .eq("team_id", team_id)
            .limit(1);

          if (teamErr) throw teamErr;
          if (!teamRows || teamRows.length === 0) {
            console.warn("No team found for this team_id");
            return;
          }
          const team = teamRows[0];

          // 5️⃣ Fetch all members of the team
          const { data: members, error: membersErr } = await supabase
            .from("team_members")
            .select("user_id, role") // Note: Removed college/aadhar for cache privacy
            .eq("team_id", team_id);
          if (membersErr) throw membersErr;

          const userIds = members.map((m) => m.user_id);
          const { data: userProfiles, error: userErr } = await supabase
            .from("users")
            .select("user_id, name, email")
            .in("user_id", userIds);
          if (userErr) throw userErr;

          const formattedMembers = members.map((m) => {
            const userProfile = userProfiles.find((u) => u.user_id === m.user_id);
            return {
              name: userProfile?.name || "Unknown",
              email: userProfile?.email || "No email",
              role: m.role,
            };
          });

          const formattedTeam = {
            id: team.team_id,
            name: team.team_name,
            registrationDate: team.registration_date,
            members: formattedMembers,
          };

          fetchedTeamData = formattedTeam;
          setTeamData(fetchedTeamData); // Set state for UI
        }

        // ✅ 6. Cache the new data
        const cacheData = {
          userName: fetchedUserName,
          teamData: fetchedTeamData,
          timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        
      } catch (err) {
        console.error("Error fetching team:", err);
        // If fetch fails, clear the cache to force a re-fetch next time
        localStorage.removeItem(CACHE_KEY);
      } finally {
        setLoading(false);
      }
    };

    // --- Caching Logic ---
    const cachedDataJSON = localStorage.getItem(CACHE_KEY);
    if (cachedDataJSON) {
      const cachedData = JSON.parse(cachedDataJSON);
      const isStale = (Date.now() - cachedData.timestamp) > CACHE_DURATION_MS;

      if (!isStale) {
        // ✅ Cache is fresh! Use it and skip the fetch.
        console.log("Loading dashboard from cache.");
        setUserName(cachedData.userName);
        setTeamData(cachedData.teamData);
        setLoading(false);
        return; // Stop here
      } else {
        // Cache is stale, will proceed to fetch
        console.log("Cache is stale, fetching new data.");
      }
    }

    // --- Initial Fetch ---
    // Will run if no cache or if cache is stale
    fetchUserAndTeam();
    
  }, []); // This effect runs only once on mount

  // The rest of your JSX remains exactly the same
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
                  <span className="text-sm font-medium text-gray-80s0">
                    Overall Progress
                  </span>
                  <span className="text-sm text-muted-foreground">50%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
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