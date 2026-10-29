"use client";

import { Search, Calendar, Scan, FileText, ChevronDown } from "lucide-react";

export default function BillingDashboard() {
  return (
    <div className="w-full px-6 py-6 md:px-8 max-w-[1600px] mx-auto space-y-6 text-[#2B2B2B]">
      
      {/* ================= HEADER ================= */}
      <div className="flex flex-col pb-4 border-b border-[#EAEAEA]">
        <h1 className="text-2xl font-bold text-[#1F1A67] tracking-tight">Billing & Invoicing</h1>
        <p className="text-[14px] text-[#6F6B7D] mt-1">
          Generate invoices and process payments for hospital services.
        </p>
      </div>

      {/* ================= MAIN LAYOUT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Invoice Form */}
        <div className="lg:col-span-2 bg-[#FFFFFF] rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col">
          <div className="p-6 border-b border-[#EAEAEA]">
            <h2 className="text-lg font-bold text-[#1F1A67]">New Invoice</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-[11px] font-bold text-[#00A3E0] uppercase tracking-wider mb-2">
                  Select Patient
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-[#6F6B7D] absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Search UHID or Name..." 
                    className="w-full pl-9 pr-4 py-2.5 bg-[#F7F8FC] border border-[#EAEAEA] rounded-md text-[13px] text-[#2B2B2B] focus:outline-none focus:border-[#1F1A67] focus:ring-1 focus:ring-[#1F1A67] transition-colors placeholder:text-[#6F6B7D]/70" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#00A3E0] uppercase tracking-wider mb-2">
                  Invoice Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#6F6B7D] absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input 
                    type="text" 
                    value="04/09/2026" 
                    readOnly 
                    className="w-full pl-9 pr-4 py-2.5 bg-[#F7F8FC] border border-[#EAEAEA] rounded-md text-[13px] text-[#6F6B7D] outline-none cursor-default" 
                  />
                </div>
              </div>
            </div>

            <label className="block text-[11px] font-bold text-[#00A3E0] uppercase tracking-wider mb-3">
              Service Details
            </label>
            <div className="overflow-x-auto">
              <table className="w-full text-left mb-6 min-w-[500px]">
                <thead className="bg-[#F7F8FC] border-b border-[#EAEAEA] text-[11px] font-bold text-[#00A3E0] uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">SERVICE DETAILS</th>
                    <th className="py-3 px-4 text-center">QTY</th>
                    <th className="py-3 px-4 text-right">PRICE (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAEAEA]">
                  <tr className="hover:bg-[#F7F8FC] transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-bold text-[#2B2B2B] text-[14px]">OPD Consultation – Dr. Doe</div>
                      <div className="text-[12px] text-[#6F6B7D] mt-0.5">Cardiology Department</div>
                    </td>
                    <td className="py-4 px-4 text-center font-bold text-[#2B2B2B]">1</td>
                    <td className="py-4 px-4 text-right font-bold text-[#2B2B2B]">500.00</td>
                  </tr>
                  <tr className="hover:bg-[#F7F8FC] transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-bold text-[#2B2B2B] text-[14px]">Complete Blood Count (CBC)</div>
                      <div className="text-[12px] text-[#6F6B7D] mt-0.5">Pathology Lab</div>
                    </td>
                    <td className="py-4 px-4 text-center font-bold text-[#2B2B2B]">1</td>
                    <td className="py-4 px-4 text-right font-bold text-[#2B2B2B]">350.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button className="w-full py-3.5 border-2 border-dashed border-[#EAEAEA] bg-[#F7F8FC] rounded-md text-[12px] font-bold text-[#6F6B7D] hover:bg-[#EAEAEA]/50 hover:text-[#1F1A67] transition-colors tracking-wider uppercase focus:outline-none">
              Add Service Line
            </button>
          </div>
        </div>

        {/* Right Column: Payment & History */}
        <div className="space-y-6">
          
          <div className="bg-[#FFFFFF] rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col">
            <div className="p-6 border-b border-[#EAEAEA]">
              <h3 className="text-lg font-bold text-[#1F1A67]">Payment Summary</h3>
            </div>
            
            <div className="p-6">
              <div className="space-y-4 mb-6 border-b border-[#EAEAEA] pb-6">
                <div className="flex justify-between text-[14px]">
                  <span className="text-[#6F6B7D] font-medium">Subtotal</span>
                  <span className="font-bold text-[#2B2B2B]">₹850.00</span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-[#6F6B7D] font-medium">Tax (5%)</span>
                  <span className="font-bold text-[#2B2B2B]">₹42.50</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-[14px] font-bold text-[#2B2B2B] uppercase tracking-wide">Total Amount</span>
                <span className="text-3xl font-bold text-[#1F1A67] tracking-tight">₹892.50</span>
              </div>

              <div className="mb-6">
                <label className="block text-[11px] font-bold text-[#00A3E0] uppercase tracking-wider mb-2">
                  Payment Method
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-2.5 bg-[#F7F8FC] border border-[#EAEAEA] rounded-md text-[13px] outline-none appearance-none font-medium text-[#2B2B2B] focus:border-[#1F1A67] focus:ring-1 focus:ring-[#1F1A67]">
                    <option>UPI / Digital Wallet</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#6F6B7D] absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="bg-[#F7F8FC] border border-[#EAEAEA] p-4 rounded-md flex items-center space-x-4 mb-6">
                <div className="w-10 h-10 bg-[#FFFFFF] border border-[#EAEAEA] rounded-md flex items-center justify-center text-[#00A3E0] shrink-0">
                  <Scan className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-[#1F1A67]">UPI Payment Active</div>
                  <div className="text-[11px] text-[#6F6B7D] mt-0.5 font-medium">Scan QR code at reception</div>
                </div>
              </div>

              <button className="w-full py-3 bg-[#1F1A67] text-[#FFFFFF] font-bold rounded-md hover:bg-[#3B3486] transition-colors shadow-sm text-[13px] focus:outline-none">
                Print Invoice
              </button>
            </div>
          </div>

          <div className="bg-[#FFFFFF] rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col">
            <div className="p-5 border-b border-[#EAEAEA]">
              <h3 className="text-[14px] font-bold text-[#1F1A67] uppercase tracking-wider">Recent Invoices</h3>
            </div>
            
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-center p-3 border border-[#EAEAEA] rounded-md hover:bg-[#F7F8FC] hover:border-[#1F1A67]/30 transition-colors cursor-pointer group">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#F4F0F8] rounded-md flex items-center justify-center text-[#1F1A67] shrink-0 border border-[#EAEAEA]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-[#1F1A67] text-[13px]">INV-2094</div>
                    <div className="text-[11px] text-[#6F6B7D] mt-0.5 uppercase tracking-wider font-medium">John Doe <span className="mx-1 lowercase">•</span> ₹1,200.00</div>
                  </div>
                </div>
                <span className="text-[#6F6B7D] group-hover:text-[#00A3E0] font-bold transition-colors">&gt;</span>
              </div>

              <div className="flex justify-between items-center p-3 border border-[#EAEAEA] rounded-md hover:bg-[#F7F8FC] hover:border-[#1F1A67]/30 transition-colors cursor-pointer group">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#F4F0F8] rounded-md flex items-center justify-center text-[#1F1A67] shrink-0 border border-[#EAEAEA]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-[#1F1A67] text-[13px]">INV-2093</div>
                    <div className="text-[11px] text-[#6F6B7D] mt-0.5 uppercase tracking-wider font-medium">Sarah J. <span className="mx-1 lowercase">•</span> ₹850.00</div>
                  </div>
                </div>
                <span className="text-[#6F6B7D] group-hover:text-[#00A3E0] font-bold transition-colors">&gt;</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}