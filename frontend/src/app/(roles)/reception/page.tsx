"use client";

import { useState } from "react";
import { Search, Settings, Users, History, HelpCircle } from "lucide-react";
import { PatientRegistrationForm } from "@/components/features/reception/PatientRegistrationForm";

export default function ReceptionDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const recentRegistrations = [
    { initials: "JD", name: "Jane Doe", id: "OPD-998", time: "2 mins ago" },
    { initials: "RK", name: "Robert King", id: "OPD-997", time: "15 mins ago" },
    { initials: "AM", name: "Alice Miller", id: "OPD-996", time: "1 hour ago" },
  ];

  // Local search filtering
  const filteredRegistrations = recentRegistrations.filter(
    (reg) =>
      reg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full px-6 py-6 md:px-8 max-w-[1600px] mx-auto space-y-6 text-[#2B2B2B]">
      
      {/* ================= HEADER ================= */}
      <div className="bg-[#FFFFFF] p-5 md:p-6 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-md bg-[#F4F0F8] flex items-center justify-center shrink-0 border border-[#EAEAEA]">
            <Users className="w-5 h-5 text-[#00A3E0]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1F1A67] tracking-tight">Front Desk Portal</h1>
            <p className="text-[13px] text-[#6F6B7D] mt-0.5">
              Manage patient registration, appointments, and front-desk operations.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          {/* Operational Summary */}
          <div className="flex items-center gap-3 text-[13px] font-medium bg-[#F7F8FC] px-3 py-1.5 rounded-md border border-[#EAEAEA]">
            <span className="text-[#6F6B7D]">
              Walk-ins today: <span className="font-bold text-[#00A3E0] ml-1">14</span>
            </span>
            <span className="text-[#EAEAEA]">|</span>
            <span className="text-[#6F6B7D]">
              Emergency: <span className="font-bold text-[#C61A4C] ml-1">02</span>
            </span>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#6F6B7D] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Patient ID or Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#F7F8FC] border border-[#EAEAEA] rounded-md text-[13px] text-[#2B2B2B] focus:outline-none focus:border-[#1F1A67] focus:ring-1 focus:ring-[#1F1A67] transition-colors placeholder:text-[#6F6B7D]/70"
            />
          </div>
          
          <button className="p-2 bg-[#FFFFFF] border border-[#EAEAEA] rounded-md text-[#6F6B7D] hover:bg-[#F7F8FC] hover:text-[#1F1A67] transition-colors focus:outline-none shrink-0 shadow-sm">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ================= MAIN LAYOUT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Registration Form */}
        <div className="lg:col-span-2">
          <PatientRegistrationForm />
        </div>

        {/* Right Column: Sidebar Panels */}
        <div className="space-y-6">
          
          {/* Recent Registrations */}
          <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg shadow-sm flex flex-col">
            <div className="p-5 border-b border-[#EAEAEA] flex justify-between items-center bg-[#FFFFFF]">
              <h3 className="text-[13px] font-bold text-[#1F1A67] uppercase tracking-wider">
                Recent Registrations
              </h3>
              <History className="w-4 h-4 text-[#00A3E0]" />
            </div>
            
            <div className="p-5 space-y-3">
              {filteredRegistrations.length > 0 ? (
                filteredRegistrations.map((reg, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-4 p-3 rounded-md border border-[#EAEAEA] hover:border-[#1F1A67]/30 hover:bg-[#F7F8FC] transition-colors bg-[#FFFFFF]"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#F4F0F8] flex items-center justify-center font-bold text-sm text-[#1F1A67] border border-[#EAEAEA] shrink-0">
                      {reg.initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-[#1F1A67] text-[14px] leading-tight">
                        {reg.name}
                      </span>
                      <span className="text-[12px] font-medium text-[#6F6B7D] mt-0.5 uppercase tracking-wider">
                        {reg.id} <span className="mx-1 lowercase text-[#6F6B7D]/70">•</span> {reg.time}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-[13px] text-[#6F6B7D]">
                  No recent registrations match your search.
                </div>
              )}
            </div>
          </div>

          {/* Support Ticket Block */}
          <div className="bg-[#1F1A67] rounded-lg shadow-sm p-6 text-[#FFFFFF] relative overflow-hidden">
            <HelpCircle className="absolute -bottom-4 -right-4 w-32 h-32 text-[#3B3486] opacity-50" />
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-2">Need Help?</h3>
              <p className="text-[13px] text-[#EAEAEA] mb-6 leading-relaxed">
                Contact IT support for troubleshooting biometric integration or printer issues.
              </p>
              <button className="w-full py-2.5 bg-[#FFFFFF]/10 hover:bg-[#3B3486] border border-[#FFFFFF]/20 rounded-md text-[13px] font-bold transition-colors focus:outline-none">
                OPEN SUPPORT TICKET
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}