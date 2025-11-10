import { useState, useEffect } from "react"; 
import Navbar from "../components/navigationbars/NavbarDesktop";
import Footer from "../components/footer/FooterDesktop";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Users, FileText, Award, Upload, Search, Download } from "lucide-react";
import StatCard from "../components/StatCard";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";
import { supabase } from "../lib/supabaseClient"; // 👈 Import your Supabase client

export default function AdminDashboard() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [teamCount, setTeamCount] = useState(0); // 👈 Add state for team count

  // 👇 Add useEffect to fetch data on component mount
  useEffect(() => {
    async function fetchTeamCount() {
      try {
        // This query efficiently gets only the count, not all data
        const { count, error } = await supabase
          .from("teams") // Assumes your table is named "teams"
          .select("*", { count: "exact", head: true });

        if (error) {
          throw error;
        }

        if (count !== null) {
          setTeamCount(count); // Update the state
        }
      } catch (error) {
        console.error("Error fetching team count:", error);
        toast({
          title: "Error",
          description: "Could not fetch team count.",
          variant: "destructive",
        });
      }
    }

    fetchTeamCount();
  }, [toast]); // Re-run if toast (from hook) changes

  // Stats array now uses the teamCount state
  const stats = [
    {
      icon: Users,
      value: teamCount.toString(), // 👈 Use the state variable
      label: "Registered Teams",
      color: "text-chart-2",
      testId: "stat-teams",
    },
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

  // This mock data is still used for the table display.
  // You would need another fetch call to populate this from Supabase.
  const teams = [
    {
      id: "HK2026-001",
      name: "Code Warriors",
      members: 3,
      round1: 85,
      round2: null,
      status: "qualified",
    },
    // ... other mock teams
  ];

  const handleUploadQuestion = () => {
    toast({
      title: "Question Uploaded",
      description: "The question has been added to the round successfully.",
    });
  };

  const navigate = useNavigate();

  const handleGenerateCertificates = () => {
    toast({
      title: "Certificates Generated",
      description:
        "All certificates have been generated and are ready for download.",
    });

    navigate("/certificates");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Registered Teams Report", 14, 20);

    const filteredTeams = teams.filter(
      (team) =>
        team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const tableData = filteredTeams.map((team) => [
      team.id,
      team.name,
      team.members,
      team.round1,
      team.round2 ?? "-",
      team.status,
    ]);

    autoTable(doc, {
      startY: 30,
      head: [
        ["Team ID", "Team Name", "Members", "Round 1", "Round 2", "Status"],
      ],
      body: tableData,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [37, 99, 235] }, // Tailwind blue-600
    });

    doc.save("registered_teams.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                key={index}
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
          <div className="space-y-6">
            {/* Tabs Header */}
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
                {/* ✅ Put your existing Teams Table code here */}
              </TabsContent>

              {/* Questions Tab Content */}
              <TabsContent value="questions" className="mt-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="font-[Poppins] font-semibold text-2xl mb-4">
                    Upload New Question
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="file"
                      accept=".pdf,.txt"
                      className="border p-2 rounded-md text-sm"
                    />
                    <button
                      onClick={handleUploadQuestion}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                      <Upload className="inline h-4 w-4 mr-1" />
                      Upload
                    </button>
                  </div>
                </div>
              </TabsContent>

              {/* Certificates Tab Content */}
              <TabsContent value="certificates" className="mt-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="font-[Poppins] font-semibold text-2xl mb-4">
                    Generate Certificates
                  </h2>
                  <button
                    onClick={handleGenerateCertificates}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                  >
                    <Award className="inline h-4 w-4 mr-1" />
                    Generate All Certificates
                  </button>
                </div>
              </TabsContent>
            </Tabs>

            {/* Teams Table */}
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
                      <th className="pb-3 font-semibold">Members</th>
                      <th className="pb-3 font-semibold">Round 1</th>
                      <th className="pb-3 font-semibold">Round 2</th>
                      <th className="pb-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams
                      .filter(
                        (team) =>
                          team.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          team.id
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          team.status
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                      )
                      .map((team) => (
                        <tr
                          key={team.id}
                          className="border-b hover:bg-gray-50 transition"
                        >
                          <td className="py-3 font-mono text-sm">{team.id}</td>
                          <td className="py-3 font-medium">{team.name}</td>
                          <td className="py-3">{team.members}</td>
                          <td className="py-3">{team.round1}</td>
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
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}