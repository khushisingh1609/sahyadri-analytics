"use client";

import { useState } from "react";
import { Activity, X, Save } from "lucide-react";

interface VitalsModalProps {
  bedId: string;
  onClose: () => void;
}

export function VitalsModal({ bedId, onClose }: VitalsModalProps) {
  // Maintained existing default values as requested
  const [bp, setBp] = useState("120/80");
  const [temp, setTemp] = useState("98.6");
  const [hr, setHr] = useState("72");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Preserved the exact submission behavior
    alert(`Vitals updated successfully for bed ${bedId}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F1A67]/50 backdrop-blur-sm">
      <div className="w-full max-w-[440px] bg-[#FFFFFF] rounded-lg shadow-xl border border-[#EAEAEA] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* ================= MODAL HEADER ================= */}
        <div className="px-6 py-5 border-b border-[#EAEAEA] flex justify-between items-start bg-[#FFFFFF]">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-md bg-[#F4F0F8] flex items-center justify-center shrink-0 border border-[#EAEAEA]">
              <Activity className="w-5 h-5 text-[#1F1A67]" />
            </div>
            <div>
              <h2 className="text-[18px] font-bold text-[#1F1A67] tracking-tight">Record Vitals</h2>
              <p className="text-[13px] font-semibold text-[#6F6B7D] mt-0.5">
                Bed: <span className="text-[#00A3E0] uppercase tracking-wider">{bedId}</span>
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 text-[#6F6B7D] hover:bg-[#F7F8FC] hover:text-[#C61A4C] rounded-md transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ================= MODAL BODY / FORM ================= */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-1.5">
                Blood Pressure (mmHg)
              </label>
              <input
                type="text"
                required
                value={bp}
                onChange={(e) => setBp(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F7F8FC] border border-[#EAEAEA] rounded-md text-[14px] text-[#2B2B2B] focus:outline-none focus:border-[#1F1A67] focus:ring-1 focus:ring-[#1F1A67] transition-all"
                placeholder="e.g. 120/80"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-1.5">
                Temperature (°F)
              </label>
              <input
                type="text"
                required
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F7F8FC] border border-[#EAEAEA] rounded-md text-[14px] text-[#2B2B2B] focus:outline-none focus:border-[#1F1A67] focus:ring-1 focus:ring-[#1F1A67] transition-all"
                placeholder="e.g. 98.6"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-1.5">
                Heart Rate (BPM)
              </label>
              <input
                type="text"
                required
                value={hr}
                onChange={(e) => setHr(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F7F8FC] border border-[#EAEAEA] rounded-md text-[14px] text-[#2B2B2B] focus:outline-none focus:border-[#1F1A67] focus:ring-1 focus:ring-[#1F1A67] transition-all"
                placeholder="e.g. 72"
              />
            </div>
          </div>

          {/* ================= MODAL FOOTER ================= */}
          <div className="mt-8 flex items-center justify-end gap-3 pt-5 border-t border-[#EAEAEA]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-[#6F6B7D] bg-[#FFFFFF] border border-[#EAEAEA] rounded-md hover:bg-[#F7F8FC] hover:text-[#1F1A67] transition-colors focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-medium text-[#FFFFFF] bg-[#1F1A67] hover:bg-[#3B3486] rounded-md flex items-center transition-colors shadow-sm focus:outline-none"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Vitals Log
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}