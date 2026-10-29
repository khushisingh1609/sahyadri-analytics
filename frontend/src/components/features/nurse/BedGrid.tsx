"use client";

import { Bed } from "lucide-react";

interface BedData {
  id: string;
  status: string;
  patient: string;
  info: string;
}

interface BedGridProps {
  beds: BedData[];
  onSelectBed: (bedId: string) => void;
}

// Helpers for the strict Sahyadri Hospital palette based on exact uppercase status
const getStatusStyles = (status: string) => {
  switch (status) {
    case "OCCUPIED":
      return { bg: "bg-[#E6F6FD]", text: "text-[#00A3E0]", border: "border-[#00A3E0]/20" };
    case "AVAILABLE":
      return { bg: "bg-[#ECFDF5]", text: "text-[#16A34A]", border: "border-[#16A34A]/20" };
    case "CLEANING":
      return { bg: "bg-[#FFFBEB]", text: "text-[#F59E0B]", border: "border-[#F59E0B]/20" };
    case "EMERGENCY":
      return { bg: "bg-[#FDF0F4]", text: "text-[#C61A4C]", border: "border-[#C61A4C]/20" };
    default:
      return { bg: "bg-[#F4F0F8]", text: "text-[#6F6B7D]", border: "border-[#EAEAEA]" };
  }
};

export function BedGrid({ beds, onSelectBed }: BedGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {beds.map((bed) => {
        const styles = getStatusStyles(bed.status);

        return (
          <div
            key={bed.id}
            onClick={() => onSelectBed(bed.id)}
            className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-5 cursor-pointer hover:border-[#1F1A67]/30 hover:shadow-[0_4px_12px_rgba(31,26,103,0.06)] hover:bg-[#FAF9FC] transition-all flex flex-col"
          >
            {/* Header: Icon & ID */}
            <div className="flex justify-between items-start mb-4">
              <div className="w-8 h-8 rounded-md bg-[#F4F0F8] flex items-center justify-center border border-[#EAEAEA]">
                <Bed className="w-4 h-4 text-[#1F1A67]" />
              </div>
              <span className="font-bold text-[#1F1A67] text-[15px]">{bed.id}</span>
            </div>

            {/* Status Badge */}
            <div className="mb-3">
              <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border ${styles.bg} ${styles.text} ${styles.border}`}>
                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${bed.status === 'OCCUPIED' ? 'bg-[#00A3E0]' : bed.status === 'AVAILABLE' ? 'bg-[#16A34A]' : bed.status === 'CLEANING' ? 'bg-[#F59E0B]' : 'bg-[#C61A4C]'}`}></span>
                {bed.status}
              </span>
            </div>

            {/* Patient Info */}
            <div className="mt-auto">
              <p className="font-semibold text-[#1F1A67] text-[14px] leading-tight truncate">
                {bed.patient}
              </p>
              <p className="text-[11px] font-semibold text-[#6F6B7D] mt-1.5 uppercase tracking-wider truncate">
                {bed.info}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}