"use client";

import { TrendingUp, ArrowUpRight, ArrowDownRight, Info, CreditCard } from "lucide-react";
import { OutbreakAlert } from "@/app/(roles)/shared/OutbreakAlert";// Importing our new universal component

export default function AdminFinanceDashboard() {
  return (
    <div className="w-full px-6 py-6 md:px-8 max-w-[1600px] mx-auto space-y-6 text-[#2B2B2B]">
      
      {/* ================= 1. KPI CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider">Total Revenue</span>
            <span className="text-[#1F1A67] font-serif font-bold text-lg">₹</span>
          </div>
          <span className="text-3xl font-bold text-[#1F1A67] tracking-tight">₹42,80,000</span>
          <div className="flex items-center gap-1 mt-3 text-[12px] font-bold text-[#00A3E0]">
            <ArrowUpRight className="w-4 h-4" />
            <span>12.4% <span className="text-[#6F6B7D] font-normal">vs. previous month</span></span>
          </div>
        </div>

        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider">Total Collections</span>
            <CreditCard className="w-4 h-4 text-[#1F1A67]" />
          </div>
          <span className="text-3xl font-bold text-[#1F1A67] tracking-tight">₹38,40,000</span>
          <div className="flex items-center gap-1 mt-3 text-[12px] font-bold text-[#00A3E0]">
            <ArrowUpRight className="w-4 h-4" />
            <span>8.7% <span className="text-[#6F6B7D] font-normal">vs. previous month</span></span>
          </div>
        </div>

        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider">Outstanding Payments</span>
            <Info className="w-4 h-4 text-[#6F6B7D]" />
          </div>
          <span className="text-3xl font-bold text-[#1F1A67] tracking-tight">₹4,40,000</span>
          <div className="flex items-center gap-1 mt-3 text-[12px] font-bold text-[#00A3E0]">
            <ArrowDownRight className="w-4 h-4" />
            <span>4.2% <span className="text-[#6F6B7D] font-normal">vs. previous month</span></span>
          </div>
        </div>

        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider">Avg Revenue / Patient</span>
            <TrendingUp className="w-4 h-4 text-[#1F1A67]" />
          </div>
          <span className="text-3xl font-bold text-[#1F1A67] tracking-tight">₹8,920</span>
          <div className="flex items-center gap-1 mt-3 text-[12px] font-bold text-[#00A3E0]">
            <ArrowUpRight className="w-4 h-4" />
            <span>6.1% <span className="text-[#6F6B7D] font-normal">vs. previous month</span></span>
          </div>
        </div>
      </div>

      {/* ================= 2. CHARTS GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Matplotlib Revenue Chart */}
        <div className="lg:col-span-2 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg shadow-sm flex flex-col">
          <div className="p-6 border-b border-[#EAEAEA] flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-[#1F1A67]">Revenue Overview</h2>
              <p className="text-[13px] text-[#6F6B7D] mt-0.5">Monthly revenue generated via Python Matplotlib</p>
            </div>
          </div>
          <div className="p-4 flex-grow flex items-center justify-center min-h-[300px] bg-[#FCFCFD]">
            {/* THIS IS THE LIVE PYTHON GRAPH */}
            <img 
              src="http://127.0.0.1:8000/api/admin/charts/finance" 
              alt="Matplotlib Revenue Chart" 
              className="max-w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Right: Payment Breakdown (Static as per your UI) */}
        <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg shadow-sm flex flex-col">
          <div className="p-6 border-b border-[#EAEAEA]">
            <h2 className="text-lg font-bold text-[#1F1A67]">Payment Breakdown</h2>
            <p className="text-[13px] text-[#6F6B7D] mt-0.5">Collection by payment method</p>
          </div>
          <div className="p-6 space-y-6">
            
            <div>
              <div className="flex justify-between text-[13px] mb-2">
                <span className="font-bold text-[#2B2B2B]">UPI</span>
                <span className="font-bold text-[#1F1A67]">₹16.13L <span className="text-[#6F6B7D] font-normal">(42%)</span></span>
              </div>
              <div className="w-full bg-[#F4F0F8] rounded-full h-2.5">
                <div className="bg-[#1F1A67] h-2.5 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[13px] mb-2">
                <span className="font-bold text-[#2B2B2B]">Card</span>
                <span className="font-bold text-[#1F1A67]">₹10.75L <span className="text-[#6F6B7D] font-normal">(28%)</span></span>
              </div>
              <div className="w-full bg-[#F4F0F8] rounded-full h-2.5">
                <div className="bg-[#00A3E0] h-2.5 rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[13px] mb-2">
                <span className="font-bold text-[#2B2B2B]">Insurance</span>
                <span className="font-bold text-[#1F1A67]">₹6.91L <span className="text-[#6F6B7D] font-normal">(18%)</span></span>
              </div>
              <div className="w-full bg-[#F4F0F8] rounded-full h-2.5">
                <div className="bg-[#3B82F6] h-2.5 rounded-full" style={{ width: '18%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[13px] mb-2">
                <span className="font-bold text-[#2B2B2B]">Cash</span>
                <span className="font-bold text-[#1F1A67]">₹4.61L <span className="text-[#6F6B7D] font-normal">(12%)</span></span>
              </div>
              <div className="w-full bg-[#F4F0F8] rounded-full h-2.5">
                <div className="bg-[#9CA3AF] h-2.5 rounded-full" style={{ width: '12%' }}></div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ================= 3. UNIVERSAL OUTBREAK ALERTS COMPONENT ================= */}
      <OutbreakAlert />

    </div>
  );
}