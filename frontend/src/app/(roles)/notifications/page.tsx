"use client";

import React, { useState, useMemo, useEffect } from "react";
import { 
  Bell, AlertTriangle, Activity, TestTube, Pill, Users, FileText, 
  CreditCard, Settings, MoreHorizontal, CheckCheck, Search, Check, Trash2, ArrowRight
} from "lucide-react";

type Priority = "NORMAL" | "IMPORTANT" | "CRITICAL";
type Category = "CLINICAL" | "OPERATIONS" | "BILLING" | "SYSTEM" | "ALERTS";

interface Notification {
  id: string; title: string; message: string; source: string; target: string;
  category: Category; priority: Priority; time: string; unread: boolean;
}

// Master Mock Data (All Hospital Notifications)
const MASTER_NOTIFICATIONS: Notification[] = [
  { id: "NOTIF-001", title: "Critical Patient Alert", message: "Michael Chen requires immediate clinical review.", source: "Doctor", target: "Nursing", category: "ALERTS", priority: "CRITICAL", time: "5 min ago", unread: true },
  { id: "NOTIF-002", title: "Lab Result Available", message: "CBC results for Sarah Jenkins are ready for physician review.", source: "Laboratory", target: "Doctor", category: "CLINICAL", priority: "IMPORTANT", time: "18 min ago", unread: true },
  { id: "NOTIF-003", title: "New Patient Registration", message: "Jane Doe has been successfully registered for OPD consultation.", source: "Reception", target: "Admin", category: "OPERATIONS", priority: "NORMAL", time: "32 min ago", unread: true },
  { id: "NOTIF-004", title: "Prescription Ready", message: "Prescription RX-1043 has been received and is ready for dispensing.", source: "Doctor", target: "Pharmacy", category: "CLINICAL", priority: "NORMAL", time: "45 min ago", unread: false },
  { id: "NOTIF-005", title: "Bed Availability Updated", message: "Ward 1 currently has 3 available beds.", source: "Nursing", target: "Reception", category: "OPERATIONS", priority: "NORMAL", time: "1 hour ago", unread: false },
  { id: "NOTIF-006", title: "Urgent Laboratory Request", message: "REQ-9014 has been marked as an urgent diagnostic request.", source: "Doctor", target: "Laboratory", category: "ALERTS", priority: "CRITICAL", time: "2 hours ago", unread: true },
  { id: "NOTIF-007", title: "Invoice Generated", message: "Invoice INV-2094 has been successfully generated.", source: "Billing", target: "Reception", category: "BILLING", priority: "NORMAL", time: "3 hours ago", unread: false },
  { id: "NOTIF-008", title: "System Synchronization Complete", message: "Hospital records have been successfully synchronized.", source: "System", target: "All Staff", category: "SYSTEM", priority: "NORMAL", time: "4 hours ago", unread: false }
];

const CATEGORIES = ["ALL", "CLINICAL", "OPERATIONS", "BILLING", "SYSTEM", "ALERTS"];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(MASTER_NOTIFICATIONS);
  const [currentUserRole, setCurrentUserRole] = useState("DOCTOR");
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("ALL");
  const [catFilter, setCatFilter] = useState("ALL");

  // Read the actual role saved by the RoleLayout
  useEffect(() => {
    const stored = localStorage.getItem("active_hospital_role");
    if (stored) setCurrentUserRole(stored.toUpperCase());
  }, []);

  // 1. STRICT ROLE FILTER: Keep only alerts meant for THIS user
  const myNotifications = useMemo(() => {
    const role = currentUserRole;
    if (role === "ADMIN" || role === "ADMINISTRATION") return notifications; // Admins see everything
    return notifications.filter(n => {
      const target = n.target.toUpperCase();
      const source = n.source.toUpperCase();
      return target.includes(role) || source.includes(role) || target === "ALL STAFF";
    });
  }, [notifications, currentUserRole]);

  // 2. DYNAMIC DEPARTMENTS: Only show department filter tabs that actually apply to this user
  const activeDepartments = useMemo(() => {
    const depts = new Set<string>();
    myNotifications.forEach(n => {
      depts.add(n.source.toUpperCase());
      depts.add(n.target.toUpperCase());
    });
    return ["ALL", ...Array.from(depts)];
  }, [myNotifications]);

  // Metrics
  const unreadCount = myNotifications.filter(n => n.unread).length;
  const criticalCount = myNotifications.filter(n => n.priority === "CRITICAL").length;
  const todayCount = myNotifications.length;

  // 3. UI FILTERS
  const filteredNotifications = useMemo(() => {
    return myNotifications.filter(n => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        n.title.toLowerCase().includes(searchLower) ||
        n.message.toLowerCase().includes(searchLower) ||
        n.source.toLowerCase().includes(searchLower) ||
        n.target.toLowerCase().includes(searchLower);
      
      const nSource = n.source.toUpperCase();
      const nTarget = n.target.toUpperCase();
      const matchesDept = deptFilter === "ALL" || nSource.includes(deptFilter) || nTarget.includes(deptFilter);
      const matchesCat = catFilter === "ALL" || n.category === catFilter;

      return matchesSearch && matchesDept && matchesCat;
    });
  }, [myNotifications, searchQuery, deptFilter, catFilter]);

  const markAsRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  const markAllAsRead = () => {
    const myIds = new Set(myNotifications.map(n => n.id));
    setNotifications(prev => prev.map(n => myIds.has(n.id) ? { ...n, unread: false } : n));
  };
  const deleteNotification = (id: string) => setNotifications(prev => prev.filter(n => n.id !== id));

  const getIcon = (source: string, category: string) => {
    const s = source.toUpperCase();
    if (category === "ALERTS") return <AlertTriangle className="w-5 h-5 text-[#C61A4C]" />;
    if (s.includes("DOCTOR") || s.includes("NURSING") || category === "CLINICAL") return <Activity className="w-5 h-5 text-[#00A3E0]" />;
    if (s.includes("LABORATORY")) return <TestTube className="w-5 h-5 text-[#3B3486]" />;
    if (s.includes("PHARMACY")) return <Pill className="w-5 h-5 text-[#00A3E0]" />;
    if (s.includes("BILLING")) return <CreditCard className="w-5 h-5 text-[#1F1A67]" />;
    if (s.includes("RECEPTION") || s.includes("ADMIN")) return <Users className="w-5 h-5 text-[#1F1A67]" />;
    if (s.includes("SYSTEM")) return <Settings className="w-5 h-5 text-[#6F6B7D]" />;
    return <FileText className="w-5 h-5 text-[#1F1A67]" />;
  };

  return (
    <div className="w-full px-6 py-6 md:px-8 max-w-[1400px] mx-auto space-y-6 text-[#2B2B2B]">
      
      {/* HEADER */}
      <div className="bg-[#FFFFFF] p-5 md:p-6 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1F1A67] tracking-tight">Notifications & Alerts</h1>
          <p className="text-[13px] text-[#6F6B7D] mt-1">
            Centralized updates from across Sahyadri Hospital.
          </p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative p-2 rounded-md bg-[#F4F0F8] border border-[#EAEAEA] flex items-center justify-center shrink-0">
            <Bell className="w-5 h-5 text-[#1F1A67]" />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#C61A4C] text-[#FFFFFF] text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-[#FFFFFF]">
                {unreadCount}
              </span>
            )}
          </div>
          <button 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="w-full md:w-auto px-5 py-2.5 bg-[#1F1A67] text-[#FFFFFF] font-medium rounded-md hover:bg-[#3B3486] transition-colors text-[13px] shadow-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
          >
            <CheckCheck className="w-4 h-4 mr-2" /> Mark all as read
          </button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-2">Unread</span>
          <span className="text-3xl font-bold text-[#00A3E0] tracking-tight">{unreadCount.toString().padStart(2, '0')}</span>
        </div>
        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C61A4C]"></div>
          <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-2 ml-1">Critical Alerts</span>
          <span className="text-3xl font-bold text-[#C61A4C] tracking-tight ml-1">{criticalCount.toString().padStart(2, '0')}</span>
        </div>
        <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider mb-2">Today's Updates</span>
          <span className="text-3xl font-bold text-[#1F1A67] tracking-tight">{todayCount.toString().padStart(2, '0')}</span>
        </div>
      </div>

      {/* MAIN WORKSPACE */}
      <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg shadow-sm flex flex-col min-h-[500px]">
        <div className="p-5 border-b border-[#EAEAEA] space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-1 md:pb-0">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCatFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors focus:outline-none ${
                    catFilter === cat ? "bg-[#1F1A67] text-[#FFFFFF] border border-[#1F1A67]" : "bg-[#F7F8FC] text-[#6F6B7D] border border-[#EAEAEA] hover:border-[#1F1A67]/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="w-4 h-4 text-[#6F6B7D] absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" placeholder="Search notifications..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#F7F8FC] border border-[#EAEAEA] rounded-md text-[13px] text-[#2B2B2B] focus:outline-none focus:border-[#1F1A67] focus:ring-1 focus:ring-[#1F1A67] transition-colors placeholder:text-[#6F6B7D]/70" 
              />
            </div>
          </div>

          {/* Department Filter (Only shows what applies to the logged-in role!) */}
          <div className="flex overflow-x-auto hide-scrollbar gap-4 border-t border-[#EAEAEA] pt-4">
            {activeDepartments.map(dept => (
              <button
                key={dept}
                onClick={() => setDeptFilter(dept)}
                className={`pb-1 text-[12px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors border-b-[2px] focus:outline-none ${
                  deptFilter === dept ? "border-[#00A3E0] text-[#1F1A67]" : "border-transparent text-[#6F6B7D] hover:text-[#1F1A67]"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-[#F7F8FC] p-4 md:p-6 space-y-3">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => (
              <NotificationItem 
                key={notif.id} notif={notif} icon={getIcon(notif.source, notif.category)}
                onRead={() => markAsRead(notif.id)} onDelete={() => deleteNotification(notif.id)}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-[#FFFFFF] rounded-full flex items-center justify-center mb-4 border border-[#EAEAEA] shadow-sm">
                <Bell className="w-8 h-8 text-[#6F6B7D]/50" />
              </div>
              <h3 className="text-lg font-bold text-[#1F1A67]">No notifications found</h3>
              <p className="text-[13px] text-[#6F6B7D] mt-1 max-w-sm">
                You have no messages matching this criteria. Try changing your filters or checking a different category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NotificationItem({ notif, icon, onRead, onDelete }: { notif: Notification; icon: React.ReactNode; onRead: () => void; onDelete: () => void; }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div 
      className={`relative p-4 md:p-5 rounded-lg border transition-all flex flex-col md:flex-row gap-4 items-start ${notif.unread ? "bg-[#FFFFFF] border-[#EAEAEA] shadow-sm ring-1 ring-[#1F1A67]/5" : "bg-[#FFFFFF]/60 border-[#EAEAEA] opacity-80"}`}
      onClick={() => { if (notif.unread) onRead(); }}
    >
      {notif.priority === "CRITICAL" && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C61A4C] rounded-l-lg"></div>}
      {notif.unread && notif.priority !== "CRITICAL" && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00A3E0] rounded-l-lg"></div>}

      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border mt-1 ${notif.priority === "CRITICAL" ? "bg-[#FDF0F4] border-[#C61A4C]/20" : "bg-[#F4F0F8] border-[#EAEAEA]"}`}>
        {icon}
      </div>

      <div className="flex-1 min-w-0 pr-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
          <h3 className={`text-[15px] font-bold flex items-center ${notif.priority === "CRITICAL" ? "text-[#C61A4C]" : "text-[#1F1A67]"}`}>{notif.title}</h3>
          <span className="text-[11px] font-medium text-[#6F6B7D] whitespace-nowrap">{notif.time}</span>
        </div>
        <p className={`text-[14px] leading-relaxed mb-3 ${notif.unread ? "text-[#2B2B2B]" : "text-[#6F6B7D]"}`}>{notif.message}</p>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center text-[10px] font-bold text-[#6F6B7D] uppercase tracking-wider bg-[#F7F8FC] px-2.5 py-1 rounded border border-[#EAEAEA]">
            {notif.source} <ArrowRight className="w-3 h-3 mx-1.5 text-[#00A3E0]" /> {notif.target}
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${notif.priority === "CRITICAL" ? "text-[#C61A4C] bg-[#FDF0F4]" : notif.priority === "IMPORTANT" ? "text-[#3B3486] bg-[#F0EFFF]" : "text-[#6F6B7D] bg-[#F7F8FC]"}`}>[{notif.priority}]</span>
          {notif.unread && <span className="text-[11px] font-bold text-[#00A3E0] flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0] mr-1.5"></span> Unread</span>}
        </div>
      </div>

      <div className="absolute right-4 top-4">
        <button onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }} className="p-1.5 text-[#6F6B7D] hover:bg-[#F7F8FC] hover:text-[#1F1A67] rounded-md transition-colors focus:outline-none">
          <MoreHorizontal className="w-5 h-5" />
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-1 w-40 bg-[#FFFFFF] border border-[#EAEAEA] shadow-lg rounded-md overflow-hidden z-20">
            {notif.unread && <button onClick={(e) => { e.stopPropagation(); onRead(); setShowMenu(false); }} className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-[#1F1A67] hover:bg-[#F7F8FC] flex items-center transition-colors focus:outline-none"><Check className="w-4 h-4 mr-2 text-[#00A3E0]" /> Mark as read</button>}
            <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-[#C61A4C] hover:bg-[#FDF0F4] flex items-center transition-colors focus:outline-none"><Trash2 className="w-4 h-4 mr-2" /> Delete</button>
          </div>
        )}
      </div>
      {showMenu && <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setShowMenu(false); }}></div>}
    </div>
  );
}