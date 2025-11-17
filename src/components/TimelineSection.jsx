// import { useSearchParams } from "react-router-dom";

// const [params] = useSearchParams();
// const round = params.get("round") || "1";

// import { Card } from "../components/ui/card";
// import { Badge } from "../components/ui/badge";
// import { Link } from "react-router-dom";

// const timeline = [
//   { date: "Jan 15, 2026", title: "Registration Opens", description: "Team registration begins", status: "completed" },
//   { date: "Feb 28, 2026", title: "Registration Closes", description: "Last date to register", status: "upcoming" },
//   { date: "Mar 15, 2026", title: "Round 1: Online Test", description: "MCQ & Coding challenges", status: "Live now", route: "/access-code?round=1"
//  },
//   { date: "Mar 16, 2026", title: "Round 2: Problem Solving", description: "Advanced coding problems", status: "Live now", route: "/access-code?round=2"
// },
//   { date: "Mar 17, 2026", title: "Final Round & Results", description: "Winner announcement", status: "upcoming" },
// ];

// /** Return UI metadata for a given status string */
// function getStatusMeta(status) {
//   const s = (status || "").toLowerCase().trim();

//   switch (s) {
//     case "completed":
//       return {
//         label: "Completed",
//         badgeClasses: "bg-[#143e8a] text-white",
//         dateClasses: "text-green-600",
//         dotClass: "bg-green-500",
//       };

//     case "live":
//     case "live now":
//       return {
//         label: "Live Now",
//         badgeClasses: "bg-green-600 text-white",
//         dateClasses: "text-green-600",
//         dotClass: "bg-green-600",
//       };

//     case "upcoming":
//       return {
//         label: "Upcoming",
//         badgeClasses: "bg-gray-200 text-gray-700",
//         dateClasses: "text-blue-600",
//         dotClass: "bg-blue-500",
//       };

//     default:
//       return {
//         label: s.charAt(0).toUpperCase() + s.slice(1),
//         badgeClasses: "bg-gray-200 text-gray-700",
//         dateClasses: "text-blue-600",
//         dotClass: "bg-blue-500",
//       };
//   }
// }


// export default function TimelineSection() {
//   return (
//     <section className="py-20 bg-[#f9fafb]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-14">
//           <h2 className="font-[Poppins] font-bold text-3xl sm:text-4xl text-gray-900">
//             Event Timeline
//           </h2>
//           <p className="text-gray-500 text-lg mt-2">
//             Key dates for Hackathon 2026
//           </p>
//         </div>

//         {/* Timeline */}
//         <div className="max-w-3xl mx-auto relative">
//           {timeline.map((item, index) => {
//             const CardWrapper = item.route ? Link : "div";
//             const meta = getStatusMeta(item.status);

//             return (
//               <div
//                 key={index}
//                 className="flex gap-5 mb-10 last:mb-0 relative"
//                 data-testid={`timeline-item-${index}`}
//               >
//                 {/* Line & Dot */}
//                 <div className="flex flex-col items-center">
//                   <div
//                     className={`w-3.5 h-3.5 rounded-full ${meta.dotClass} ring-4 ring-[#f9fafb]`}
//                   ></div>
//                   {index < timeline.length - 1 && (
//                     <div className="w-[2px] flex-1 bg-gray-200 mt-1"></div>
//                   )}
//                 </div>

//                 {/* Card */}
//                 <CardWrapper to={item.route} className="flex-1">
//                   <Card
//                     className={`p-6 shadow-sm border border-gray-200 rounded-xl bg-white transition hover:shadow-md ${item.route ? "cursor-pointer" : ""}`}
//                   >
//                     <div className="flex flex-wrap justify-between items-start mb-3">
//                       <h3 className="font-[Poppins] font-semibold text-lg text-gray-900">
//                         {item.title}
//                       </h3>
//                       <Badge
//                         className={`px-3 py-1 rounded-md text-xs font-semibold ${meta.badgeClasses}`}
//                       >
//                         {meta.label}
//                       </Badge>
//                     </div>

//                     <p className="text-sm text-gray-500 mb-2">
//                       {item.description}
//                     </p>
//                     <p className={`text-sm font-medium ${meta.dateClasses}`}>
//                       {item.date}
//                     </p>
//                   </Card>
//                 </CardWrapper>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Link } from "react-router-dom";

const timeline = [
  { date: "Jan 15, 2026", title: "Registration Opens", description: "Team registration begins", status: "completed" },
  { date: "Feb 28, 2026", title: "Registration Closes", description: "Last date to register", status: "upcoming" },
  { date: "Mar 15, 2026", title: "Round 1: Online Test", description: "MCQ & Coding challenges", status: "Live now", route: "/access-code?round=1" },
  { date: "Mar 16, 2026", title: "Round 2: Problem Solving", description: "Advanced coding problems", status: "Live now", route: "/access-code?round=2" },
  { date: "Mar 17, 2026", title: "Final Round & Results", description: "Winner announcement", status: "upcoming" },
];

/** Return UI metadata for a given status string */
function getStatusMeta(status) {
  const s = (status || "").toLowerCase().trim();

  switch (s) {
    case "completed":
      return {
        label: "Completed",
        badgeClasses: "bg-[#143e8a] text-white",
        dateClasses: "text-green-600",
        dotClass: "bg-green-500",
      };

    case "live":
    case "live now":
      return {
        label: "Live Now",
        badgeClasses: "bg-green-600 text-white",
        dateClasses: "text-green-600",
        dotClass: "bg-green-600",
      };

    case "upcoming":
      return {
        label: "Upcoming",
        badgeClasses: "bg-gray-200 text-gray-700",
        dateClasses: "text-blue-600",
        dotClass: "bg-blue-500",
      };

    default:
      return {
        label: s.charAt(0).toUpperCase() + s.slice(1),
        badgeClasses: "bg-gray-200 text-gray-700",
        dateClasses: "text-blue-600",
        dotClass: "bg-blue-500",
      };
  }
}

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
          {timeline.map((item, index) => {
            const CardWrapper = item.route ? Link : "div";
            const meta = getStatusMeta(item.status);

            return (
              <div
                key={index}
                className="flex gap-5 mb-10 last:mb-0 relative"
                data-testid={`timeline-item-${index}`}
              >
                {/* Line & Dot */}
                <div className="flex flex-col items-center">
                  <div className={`w-3.5 h-3.5 rounded-full ${meta.dotClass} ring-4 ring-[#f9fafb]`}></div>
                  {index < timeline.length - 1 && (
                    <div className="w-[2px] flex-1 bg-gray-200 mt-1"></div>
                  )}
                </div>

                {/* Card */}
                <CardWrapper to={item.route} className="flex-1">
                  <Card className={`p-6 shadow-sm border border-gray-200 rounded-xl bg-white transition hover:shadow-md ${item.route ? "cursor-pointer" : ""}`}>
                    <div className="flex flex-wrap justify-between items-start mb-3">
                      <h3 className="font-[Poppins] font-semibold text-lg text-gray-900">
                        {item.title}
                      </h3>
                      <Badge className={`px-3 py-1 rounded-md text-xs font-semibold ${meta.badgeClasses}`}>
                        {meta.label}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                    <p className={`text-sm font-medium ${meta.dateClasses}`}>{item.date}</p>
                  </Card>
                </CardWrapper>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
