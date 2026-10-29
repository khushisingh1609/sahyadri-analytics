"use client";

import { useState } from "react";
import { X, UserPlus, User, Briefcase, Building2, Info } from "lucide-react";

interface AddStaffModalProps {
  onClose: () => void;
  onAdd: (staff: { name: string; role: string; dept: string }) => void;
}

export function AddStaffModal({ onClose, onAdd }: AddStaffModalProps) {
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("Doctor");
  const [newDept, setNewDept] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name: newName, role: newRole, dept: newDept });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/45 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="bg-[#FFFFFF] rounded-xl border border-[#EAEAEA] shadow-[0_8px_30px_rgba(31,26,103,0.08)] w-full max-w-[480px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* ================= MODAL HEADER ================= */}
        <div className="px-6 py-5 border-b border-[#EAEAEA] flex items-start justify-between bg-[#FFFFFF]">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#F4F0F8] flex items-center justify-center shrink-0 border border-[#EAEAEA]">
              <UserPlus className="w-5 h-5 text-[#1F1A67]" />
            </div>
            <div>
              <h2 className="text-[18px] font-bold text-[#1F1A67] tracking-tight">Add New Staff Member</h2>
              <p className="text-[13px] text-[#6F6B7D] mt-0.5 leading-relaxed">
                Create a new staff account and assign their department access.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 text-[#6F6B7D] hover:bg-[#F7F8FC] hover:text-[#C61A4C] rounded-md transition-colors shrink-0 focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ================= MODAL FORM ================= */}
        <form onSubmit={handleSubmit} className="px-6 py-6">
          <div className="space-y-5">
            
            {/* Field: Full Name */}
            <div>
              <label className="block text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6F6B7D]" />
                <input 
                  required 
                  type="text" 
                  value={newName} 
                  onChange={e => setNewName(e.target.value)} 
                  placeholder="Enter staff member's full name" 
                  className="w-full pl-9 pr-4 h-[44px] bg-[#FFFFFF] border border-[#EAEAEA] rounded-md text-[14px] text-[#1F1A67] focus:outline-none focus:border-[#00A3E0] focus:ring-1 focus:ring-[#00A3E0] transition-colors placeholder:text-[#6F6B7D]/60" 
                />
              </div>
            </div>

            {/* Field: Role */}
            <div>
              <label className="block text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-2">
                Role
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6F6B7D]" />
                <select 
                  value={newRole} 
                  onChange={e => setNewRole(e.target.value)} 
                  className="w-full pl-9 pr-4 h-[44px] bg-[#FFFFFF] border border-[#EAEAEA] rounded-md text-[14px] text-[#1F1A67] focus:outline-none focus:border-[#00A3E0] focus:ring-1 focus:ring-[#00A3E0] transition-colors appearance-none cursor-pointer"
                >
                  <option value="Doctor">Doctor</option>
                  <option value="Nurse">Nurse</option>
                  <option value="Laboratory">Laboratory</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Reception">Reception</option>
                </select>
                {/* Custom dropdown arrow */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#6F6B7D]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            {/* Field: Department */}
            <div>
              <label className="block text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-2">
                Department
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6F6B7D]" />
                <input 
                  required 
                  type="text" 
                  value={newDept} 
                  onChange={e => setNewDept(e.target.value)} 
                  placeholder="e.g. Cardiology" 
                  className="w-full pl-9 pr-4 h-[44px] bg-[#FFFFFF] border border-[#EAEAEA] rounded-md text-[14px] text-[#1F1A67] focus:outline-none focus:border-[#00A3E0] focus:ring-1 focus:ring-[#00A3E0] transition-colors placeholder:text-[#6F6B7D]/60" 
                />
              </div>
            </div>
          </div>

          {/* ================= ACTION AREA ================= */}
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-5 text-[#6F6B7D]">
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span className="text-[11.5px] leading-tight">Staff credentials will be available after account creation.</span>
            </div>
            
            <div className="flex items-center justify-end gap-3 pt-5 border-t border-[#EAEAEA]">
              <button 
                type="button" 
                onClick={onClose} 
                className="px-5 py-2.5 text-sm font-medium text-[#6F6B7D] bg-[#FFFFFF] border border-[#EAEAEA] rounded-md hover:bg-[#F7F8FC] hover:text-[#1F1A67] transition-colors focus:outline-none"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-5 py-2.5 text-sm font-medium text-[#FFFFFF] bg-[#1F1A67] hover:bg-[#3B3486] rounded-md flex items-center transition-colors focus:outline-none shadow-sm"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Create Staff Account
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}