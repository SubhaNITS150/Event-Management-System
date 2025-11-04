// import { Card } from "../components/ui/card";

// export default function FeatureCard({ icon: Icon, title, description, testId }) {
//   return (
//     <Card className="p-6 hover-elevate transition-all" data-testid={testId}>
//       <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
//         <Icon className="h-6 w-6 text-primary" />
//       </div>
//       <h3 className="font-[Poppins] font-semibold text-xl mb-2">{title}</h3>
//       <p className="text-muted-foreground">{description}</p>
//     </Card>
//   );
// }
import { Card } from "../components/ui/card";

export default function FeatureCard({ icon: Icon, title, description, testId }) {
  return (
    <Card
      className="
        p-8 
        bg-white 
        shadow-md 
        hover:shadow-xl 
        transition-all 
        duration-300 
        rounded-2xl 
        border 
        border-gray-100 
        hover:-translate-y-1
      "
      data-testid={testId}
    >
      <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
        <Icon className="h-7 w-7 text-blue-600" />
      </div>
      <h3 className="font-poppins font-semibold text-xl text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </Card>
  );
}
