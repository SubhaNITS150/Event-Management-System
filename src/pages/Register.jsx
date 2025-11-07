
import { useState } from "react";
import Navbar from "../components/navigationbars/NavbarDesktop";
import Footer from "../components/footer/FooterDesktop";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Plus, Trash2, IndianRupee } from "lucide-react";
import { useToast } from "../hooks/use-toast";

export default function Register() {
  const { toast } = useToast();
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([
    { id: 1, name: "", email: "", college: "", phone: "", aadhar: "" },
  ]);

  const addMember = () => {
    if (members.length < 3) {
      setMembers([
        ...members,
        { id: Date.now(), name: "", email: "", college: "", phone: "", aadhar: "" },
      ]);
    }
  };

  const removeMember = (id) => {
    if (members.length > 1) {
      setMembers(members.filter((m) => m.id !== id));
    }
  };

  const updateMember = (id, field, value) => {
    setMembers(members.map((m) => (m.id === id ? { ...m, [field]: value } : m)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration submitted", { teamName, members });
    toast({
      title: "Registration Submitted!",
      description:
        "Your team has been registered successfully. Check your email for confirmation.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
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
            >
              Proceed to Payment
            </Button>
          </form>
        </div>
      </main>
     
    </div>
  );
}
