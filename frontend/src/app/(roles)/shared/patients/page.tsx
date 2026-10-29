"use client";

import { Users, Search, Filter, Calendar, Activity, FileText } from "lucide-react";

export default function PatientDirectory() {
  const patients = [
    { id: "UHID-9921", name: "Emily Rodriguez", meta: "34 yrs • Female", img: "[https://i.pravatar.cc/150?u=emily](https://i.pravatar.cc/150?u=emily)", blood: "O+", notes: "Appendectomy Recovery", lastVisit: "2026-09-01", bloodColor: "bg-red-50 text-red-500" },
    { id: "UHID-8472", name: "Sarah Jenkins", meta: "58 yrs • Female", img: "[https://i.pravatar.cc/150?u=sarahj](https://i.pravatar.cc/150?u=sarahj)", blood: "A-", notes: "Hypertension", lastVisit: "2026-09-03", bloodColor: "bg-blue-50 text-blue-500" },
    { id: "UHID-1039", name: "Michael Chen", meta: "42 yrs • Male", img: "[https://i.pravatar.cc/150?u=michael](https://i.pravatar.cc/150?u=michael)", blood: "B+", notes: "GERD", lastVisit: "2026-09-03", bloodColor: "bg-orange-50 text-orange-500" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Patient Directory</h1>
        <p className="text-sm text-slate-500">Centralized database of all registered patients.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6">
        {/* Search & Filters */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-2xl">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2"/>
            <input 
              type="text" 
              placeholder="Search by UHID or Name..." 
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <button className="px-5 py-3 border border-slate-200 text-slate-700 font-bold rounded-xl text-sm hover:bg-slate-50 flex items-center transition-colors">
            <Filter className="w-4 h-4 mr-2"/> Filters
          </button>
        </div>

        {/* Directory Table */}
        <table className="w-full text-left">
          <thead className="text-[10px] font-bold text-blue-600 uppercase tracking-wider border-b border-slate-100">
            <tr>
              <th className="px-2 py-4">UHID</th>
              <th className="px-2 py-4">PATIENT PROFILE</th>
              <th className="px-2 py-4">MEDICAL DETAILS</th>
              <th className="px-2 py-4">LAST VISIT</th>
              <th className="px-2 py-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-2 py-5 font-bold text-slate-900 text-sm">{patient.id}</td>
                <td className="px-2 py-5">
                  <div className="flex items-center space-x-3">
                    <img src={patient.img} alt={patient.name} className="w-10 h-10 rounded-full border border-slate-200" />
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{patient.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{patient.meta}</div>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-5">
                  <div className="flex items-center space-x-3">
                    <span className={`w-8 h-8 rounded flex items-center justify-center font-bold text-xs ${patient.bloodColor}`}>
                      {patient.blood}
                    </span>
                    <span className="text-sm text-slate-600">{patient.notes}</span>
                  </div>
                </td>
                <td className="px-2 py-5">
                  <div className="flex items-center text-sm text-slate-500">
                    <Calendar className="w-4 h-4 mr-2 text-slate-400"/> {patient.lastVisit}
                  </div>
                </td>
                <td className="px-2 py-5 text-right">
                  <div className="flex items-center justify-end space-x-3">
                    <button className="text-slate-400 hover:text-blue-600 transition-colors"><Activity className="w-5 h-5"/></button>
                    <button className="text-slate-400 hover:text-blue-600 transition-colors"><FileText className="w-5 h-5"/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer Pagination */}
        <div className="mt-6 flex justify-between items-center text-xs text-slate-400">
          <span>Displaying 1–10 of 4,209 patients</span>
          <div className="flex space-x-1">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-50 text-slate-400">&lt;</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-600 text-white font-bold shadow-sm">1</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-50 text-slate-600 font-bold">2</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-50 text-slate-600 font-bold">3</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-50 text-slate-600 font-bold">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}