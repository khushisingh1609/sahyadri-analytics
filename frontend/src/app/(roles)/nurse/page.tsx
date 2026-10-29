"use client";

import { useState } from "react";
import { Activity, Settings, Search, Filter } from "lucide-react";
import { BedGrid } from "@/components/features/nurse/BedGrid";
import { VitalsModal } from "@/components/features/nurse/VitalsModal";

export default function NurseDashboard() {
  const [selectedBedId, setSelectedBedId] = useState<string | null>(null);

  // Enforced UPPERCASE status values for consistency
  const beds = [
    { id: "W1-B01", status: "OCCUPIED", patient: "Emily Rodriguez", info: "ADM: 2 DAYS AGO" },
    { id: "W1-B02", status: "AVAILABLE", patient: "NO PATIENT", info: "READY FOR CHECK-IN" },
    { id: "W1-B03", status: "CLEANING", patient: "—", info: "EST: 15M REMAINING" },
    { id: "W1-B04", status: "OCCUPIED", patient: "Michael Chen", info: "ADM: TODAY" },
    { id: "W1-B05", status: "AVAILABLE", patient: "NO PATIENT", info: "READY FOR CHECK-IN" },
    { id: "W1-B06", status: "EMERGENCY", patient: "John Doe", info: "IMMEDIATE ATTENTION" },
    { id: "W1-B07", status: "OCCUPIED", patient: "Sarah Jenkins", info: "ADM: YESTERDAY" },
    { id: "W1-B08", status: "OCCUPIED", patient: "Robert Fox", info: "DISCHARGE: TODAY" },
  ];

  const handleSelectBed = (bedId: string) => {
    setSelectedBedId(bedId);
  };

  const closeModal = () => {
    setSelectedBedId(null);
  };

  return (
    <div className="w-full px-6 py-6 md:px-8 max-w-[1600px] mx-auto space-y-6 text-[#2B2B2B]">
      
      {/* ================= TOP HEADER ================= */}
      <div className="bg-[#FFFFFF] p-5 md:p-6 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-md bg-[#F4F0F8] flex items-center justify-center shrink-0 border border-[#EAEAEA]">
            <Activity className="w-5 h-5 text-[#00A3E0]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1F1A67] tracking-tight">Occupancy Overview</h1>
            <p className="text-[13px] text-[#6F6B7D] mt-0.5 font-medium">
              Total Capacity: 42 Beds <span className="mx-2">|</span> Currently In-use: 38
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-6 w-full md:w-auto">
          {/* Avatar Group */}
          <div className="flex items-center -space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#EAEAEA] border-2 border-[#FFFFFF] flex items-center justify-center text-[10px] font-bold text-[#1F1A67] z-30">N1</div>
            <div className="w-8 h-8 rounded-full bg-[#EAEAEA] border-2 border-[#FFFFFF] flex items-center justify-center text-[10px] font-bold text-[#1F1A67] z-20">N2</div>
            <div className="w-8 h-8 rounded-full bg-[#F4F0F8] border-2 border-[#FFFFFF] flex items-center justify-center text-[10px] font-bold text-[#00A3E0] z-10">+4</div>
          </div>
          
          <button className="flex items-center justify-center px-4 py-2 bg-[#1F1A67] text-[#FFFFFF] font-medium rounded-md hover:bg-[#3B3486] transition-colors text-[13px] shadow-sm focus:outline-none">
            <Settings className="w-4 h-4 mr-2" />
            Floor Config
          </button>
        </div>
      </div>

      {/* ================= KPI CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] border-l-4 border-l-[#00A3E0] shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-2">Occupied</span>
          <span className="text-3xl font-bold text-[#1F1A67] tracking-tight">38</span>
        </div>

        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] border-l-4 border-l-[#16A34A] shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-2">Available</span>
          <span className="text-3xl font-bold text-[#1F1A67] tracking-tight">03</span>
        </div>

        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] border-l-4 border-l-[#F59E0B] shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-2">Cleaning</span>
          <span className="text-3xl font-bold text-[#1F1A67] tracking-tight">01</span>
        </div>

        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] border-l-4 border-l-[#C61A4C] shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold text-[#C61A4C] uppercase tracking-wider mb-2">Emergency Requests</span>
          <span className="text-3xl font-bold text-[#C61A4C] tracking-tight">0</span>
        </div>
      </div>

      {/* ================= BED OCCUPANCY SECTION ================= */}
      <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg shadow-sm flex flex-col">
        <div className="p-6 border-b border-[#EAEAEA] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-[#1F1A67]">General Ward – 1st Floor</h2>
            <p className="text-[13px] text-[#6F6B7D] mt-0.5">Bed occupancy and current patient allocation</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-[#EAEAEA] rounded-md text-[#6F6B7D] hover:bg-[#F7F8FC] hover:text-[#1F1A67] transition-colors focus:outline-none">
              <Search className="w-4 h-4" />
            </button>
            <button className="p-2 border border-[#EAEAEA] rounded-md text-[#6F6B7D] hover:bg-[#F7F8FC] hover:text-[#1F1A67] transition-colors focus:outline-none">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6 bg-[#F7F8FC]">
          <BedGrid beds={beds} onSelectBed={handleSelectBed} />
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {selectedBedId && (
        <VitalsModal bedId={selectedBedId} onClose={closeModal} />
      )}

    </div>
  );
}