

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { useToast } from "../hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const coordinators = [
    { name: "Dr. Rajesh Kumar", role: "Event Coordinator", email: "rajesh@nits.ac.in", phone: "+91 98765 43210" },
    { name: "Prof. Priya Sharma", role: "Technical Head", email: "priya@nits.ac.in", phone: "+91 98765 43211" },
    { name: "Mr. Arjun Verma", role: "Registration Support", email: "arjun@nits.ac.in", phone: "+91 98765 43212" },
  ];

  const faqs = [
    {
      question: "What is the registration fee?",
      answer:
        "The registration fee is ₹2,000 per team (maximum 3 members). This is a one-time fee for participating in all rounds of the competition.",
    },
    {
      question: "Can I participate individually?",
      answer:
        "Yes, you can participate individually or form a team of up to 3 members. Team collaboration is encouraged as it enhances the learning experience.",
    },
    {
      question: "What programming languages are allowed?",
      answer:
        "You can use Python, Java, C++, or JavaScript for the coding challenges. The platform supports all these languages with appropriate compilers and interpreters.",
    },
    {
      question: "How will the results be announced?",
      answer:
        "Results will be announced on your participant dashboard immediately after evaluation. Top performers will also be notified via email.",
    },
    {
      question: "Is accommodation provided?",
      answer:
        "Accommodation is not included in the registration fee. However, we can provide recommendations for nearby hotels and hostels upon request.",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    toast({
      title: "Message Sent!",
      description: "We've received your message and will get back to you soon.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-[Poppins] font-bold text-4xl mb-4 text-[#0A0A0A]">Contact & Help</h1>
            <p className="text-[#555] text-lg">
              Get in touch with us or find answers to common questions
            </p>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <Card className="p-6 bg-white rounded-2xl border border-[#E4E6EB] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#E7EEFF] rounded-xl flex items-center justify-center mb-4 text-[#002E6E]">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="font-[Poppins] font-semibold text-xl mb-2 text-[#0A0A0A]">Email</h3>
              <p className="text-[#555]">hackathon@nits.ac.in</p>
            </Card>

            <Card className="p-6 bg-white rounded-2xl border border-[#E4E6EB] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#E7EEFF] rounded-xl flex items-center justify-center mb-4 text-[#002E6E]">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="font-[Poppins] font-semibold text-xl mb-2 text-[#0A0A0A]">Phone</h3>
              <p className="text-[#555]">+91 1234567890</p>
            </Card>

            <Card className="p-6 bg-white rounded-2xl border border-[#E4E6EB] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#E7EEFF] rounded-xl flex items-center justify-center mb-4 text-[#002E6E]">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="font-[Poppins] font-semibold text-xl mb-2 text-[#0A0A0A]">Address</h3>
              <p className="text-[#555]">NIT Silchar, Assam 788010, India</p>
            </Card>
          </div>

          {/* Coordinators and Message */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="font-[Poppins] font-bold text-2xl mb-6 text-[#0A0A0A]">Event Coordinators</h2>
              <div className="space-y-4">
                {coordinators.map((coord, index) => (
                  <Card
                    key={index}
                    className="p-6 bg-white rounded-2xl border border-[#E4E6EB] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <h3 className="font-semibold text-lg mb-1 text-[#0A0A0A]">{coord.name}</h3>
                    <p className="text-sm text-[#666] mb-3">{coord.role}</p>
                    <div className="space-y-2 text-sm text-[#333]">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-[#666]" />
                        <span>{coord.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-[#666]" />
                        <span>{coord.phone}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-[Poppins] font-bold text-2xl mb-6 text-[#0A0A0A]">Send us a Message</h2>
              <Card className="p-6 bg-white rounded-2xl border border-[#E4E6EB] shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="mt-2 border-[#ccd3e0] focus:ring-2 focus:ring-[#003B8E] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="mt-2 border-[#ccd3e0] focus:ring-2 focus:ring-[#003B8E] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="What is this about?"
                      className="mt-2 border-[#ccd3e0] focus:ring-2 focus:ring-[#003B8E] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Your message..."
                      className="mt-2 border-[#ccd3e0] focus:ring-2 focus:ring-[#003B8E] focus:border-transparent min-h-[150px]"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full gap-2 bg-[#002E6E] text-white hover:bg-[#003B8E] transition-all duration-300"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <Card className="p-8 bg-white rounded-2xl border border-[#E4E6EB] shadow-sm">
            <h2 className="font-[Poppins] font-bold text-2xl mb-6 text-center text-[#0A0A0A]">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold hover:bg-[#F1F5FF] transition-all duration-200">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#555]">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

