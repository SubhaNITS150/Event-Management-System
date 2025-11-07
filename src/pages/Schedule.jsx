
import TimelineSection from "../components/TimelineSection";

export default function Schedule() {
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-[Poppins] font-bold text-4xl mb-4">
              Event Schedule
            </h1>
            <p className="text-muted-foreground text-lg">
              Complete timeline for Hackathon 2026
            </p>
          </div>
          <TimelineSection />
        </div>
      </main>
      
    </div>
  );
}
