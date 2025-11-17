import { useState } from "react";
import Navbar from "../components/navigationbars/NavbarDesktop";
import Footer from "../components/footer/FooterDesktop";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Plus, Trash2, IndianRupee, Loader2 } from "lucide-react"; // Import Loader2
import { useToast } from "../hooks/use-toast";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Register() {
  const { toast } = useToast();
  const navigate = useNavigate(); // Instantiate navigate
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([
    { id: 1, name: "", email: "", college: "", phone: "", aadhar: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state

  const addMember = () => {
    if (members.length < 3) {
      setMembers([
        ...members,
        {
          id: Date.now(),
          name: "",
          email: "",
          college: "",
          phone: "",
          aadhar: "",
        },
      ]);
    }
  };

  const removeMember = (id) => {
    if (members.length > 1) {
      setMembers(members.filter((m) => m.id !== id));
    }
  };

  const updateMember = (id, field, value) => {
    setMembers(
      members.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading true

    try {
      // ✅ 1. Get current logged-in user (leader)
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        toast({ title: "Please sign in first", variant: "destructive" });
        setIsLoading(false); // Set loading false
        return;
      }

      // ✅ 2. Check if team name already exists
      const { data: existingTeam, error: teamCheckErr } = await supabase
        .from("teams")
        .select("team_name")
        .eq("team_name", teamName)
        .maybeSingle();

      if (teamCheckErr) throw teamCheckErr;
      if (existingTeam) {
        toast({
          title: "Team name already exists",
          description: "Please choose a different name.",
          variant: "destructive",
        });
        setIsLoading(false); // Set loading false
        return;
      }

      // ✅ 3. Fetch all users from Supabase `users` table to get their IDs
      const { data: users, error: usersErr } = await supabase
        .from("users")
        .select("user_id, email");

      if (usersErr) throw usersErr;

      // Map entered member emails to existing user IDs
      const memberRecords = members.map((m) => {
        const found = users.find((u) => u.email === m.email);
        if (!found) {
          throw new Error(`User with email ${m.email} is not registered.`);
        }
        return {
          user_id: found.user_id,
          college: m.college,
          aadhar: m.aadhar,
          role: m.email === user.email ? "leader" : "user",
        };
      });

      // ✅ 4. Insert new team record
      const { data: teamData, error: insertTeamErr } = await supabase
        .from("teams")
        .insert([{ team_name: teamName }])
        .select("team_id")
        .single();

      if (insertTeamErr) throw insertTeamErr;
      const team_id = teamData.team_id;

      // ✅ 5. Insert team members
      const { error: teamMembersErr } = await supabase
        .from("team_members")
        .insert(
          memberRecords.map((m) => ({
            team_id,
            user_id: m.user_id,
            college: m.college,
            aadhar: m.aadhar,
            role: m.role,
          }))
        );

      if (teamMembersErr) throw teamMembersErr;

      // ✅ 6. Success toast
      // toast({
      //   title: "Team Registered Successfully!",
      //   description: "Your team has been registered. Proceeding to payment.",
      // });

      // ✅ 7. Navigate to payment page
      navigate("/payment");
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false); // Set loading false on error
    }
    // We don't set loading to false in the 'finally' block
    // because navigation will unmount the component anyway.
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* <Navbar /> */}
      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-[Poppins] font-bold text-4xl text-gray-800 mb-4">
              Team Registration
            </h1>
            <p className="text-gray-500 text-lg">
              Register your team for Hackathon 2026
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Team Details */}
            <Card className="p-6 rounded-xl shadow-md bg-white border border-gray-200">
              <h2 className="font-[Poppins] font-semibold text-2xl text-orange-500 mb-6">
                Team Details
              </h2>
              <div>
                <Label htmlFor="teamName">Team Name</Label>
                <Input
                  id="teamName"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter your team name"
                  className="mt-2"
                  required
                />
              </div>
            </Card>

            {/* Team Members */}
            <Card className="p-6 rounded-xl shadow-md bg-white border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-[Poppins] font-semibold text-2xl text-orange-500">
                  Team Members
                </h2>
                {members.length < 3 && (
                  <Button
                    type="button"
                    onClick={addMember}
                    variant="outline"
                    size="sm"
                    className="gap-2 border-orange-500 text-orange-500 hover:bg-orange-50"
                  >
                    <Plus className="h-4 w-4" /> Add Member
                  </Button>
                )}
              </div>

              <div className="space-y-6">
                {members.map((member, index) => (
                  <div
                    key={member.id}
                    className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold text-gray-700">
                        Member {index + 1}
                      </h3>
                      {members.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeMember(member.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`name-${member.id}`}>Full Name</Label>
                        <Input
                          id={`name-${member.id}`}
                          value={member.name}
                          onChange={(e) =>
                            updateMember(member.id, "name", e.target.value)
                          }
                          placeholder="John Doe"
                          className="mt-2"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor={`email-${member.id}`}>Email</Label>
                        <Input
                          id={`email-${member.id}`}
                          type="email"
                          value={member.email}
                          onChange={(e) =>
                            updateMember(member.id, "email", e.target.value)
                          }
                          placeholder="john@example.com"
                          className="mt-2"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor={`college-${member.id}`}>
                          College/University
                        </Label>
                        <Input
                          id={`college-${member.id}`}
                          value={member.college}
                          onChange={(e) =>
                            updateMember(member.id, "college", e.target.value)
                          }
                          placeholder="NIT Silchar"
                          className="mt-2"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor={`phone-${member.id}`}>
                          Phone Number
                        </Label>
                        <Input
                          id={`phone-${member.id}`}
                          type="tel"
                          value={member.phone}
                          onChange={(e) =>
                            updateMember(member.id, "phone", e.target.value)
                          }
                          placeholder="+91 9876543210"
                          className="mt-2"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor={`aadhar-${member.id}`}>
                          Aadhar Number
                        </Label>
                        <Input
                          id={`aadhar-${member.id}`}
                          type="text"
                          pattern="\d{12}"
                          maxLength={12}
                          value={member.aadhar}
                          onChange={(e) =>
                            updateMember(member.id, "aadhar", e.target.value)
                          }
                          placeholder="Enter 12-digit Aadhar number"
                          className="mt-2"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Payment Summary */}
            <Card className="p-6 rounded-xl shadow-md bg-white border border-gray-200">
              <h2 className="font-[Poppins] font-semibold text-2xl text-orange-500 mb-6">
                Payment Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">
                    Registration Fee per Team
                  </span>
                  <span className="font-semibold flex items-center gap-1">
                    <IndianRupee className="h-4 w-4" /> 2,000
                  </span>
                </div>
                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="font-[Poppins] font-semibold text-lg">
                    Total Amount
                  </span>
                  <span className="font-[Poppins] font-bold text-2xl text-orange-500 flex items-center gap-1">
                    <IndianRupee className="h-5 w-5" /> 2,000
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Payment gateway will be available after form submission
              </p>
            </Card>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg rounded-xl shadow-md"
              // onClick={() => navigate("/payment")}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : null}
              {isLoading ? "Processing..." : "Proceed to Payment"}
            </Button>
          </form>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
