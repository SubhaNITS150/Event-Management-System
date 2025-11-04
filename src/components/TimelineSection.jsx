// import { Card } from "../components/ui/card";
// import { Badge } from "../components/ui/badge";

// const timeline = [
//   { date: "Jan 15, 2026", title: "Registration Opens", description: "Team registration begins", status: "completed" },
//   { date: "Feb 28, 2026", title: "Registration Closes", description: "Last date to register", status: "upcoming" },
//   { date: "Mar 15, 2026", title: "Round 1: Online Test", description: "MCQ & Coding challenges", status: "upcoming" },
//   { date: "Mar 16, 2026", title: "Round 2: Problem Solving", description: "Advanced coding problems", status: "upcoming" },
//   { date: "Mar 17, 2026", title: "Final Round & Results", description: "Winner announcement", status: "upcoming" },
// ];

// export default function TimelineSection() {
//   return (
//     <div className="py-16 bg-card">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="font-[Poppins] font-bold text-3xl sm:text-4xl mb-4">Event Timeline</h2>
//           <p className="text-muted-foreground text-lg">Key dates for Hackathon 2026</p>
//         </div>

//         <div className="max-w-4xl mx-auto">
//           {timeline.map((item, index) => (
//             <div key={index} className="flex gap-4 mb-8 last:mb-0" data-testid={`timeline-item-${index}`}>
//               <div className="flex flex-col items-center">
//                 <div
//                   className={`w-4 h-4 rounded-full ${
//                     item.status === "completed" ? "bg-chart-4" : "bg-chart-2"
//                   } ring-4 ring-background`}
//                 ></div>
//                 {index < timeline.length - 1 && <div className="w-0.5 h-full bg-border mt-2"></div>}
//               </div>

//               <Card className="flex-1 p-6 mb-4">
//                 <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
//                   <h3 className="font-[Poppins] font-semibold text-lg">{item.title}</h3>
//                   <Badge variant={item.status === "completed" ? "default" : "secondary"}>
//                     {item.status === "completed" ? "Completed" : "Upcoming"}
//                   </Badge>
//                 </div>
//                 <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
//                 <p className="text-sm font-medium text-chart-2">{item.date}</p>
//               </Card>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const timeline = [
  { date: "Jan 15, 2026", title: "Registration Opens", description: "Team registration begins", status: "completed" },
  { date: "Feb 28, 2026", title: "Registration Closes", description: "Last date to register", status: "upcoming" },
  { date: "Mar 15, 2026", title: "Round 1: Online Test", description: "MCQ & Coding challenges", status: "upcoming" },
  { date: "Mar 16, 2026", title: "Round 2: Problem Solving", description: "Advanced coding problems", status: "upcoming" },
  { date: "Mar 17, 2026", title: "Final Round & Results", description: "Winner announcement", status: "upcoming" },
];

export default function TimelineSection() {
  return (
    <section className="py-20 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="font-[Poppins] font-bold text-3xl sm:text-4xl text-gray-900">
            Event Timeline
          </h2>
          <p className="text-gray-500 text-lg mt-2">
            Key dates for Hackathon 2026
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {timeline.map((item, index) => (
            <div
              key={index}
              className="flex gap-5 mb-10 last:mb-0 relative"
              data-testid={`timeline-item-${index}`}
            >
              {/* Line & Dot */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-3.5 h-3.5 rounded-full ${
                    item.status === "completed"
                      ? "bg-green-500"
                      : "bg-blue-500"
                  } ring-4 ring-[#f9fafb]`}
                ></div>
                {index < timeline.length - 1 && (
                  <div className="w-[2px] flex-1 bg-gray-200 mt-1"></div>
                )}
              </div>

              {/* Card */}
              <Card className="flex-1 p-6 shadow-sm border border-gray-200 rounded-xl bg-white transition hover:shadow-md">
                <div className="flex flex-wrap justify-between items-start mb-3">
                  <h3 className="font-[Poppins] font-semibold text-lg text-gray-900">
                    {item.title}
                  </h3>
                  <Badge
                    className={`px-3 py-1 rounded-md text-xs font-semibold ${
                      item.status === "completed"
                        ? "bg-[#143e8a] text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {item.status === "completed" ? "Completed" : "Upcoming"}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                <p
                  className={`text-sm font-medium ${
                    item.status === "completed"
                      ? "text-green-600"
                      : "text-blue-600"
                  }`}
                >
                  {item.date}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
