"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";

interface InventoryTableProps {
  inventory: any[];
}

export function InventoryTable({ inventory }: InventoryTableProps) {
  
  if (!inventory || inventory.length === 0) {
    return (
      <div className="p-12 text-center text-[13px] text-[#6F6B7D]">
        No inventory items found matching your search.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[700px]">
        <thead className="bg-[#F7F8FC] border-b border-[#EAEAEA]">
          <tr>
            <th className="px-6 py-4 text-[11px] font-bold text-[#00A3E0] uppercase tracking-wider">MEDICINE NAME</th>
            <th className="px-6 py-4 text-[11px] font-bold text-[#00A3E0] uppercase tracking-wider">CATEGORY</th>
            <th className="px-6 py-4 text-[11px] font-bold text-[#00A3E0] uppercase tracking-wider">STOCK LEVEL</th>
            <th className="px-6 py-4 text-[11px] font-bold text-[#00A3E0] uppercase tracking-wider">STATUS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#EAEAEA]">
          {inventory.map((item) => (
            <tr key={item.id} className="hover:bg-[#F7F8FC] transition-colors bg-[#FFFFFF]">
              
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="font-bold text-[#1F1A67] text-[14px]">{item.name}</span>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-[13px] font-medium text-[#6F6B7D]">{item.category}</span>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-[14px] font-bold text-[#2B2B2B]">{item.stock}</span>
                <span className="text-[12px] font-medium text-[#6F6B7D] ml-1">units</span>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap">
                {item.stock < 50 ? (
                  <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#FDF0F4] text-[#C61A4C] border border-[#C61A4C]/20 text-[11px] font-bold uppercase tracking-wider">
                    <AlertCircle className="w-3.5 h-3.5 mr-1.5" /> Low Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#ECFDF5] text-[#16A34A] border border-[#16A34A]/20 text-[11px] font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Optimal
                  </span>
                )}
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}