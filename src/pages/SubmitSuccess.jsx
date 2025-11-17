import { CheckCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming you have a Shadcn UI Button
import { Link } from "react-router-dom"; // For navigation

export default function SubmissionSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <CheckCircle className="w-20 h-20 text-green-500 mb-6 animate-bounce" />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Submission Successful!</h1>
      <p className="text-lg text-gray-600 max-w-xl mb-8">
        Congratulations! Your answers for Round 1 have been successfully recorded. 
        We appreciate your participation in the assessment.
      </p>
      
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 max-w-md w-full mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">What happens next?</h2>
        <ul className="list-disc list-inside text-left text-gray-500 space-y-2">
          <li>Your submission will be reviewed by the assessment committee.</li>
          <li>Results will be announced via email and on your dashboard within 
              <span className="font-bold text-gray-700"> 5-7 business days</span>.</li>
          <li>Please ensure you check your registered email regularly.</li>
        </ul>
      </div>

      <Link to="/dashboard" passHref>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6"
        >
          <Home className="mr-2 h-5 w-5" />
          Go to Dashboard
        </Button>
      </Link>
    </div>
  );
}