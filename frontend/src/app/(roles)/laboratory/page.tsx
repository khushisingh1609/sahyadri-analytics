"use client";

import { useState, useEffect } from "react";
import { TestTube, Search } from "lucide-react";
import { LabQueue } from "@/components/features/laboratory/LabQueue";
import { fetchLabRequests } from "@/services/api";
import { OutbreakAlert } from "@/app/(roles)/shared/OutbreakAlert";

export default function LaboratoryDashboard() {
  const [activeTab, setActiveTab] = useState<"pending" | "published">("pending");
  const [tests, setTests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch live lab requests from FastAPI on mount
  useEffect(() => {
    async function loadLabData() {
      const data = await fetchLabRequests();
      setTests(data);
      setIsLoading(false);
    }
    loadLabData();
  }, []);

  const handleAction = (id: string, currentStatus: string) => {
    console.log(`Action triggered for Request: ${id} with Status: ${currentStatus}`);
  };

  // Dynamically calculate KPIs from database
  const samplesNeeded = tests.filter(t => t.status === "SAMPLE REQUIRED").length;
  const processingCount = tests.filter(t => t.status === "PROCESSING").length;
  const urgentCount = tests.filter(t => t.urgent === true).length;
  const completedCount = tests.filter(t => t.status === "RESULT ENTRY").length; // You can adjust this to "COMPLETED" later

  return (
    <div className="w-full px-6 py-6 md:px-8 max-w-[1600px] mx-auto space-y-6 text-[#2B2B2B]">
      
      {/* ================= 1. TOP HEADER ================= */}
      <div className="bg-[#FFFFFF] p-5 md:p-6 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-md bg-[#F4F0F8] flex items-center justify-center shrink-0 border border-[#EAEAEA]">
            <TestTube className="w-5 h-5 text-[#00A3E0]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1F1A67] tracking-tight">Diagnostic Laboratory</h1>
            <p className="text-[13px] text-[#6F6B7D] mt-0.5">
              Manage sample collection, test processing, and result publication.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#6F6B7D] absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search ID, Patient or Test..." 
              className="w-full pl-9 pr-4 py-2 bg-[#F7F8FC] border border-[#EAEAEA] rounded-md text-[13px] text-[#2B2B2B] focus:outline-none focus:border-[#00A3E0] focus:ring-1 focus:ring-[#00A3E0] transition-colors placeholder:text-[#6F6B7D]/70" 
            />
          </div>
          <button className="w-full sm:w-auto px-5 py-2 bg-[#1F1A67] text-[#FFFFFF] font-medium rounded-md hover:bg-[#3B3486] transition-colors text-[13px] shadow-sm whitespace-nowrap focus:outline-none">
            New Sample Collection
          </button>
        </div>
      </div>

      {/* ================= 2. KPI SECTION ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-2">Samples Needed</span>
          <span className="text-3xl font-bold text-[#1F1A67] tracking-tight">{String(samplesNeeded).padStart(2, '0')}</span>
        </div>

        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-2">Processing</span>
          <span className="text-3xl font-bold text-[#1F1A67] tracking-tight">{String(processingCount).padStart(2, '0')}</span>
        </div>

        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C61A4C]"></div>
          <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-2 ml-1">Urgent Requests</span>
          <span className="text-3xl font-bold text-[#C61A4C] tracking-tight ml-1">{String(urgentCount).padStart(2, '0')}</span>
        </div>

        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-2">Completed (Today)</span>
          <span className="text-3xl font-bold text-[#1F1A67] tracking-tight">{String(completedCount).padStart(2, '0')}</span>
        </div>
      </div>

      {/* ================= 3. LABORATORY QUEUE SECTION ================= */}
      <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg shadow-sm flex flex-col overflow-hidden">
        
        <div className="p-6 border-b border-[#EAEAEA] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-[#1F1A67]">Laboratory Queue</h2>
            <p className="text-[13px] text-[#6F6B7D] mt-0.5">Pending & processing laboratory requests</p>
          </div>
          <div className="px-3 py-1 bg-[#F4F0F8] border border-[#EAEAEA] rounded text-[12px] font-bold text-[#1F1A67] uppercase tracking-wider">
            {tests.length} Requests
          </div>
        </div>

        {/* 4. TABS */}
        <div className="px-6 border-b border-[#EAEAEA] flex gap-6">
          <button 
            onClick={() => setActiveTab("pending")}
            className={`py-3 text-[13px] font-bold tracking-wide transition-colors border-b-[3px] focus:outline-none ${
              activeTab === "pending" 
                ? "border-[#00A3E0] text-[#1F1A67]" 
                : "border-transparent text-[#6F6B7D] hover:text-[#1F1A67]"
            }`}
          >
            Pending & Processing
          </button>
          <button 
            onClick={() => setActiveTab("published")}
            className={`py-3 text-[13px] font-bold tracking-wide transition-colors border-b-[3px] focus:outline-none ${
              activeTab === "published" 
                ? "border-[#00A3E0] text-[#1F1A67]" 
                : "border-transparent text-[#6F6B7D] hover:text-[#1F1A67]"
            }`}
          >
            Published Results
          </button>
        </div>

        {/* 5. RENDER QUEUE COMPONENT */}
        <div className="bg-[#FFFFFF]">
          {isLoading ? (
            <div className="p-12 text-center text-[13px] text-[#6F6B7D]">Loading laboratory queue from database...</div>
          ) : activeTab === "pending" ? (
            <LabQueue tests={tests} onAction={handleAction} />
          ) : (
            <div className="p-12 text-center text-[13px] text-[#6F6B7D]">
              No published results available yet.
            </div>
          )}
          <OutbreakAlert/> 
        </div>

      </div>
    </div>
  );
  
}