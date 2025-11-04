
import { Card } from "../components/ui/card";

export default function StatCard({ icon: Icon, value, label, color = "text-blue-600", testId }) {
  return (
    <Card className="p-6 bg-blue-50/40 border border-blue-100 shadow-sm transition hover:shadow-md hover:bg-blue-50" data-testid={testId}>
      <div className="flex items-center justify-between">
        <div>
          <p
            className={`font-[Poppins] font-bold text-3xl mb-1 ${color}`}
            data-testid={`${testId}-value`}
          >
            {value}
          </p>
          <p className="text-gray-500">{label}</p>
        </div>
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
    </Card>
  );
}
