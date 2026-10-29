"use client";

import { useRouter } from "next/navigation";
import { Clock, CheckSquare, ArrowUpRight, UploadCloud, AlertCircle, CheckCircle2, Stethoscope } from "lucide-react";
import { PatientQueue, QueuePatient } from "@/components/features/doctor/PatientQueue";

export default function DoctorDashboard() {
  const router = useRouter();

  // Mock Data
  const queueData: QueuePatient[] = [
    { id: "AP-002", name: "Michael Chen", type: "NEW PATIENT", time: "09:30 AM" },
    { id: "AP-003", name: "Sarah Jenkins", type: "FOLLOW-UP", time: "10:15 AM" },
  ];

  const handleStartConsult = (id: string) => {
    router.push(`/doctor/consultation/${id}`);
  };

  return (
    <div className="w-full px-6 py-6 md:px-8 max-w-[1600px] mx-auto space-y-6 text-[#2B2B2B]">
      
      {/* ================= A. CURRENT SESSION ================= */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#F4F0F8] rounded-md flex items-center justify-center border border-[#EAEAEA] shrink-0">
            <Stethoscope className="w-5 h-5 text-[#1F1A67]" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#1F1A67] tracking-tight">Current Session</h1>
            <p className="text-[13px] text-[#6F6B7D] mt-0.5">
              Patient: <span className="font-semibold text-[#1F1A67]">Emily Rodriguez (AP-001)</span>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-[#2B2B2B] bg-[#F7F8FC] px-4 py-2.5 rounded-md border border-[#EAEAEA]">
            <Clock className="w-4 h-4 text-[#00A3E0]" />
            <span className="text-sm font-semibold">04:40 AM</span>
          </div>
          <button className="flex-1 md:flex-none px-6 py-2.5 bg-[#1F1A67] text-[#FFFFFF] font-medium rounded-md hover:bg-[#3B3486] transition-colors text-sm shadow-sm">
            Finish Session
          </button>
        </div>
      </div>

      {/* ================= B. STATISTICS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-2">Total Consults</span>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-[#1F1A67] tracking-tight">24</span>
            <span className="flex items-center text-xs font-bold text-[#00A3E0]">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> 12% today
            </span>
          </div>
        </div>

        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-2">Avg. Wait Time</span>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-[#1F1A67] tracking-tight">14 min</span>
            <span className="text-xs font-medium text-[#6F6B7D]">Hospital avg: 18m</span>
          </div>
        </div>

        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-2">Pending Sync</span>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-[#1F1A67] tracking-tight">3</span>
            <span className="flex items-center text-xs font-medium text-[#6F6B7D]">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-[#00A3E0]" /> Auto-sync active
            </span>
          </div>
        </div>
      </div>

      {/* ================= C & D. MAIN WORKSPACE ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* LEFT: Examination & Notes */}
        <div className="xl:col-span-2 flex flex-col bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg shadow-sm">
          <div className="p-5 border-b border-[#EAEAEA] flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#1F1A67]">Examination & Notes</h2>
            <span className="px-2.5 py-1 bg-[#F7F8FC] border border-[#EAEAEA] text-[#6F6B7D] text-[10px] font-bold uppercase tracking-wider rounded">
              Quick Draft
            </span>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-2">
                Clinical Diagnosis & Observations
              </label>
              <textarea 
                rows={4} 
                placeholder="Enter rapid diagnostic notes here..."
                className="w-full p-4 bg-[#F7F8FC] border border-[#EAEAEA] rounded-md text-sm text-[#2B2B2B] focus:outline-none focus:border-[#00A3E0] focus:ring-1 focus:ring-[#00A3E0] transition-all resize-none placeholder:text-[#6F6B7D]/60"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-2">
                Prescription & Dosage Details
              </label>
              <textarea 
                rows={3} 
                placeholder="e.g. Amoxicillin 500mg - 1 capsule every 8 hours for 7 days"
                className="w-full p-4 bg-[#F7F8FC] border border-[#EAEAEA] rounded-md text-sm text-[#2B2B2B] focus:outline-none focus:border-[#00A3E0] focus:ring-1 focus:ring-[#00A3E0] transition-all resize-none placeholder:text-[#6F6B7D]/60"
              />
            </div>
            
            <div className="w-full border-2 border-dashed border-[#EAEAEA] rounded-md p-6 text-center cursor-pointer hover:bg-[#F7F8FC] transition-colors group">
              <div className="flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#F4F0F8] flex items-center justify-center mb-3 group-hover:bg-[#FFFFFF] transition-colors">
                  <UploadCloud className="w-5 h-5 text-[#00A3E0]" />
                </div>
                <p className="text-sm font-medium text-[#1F1A67]">Attach Medical Reports</p>
                <p className="text-[12px] text-[#6F6B7D] mt-1">Drag and drop files, or click to browse</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Queue & Alerts */}
        <div className="xl:col-span-1 space-y-6">
          
          <PatientQueue queue={queueData} onSelect={handleStartConsult} />

          {/* Laboratory Alerts */}
          <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg shadow-sm flex flex-col">
            <div className="p-5 border-b border-[#EAEAEA]">
              <h2 className="text-base font-bold text-[#1F1A67]">Laboratory Alerts</h2>
            </div>
            <div className="p-5 space-y-3">
              
              <div className="p-3 bg-[#FDF0F4] border border-[#FDF0F4] rounded-md flex items-start space-x-3">
                <AlertCircle className="w-4 h-4 text-[#C61A4C] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-[#C61A4C]">Critical: Blood Report</div>
                  <div className="text-[12px] text-[#C61A4C]/80 mt-0.5 font-medium">Patient: Robert Miller (RM-99)</div>
                </div>
              </div>

              <div className="p-3 bg-[#F7F8FC] border border-[#EAEAEA] rounded-md flex items-start space-x-3">
                <CheckSquare className="w-4 h-4 text-[#00A3E0] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-[#1F1A67]">Normal: Chest X-Ray</div>
                  <div className="text-[12px] text-[#6F6B7D] mt-0.5 font-medium">Patient: Sarah Jenkins (AP-003)</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}