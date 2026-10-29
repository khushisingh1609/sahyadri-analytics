"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";

export function PatientRegistrationForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [phone, setPhone] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Successfully registered patient: ${name}`);
    setName("");
    setAge("");
    setPhone("");
    setGender("Male");
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg shadow-sm flex flex-col">
      <div className="p-6 border-b border-[#EAEAEA] flex items-center gap-4 bg-[#FFFFFF]">
        <div className="w-10 h-10 rounded-md bg-[#F4F0F8] flex items-center justify-center shrink-0 border border-[#EAEAEA]">
          <UserPlus className="w-5 h-5 text-[#1F1A67]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#1F1A67] tracking-tight">Register New Patient (OPD)</h2>
          <p className="text-[12px] font-bold text-[#6F6B7D] uppercase tracking-wider mt-1">
            Enter mandatory patient information
          </p>
        </div>
      </div>

      <form onSubmit={handleRegister} className="p-6 space-y-5">
        <div>
          <label className="block text-[11px] font-bold text-[#00A3E0] uppercase tracking-wider mb-2">
            Full Name
          </label>
          <input 
            type="text" 
            required 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="e.g. John Doe" 
            className="w-full px-4 py-2.5 bg-[#F7F8FC] border border-[#EAEAEA] rounded-md text-[14px] text-[#2B2B2B] outline-none focus:border-[#1F1A67] focus:ring-1 focus:ring-[#1F1A67] transition-colors placeholder:text-[#6F6B7D]/70" 
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-[11px] font-bold text-[#00A3E0] uppercase tracking-wider mb-2">
              Age
            </label>
            <input 
              type="number" 
              required 
              value={age} 
              onChange={(e) => setAge(e.target.value)} 
              placeholder="e.g. 32" 
              className="w-full px-4 py-2.5 bg-[#F7F8FC] border border-[#EAEAEA] rounded-md text-[14px] text-[#2B2B2B] outline-none focus:border-[#1F1A67] focus:ring-1 focus:ring-[#1F1A67] transition-colors placeholder:text-[#6F6B7D]/70" 
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#00A3E0] uppercase tracking-wider mb-2">
              Gender
            </label>
            <select 
              value={gender} 
              onChange={(e) => setGender(e.target.value)} 
              className="w-full px-4 py-2.5 bg-[#F7F8FC] border border-[#EAEAEA] rounded-md text-[14px] text-[#2B2B2B] outline-none focus:border-[#1F1A67] focus:ring-1 focus:ring-[#1F1A67] transition-colors appearance-none cursor-pointer"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-[#00A3E0] uppercase tracking-wider mb-2">
            Phone Number
          </label>
          <input 
            type="tel" 
            required 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            placeholder="e.g. +91 98765 43210" 
            className="w-full px-4 py-2.5 bg-[#F7F8FC] border border-[#EAEAEA] rounded-md text-[14px] text-[#2B2B2B] outline-none focus:border-[#1F1A67] focus:ring-1 focus:ring-[#1F1A67] transition-colors placeholder:text-[#6F6B7D]/70" 
          />
        </div>

        <div className="pt-3">
          <button 
            type="submit" 
            className="w-full py-3 bg-[#1F1A67] text-[#FFFFFF] font-bold rounded-md hover:bg-[#3B3486] transition-colors shadow-sm flex items-center justify-center text-[14px] focus:outline-none"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Register & Generate UHID
          </button>
        </div>
      </form>
    </div>
  );
}