"use client";

import { useState } from "react";
import { Package, Download, Search, Plus, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { DispensingQueue } from "@/components/features/pharmacy/DispensingQueue";
import { InventoryTable } from "@/components/features/pharmacy/InventoryTable";

export default function PharmacyDashboard() {
  const [activeTab, setActiveTab] = useState<"dispensing" | "inventory">("dispensing");
  const [searchQuery, setSearchQuery] = useState("");

  // Local state for queue to allow the onProcess callback to work visually
  const [queue, setQueue] = useState([
    { id: "RX-1042", time: "10:15 AM", patient: "Michael Chen", items: "3 Items • Priority: Normal", doctor: "Dr. John Doe", status: "PENDING" },
    { id: "RX-1043", time: "10:30 AM", patient: "Sarah Jenkins", items: "1 Item • Priority: Urgent", doctor: "Dr. Sarah Smith", status: "URGENT" },
    { id: "RX-1039", time: "09:45 AM", patient: "James Wilson", items: "4 Items • Priority: Normal", doctor: "Dr. John Doe", status: "READY FOR PICKUP" },
    { id: "RX-1035", time: "09:15 AM", patient: "Emily Rodriguez", items: "2 Items • Priority: Normal", doctor: "Dr. Robert Fox", status: "DISPENSED" },
  ]);

  // Mock inventory data for the Inventory tab
  const [inventory] = useState([
    { id: "MED-001", name: "Amoxicillin 500mg", category: "Antibiotics", stock: 145 },
    { id: "MED-002", name: "Paracetamol 650mg", category: "Analgesics", stock: 42 },
    { id: "MED-003", name: "Omeprazole 20mg", category: "Antacids", stock: 230 },
    { id: "MED-004", name: "Atorvastatin 40mg", category: "Statins", stock: 18 },
    { id: "MED-005", name: "Metformin 500mg", category: "Anti-diabetic", stock: 85 },
  ]);

  // Handle process action visually
  const handleProcess = (id: string) => {
    setQueue(queue.map(rx => {
      if (rx.id === id) {
        if (rx.status === "PENDING") return { ...rx, status: "READY FOR PICKUP" };
        if (rx.status === "READY FOR PICKUP" || rx.status === "URGENT") return { ...rx, status: "DISPENSED" };
      }
      return rx;
    }));
  };

  // Local search filtering
  const filteredQueue = queue.filter(rx => 
    rx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rx.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rx.doctor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full px-6 py-6 md:px-8 max-w-[1600px] mx-auto space-y-6 text-[#2B2B2B]">
      
      {/* ================= 1. TOP HEADER ================= */}
      <div className="bg-[#FFFFFF] p-5 md:p-6 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-md bg-[#F4F0F8] flex items-center justify-center shrink-0 border border-[#EAEAEA]">
            <Package className="w-5 h-5 text-[#00A3E0]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1F1A67] tracking-tight">Pharmacy & Inventory</h1>
            <p className="text-[13px] text-[#6F6B7D] mt-0.5">
              Manage prescription dispensing, inventory levels, and supplier operations.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <button className="w-full sm:w-auto px-5 py-2 bg-[#FFFFFF] border border-[#EAEAEA] text-[#2B2B2B] font-medium rounded-md hover:bg-[#F7F8FC] transition-colors text-[13px] shadow-sm flex items-center justify-center focus:outline-none">
            <Download className="w-4 h-4 mr-2 text-[#6F6B7D]" /> Export Logs
          </button>
          <button className="w-full sm:w-auto px-5 py-2 bg-[#1F1A67] text-[#FFFFFF] font-medium rounded-md hover:bg-[#3B3486] transition-colors text-[13px] shadow-sm flex items-center justify-center focus:outline-none">
            <Plus className="w-4 h-4 mr-2" /> New Supplier Order
          </button>
        </div>
      </div>

      {/* ================= 2. KPI CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-md bg-[#E6F6FD] border border-[#00A3E0]/20 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-[#00A3E0]" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-1">Pending Prescriptions</p>
            <p className="text-3xl font-bold text-[#1F1A67] tracking-tight">12</p>
          </div>
        </div>

        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] shadow-sm flex items-center gap-4 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C61A4C]"></div>
          <div className="w-12 h-12 rounded-md bg-[#FDF0F4] border border-[#C61A4C]/20 flex items-center justify-center shrink-0 ml-2">
            <AlertCircle className="w-5 h-5 text-[#C61A4C]" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-1">Low Stock Alerts</p>
            <p className="text-3xl font-bold text-[#C61A4C] tracking-tight">08</p>
          </div>
        </div>

        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-md bg-[#ECFDF5] border border-[#16A34A]/20 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-1">Dispensed Today</p>
            <p className="text-3xl font-bold text-[#1F1A67] tracking-tight">145</p>
          </div>
        </div>
      </div>

      {/* ================= 3. MAIN WORKSPACE ================= */}
      <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg shadow-sm flex flex-col overflow-hidden min-h-[500px]">
        
        {/* Workspace Header & Search */}
        <div className="p-6 border-b border-[#EAEAEA] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-6">
            <button 
              onClick={() => setActiveTab("dispensing")}
              className={`pb-1 text-[14px] font-bold tracking-wide transition-colors border-b-[3px] focus:outline-none ${
                activeTab === "dispensing" 
                  ? "border-[#00A3E0] text-[#1F1A67]" 
                  : "border-transparent text-[#6F6B7D] hover:text-[#1F1A67]"
              }`}
            >
              Dispensing Queue
            </button>
            <button 
              onClick={() => setActiveTab("inventory")}
              className={`pb-1 text-[14px] font-bold tracking-wide transition-colors border-b-[3px] focus:outline-none ${
                activeTab === "inventory" 
                  ? "border-[#00A3E0] text-[#1F1A67]" 
                  : "border-transparent text-[#6F6B7D] hover:text-[#1F1A67]"
              }`}
            >
              Inventory Management
            </button>
          </div>
          
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#6F6B7D] absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search Rx, patient, or medicine..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#F7F8FC] border border-[#EAEAEA] rounded-md text-[13px] text-[#2B2B2B] focus:outline-none focus:border-[#1F1A67] focus:ring-1 focus:ring-[#1F1A67] transition-colors placeholder:text-[#6F6B7D]/70" 
            />
          </div>
        </div>

        {/* Workspace Content */}
        <div className="bg-[#FFFFFF] flex-1">
          {activeTab === "dispensing" && (
            <DispensingQueue queue={filteredQueue} onProcess={handleProcess} />
          )}
          {activeTab === "inventory" && (
            <InventoryTable inventory={filteredInventory} />
          )}
        </div>

      </div>
    </div>
  );
}