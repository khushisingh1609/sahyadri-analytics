"use client";

interface DispensingQueueProps {
  queue: any[];
  onProcess: (id: string) => void;
}

export function DispensingQueue({ queue, onProcess }: DispensingQueueProps) {
  
  // Helpers for exact uppercase status logic
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-[#FFF3E0] text-[#E65100] border-[#E65100]/20";
      case "READY FOR PICKUP":
        return "bg-[#E6F6FD] text-[#00A3E0] border-[#00A3E0]/20";
      case "URGENT":
        return "bg-[#FDF0F4] text-[#C61A4C] border-[#C61A4C]/20";
      case "DISPENSED":
        return "bg-[#ECFDF5] text-[#16A34A] border-[#16A34A]/20";
      default:
        return "bg-[#F7F8FC] text-[#6F6B7D] border-[#EAEAEA]";
    }
  };

  const getActionLabel = (status: string) => {
    if (status === "PENDING") return "Process Rx";
    if (status === "READY FOR PICKUP" || status === "URGENT") return "Dispense";
    if (status === "DISPENSED") return "Completed";
    return "Process";
  };

  if (!queue || queue.length === 0) {
    return (
      <div className="p-12 text-center text-[13px] text-[#6F6B7D]">
        No prescriptions found matching your search.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead className="bg-[#F7F8FC] border-b border-[#EAEAEA]">
          <tr>
            <th className="px-6 py-4 text-[11px] font-bold text-[#00A3E0] uppercase tracking-wider">RX ID / TIME</th>
            <th className="px-6 py-4 text-[11px] font-bold text-[#00A3E0] uppercase tracking-wider">PATIENT INFO</th>
            <th className="px-6 py-4 text-[11px] font-bold text-[#00A3E0] uppercase tracking-wider">PRESCRIBED BY</th>
            <th className="px-6 py-4 text-[11px] font-bold text-[#00A3E0] uppercase tracking-wider">STATUS</th>
            <th className="px-6 py-4 text-[11px] font-bold text-[#00A3E0] uppercase tracking-wider text-right">ACTION</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#EAEAEA]">
          {queue.map((rx) => (
            <tr key={rx.id} className="hover:bg-[#F7F8FC] transition-colors bg-[#FFFFFF]">
              
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-bold text-[#1F1A67] text-[14px] leading-tight">{rx.id}</div>
                <div className="text-[12px] font-medium text-[#6F6B7D] mt-0.5">{rx.time}</div>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-bold text-[#2B2B2B] text-[14px] leading-tight">{rx.patient}</div>
                <div className="text-[12px] font-medium text-[#6F6B7D] mt-0.5">{rx.items}</div>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-[13px] font-semibold text-[#6F6B7D]">{rx.doctor}</span>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-1 rounded border text-[11px] font-bold uppercase tracking-wider ${getStatusStyles(rx.status)}`}>
                  {rx.status}
                </span>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <button 
                  onClick={() => onProcess(rx.id)}
                  disabled={rx.status === "DISPENSED"}
                  className="inline-flex items-center px-4 py-2 bg-[#1F1A67] text-[#FFFFFF] rounded-md text-[12px] font-bold hover:bg-[#3B3486] transition-colors focus:outline-none disabled:bg-[#F4F0F8] disabled:text-[#6F6B7D] disabled:cursor-not-allowed shadow-sm disabled:shadow-none"
                >
                  {getActionLabel(rx.status)}
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}