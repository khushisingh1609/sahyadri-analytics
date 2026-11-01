"use client";

import { useState, useEffect } from "react";
import { Users, Search, CreditCard, DollarSign } from "lucide-react";
import { fetchInvoices } from "@/services/api";
import { OutbreakAlert } from "@/app/(roles)/shared/OutbreakAlert";

export default function ReceptionDashboard() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch live invoices from FastAPI on mount
  useEffect(() => {
    async function loadReceptionData() {
      const data = await fetchInvoices();
      setInvoices(Array.isArray(data) ? data : []);
      setIsLoading(false);
    }
    loadReceptionData();
  }, []);

  // Calculate live financial KPIs
  const paidInvoices = invoices.filter(inv => inv.status === "PAID");
  const pendingInvoices = invoices.filter(inv => inv.status === "UNPAID" || inv.status === "PENDING");
  
  const totalRevenue = paidInvoices.reduce((acc, curr) => acc + curr.amount, 0);
  const pendingAmount = pendingInvoices.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="w-full px-6 py-6 md:px-8 max-w-[1600px] mx-auto space-y-6 text-[#2B2B2B]">
      
      {/* ================= 1. HEADER ================= */}
      <div className="bg-[#FFFFFF] p-5 md:p-6 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-md bg-[#F4F0F8] flex items-center justify-center shrink-0 border border-[#EAEAEA]">
            <Users className="w-5 h-5 text-[#1F1A67]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1F1A67] tracking-tight">Front Desk & Billing</h1>
            <p className="text-[13px] text-[#6F6B7D] mt-0.5">Manage patient registrations, appointments, and payments.</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#6F6B7D] absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search Patient or Invoice..." 
              className="w-full pl-9 pr-4 py-2 bg-[#F7F8FC] border border-[#EAEAEA] rounded-md text-[13px] text-[#2B2B2B] focus:outline-none focus:border-[#1F1A67]" 
            />
          </div>
          <button className="w-full sm:w-auto px-5 py-2 bg-[#1F1A67] text-[#FFFFFF] font-medium rounded-md hover:bg-[#3B3486] transition-colors text-[13px] shadow-sm whitespace-nowrap">
            Register New Patient
          </button>
        </div>
      </div>

      {/* ================= 2. FINANCIAL KPIs ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] border-l-4 border-l-[#16A34A] shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider">Revenue Collected</span>
            <DollarSign className="w-4 h-4 text-[#16A34A]" />
          </div>
          <span className="text-3xl font-bold text-[#1F1A67] tracking-tight">
            ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] border-l-4 border-l-[#F59E0B] shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider">Pending Payments</span>
            <CreditCard className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <span className="text-3xl font-bold text-[#1F1A67] tracking-tight">
            ${pendingAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] border-l-4 border-l-[#00A3E0] shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider">Unpaid Invoices</span>
          </div>
          <span className="text-3xl font-bold text-[#1F1A67] tracking-tight">{String(pendingInvoices.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* ================= 3. BILLING QUEUE ================= */}
      <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg shadow-sm">
        <div className="p-6 border-b border-[#EAEAEA] flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-[#1F1A67]">Billing & Checkout Queue</h2>
          </div>
          <div className="px-3 py-1 bg-[#F4F0F8] border border-[#EAEAEA] rounded text-[12px] font-bold text-[#1F1A67] uppercase">
            {invoices.length} Records
          </div>
        </div>

        <div className="p-0">
          {isLoading ? (
            <div className="p-12 text-center text-sm text-[#6F6B7D]">Loading billing records from database...</div>
          ) : invoices.length === 0 ? (
            <div className="p-12 text-center text-sm text-[#6F6B7D]">No billing records found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-[#F7F8FC] border-b border-[#EAEAEA] text-[#6F6B7D] uppercase tracking-wider text-[11px] font-bold">
                  <tr>
                    <th className="px-6 py-4">Invoice ID / Date</th>
                    <th className="px-6 py-4">Patient</th>
                    <th className="px-6 py-4">Amount Due</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAEAEA]">
                  {invoices.map((inv, idx) => (
                    <tr key={idx} className="hover:bg-[#F7F8FC] transition-colors">
                      <td className="px-6 py-4 font-medium text-[#1F1A67]">{inv.id}<div className="text-[11px] text-[#6F6B7D] font-normal">{inv.date}</div></td>
                      <td className="px-6 py-4 font-semibold text-[#2B2B2B]">{inv.patient}</td>
                      <td className="px-6 py-4 font-bold text-[#1F1A67]">${inv.amount.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          inv.status === 'PAID' ? 'bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7]' : 
                          'bg-[#FFFBEB] text-[#F59E0B] border border-[#FEF3C7]'
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {inv.status === 'PAID' ? (
                          <button className="px-4 py-1.5 border border-[#EAEAEA] text-[#6F6B7D] rounded text-[12px] font-medium hover:bg-[#F7F8FC] transition-colors">
                            Receipt
                          </button>
                        ) : (
                          <button className="px-4 py-1.5 bg-[#1F1A67] text-white rounded text-[12px] font-medium hover:bg-[#3B3486] transition-colors shadow-sm">
                            Collect
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <OutbreakAlert/>
        </div>
      </div>
    </div>
  );
  
}