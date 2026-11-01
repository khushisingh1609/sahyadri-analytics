"use client";

import { useState, useEffect } from "react";
import { Activity, Settings, Search, Filter } from "lucide-react";
import { BedGrid } from "@/components/features/nurse/BedGrid";
import { VitalsModal } from "@/components/features/nurse/VitalsModal";
import { fetchNurseBeds } from "@/services/api";
import { OutbreakAlert } from "@/app/(roles)/shared/OutbreakAlert";
export default function NurseDashboard() {
  const [selectedBedId, setSelectedBedId] = useState<string | null>(null);
  const [beds, setBeds] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch live ward beds from FastAPI on mount
  useEffect(() => {
    async function loadBeds() {
      const data = await fetchNurseBeds();
      setBeds(data);
      setIsLoading(false);
    }
    loadBeds();
  }, []);

  const handleSelectBed = (bedId: string) => setSelectedBedId(bedId);
  const closeModal = () => setSelectedBedId(null);

  // Calculate dynamic KPIs
  const occupiedCount = beds.filter(b => b.status === "OCCUPIED").length;
  const availableCount = beds.filter(b => b.status === "AVAILABLE").length;
  const cleaningCount = beds.filter(b => b.status === "CLEANING").length;
  const emergencyCount = beds.filter(b => b.status === "EMERGENCY").length;
  const totalInUse = occupiedCount + emergencyCount;

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
              Total Capacity: {beds.length || 42} Beds <span className="mx-2">|</span> Currently In-use: {totalInUse}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-6 w-full md:w-auto">
          <div className="flex items-center -space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#EAEAEA] border-2 border-[#FFFFFF] flex items-center justify-center text-[10px] font-bold text-[#1F1A67] z-30">N1</div>
            <div className="w-8 h-8 rounded-full bg-[#EAEAEA] border-2 border-[#FFFFFF] flex items-center justify-center text-[10px] font-bold text-[#1F1A67] z-20">N2</div>
            <div className="w-8 h-8 rounded-full bg-[#F4F0F8] border-2 border-[#FFFFFF] flex items-center justify-center text-[10px] font-bold text-[#00A3E0] z-10">+4</div>
          </div>
          
          <button className="flex items-center justify-center px-4 py-2 bg-[#1F1A67] text-[#FFFFFF] font-medium rounded-md hover:bg-[#3B3486] transition-colors text-[13px] shadow-sm focus:outline-none">
            <Settings className="w-4 h-4 mr-2" /> Floor Config
          </button>
        </div>
      </div>

      {/* ================= KPI CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] border-l-4 border-l-[#00A3E0] shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-2">Occupied</span>
          <span className="text-3xl font-bold text-[#1F1A67] tracking-tight">{String(occupiedCount).padStart(2, '0')}</span>
        </div>
        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] border-l-4 border-l-[#16A34A] shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-2">Available</span>
          <span className="text-3xl font-bold text-[#1F1A67] tracking-tight">{String(availableCount).padStart(2, '0')}</span>
        </div>
        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] border-l-4 border-l-[#F59E0B] shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-2">Cleaning</span>
          <span className="text-3xl font-bold text-[#1F1A67] tracking-tight">{String(cleaningCount).padStart(2, '0')}</span>
        </div>
        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] border-l-4 border-l-[#C61A4C] shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold text-[#C61A4C] uppercase tracking-wider mb-2">Emergency Requests</span>
          <span className="text-3xl font-bold text-[#C61A4C] tracking-tight">{String(emergencyCount).padStart(2, '0')}</span>
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
            <button className="p-2 border border-[#EAEAEA] rounded-md text-[#6F6B7D] hover:bg-[#F7F8FC] hover:text-[#1F1A67] transition-colors"><Search className="w-4 h-4" /></button>
            <button className="p-2 border border-[#EAEAEA] rounded-md text-[#6F6B7D] hover:bg-[#F7F8FC] hover:text-[#1F1A67] transition-colors"><Filter className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="p-6 bg-[#F7F8FC]">
          {isLoading ? (
            <div className="py-12 text-center text-sm text-[#6F6B7D]">Loading live floor plan from database...</div>
          ) : (
            <BedGrid beds={beds} onSelectBed={handleSelectBed} />
          )}
        </div>
      </div>

      {selectedBedId && (
  <VitalsModal 
    bed={beds.find(b => b.id === selectedBedId)} 
    onClose={closeModal} 
  />
)}
<OutbreakAlert/>
    </div>
  );
  
}