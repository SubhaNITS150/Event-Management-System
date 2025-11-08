import { useState } from "react";
import Navbar from "../components/navigationbars/NavbarDesktop";
import Footer from "../components/footer/FooterDesktop";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { PartyPopper } from "lucide-react";
import { Link } from "react-router-dom";

export default function AlreadyRegistered() {

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* <Navbar /> */}
      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-[Poppins] font-bold text-4xl text-gray-800 mb-4">
              You're All Set!
            </h1>
            <p className="text-gray-500 text-lg">
              Your team is registered for Hackathon 2026.
            </p>
          </div>

          {/* Team Details */}
          <Card className="p-6 rounded-xl shadow-md bg-white border border-gray-200">
            <div className="flex items-start sm:items-center gap-4">
              <PartyPopper className="h-12 w-12 text-orange-500 flex-shrink-0" />
              <div>
                <p className="text-gray-500 mt-1">
                  Your registration is confirmed. Good luck!
                </p>
              </div>
            </div>
          </Card>

          {/* Dashboard Button */}
          <div className="mt-8 text-center">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white text-lg rounded-xl shadow-md"
              asChild
            >
              <Link to="/dashboard">Go to Your Dashboard</Link>
            </Button>
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}