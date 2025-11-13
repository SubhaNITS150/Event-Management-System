import { useState, useEffect } from "react";
import Navbar from "../components/navigationbars/NavbarDesktop";
import Footer from "../components/footer/FooterDesktop";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
// 👇 Import new icons for the dialog
import {
  Users,
  FileText,
  Award,
  Upload,
  Search,
  Download,
  Trophy,
  TrendingUp,
  ClipboardList,
  Check,
} from "lucide-react";
import StatCard from "../components/StatCard";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription, // 👈 Add DialogDescription
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";
import { supabase } from "../lib/supabaseClient";

export default function AdminDashboard() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [teamCount, setTeamCount] = useState(0);
  const [teams, setTeams] = useState([]); // 👈 State for the list of teams
  const [isLoading, setIsLoading] = useState(true); // 👈 Loading state

  // 👇 State for the modal
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    round1: "",
    round2: "",
    status: "",
  });

  // 👇 This useEffect now fetches both count AND team data
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // 1. Fetch Team Count
        const { count, error: countError } = await supabase
          .from("teams")
          .select("*", { count: "exact", head: true });

        if (countError) throw countError;
        if (count !== null) setTeamCount(count);

        // 2. Fetch All Team Data
        const { data: teamsData, error: teamsError } = await supabase
          .from("teams")
          .select("*")
          .order("team_id", { ascending: true });

        if (teamsError) throw teamsError;
        if (teamsData) setTeams(teamsData);

        // console.log(teamsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Could not fetch dashboard data.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [toast]); // Re-run if toast (from hook) changes

  // Stats array now uses the teamCount state
  const stats = [
    {
      icon: Users,
      value: teamCount.toString(),
      label: "Registered Teams",
      color: "text-chart-2",
      testId: "stat-teams",
    },
    // ... other stats
    {
      icon: FileText,
      value: "12", // (This is still mock data)
      label: "Active Questions",
      color: "text-chart-3",
      testId: "stat-questions",
    },
    {
      icon: Award,
      value: "89", // (This is still mock data)
      label: "Certificates Generated",
      color: "text-chart-4",
      testId: "stat-certificates",
    },
  ];

  // 👇 Handler to open the modal and set the selected team
  const handleTeamClick = (team) => {
    setSelectedTeam(team);
    setFormData({
      round1: team.round1 ?? "",
      round2: team.round2 ?? "",
      status: team.status,
    });
    setIsModalOpen(true);
  };

  // 👇 Handler for form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 👇 Handler for the Select component
  const handleStatusChange = (value) => {
    setFormData((prev) => ({ ...prev, status: value }));
  };

  // 👇 Handler for saving the form
  const handleFormSubmit = async () => {
    if (!selectedTeam) return;

    // Prepare data for Supabase (convert empty strings to null, numbers to int)
    const updateData = {
      round1: formData.round1 === "" ? null : parseInt(formData.round1, 10),
      round2: formData.round2 === "" ? null : parseInt(formData.round2, 10),
      status: formData.status,
    };

    try {
      const { data, error } = await supabase
        .from("teams")
        .update(updateData)
        .eq("team_id", selectedTeam.team_id) // 👈 🛑 FIX: Use team_id
        .select() // Return the updated row
        .single(); // Expect only one row

      if (error) throw error;

      // Update the local state to reflect the change immediately
      setTeams((prevTeams) =>
        prevTeams.map((team) =>
          team.team_id === selectedTeam.team_id ? data : team // 👈 🛑 FIX: Use team_id
        )
      );

      toast({
        title: "Success",
        description: `${selectedTeam.team_name} has been updated.`, // 👈 🛑 FIX: Use team_name
      });
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error updating team:", error);
      toast({
        title: "Error",
        description: "Could not update team.",
        variant: "destructive",
      });
    }
  };

  const handleUploadQuestion = () => {
    // ... (existing function)
  };
  const navigate = useNavigate();
  const handleGenerateCertificates = () => {
    // ... (existing function)
  };
  const handleExportPDF = () => {
    // ... (existing function)
  };

  // 👇 Filtered teams for search and PDF export
  const filteredTeams = teams.filter((team) => {
    const name = team.team_name?.toLowerCase() || ""; // 👈 🛑 FIX: Use team_name
    const id = team.team_id?.toString().toLowerCase() || "";
    const status = team.status?.toLowerCase() || "";

    return (
      name.includes(searchTerm.toLowerCase()) ||
      id.includes(searchTerm.toLowerCase()) ||
      status.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ... (Existing Header and Stats Section) ... */}

          <div className="mb-8">
            <h1 className="font-[Poppins] font-bold text-4xl mb-2 text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-500">
              Manage teams, questions, and evaluations
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label} // 👈 Use label for key
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex items-center justify-between"
              >
                <div>
                  <p className="text-4xl font-bold text-blue-600 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <stat.icon className="h-6 w-6 text-gray-500" />
                </div>
              </div>
            ))}
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="teams" className="w-full">
            <TabsList className="border-b w-full flex">
              <TabsTrigger
                value="teams"
                className="px-4 py-2 font-medium text-gray-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
              >
                Teams
              </TabsTrigger>
              <TabsTrigger
                value="questions"
                className="px-4 py-2 font-medium text-gray-500 hover:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
              >
                Questions
              </TabsTrigger>
              <TabsTrigger
                value="certificates"
                className="px-4 py-2 font-medium text-gray-500 hover:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
              >
                Certificates
              </TabsTrigger>
            </TabsList>

            {/* Teams Tab Content */}
            <TabsContent value="teams" className="mt-6">
              {/* This is where the table now lives */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                  <h2 className="font-[Poppins] font-semibold text-2xl">
                    Registered Teams
                  </h2>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search teams..."
                        className="pl-9 pr-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <button
                      onClick={handleExportPDF}
                      className="flex items-center gap-2 border rounded-md px-3 py-2 text-sm hover:bg-gray-100 transition"
                    >
                      <Download className="h-4 w-4" />
                      Export
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b text-gray-700">
                        <th className="pb-3 font-semibold">Team ID</th>
                        <th className="pb-3 font-semibold">Team Name</th>
                        {/* <th className="pb-3 font-semibold">Members</th> */}
                        <th className="pb-3 font-semibold">Round 1</th>
                        <th className="pb-3 font-semibold">Round 2</th>
                        <th className="pb-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* 👇 We now map over the filtered list from state */}
                      {isLoading ? (
                        <tr>
                          <td colSpan="6" className="text-center py-8">
                            Loading teams...
                          </td>
                        </tr>
                      ) : (
                        filteredTeams.map((team) => (
                          <tr
                            key={team.team_id} // 👈 🛑 FIX: Use team_id
                            className="border-b hover:bg-gray-50 transition cursor-pointer" // 👈 Added cursor-pointer
                            onClick={() => handleTeamClick(team)} // 👈 Added onClick handler
                          >
                            <td className="py-3 font-mono text-sm">
                              {team.team_id}
                            </td>
                            <td className="py-3 font-medium">
                              {team.team_name}
                            </td>
                            {/* <td className="py-3">{team.members}</td> */}
                            <td className="py-3">{team.round1 ?? "-"}</td>
                            <td className="py-3">{team.round2 ?? "-"}</td>
                            <td className="py-3">
                              <span
                                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                  team.status === "qualified"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {team.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Questions Tab Content */}
            <TabsContent value="questions" className="mt-6">
              {/* ... (existing content) ... */}
            </TabsContent>

            {/* Certificates Tab Content */}
            <TabsContent value="certificates" className="mt-6">
              {/* ... (existing content) ... */}
            </TabsContent>
          </Tabs>

          {/* 🛑 Note: The Teams Table is no longer here. I moved it
                     INSIDE the "Teams" TabsContent block for correct layout. */}
        </div>
      </main>

      {/* 👇 MODIFIED: Edit Team Modal (Dialog) */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          className="sm:max-w-md bg-white border border-gray-200 shadow-lg" // 👈 Added bg-white, border, and shadow
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold font-[Poppins]">
              Edit Team: {selectedTeam?.team_name}
            </DialogTitle>
            <DialogDescription>
              Update scores and status for {selectedTeam?.team_id}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            {" "}
            {/* Increased gap */}
            <div className="grid gap-2">
              {" "}
              {/* Vertical layout for label + input */}
              <Label htmlFor="round1" className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-blue-500" />
                Round 1 Score
              </Label>
              <Input
                id="round1"
                name="round1"
                type="number"
                placeholder="Enter score"
                value={formData.round1}
                onChange={handleFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="round2" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                Round 2 Score
              </Label>
              <Input
                id="round2"
                name="round2"
                type="number"
                placeholder="Enter score"
                value={formData.round2}
                onChange={handleFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status" className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-yellow-500" />
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="eliminated">Eliminated</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleFormSubmit}>
              <Check className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}