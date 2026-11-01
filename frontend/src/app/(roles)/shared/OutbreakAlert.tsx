"use client";

import { Activity } from "lucide-react";
import { useEffect, useState } from "react";

export function OutbreakAlert() {
  const [timestamp, setTimestamp] = useState("");

  // Bypass browser caching so the Matplotlib chart is always live
  useEffect(() => {
    setTimestamp(`?t=${Date.now()}`);
  }, []);

  return (
    <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg shadow-sm flex flex-col overflow-hidden w-full">
      <div className="p-4 border-b border-[#EAEAEA] flex items-center gap-3 bg-[#FCF8F9]">
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C61A4C] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C61A4C]"></span>
        </div>
        <div>
          <h3 className="text-[14px] font-bold text-[#C61A4C] uppercase tracking-wider">
            Live ML Outbreak Alerts
          </h3>
          <p className="text-[11px] text-[#6F6B7D] font-medium mt-0.5">
            Epidemiological predictions powered by AI Model
          </p>
        </div>
      </div>
      
      <div className="w-full bg-[#FFFFFF] p-4 flex justify-center items-center min-h-[300px]">
        {/* Streams the Matplotlib Outbreak Chart from FastAPI */}
        <img 
          src={`http://127.0.0.1:8000/api/admin/charts/outbreak${timestamp}`} 
          alt="ML Outbreak Trends" 
          className="max-w-full h-full object-contain rounded-md drop-shadow-sm"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      </div>
    </div>
  );
}