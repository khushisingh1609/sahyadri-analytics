"use client";

import { UserRound, ArrowRight, TestTube } from "lucide-react";

interface LabQueueProps {
  tests: any[];
  onAction: (id: string, currentStatus: string) => void;
}

export function LabQueue({ tests, onAction }: LabQueueProps) {
  
  // 7. ACTION FUNCTIONALITY MAPPER
  const getActionText = (status: string) => {
    switch (status) {
      case "SAMPLE REQUIRED": return "Collect Sample";
      case "PROCESSING": return "Mark Ready";
      case "RESULT ENTRY": return "Enter Results";
      default: return "View";
    }
  };

  // EMPTY STATE
  if (!tests || tests.length === 0) {
    return (
      <div className="p-16 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-[#F4F0F8] rounded-full flex items-center justify-center mb-4 border border-[#EAEAEA]">
          <TestTube className="w-8 h-8 text-[#00A3E0]" />
        </div>
        <h3 className="text-lg font-bold text-[#1F1A67]">No laboratory requests</h3>
        <p className="text-[13px] text-[#6F6B7D] mt-1">
          All current laboratory requests have been processed.
        </p>
      </div>
    );
  }

  // MAIN TABLE
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[900px]">
        
        <thead className="bg-[#F7F8FC] border-b border-[#EAEAEA]">
          <tr>
            <th className="px-6 py-4 text-[11px] font-bold text-[#1F1A67] uppercase tracking-wider">REQ ID</th>
            <th className="px-6 py-4 text-[11px] font-bold text-[#1F1A67] uppercase tracking-wider">PATIENT / DOCTOR</th>
            <th className="px-6 py-4 text-[11px] font-bold text-[#1F1A67] uppercase tracking-wider">TEST DETAILS</th>
            <th className="px-6 py-4 text-[11px] font-bold text-[#1F1A67] uppercase tracking-wider">STATUS</th>
            <th className="px-6 py-4 text-[11px] font-bold text-[#1F1A67] uppercase tracking-wider text-right">ACTIONS</th>
          </tr>
        </thead>
        
        <tbody className="divide-y divide-[#EAEAEA]">
          {tests.map((test) => (
            <tr key={test.id} className="hover:bg-[#F7F8FC] transition-colors group bg-[#FFFFFF]">
              
              {/* Request ID */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`font-bold text-[14px] ${test.urgent ? "text-[#C61A4C]" : "text-[#1F1A67]"}`}>
                  {test.id}
                </div>
                {test.urgent && (
                  <div className="inline-block mt-1 text-[10px] font-bold text-[#C61A4C] bg-[#FDF0F4] px-1.5 py-0.5 rounded border border-[#C61A4C]/20 uppercase tracking-widest">
                    Urgent
                  </div>
                )}
              </td>
              
              {/* Patient / Doctor */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-[#F4F0F8] text-[#1F1A67] border border-[#EAEAEA] flex items-center justify-center shrink-0">
                    <UserRound className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[#1F1A67] text-[14px] leading-tight">
                      {test.patient}
                    </span>
                    <span className="text-[11px] font-bold text-[#6F6B7D] mt-0.5 leading-tight uppercase tracking-wider">
                      {test.doctor}
                    </span>
                  </div>
                </div>
              </td>
              
              {/* Test Details */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-bold text-[#2B2B2B] text-[13px] leading-tight">
                  {test.type || test.details}
                </div>
                <div className="text-[12px] font-medium text-[#6F6B7D] mt-0.5">
                  {test.category}
                </div>
              </td>
              
              {/* Status */}
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border ${
                  test.status === "SAMPLE REQUIRED" 
                    ? "bg-[#FFF3E0] text-[#E65100] border-[#E65100]/20" 
                    : test.status === "PROCESSING" 
                    ? "bg-[#E6F6FD] text-[#00A3E0] border-[#00A3E0]/20" 
                    : test.status === "RESULT ENTRY"
                    ? "bg-[#F0EFFF] text-[#3B3486] border-[#3B3486]/20"
                    : "bg-[#F7F8FC] text-[#6F6B7D] border-[#EAEAEA]"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5 shrink-0 ${
                    test.status === "SAMPLE REQUIRED" ? "bg-[#E65100]" : 
                    test.status === "PROCESSING" ? "bg-[#00A3E0]" : 
                    test.status === "RESULT ENTRY" ? "bg-[#3B3486]" : "bg-[#6F6B7D]"
                  }`}></span>
                  {test.status}
                </span>
              </td>
              
              {/* Actions */}
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <button 
                  onClick={() => onAction(test.id, test.status)}
                  className="inline-flex items-center px-4 py-2 bg-[#1F1A67] text-[#FFFFFF] rounded-md text-[12px] font-bold hover:bg-[#3B3486] transition-colors focus:outline-none shadow-sm"
                >
                  {getActionText(test.status)}
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}