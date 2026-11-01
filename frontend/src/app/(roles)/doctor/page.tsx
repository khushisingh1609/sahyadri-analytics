"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Clock, CheckSquare, ArrowUpRight, AlertCircle, CheckCircle2, Stethoscope } from "lucide-react";
import { PatientQueue, QueuePatient } from "@/components/features/doctor/PatientQueue";
import { fetchDoctorQueue } from "@/services/api";
import { OutbreakAlert } from "@/app/(roles)/shared/OutbreakAlert";

export default function DoctorDashboard() {
  const router = useRouter();
  const [queueData, setQueueData] = useState<QueuePatient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadQueue() {
      const data = await fetchDoctorQueue();
      setQueueData(data);
      setIsLoading(false);
    }
    loadQueue();
  }, []);

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
              Patient: <span className="font-semibold text-[#1F1A67]">{queueData[0]?.name || '...'} ({queueData[0]?.id || '...'})</span>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-[#2B2B2B] bg-[#F7F8FC] px-4 py-2.5 rounded-md border border-[#EAEAEA]">
            <Clock className="w-4 h-4 text-[#00A3E0]" />
            <span className="text-sm font-semibold">Live</span>
          </div>
        </div>
      </div>

      {/* ================= B. STATISTICS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-2">Total Consults</span>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-[#1F1A67] tracking-tight">{queueData.length}</span>
            <span className="flex items-center text-xs font-bold text-[#00A3E0]">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> Live Sync
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
            <span className="text-3xl font-bold text-[#1F1A67] tracking-tight">0</span>
            <span className="flex items-center text-xs font-medium text-[#6F6B7D]">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-[#16A34A]" /> Synced with DB
            </span>
          </div>
        </div>
      </div>

      {/* ================= C. QUEUE WORKSPACE ================= */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg shadow-sm">
          {isLoading ? (
            <div className="p-8 text-center text-sm text-[#6F6B7D]">Loading live patient queue from database...</div>
          ) : (
            <PatientQueue queue={queueData} onSelect={handleStartConsult} />
          )}
          <OutbreakAlert/>
        </div>
      </div>
    </div>
  );
  
}
