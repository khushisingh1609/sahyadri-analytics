"use client";

import React from "react";
import { 
  Download, 
  IndianRupee, 
  CreditCard, 
  AlertCircle, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
  WalletCards,
  FileText,
  RefreshCcw
} from "lucide-react";

export default function FinancialMetricsPage() {
  // Mock Data for Department Revenue
  const departmentData = [
    { dept: "Cardiology", patients: 145, revenue: "₹12,40,000", contribution: "29%", trend: "+12%", positive: true },
    { dept: "Orthopedics", patients: 98, revenue: "₹9,80,000", contribution: "23%", trend: "+8%", positive: true },
    { dept: "General Medicine", patients: 312, revenue: "₹8,20,000", contribution: "19%", trend: "+5%", positive: true },
    { dept: "Pediatrics", patients: 156, revenue: "₹6,40,000", contribution: "15%", trend: "+9%", positive: true },
    { dept: "Neurology", patients: 84, revenue: "₹3,60,000", contribution: "8%", trend: "+4%", positive: true },
    { dept: "Other Departments", patients: 121, revenue: "₹2,40,000", contribution: "6%", trend: "-2%", positive: false },
  ];

  // Mock Data for Revenue Chart (Percentages based on a max value for CSS heights)
  const revenueChartData = [
    { month: "Apr", value: "₹32.4L", height: 75 },
    { month: "May", value: "₹35.8L", height: 83 },
    { month: "Jun", value: "₹34.2L", height: 80 },
    { month: "Jul", value: "₹38.6L", height: 90 },
    { month: "Aug", value: "₹40.1L", height: 93 },
    { month: "Sep", value: "₹42.8L", height: 100 },
  ];

  // Mock Data for Financial Activity
  const recentActivity = [
    { title: "OPD Billing", amount: "₹18,500", dept: "Cardiology", time: "10 mins ago", icon: Receipt },
    { title: "Insurance Claim Processed", amount: "₹42,000", dept: "General Medicine", time: "35 mins ago", icon: ShieldCheckPlaceholder },
    { title: "Payment Received", amount: "₹7,800", dept: "Orthopedics", time: "1 hour ago", icon: WalletCards },
    { title: "Invoice Generated", amount: "₹12,400", dept: "Pediatrics", time: "2 hours ago", icon: FileText },
    { title: "Refund Processed", amount: "₹3,200", dept: "General Medicine", time: "3 hours ago", icon: RefreshCcw },
  ];

  return (
    <div className="w-full px-6 py-6 md:px-8 max-w-[1600px] mx-auto space-y-6 text-[#2B2B2B]">
      
      {/* ================= PAGE HEADER ================= */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4 border-b border-[#EAEAEA]">
        <div>
          <div className="text-[10px] font-bold text-[#6F6B7D] uppercase tracking-widest mb-1.5">
            Administration / Finance
          </div>
          <h1 className="text-2xl font-bold text-[#1F1A67] tracking-tight">Financial Metrics</h1>
          <p className="text-sm text-[#6F6B7D] mt-1">
            Track hospital revenue, collections, billing activity, and financial performance.
          </p>
        </div>
        <button className="w-full md:w-auto flex items-center justify-center px-4 py-2 bg-[#FFFFFF] border border-[#EAEAEA] text-[#1F1A67] rounded-lg text-sm font-medium hover:bg-[#F7F8FC] transition-colors focus:outline-none">
          <Download className="w-4 h-4 mr-2" /> Export Report
        </button>
      </div>

      {/* ================= SECTION 1: FINANCIAL KPI OVERVIEW ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        
        {/* KPI 1: Total Revenue */}
        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider">Total Revenue</span>
            <IndianRupee className="w-4 h-4 text-[#1F1A67]" />
          </div>
          <div>
            <span className="text-2xl font-bold text-[#1F1A67] tracking-tight block">₹42,80,000</span>
            <div className="flex items-center mt-2">
              <span className="flex items-center text-xs font-bold text-[#00A3E0]">
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> 12.4%
              </span>
              <span className="text-xs text-[#6F6B7D] ml-1.5">vs. previous month</span>
            </div>
          </div>
        </div>

        {/* KPI 2: Total Collections */}
        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider">Total Collections</span>
            <CreditCard className="w-4 h-4 text-[#1F1A67]" />
          </div>
          <div>
            <span className="text-2xl font-bold text-[#1F1A67] tracking-tight block">₹38,40,000</span>
            <div className="flex items-center mt-2">
              <span className="flex items-center text-xs font-bold text-[#00A3E0]">
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> 8.7%
              </span>
              <span className="text-xs text-[#6F6B7D] ml-1.5">vs. previous month</span>
            </div>
          </div>
        </div>

        {/* KPI 3: Outstanding Payments */}
        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider">Outstanding Payments</span>
            <AlertCircle className="w-4 h-4 text-[#1F1A67]" />
          </div>
          <div>
            <span className="text-2xl font-bold text-[#1F1A67] tracking-tight block">₹4,40,000</span>
            <div className="flex items-center mt-2">
              {/* Note: Decrease in outstanding payments is a positive trend */}
              <span className="flex items-center text-xs font-bold text-[#00A3E0]">
                <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" /> 4.2%
              </span>
              <span className="text-xs text-[#6F6B7D] ml-1.5">vs. previous month</span>
            </div>
          </div>
        </div>

        {/* KPI 4: Avg Revenue / Patient */}
        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider">Average Revenue / Patient</span>
            <TrendingUp className="w-4 h-4 text-[#1F1A67]" />
          </div>
          <div>
            <span className="text-2xl font-bold text-[#1F1A67] tracking-tight block">₹8,920</span>
            <div className="flex items-center mt-2">
              <span className="flex items-center text-xs font-bold text-[#00A3E0]">
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> 6.1%
              </span>
              <span className="text-xs text-[#6F6B7D] ml-1.5">vs. previous month</span>
            </div>
          </div>
        </div>

      </div>

      {/* ================= SECTION 2 & 3: REVENUE OVERVIEW & PAYMENT BREAKDOWN ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Overview Chart */}
        <div className="lg:col-span-2 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg shadow-sm flex flex-col p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-bold text-[#1F1A67]">Revenue Overview</h2>
              <p className="text-[13px] text-[#6F6B7D] mt-0.5">Monthly revenue and collection performance</p>
            </div>
            <select className="text-xs font-medium text-[#1F1A67] bg-[#F7F8FC] border border-[#EAEAEA] rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#1F1A67]">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          
          {/* Simple CSS Bar Chart Placeholder */}
          <div className="flex-1 flex items-end gap-2 sm:gap-4 h-[220px] mt-4 relative pt-6">
            {/* Subtle Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pb-6">
              <div className="w-full border-t border-[#EAEAEA]"></div>
              <div className="w-full border-t border-[#EAEAEA]"></div>
              <div className="w-full border-t border-[#EAEAEA]"></div>
              <div className="w-full border-t border-[#EAEAEA]"></div>
            </div>

            {/* Chart Bars */}
            {revenueChartData.map((data, idx) => (
              <div key={idx} className="relative z-10 flex-1 flex flex-col items-center justify-end h-full group">
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-[#1F1A67] text-[#FFFFFF] text-[10px] font-bold py-1 px-2 rounded transition-opacity pointer-events-none whitespace-nowrap">
                  {data.value}
                </div>
                <div 
                  className="w-full max-w-[48px] bg-[#1F1A67] rounded-t-sm transition-all duration-300"
                  style={{ height: `${data.height}%` }}
                ></div>
                <span className="text-[11px] font-semibold text-[#6F6B7D] mt-3 uppercase tracking-wider">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Breakdown */}
        <div className="lg:col-span-1 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg shadow-sm p-6 flex flex-col">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#1F1A67]">Payment Breakdown</h2>
            <p className="text-[13px] text-[#6F6B7D] mt-0.5">Collection by payment method</p>
          </div>
          
          <div className="flex-1 flex flex-col justify-center space-y-6">
            {/* UPI */}
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-semibold text-[#1F1A67]">UPI</span>
                <span className="font-bold text-[#1F1A67]">₹16.13L <span className="text-[#6F6B7D] font-normal text-xs ml-1">(42%)</span></span>
              </div>
              <div className="w-full bg-[#F4F0F8] rounded-full h-2">
                <div className="bg-[#1F1A67] h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>

            {/* Card */}
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-semibold text-[#1F1A67]">Card</span>
                <span className="font-bold text-[#1F1A67]">₹10.75L <span className="text-[#6F6B7D] font-normal text-xs ml-1">(28%)</span></span>
              </div>
              <div className="w-full bg-[#F4F0F8] rounded-full h-2">
                <div className="bg-[#00A3E0] h-2 rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>

            {/* Insurance */}
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-semibold text-[#1F1A67]">Insurance</span>
                <span className="font-bold text-[#1F1A67]">₹6.91L <span className="text-[#6F6B7D] font-normal text-xs ml-1">(18%)</span></span>
              </div>
              <div className="w-full bg-[#F4F0F8] rounded-full h-2">
                <div className="bg-[#3B3486] h-2 rounded-full" style={{ width: '18%' }}></div>
              </div>
            </div>

            {/* Cash */}
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-semibold text-[#1F1A67]">Cash</span>
                <span className="font-bold text-[#1F1A67]">₹4.61L <span className="text-[#6F6B7D] font-normal text-xs ml-1">(12%)</span></span>
              </div>
              <div className="w-full bg-[#F4F0F8] rounded-full h-2">
                <div className="bg-[#EAEAEA] h-2 rounded-full" style={{ width: '12%' }}></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ================= SECTION 4: DEPARTMENT REVENUE ================= */}
      <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg shadow-sm flex flex-col">
        <div className="p-6 border-b border-[#EAEAEA]">
          <h2 className="text-lg font-bold text-[#1F1A67]">Department Revenue</h2>
          <p className="text-[13px] text-[#6F6B7D] mt-0.5">Revenue contribution by hospital department</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-[#F7F8FC]">
              <tr>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#6F6B7D] uppercase tracking-wider border-b border-[#EAEAEA]">Department</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#6F6B7D] uppercase tracking-wider border-b border-[#EAEAEA]">Patients</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#6F6B7D] uppercase tracking-wider border-b border-[#EAEAEA]">Revenue</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#6F6B7D] uppercase tracking-wider border-b border-[#EAEAEA]">Contribution</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#6F6B7D] uppercase tracking-wider border-b border-[#EAEAEA] text-right">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEAEA]">
              {departmentData.map((dept, i) => (
                <tr key={i} className="hover:bg-[#F7F8FC] transition-colors">
                  <td className="px-6 py-4 font-semibold text-[#1F1A67] text-[14px] whitespace-nowrap">
                    {dept.dept}
                  </td>
                  <td className="px-6 py-4 text-[14px] text-[#2B2B2B] whitespace-nowrap">
                    {dept.patients}
                  </td>
                  <td className="px-6 py-4 font-semibold text-[#1F1A67] text-[14px] whitespace-nowrap">
                    {dept.revenue}
                  </td>
                  <td className="px-6 py-4 text-[14px] text-[#2B2B2B] whitespace-nowrap">
                    {dept.contribution}
                  </td>
                  <td className={`px-6 py-4 text-right font-bold text-[13px] whitespace-nowrap ${dept.positive ? 'text-[#00A3E0]' : 'text-[#C61A4C]'}`}>
                    <div className="flex items-center justify-end">
                      {dept.positive ? <ArrowUpRight className="w-3.5 h-3.5 mr-1" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-1" />}
                      {dept.trend}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= SECTION 5 & 6: BILLING STATUS & RECENT ACTIVITY ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Billing Status */}
        <div className="lg:col-span-1 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg shadow-sm p-6 flex flex-col">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#1F1A67]">Billing Status</h2>
            <p className="text-[13px] text-[#6F6B7D] mt-0.5">Current accounts receivable</p>
          </div>
          
          <div className="flex flex-col space-y-5">
            {/* Paid */}
            <div className="flex items-center justify-between p-4 rounded-lg border border-[#EAEAEA] bg-[#F7F8FC]">
              <div>
                <span className="text-xs font-bold text-[#6F6B7D] uppercase tracking-wider block mb-1">Paid</span>
                <span className="text-lg font-bold text-[#1F1A67]">₹38.4L</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-[#00A3E0]">89.7%</span>
              </div>
            </div>

            {/* Pending */}
            <div className="flex items-center justify-between p-4 rounded-lg border border-[#EAEAEA] bg-[#FFFFFF]">
              <div>
                <span className="text-xs font-bold text-[#6F6B7D] uppercase tracking-wider block mb-1">Pending</span>
                <span className="text-lg font-bold text-[#1F1A67]">₹2.8L</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-[#3B3486]">6.5%</span>
              </div>
            </div>

            {/* Overdue */}
            <div className="flex items-center justify-between p-4 rounded-lg border border-[#EAEAEA] bg-[#FFFFFF]">
              <div>
                <span className="text-xs font-bold text-[#6F6B7D] uppercase tracking-wider block mb-1">Overdue</span>
                <span className="text-lg font-bold text-[#1F1A67]">₹1.6L</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-[#C61A4C]">3.8%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Financial Activity */}
        <div className="lg:col-span-2 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg shadow-sm flex flex-col">
          <div className="p-6 border-b border-[#EAEAEA]">
            <h2 className="text-lg font-bold text-[#1F1A67]">Recent Financial Activity</h2>
            <p className="text-[13px] text-[#6F6B7D] mt-0.5">Latest transactions and billing events</p>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              {recentActivity.map((activity, idx) => {
                const Icon = activity.icon;
                return (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#F4F0F8] flex items-center justify-center border border-[#EAEAEA] shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-[#1F1A67]" />
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="text-[14px] font-semibold text-[#1F1A67]">{activity.title}</h4>
                        <div className="flex items-center text-[13px] text-[#6F6B7D] mt-1">
                          <span>{activity.dept}</span>
                          <span className="mx-2">•</span>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="text-[15px] font-bold text-[#1F1A67]">{activity.amount}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Temporary placeholder icon for Insurance Claim to avoid relying on external libraries if not available
function ShieldCheckPlaceholder(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}