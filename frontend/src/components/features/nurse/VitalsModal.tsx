"use client";

import { useState } from "react";
import { X, Activity } from "lucide-react";
import { saveNurseVitals } from "@/services/api";

interface VitalsModalProps {
  bed: any; // Pass the full bed object containing the uhid
  onClose: () => void;
}

export function VitalsModal({ bed, onClose }: VitalsModalProps) {
  const [bp, setBp] = useState("120/80");
  const [temperature, setTemperature] = useState("98.6");
  const [heartRate, setHeartRate] = useState("75");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Send the live vitals to FastAPI using the patient's real UHID
    await saveNurseVitals({
      uhid: bed.uhid,
      bp,
      heartRate,
      temperature,
    });

    setIsSubmitting(false);
    onClose();
    window.location.reload(); // Refresh to reflect changes
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl border border-[#EAEAEA] space-y-5">
        <div className="flex justify-between items-center border-b border-[#EAEAEA] pb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F4F0F8] flex items-center justify-center text-[#1F1A67]">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1F1A67]">Record Vitals</h3>
              <p className="text-xs text-[#6F6B7D]">Bed: {bed.id} | Patient: {bed.patient}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#6F6B7D] hover:text-[#1F1A67]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-1">Blood Pressure (mmHg)</label>
            <input 
              type="text" 
              value={bp} 
              onChange={(e) => setBp(e.target.value)} 
              className="w-full p-3 bg-[#F7F8FC] border border-[#EAEAEA] rounded-md text-sm text-[#2B2B2B] focus:outline-none focus:border-[#00A3E0]" 
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-1">Temperature (°F)</label>
            <input 
              type="text" 
              value={temperature} 
              onChange={(e) => setTemperature(e.target.value)} 
              className="w-full p-3 bg-[#F7F8FC] border border-[#EAEAEA] rounded-md text-sm text-[#2B2B2B] focus:outline-none focus:border-[#00A3E0]" 
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-1">Heart Rate (bpm)</label>
            <input 
              type="text" 
              value={heartRate} 
              onChange={(e) => setHeartRate(e.target.value)} 
              className="w-full p-3 bg-[#F7F8FC] border border-[#EAEAEA] rounded-md text-sm text-[#2B2B2B] focus:outline-none focus:border-[#00A3E0]" 
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-[#EAEAEA]">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 border border-[#EAEAEA] text-sm font-medium rounded-md text-[#6F6B7D] hover:bg-[#F7F8FC]"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-5 py-2 bg-[#1F1A67] text-white text-sm font-medium rounded-md hover:bg-[#3B3486] transition-colors shadow-sm"
            >
              {isSubmitting ? "Saving..." : "Save Vitals Log"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}