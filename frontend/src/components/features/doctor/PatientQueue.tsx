"use client";

import { Users, FileText, User } from "lucide-react";

export interface QueuePatient {
  id: string;
  name: string;
  type: string;
  time: string;
}

interface PatientQueueProps {
  queue: QueuePatient[];
  onSelect: (id: string) => void;
}

// Generates an initial-based avatar
const getInitials = (name: string) => {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  return parts.length >= 2 
    ? (parts[0][0] + parts[1][0]).toUpperCase() 
    : name.substring(0, 2).toUpperCase();
};

export function PatientQueue({ queue, onSelect }: PatientQueueProps) {
  return (
    <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg shadow-sm flex flex-col">
      <div className="p-5 border-b border-[#EAEAEA] flex justify-between items-center">
        <h2 className="text-base font-bold text-[#1F1A67] flex items-center">
          <Users className="w-4 h-4 mr-2 text-[#00A3E0]" />
          Today's Queue
        </h2>
        <span className="bg-[#F4F0F8] text-[#1F1A67] border border-[#EAEAEA] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
          {queue.length} Waiting
        </span>
      </div>
      
      <div className="divide-y divide-[#EAEAEA]">
        {queue.map((patient) => (
          <div key={patient.id} className="p-5 hover:bg-[#F7F8FC] transition-colors">
            
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#F4F0F8] text-[#1F1A67] border border-[#EAEAEA] flex items-center justify-center font-bold text-sm shrink-0">
                {getInitials(patient.name)}
              </div>
              <div>
                <div className="font-bold text-[#1F1A67] text-[14px] leading-tight">{patient.name}</div>
                <div className="text-[11px] font-semibold text-[#6F6B7D] uppercase tracking-wider mt-1">
                  {patient.id} • {patient.type}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="px-2.5 py-1 bg-[#FFFFFF] border border-[#EAEAEA] text-[#2B2B2B] rounded text-[11px] font-bold">
                {patient.time}
              </span>
              <button 
                onClick={() => onSelect(patient.id)}
                className="px-4 py-2 bg-[#FFFFFF] border border-[#EAEAEA] text-[#1F1A67] rounded-md text-xs font-semibold hover:bg-[#1F1A67] hover:text-[#FFFFFF] transition-colors flex items-center shadow-sm"
              >
                <FileText className="w-3.5 h-3.5 mr-1.5" /> Start Consult
              </button>
            </div>

          </div>
        ))}
        {queue.length === 0 && (
          <div className="p-6 text-center text-[13px] text-[#6F6B7D] font-medium">
            No patients currently in queue.
          </div>
        )}
      </div>
    </div>
  );
}