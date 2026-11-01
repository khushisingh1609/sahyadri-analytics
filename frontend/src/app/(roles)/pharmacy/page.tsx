"use client";

import { useState, useEffect } from "react";
import { Pill, Search } from "lucide-react";
import { fetchPrescriptions } from "@/services/api";
import { OutbreakAlert } from "@/app/(roles)/shared/OutbreakAlert";

export default function PharmacyDashboard() {
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch live prescriptions from FastAPI on mount
  useEffect(() => {
    async function loadPharmacyData() {
      const data = await fetchPrescriptions();
      setPrescriptions(Array.isArray(data) ? data : []);
      setIsLoading(false);
    }
    loadPharmacyData();
  }, []);

  // Calculate KPIs dynamically
  const pendingCount = prescriptions.filter(p => p.status === "PENDING").length;
  const readyCount = prescriptions.filter(p => p.status === "READY").length;
  const completedCount = prescriptions.filter(p => p.status === "DISPENSED").length;

  return (
    <div className="w-full px-6 py-6 md:px-8 max-w-[1600px] mx-auto space-y-6 text-[#2B2B2B]">
      
      {/* ================= 1. HEADER ================= */}
      <div className="bg-[#FFFFFF] p-5 md:p-6 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-md bg-[#F4F0F8] flex items-center justify-center shrink-0 border border-[#EAEAEA]">
            <Pill className="w-5 h-5 text-[#16A34A]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1F1A67] tracking-tight">Pharmacy Dispensary</h1>
            <p className="text-[13px] text-[#6F6B7D] mt-0.5">Manage prescriptions, inventory, and dispensing.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#6F6B7D] absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search Patient or RX ID..." 
              className="w-full pl-9 pr-4 py-2 bg-[#F7F8FC] border border-[#EAEAEA] rounded-md text-[13px] text-[#2B2B2B] focus:outline-none focus:border-[#16A34A]" 
            />
          </div>
        </div>
      </div>

      {/* ================= 2. KPIs ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] border-l-4 border-l-[#F59E0B] shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-2">Pending Orders</span>
          <span className="text-3xl font-bold text-[#1F1A67] tracking-tight">{String(pendingCount).padStart(2, '0')}</span>
        </div>
        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] border-l-4 border-l-[#00A3E0] shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-2">Ready for Pickup</span>
          <span className="text-3xl font-bold text-[#1F1A67] tracking-tight">{String(readyCount).padStart(2, '0')}</span>
        </div>
        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] border-l-4 border-l-[#16A34A] shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-2">Dispensed Today</span>
          <span className="text-3xl font-bold text-[#1F1A67] tracking-tight">{String(completedCount).padStart(2, '0')}</span>
        </div>
      </div>

      {/* ================= 3. QUEUE TABLE ================= */}
      <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg shadow-sm">
        <div className="p-6 border-b border-[#EAEAEA] flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-[#1F1A67]">Prescription Queue</h2>
          </div>
          <div className="px-3 py-1 bg-[#F4F0F8] border border-[#EAEAEA] rounded text-[12px] font-bold text-[#1F1A67] uppercase">
            {prescriptions.length} Active
          </div>
        </div>

        <div className="p-0">
          {isLoading ? (
            <div className="p-12 text-center text-sm text-[#6F6B7D]">Loading prescriptions from database...</div>
          ) : prescriptions.length === 0 ? (
            <div className="p-12 text-center text-sm text-[#6F6B7D]">No pending prescriptions found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-[#F7F8FC] border-b border-[#EAEAEA] text-[#6F6B7D] uppercase tracking-wider text-[11px] font-bold">
                  <tr>
                    <th className="px-6 py-4">RX ID / Date</th>
                    <th className="px-6 py-4">Patient</th>
                    <th className="px-6 py-4">Medication & Dosage</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAEAEA]">
                  {prescriptions.map((rx, idx) => (
                    <tr key={idx} className="hover:bg-[#F7F8FC] transition-colors">
                      <td className="px-6 py-4 font-medium text-[#1F1A67]">{rx.id}<div className="text-[11px] text-[#6F6B7D] font-normal">{rx.date}</div></td>
                      <td className="px-6 py-4 font-semibold text-[#2B2B2B]">{rx.patient}</td>
                      <td className="px-6 py-4 text-[#1F1A67] font-medium">{rx.medication}<div className="text-[12px] text-[#6F6B7D]">{rx.dosage}</div></td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          rx.status === 'PENDING' ? 'bg-[#FFFBEB] text-[#F59E0B] border border-[#FEF3C7]' : 
                          rx.status === 'READY' ? 'bg-[#F0F9FF] text-[#00A3E0] border border-[#E0F2FE]' : 
                          'bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7]'
                        }`}>
                          {rx.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="px-4 py-1.5 bg-[#1F1A67] text-white rounded text-[12px] font-medium hover:bg-[#3B3486] transition-colors shadow-sm">
                          Prepare
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <OutbreakAlert/>
        </div>
      </div>
    </div>
  );
  
}