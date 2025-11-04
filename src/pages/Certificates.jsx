import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Download, Award, Star, Trophy } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import jsPDF from "jspdf"; 
// const handleDownload = (type) => {
//   console.log(`Downloading ${type} certificate`);

//   // Create new PDF
//   const doc = new jsPDF();

//   // Certificate design
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(22);
//   doc.text("Certificate of Achievement", 105, 30, { align: "center" });

//   doc.setFontSize(16);
//   doc.setFont("helvetica", "normal");
//   doc.text("This is to certify that", 105, 50, { align: "center" });

//   doc.setFontSize(20);
//   doc.setFont("helvetica", "bold");
//   doc.text("Code Warriors", 105, 65, { align: "center" });

//   doc.setFontSize(14);
//   doc.setFont("helvetica", "normal");
//   doc.text("Team ID: HK2026-001", 105, 75, { align: "center" });

//   doc.text(
//     `has been awarded the "${type}" certificate`,
//     105,
//     90,
//     { align: "center" }
//   );

//   doc.text(
//     "for exceptional performance in Hackathon 2026.",
//     105,
//     100,
//     { align: "center" }
//   );

//   doc.line(40, 130, 170, 130); // signature line
//   doc.text("Event Coordinator - Dr. Rajesh Kumar", 105, 140, { align: "center" });

//   // Save as file
//   doc.save(`${type.replace(/\s+/g, "_")}_Certificate.pdf`);

//   // Toast confirmation
//   toast({
//     title: "Certificate Downloaded",
//     description: `Your ${type} certificate has been downloaded successfully.`,
//   });
// };
const handleDownload = (type) => {
  console.log(`Downloading ${type} certificate`);

  const doc = new jsPDF("landscape"); // wider layout
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // 🎨 Set color theme based on certificate type
  let color = "#FFD700"; // gold by default
  if (type === "Appreciation") color = "#3B82F6"; // blue
  else if (type === "Participation") color = "#22C55E"; // green

  // 🟦 Background gradient header
  doc.setFillColor(color);
  doc.rect(0, 0, pageWidth, 40, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("Certificate of Achievement", pageWidth / 2, 25, { align: "center" });

  // 🧾 Main content
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(16);
  doc.text("This is to certify that", pageWidth / 2, 60, { align: "center" });

  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Code Warriors", pageWidth / 2, 75, { align: "center" });

  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text("Team ID: HK2026-001", pageWidth / 2, 85, { align: "center" });

  doc.text(
    `has been awarded the "${type}" certificate`,
    pageWidth / 2,
    100,
    { align: "center" }
  );

  doc.text(
    "for exceptional performance in Hackathon 2026.",
    pageWidth / 2,
    110,
    { align: "center" }
  );

  // ✍️ Signature section
  doc.line(70, 140, 230, 140);
  doc.setFont("helvetica", "italic");
  doc.text("Event Coordinator - Dr. Rajesh Kumar", pageWidth / 2, 150, {
    align: "center",
  });

  // 📅 Footer date
  doc.setFontSize(12);
  doc.text("Date: March 17, 2026", pageWidth / 2, 165, { align: "center" });

  // 💾 Save as PDF
  doc.save(`${type.replace(/\s+/g, "_")}_Certificate.pdf`);

  // ✅ Toast confirmation
  toast({
    title: "Certificate Downloaded",
    description: `Your ${type} certificate has been downloaded successfully.`,
  });
};


export default function Certificates() {
  const { toast } = useToast();

  // 🧩 Mock certificate data (replace with real API data later)
  const certificates = [
    {
      type: "Outstanding Performance",
      icon: Trophy,
      description: "Top 10 performers",
      color: "text-yellow-500",
      borderColor: "border-yellow-500",
      available: true,
    },
    {
      type: "Appreciation",
      icon: Star,
      description: "Top 50 performers",
      color: "text-blue-500",
      borderColor: "border-blue-500",
      available: true,
    },
    {
      type: "Participation",
      icon: Award,
      description: "All participants",
      color: "text-green-500",
      borderColor: "border-green-500",
      available: true,
    },
  ];

 

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-[Poppins] font-bold text-4xl mb-4">Certificates</h1>
            <p className="text-gray-500 text-lg">Download your achievement certificates</p>
          </div>

          {/* Certificate Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {certificates.map((cert, index) => (
              <Card key={index} className={`p-6 border-2 ${cert.borderColor}`}>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <cert.icon className={`h-8 w-8 ${cert.color}`} />
                  </div>
                  <h3 className="font-[Poppins] font-semibold text-xl mb-2">{cert.type}</h3>
                  <p className="text-sm text-gray-500 mb-6">{cert.description}</p>
                  <Button
                    onClick={() => handleDownload(cert.type)}
                    disabled={!cert.available}
                    className="w-full gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Certificate Preview */}
          <Card className="p-8">
            <h2 className="font-[Poppins] font-bold text-2xl mb-6">Certificate Preview</h2>
            <div className="bg-gradient-to-br from-blue-50 to-green-100 rounded-lg p-12 border-2 border-blue-100">
              <div className="text-center space-y-6 max-w-3xl mx-auto">
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
                    <Trophy className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-[Poppins] font-bold text-3xl mb-2">
                    Certificate of Excellence
                  </h3>
                  <p className="text-lg text-gray-500">Hackathon 2026</p>
                </div>
                <div className="space-y-2">
                  <p className="text-lg">This is to certify that</p>
                  <p className="font-[Poppins] font-bold text-2xl">Code Warriors</p>
                  <p className="text-lg">Team ID: HK2026-001</p>
                </div>
                <p className="text-gray-500 max-w-xl mx-auto">
                  has successfully participated in Hackathon 2026, a National Level Coding Competition
                  organized by NIT Silchar, demonstrating exceptional programming skills and
                  problem-solving abilities.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-8">
                  <div>
                    <div className="h-px bg-gray-300 mb-2"></div>
                    <p className="text-sm text-gray-500">Event Coordinator</p>
                    <p className="font-semibold">Dr. Rajesh Kumar</p>
                  </div>
                  <div>
                    <div className="h-px bg-gray-300 mb-2"></div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-semibold">March 17, 2026</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-6">
              This is a preview. Actual certificates will be generated based on your performance.
            </p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
