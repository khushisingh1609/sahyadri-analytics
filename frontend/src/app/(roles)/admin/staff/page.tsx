"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { StaffTable } from "@/components/features/admin/StaffTable";
import { AddStaffModal } from "@/components/features/admin/AddStaffModal";

export default function StaffManagement() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [staffList, setStaffList] = useState([
    { id: "DOC-10492", name: "Dr. John Doe", role: "Doctor", dept: "Cardiology", status: "Active" },
    { id: "NUR-40211", name: "Sarah Jenkins", role: "Nurse", dept: "Ward A", status: "Active" },
    { id: "PHM-9034", name: "Robert Fox", role: "Pharmacy", dept: "Inventory", status: "Inactive" },
  ]);

  const handleAddStaff = (newStaff: { name: string; role: string; dept: string }) => {
    const formattedStaff = {
      id: `${newStaff.role.substring(0,3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      ...newStaff,
      status: "Active"
    };
    
    setStaffList([formattedStaff, ...staffList]);
    setShowAddModal(false);
  };

  const handleDeleteStaff = (id: string) => {
    setStaffList(staffList.filter(staff => staff.id !== id));
  };

  return (
    <div className="w-full px-6 py-6 md:px-8 max-w-[1600px] mx-auto space-y-6">
      
      {/* ================= PAGE HEADER ================= */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-4 border-b border-[#EAEAEA]">
        <div>
          <div className="text-[10px] font-bold text-[#6F6B7D] uppercase tracking-widest mb-1.5">
            Administration / Staff
          </div>
          <h1 className="text-2xl font-bold text-[#1F1A67] tracking-tight">Staff Management</h1>
          <p className="text-sm text-[#6F6B7D] mt-1">Manage hospital employees, roles, departments and system access.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-[#1F1A67] text-white font-medium rounded hover:bg-[#3B3486] text-sm transition-colors flex items-center shrink-0"
        >
          <UserPlus className="w-4 h-4 mr-2" /> Add New Staff
        </button>
      </div>

      {/* ================= FEATURE COMPONENTS ================= */}
      <div className="bg-white border border-[#EAEAEA] rounded-md overflow-hidden">
        {/* 
          No changes required for the internal functionality of StaffTable.
          It is safely wrapped in a clean, flat container matching the Sahyadri identity.
        */}
        <StaffTable staffList={staffList} onDelete={handleDeleteStaff} />
      </div>
      
      {/* 
        No changes required for the internal functionality of AddStaffModal.
        It remains fully integrated with the React state of this page.
      */}
      {showAddModal && (
        <AddStaffModal 
          onClose={() => setShowAddModal(false)} 
          onAdd={handleAddStaff} 
        />
      )}
    </div>
  );
}