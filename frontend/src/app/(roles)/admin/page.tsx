"use client";

import Link from "next/link";
import { Download, UserPlus, ArrowUpRight, ArrowDownRight, IndianRupee, Users, Bed, Activity } from "lucide-react";

export default function AdminDashboard() {
  const departments = [
    { name: "Cardiology", patients: 145, revenue: "₹4,50,000", trend: "+12%", positive: true },
    { name: "Orthopedics", patients: 98, revenue: "₹3,20,000", trend: "+5%", positive: true },
    { name: "General Medicine", patients: 312, revenue: "₹2,10,000", trend: "-2%", positive: false },
    { name: "Pediatrics", patients: 156, revenue: "₹1,80,000", trend: "+8%", positive: true },
  ];

  const activities = [
    { user: "Dr. Sarah Smith", action: "Completed 5 consultations", time: "10 mins ago", color: "bg-[#00A3E0]" },
    { user: "Nurse Jenkins", action: "Updated vitals for Ward A", time: "25 mins ago", color: "bg-[#3B3486]" },
    { user: "Reception Desk", action: "Registered 12 new patients", time: "1 hour ago", color: "bg-[#1F1A67]" },
    { user: "Pharmacy Sys", action: "Generated low stock alert", time: "2 hours ago", color: "bg-[#FFB81C]" },
  ];

  return (
    <div className="w-full px-6 py-6 md:px-8 max-w-[1600px] mx-auto space-y-6">
      
      {/* ================= PAGE HEADER ================= */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4 border-b border-[#EAEAEA]">
        <div>
          <div className="text-[10px] font-bold text-[#6F6B7D] uppercase tracking-widest mb-1.5">
            Administration / Overview
          </div>
          <h1 className="text-2xl font-bold text-[#1F1A67] tracking-tight">Hospital Administration</h1>
          <p className="text-sm text-[#6F6B7D] mt-1">Monitor hospital operations, staff activity and financial performance.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 border border-[#EAEAEA] text-[#2B2B2B] bg-white rounded text-sm font-medium hover:bg-[#F4F0F8] transition-colors">
            <Download className="w-4 h-4 mr-2 text-[#6F6B7D]" /> Export Report
          </button>
          <Link href="/admin/staff" className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 bg-[#1F1A67] text-white rounded text-sm font-medium hover:bg-[#3B3486] transition-colors">
            <UserPlus className="w-4 h-4 mr-2" /> Manage Staff
          </Link>
        </div>
      </div>

      {/* ================= KPI STRIP (FLAT DESIGN) ================= */}
      <div className="bg-white border border-[#EAEAEA] rounded-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#EAEAEA]">
        
        {/* Revenue */}
        <div className="p-5">
          <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider block mb-2">Today's Revenue</span>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold text-[#1F1A67] tracking-tight">₹1,24,500</span>
            <span className="flex items-center text-xs font-bold text-[#00A3E0]">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> 8.4%
            </span>
          </div>
        </div>

        {/* OPD Footfall */}
        <div className="p-5">
          <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider block mb-2">OPD Footfall</span>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold text-[#1F1A67] tracking-tight">482</span>
            <span className="flex items-center text-xs font-bold text-[#00A3E0]">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> 12%
            </span>
          </div>
        </div>

        {/* Bed Occupancy */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider block">Bed Occupancy</span>
            <span className="text-[10px] text-[#6F6B7D]">Capacity 200</span>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold text-[#1F1A67] tracking-tight">78%</span>
          </div>
        </div>

        {/* Active Staff */}
        <div className="p-5">
          <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider block mb-2">Staff Online</span>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold text-[#1F1A67] tracking-tight">124</span>
          </div>
        </div>

      </div>

      {/* ================= MAIN DATA GRIDS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Department Performance */}
        <div className="lg:col-span-2 flex flex-col bg-white border border-[#EAEAEA] rounded-md">
          <div className="p-5 border-b border-[#EAEAEA]">
            <h2 className="text-lg font-bold text-[#1F1A67]">Department Performance</h2>
            <p className="text-[13px] text-[#6F6B7D] mt-0.5">Metrics overview for the current week</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="px-5 py-3 text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider border-b border-[#EAEAEA]">Department</th>
                  <th className="px-5 py-3 text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider border-b border-[#EAEAEA]">Patients Seen</th>
                  <th className="px-5 py-3 text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider border-b border-[#EAEAEA]">Revenue</th>
                  <th className="px-5 py-3 text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider border-b border-[#EAEAEA] text-right">Trend</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept, i) => (
                  <tr key={i} className="hover:bg-[#FAF9FC] transition-colors border-b border-[#EAEAEA] last:border-b-0">
                    <td className="px-5 py-4 font-semibold text-[#1F1A67] text-sm whitespace-nowrap">{dept.name}</td>
                    <td className="px-5 py-4 text-sm text-[#2B2B2B] whitespace-nowrap">{dept.patients}</td>
                    <td className="px-5 py-4 font-semibold text-[#1F1A67] text-sm whitespace-nowrap">{dept.revenue}</td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className={`flex items-center justify-end text-sm font-bold ${dept.positive ? 'text-[#00A3E0]' : 'text-[#C61A4C]'}`}>
                        {dept.trend}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Activity Timeline */}
        <div className="lg:col-span-1 flex flex-col bg-white border border-[#EAEAEA] rounded-md">
          <div className="p-5 border-b border-[#EAEAEA]">
            <h2 className="text-lg font-bold text-[#1F1A67]">System Activity</h2>
          </div>
          
          <div className="p-6 relative">
            {/* Minimal Timeline Border */}
            <div className="absolute left-[31px] top-8 bottom-8 w-px bg-[#EAEAEA]"></div>
            
            <div className="space-y-6">
              {activities.map((log, i) => (
                <div key={i} className="relative flex items-start gap-4">
                  <div className={`w-2 h-2 rounded-full ${log.color} mt-1.5 ring-4 ring-white z-10 shrink-0`}></div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#1F1A67] leading-tight">{log.user}</span>
                    <span className="text-[13px] text-[#2B2B2B] mt-0.5">{log.action}</span>
                    <span className="text-[11px] font-medium text-[#6F6B7D] mt-1 uppercase tracking-wider">{log.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}