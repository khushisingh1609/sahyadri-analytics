"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Stethoscope, Users, Activity, Pill, Microscope, Settings, 
  LogOut, Bell, Search, Menu, X, LayoutDashboard, LineChart
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const getInitials = (name: string) => {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
};

const sidebarConfigs: Record<string, { title: string; user: { name: string; role: string }; links: any[]; }> = {
  admin: {
    title: "HOSPITAL OPERATIONS",
    user: { name: "Admin User", role: "Super Administrator" },
    links: [
      { name: "Facility Overview", href: "/admin", icon: LayoutDashboard },
      { name: "Staff Management", href: "/admin/staff", icon: Users },
      { name: "Financial Metrics", href: "/admin/finance", icon: LineChart },
      { name: "Admin Setup", href: "/settings", icon: Settings }
    ]
  },
  doctor: {
    title: "MEDICAL SERVICES",
    user: { name: "Dr. James Wilson", role: "Senior Physician" },
    links: [{ name: "Doctor EMR", href: "/doctor", icon: Stethoscope }]
  },
  nurse: {
    title: "WARD & NURSING",
    user: { name: "Sarah Jenkins", role: "Head Nurse" },
    links: [{ name: "Nurse Station", href: "/nurse", icon: Activity }]
  },
  pharmacy: {
    title: "PHARMACY OPS",
    user: { name: "Robert Fox", role: "Chief Pharmacist" },
    links: [{ name: "Pharmacy", href: "/pharmacy", icon: Pill }]
  },
  laboratory: {
    title: "LAB DIAGNOSTICS",
    user: { name: "Emily Chen", role: "Lab Technician" },
    links: [{ name: "Laboratory", href: "/laboratory", icon: Microscope }]
  },
  reception: {
    title: "RECEPTION DESK",
    user: { name: "Michael Brown", role: "Front Desk Officer" },
    links: [{ name: "Reception", href: "/reception", icon: Users }]
  }
};

export default function RoleLayout({ children }: { children: React.ReactNode; }) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [savedRole, setSavedRole] = useState("admin");

  // Track the user's role so it doesn't break when navigating to /notifications
  useEffect(() => {
    const roleFromPath = pathname.split("/")[1];
    if (roleFromPath && roleFromPath !== "notifications") {
      setSavedRole(roleFromPath);
      localStorage.setItem("active_hospital_role", roleFromPath);
    } else {
      const stored = localStorage.getItem("active_hospital_role");
      if (stored) setSavedRole(stored);
    }
  }, [pathname]);

  const isNotifications = pathname.startsWith("/notifications");
  const currentRole = isNotifications ? savedRole : (pathname.split("/")[1] || "admin");
  const config = sidebarConfigs[currentRole] || sidebarConfigs["admin"];

  return (
    <div className="flex h-screen bg-[#F7F8FC] font-sans text-[#2B2B2B] overflow-hidden">
      
      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-20 bg-[#1F1A67] z-50 flex items-center justify-between px-4 border-b border-[#3B3486]">
        <div className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="Sahyadri Hospital" width={24} height={24} className="object-contain" />
          <span className="text-white font-extrabold tracking-tight text-[16px]">SAHYADRI</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-[300px] bg-[#1F1A67] text-white flex flex-col shrink-0 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0 pt-20" : "-translate-x-full md:translate-x-0 md:pt-0"}`}>
        <div className="hidden md:flex h-[90px] items-center px-6 border-b border-white/10 shrink-0 bg-[#1F1A67]">
          <div className="relative w-[52px] h-[52px] shrink-0 mr-3">
            <Image src="/logo.png" alt="Sahyadri Hospital Logo" fill sizes="52px" priority className="object-contain" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-white font-extrabold tracking-tight text-[23px] leading-none">SAHYADRI</span>
            <span className="text-[#00A3E0] text-[10px] font-bold tracking-widest uppercase mt-1 leading-none">Hospital</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 space-y-1">
          <div className="px-6 mb-3 text-[11px] font-bold text-[#F4F0F8]/50 uppercase tracking-widest">{config.title}</div>
          <div className="flex flex-col space-y-0.5">
            {config.links.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center px-6 py-3.5 transition-colors ${isActive ? "bg-[#3B3486] text-white border-l-[3px] border-[#00A3E0]" : "text-[#F4F0F8]/70 hover:bg-white/5 hover:text-white border-l-[3px] border-transparent"}`}>
                  <Icon className={`w-[20px] h-[20px] mr-3 shrink-0 transition-colors ${isActive ? "text-[#00A3E0]" : "text-[#F4F0F8]/50"}`} />
                  <span className="font-medium text-[15px]">{link.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-5 border-t border-white/10 shrink-0 bg-black/10">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#3B3486] flex items-center justify-center shrink-0 border border-white/10">
              <span className="text-white text-sm font-bold tracking-wider">{getInitials(config.user.name)}</span>
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-white font-medium text-sm truncate">{config.user.name}</span>
              <span className="text-[#00A3E0] text-[11px] font-bold tracking-wider uppercase truncate">{config.user.role}</span>
            </div>
          </div>
          <button onClick={logout} className="flex items-center justify-center w-full py-2.5 rounded text-[#F4F0F8]/70 hover:bg-[#C61A4C]/10 hover:text-[#C61A4C] transition-colors text-sm font-medium">
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-[90px] bg-white border-b border-[#EAEAEA] flex items-center justify-between px-8 shrink-0 z-10">
          <div className="flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-[#6F6B7D] absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input type="text" placeholder="Search patient, staff, or department..." className="w-full pl-10 pr-4 py-2.5 bg-[#F7F8FC] border border-[#EAEAEA] rounded-md text-sm text-[#2B2B2B] focus:outline-none focus:border-[#1F1A67] focus:ring-1 focus:ring-[#1F1A67] transition-all placeholder:text-[#6F6B7D]/70" />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/notifications" className="relative text-[#6F6B7D] hover:text-[#1F1A67] transition-colors focus:outline-none block">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#C61A4C] rounded-full ring-2 ring-white"></span>
            </Link>

            <div className="w-px h-6 bg-[#EAEAEA]"></div>

            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-[14px] font-semibold text-[#1F1A67] leading-tight">{config.user.name}</span>
                <span className="text-[11px] text-[#6F6B7D] font-bold uppercase tracking-wider">{config.user.role}</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#3B3486] flex items-center justify-center text-white border border-[#EAEAEA] group-hover:border-[#1F1A67] transition-colors shrink-0">
                <span className="text-sm font-bold">{getInitials(config.user.name)}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto w-full relative">
          <div className="min-h-full flex flex-col">
            <div className="flex-1">{children}</div>
            <footer className="w-full border-t border-[#EAEAEA] py-4 px-6 md:px-8 shrink-0 mt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-[11px] text-[#6F6B7D] font-medium tracking-wider">
                <p className="uppercase">&copy; 2026 SAHYADRI HOSPITAL • {config.title}</p>
                <div className="flex items-center gap-4 uppercase">
                  <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0]"></span> SYSTEM SYNC: OK</span>
                  <span>V2.4.1 STABLE</span>
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}