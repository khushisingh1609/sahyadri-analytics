"use client";

import { 
  Search, 
  Edit, 
  Trash2, 
  Stethoscope, 
  Activity, 
  Pill, 
  Microscope, 
  Users 
} from "lucide-react";

interface StaffTableProps {
  staffList: any[];
  onDelete: (id: string) => void;
}

// Helper to generate initials from the staff name
const getInitials = (name: string) => {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

// Helper to map role string to the appropriate Lucide icon
const getRoleIcon = (role: string) => {
  const lowerRole = role.toLowerCase();
  if (lowerRole.includes("doctor")) return <Stethoscope className="w-3.5 h-3.5 mr-1.5 text-[#00A3E0]" />;
  if (lowerRole.includes("nurse")) return <Activity className="w-3.5 h-3.5 mr-1.5 text-[#00A3E0]" />;
  if (lowerRole.includes("pharmacy")) return <Pill className="w-3.5 h-3.5 mr-1.5 text-[#00A3E0]" />;
  if (lowerRole.includes("lab")) return <Microscope className="w-3.5 h-3.5 mr-1.5 text-[#00A3E0]" />;
  return <Users className="w-3.5 h-3.5 mr-1.5 text-[#00A3E0]" />;
};

export function StaffTable({ staffList, onDelete }: StaffTableProps) {
  return (
    <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-6">
      
      {/* ================= SEARCH BAR ================= */}
      <div className="mb-6">
        <div className="relative w-full max-w-xl">
          <Search className="w-4 h-4 text-[#6F6B7D] absolute left-4 top-1/2 transform -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search staff by ID or Name..." 
            className="w-full pl-11 pr-4 h-[44px] bg-[#F7F8FC] border border-[#EAEAEA] rounded-md text-[14px] text-[#2B2B2B] outline-none focus:border-[#00A3E0] focus:ring-1 focus:ring-[#00A3E0] transition-all placeholder:text-[#6F6B7D]/70"
          />
        </div>
      </div>

      {/* ================= TABLE CONTAINER ================= */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="text-[10px] md:text-[11px] font-semibold text-[#6F6B7D] uppercase tracking-wider border-b border-[#EAEAEA]">
            <tr>
              <th className="px-4 py-4 whitespace-nowrap">STAFF ID</th>
              <th className="px-4 py-4 whitespace-nowrap">EMPLOYEE DETAILS</th>
              <th className="px-4 py-4 whitespace-nowrap">ACCESS ROLE</th>
              <th className="px-4 py-4 whitespace-nowrap">STATUS</th>
              <th className="px-4 py-4 text-right whitespace-nowrap">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAEAEA]">
            {staffList.map((staff) => (
              <tr key={staff.id} className="hover:bg-[#F7F8FC] transition-colors group">
                
                {/* STAFF ID */}
                <td className="px-4 py-4 font-semibold text-[#1F1A67] text-[13px] md:text-[14px] tracking-wide whitespace-nowrap">
                  {staff.id}
                </td>
                
                {/* EMPLOYEE DETAILS */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#F4F0F8] text-[#1F1A67] font-semibold text-[14px] flex items-center justify-center border border-[#EAEAEA] shrink-0">
                      {getInitials(staff.name)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#1F1A67] text-[14px] leading-tight">
                        {staff.name}
                      </span>
                      <span className="text-[12px] text-[#6F6B7D] mt-0.5 leading-tight">
                        {staff.dept}
                      </span>
                    </div>
                  </div>
                </td>
                
                {/* ACCESS ROLE */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="inline-flex items-center px-2.5 py-1.5 rounded-md border border-[#EAEAEA] bg-[#FFFFFF]">
                    {getRoleIcon(staff.role)}
                    <span className="text-[12px] font-medium text-[#1F1A67] leading-none">
                      {staff.role}
                    </span>
                  </div>
                </td>
                
                {/* STATUS */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className={`inline-flex items-center font-medium text-[13px] ${staff.status === 'Active' ? 'text-[#16A34A]' : 'text-[#C61A4C]'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full mr-2 shrink-0 ${staff.status === 'Active' ? 'bg-[#16A34A]' : 'bg-[#C61A4C]'}`}></span>
                    {staff.status}
                  </div>
                </td>
                
                {/* ACTIONS */}
                <td className="px-4 py-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end space-x-2">
                    <button 
                      className="w-8 h-8 rounded-md flex items-center justify-center text-[#6F6B7D] hover:bg-[#F7F8FC] hover:text-[#00A3E0] transition-colors focus:outline-none"
                      aria-label="Edit staff member"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDelete(staff.id)}
                      className="w-8 h-8 rounded-md flex items-center justify-center text-[#6F6B7D] hover:bg-[#F7F8FC] hover:text-[#C61A4C] transition-colors focus:outline-none"
                      aria-label="Delete staff member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= FOOTER / PAGINATION ================= */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[12px] text-[#6F6B7D]">
        <span>Total {staffList.length} members found</span>
        
        <div className="flex items-center space-x-1">
          <button className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-[#F7F8FC] text-[#6F6B7D] transition-colors focus:outline-none">
            &lt;
          </button>
          <button className="w-8 h-8 rounded-md flex items-center justify-center bg-[#1F1A67] text-[#FFFFFF] font-medium shadow-sm focus:outline-none">
            1
          </button>
          <button className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-[#F7F8FC] text-[#6F6B7D] transition-colors focus:outline-none">
            &gt;
          </button>
        </div>
      </div>

    </div>
  );
}