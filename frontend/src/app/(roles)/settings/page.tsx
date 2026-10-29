"use client";

import React, { useState } from "react";
import { 
  User, 
  Lock, 
  Bell, 
  Palette, 
  Save, 
  Shield, 
  KeyRound, 
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Moon,
  Sun
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [isSaving, setIsSaving] = useState(false);

  // Form states (acting as placeholders for authenticated user data)
  const [formData, setFormData] = useState({
    name: "Current User",
    email: "user@sahyadri.com",
    phone: "+91 00000 00000"
  });

  // Notification states
  const [notifications, setNotifications] = useState({
    patientUpdates: true,
    appointmentAlerts: true,
    systemNotifications: false,
    criticalAlerts: true
  });

  // Theme state placeholder
  const [theme, setTheme] = useState("light");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call to save settings
    setTimeout(() => setIsSaving(false), 800);
  };

  const tabs = [
    { id: "personal", label: "Personal Information", icon: User },
    { id: "security", label: "Security Settings", icon: Lock },
    { id: "notifications", label: "Notification Preferences", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

  return (
    <div className="w-full px-6 py-6 md:px-8 max-w-[1200px] mx-auto space-y-6 text-[#2B2B2B]">
      
      {/* ================= PAGE HEADER ================= */}
      <div className="flex flex-col pb-4 border-b border-[#EAEAEA]">
        <div className="text-[10px] font-bold text-[#6F6B7D] uppercase tracking-widest mb-1.5">
          Account / Settings
        </div>
        <h1 className="text-2xl font-bold text-[#1F1A67] tracking-tight">Account Settings</h1>
        <p className="text-sm text-[#6F6B7D] mt-1">
          Manage your profile, security, and application preferences.
        </p>
      </div>

      {/* ================= SETTINGS CONTAINER ================= */}
      <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col md:flex-row overflow-hidden min-h-[600px]">
        
        {/* Left Navigation */}
        <div className="w-full md:w-[260px] bg-[#FFFFFF] border-b md:border-b-0 md:border-r border-[#EAEAEA] flex flex-col p-4 shrink-0 gap-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center w-full px-4 py-3 text-sm font-medium transition-colors rounded-md ${
                  isActive 
                    ? "bg-[#F4F0F8] text-[#1F1A67] border-l-[3px] border-[#00A3E0]" 
                    : "text-[#6F6B7D] hover:bg-[#F7F8FC] hover:text-[#1F1A67] border-l-[3px] border-transparent"
                }`}
              >
                <Icon className={`w-4 h-4 mr-3 shrink-0 ${isActive ? "text-[#00A3E0]" : "text-[#6F6B7D]"}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Right Content Area */}
        <div className="flex-1 p-6 md:p-8 bg-[#FFFFFF]">
          
          {/* --- PERSONAL INFO TAB --- */}
          {activeTab === "personal" && (
            <div className="animate-in fade-in duration-300 max-w-2xl">
              <div className="mb-8">
                <h2 className="text-lg font-bold text-[#1F1A67]">Personal Information</h2>
                <p className="text-sm text-[#6F6B7D] mt-1">Update your contact details and view profile information.</p>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-[#2B2B2B] mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    disabled
                    className="w-full px-4 py-3 bg-[#F7F8FC] border border-[#EAEAEA] rounded-lg text-sm text-[#6F6B7D] cursor-not-allowed"
                  />
                  <p className="text-xs text-[#6F6B7D] italic mt-2">
                    * Name changes must be requested through HR.
                  </p>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#2B2B2B] mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="user@sahyadri.com"
                    className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg text-sm text-[#2B2B2B] focus:outline-none focus:border-[#1F1A67] focus:ring-1 focus:ring-[#3B3486] transition-all placeholder:text-[#6F6B7D]"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-[#2B2B2B] mb-2">
                    Contact Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+91 00000 00000"
                    className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg text-sm text-[#2B2B2B] focus:outline-none focus:border-[#1F1A67] focus:ring-1 focus:ring-[#3B3486] transition-all placeholder:text-[#6F6B7D]"
                  />
                </div>

                <div className="pt-4 border-t border-[#EAEAEA]">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center justify-center px-6 py-2.5 bg-[#1F1A67] text-white rounded-lg hover:bg-[#3B3486] transition-colors text-sm font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* --- SECURITY TAB --- */}
          {activeTab === "security" && (
            <div className="animate-in fade-in duration-300 max-w-2xl">
              <div className="mb-8">
                <h2 className="text-lg font-bold text-[#1F1A67]">Security Settings</h2>
                <p className="text-sm text-[#6F6B7D] mt-1">Manage password and account security preferences.</p>
              </div>

              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#F4F0F8] flex items-center justify-center shrink-0">
                      <KeyRound className="w-5 h-5 text-[#1F1A67]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#2B2B2B]">Password</h3>
                      <p className="text-xs text-[#6F6B7D] mt-1">Last updated 3 months ago</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-[#F7F8FC] border border-[#EAEAEA] text-[#2B2B2B] text-sm font-medium rounded-lg hover:bg-[#EAEAEA] transition-colors whitespace-nowrap">
                    Change Password
                  </button>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#E6F6FD] flex items-center justify-center shrink-0">
                      <Shield className="w-5 h-5 text-[#00A3E0]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#2B2B2B]">Two-Factor Authentication</h3>
                      <p className="text-xs text-[#6F6B7D] mt-1">Additional protection for your account</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-[#FFFFFF] border border-[#00A3E0] text-[#00A3E0] text-sm font-medium rounded-lg hover:bg-[#E6F6FD] transition-colors whitespace-nowrap">
                    Enable 2FA
                  </button>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#F7F8FC] flex items-center justify-center shrink-0">
                      <Smartphone className="w-5 h-5 text-[#6F6B7D]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#2B2B2B]">Active Sessions</h3>
                      <p className="text-xs text-[#6F6B7D] mt-1">Manage devices logged into this account</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-[#F7F8FC] border border-[#EAEAEA] text-[#2B2B2B] text-sm font-medium rounded-lg hover:bg-[#EAEAEA] transition-colors whitespace-nowrap">
                    View Devices
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* --- NOTIFICATIONS TAB --- */}
          {activeTab === "notifications" && (
            <div className="animate-in fade-in duration-300 max-w-2xl">
              <div className="mb-8">
                <h2 className="text-lg font-bold text-[#1F1A67]">Notification Preferences</h2>
                <p className="text-sm text-[#6F6B7D] mt-1">Control which alerts you receive across the system.</p>
              </div>

              <div className="space-y-4">
                {/* Patient Updates */}
                <div className="flex items-center justify-between p-4 border-b border-[#EAEAEA]">
                  <div>
                    <h3 className="text-sm font-semibold text-[#2B2B2B]">Patient Updates</h3>
                    <p className="text-xs text-[#6F6B7D] mt-1">Receive notifications for admitted or assigned patients.</p>
                  </div>
                  <button 
                    onClick={() => setNotifications({...notifications, patientUpdates: !notifications.patientUpdates})}
                    className={`relative w-11 h-6 rounded-full transition-colors ${notifications.patientUpdates ? "bg-[#1F1A67]" : "bg-[#EAEAEA]"}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${notifications.patientUpdates ? "left-6" : "left-1"}`}></span>
                  </button>
                </div>

                {/* Appointment Alerts */}
                <div className="flex items-center justify-between p-4 border-b border-[#EAEAEA]">
                  <div>
                    <h3 className="text-sm font-semibold text-[#2B2B2B]">Appointment Alerts</h3>
                    <p className="text-xs text-[#6F6B7D] mt-1">Alerts for new scheduling or cancellations.</p>
                  </div>
                  <button 
                    onClick={() => setNotifications({...notifications, appointmentAlerts: !notifications.appointmentAlerts})}
                    className={`relative w-11 h-6 rounded-full transition-colors ${notifications.appointmentAlerts ? "bg-[#1F1A67]" : "bg-[#EAEAEA]"}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${notifications.appointmentAlerts ? "left-6" : "left-1"}`}></span>
                  </button>
                </div>

                {/* System Notifications */}
                <div className="flex items-center justify-between p-4 border-b border-[#EAEAEA]">
                  <div>
                    <h3 className="text-sm font-semibold text-[#2B2B2B]">System Notifications</h3>
                    <p className="text-xs text-[#6F6B7D] mt-1">General hospital announcements and software updates.</p>
                  </div>
                  <button 
                    onClick={() => setNotifications({...notifications, systemNotifications: !notifications.systemNotifications})}
                    className={`relative w-11 h-6 rounded-full transition-colors ${notifications.systemNotifications ? "bg-[#1F1A67]" : "bg-[#EAEAEA]"}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${notifications.systemNotifications ? "left-6" : "left-1"}`}></span>
                  </button>
                </div>

                {/* Critical Alerts */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-[#FDF0F4] border border-[#FDF0F4]">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-[#C61A4C] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-[#C61A4C]">Critical Alerts</h3>
                      <p className="text-xs text-[#C61A4C]/80 mt-1">Emergency codes and severe patient status changes. Cannot be disabled entirely.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setNotifications({...notifications, criticalAlerts: !notifications.criticalAlerts})}
                    className={`relative w-11 h-6 rounded-full transition-colors ${notifications.criticalAlerts ? "bg-[#C61A4C]" : "bg-[#EAEAEA] opacity-50 cursor-not-allowed"}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${notifications.criticalAlerts ? "left-6" : "left-1"}`}></span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* --- APPEARANCE TAB --- */}
          {activeTab === "appearance" && (
            <div className="animate-in fade-in duration-300 max-w-2xl">
              <div className="mb-8">
                <h2 className="text-lg font-bold text-[#1F1A67]">Appearance</h2>
                <p className="text-sm text-[#6F6B7D] mt-1">Customize the interface theme of your workspace.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Light Theme Option */}
                <button 
                  onClick={() => setTheme("light")}
                  className={`relative p-4 rounded-lg border text-left flex flex-col items-center justify-center gap-4 transition-all ${
                    theme === "light" 
                      ? "border-[#1F1A67] bg-[#F7F8FC] ring-1 ring-[#1F1A67]" 
                      : "border-[#EAEAEA] bg-white hover:bg-[#F7F8FC]"
                  }`}
                >
                  <div className="w-full h-24 bg-[#EAEAEA] rounded flex items-center justify-center overflow-hidden">
                    <div className="w-[80%] h-[70%] bg-white rounded shadow-sm border border-[#EAEAEA] flex flex-col gap-2 p-2">
                      <div className="w-full h-2 bg-[#F4F0F8] rounded-sm"></div>
                      <div className="w-1/2 h-2 bg-[#F4F0F8] rounded-sm"></div>
                    </div>
                  </div>
                  <div className="flex items-center w-full justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-[#2B2B2B]" />
                      <span className="text-sm font-semibold text-[#2B2B2B]">Light Theme</span>
                    </div>
                    {theme === "light" && <CheckCircle2 className="w-4 h-4 text-[#1F1A67]" />}
                  </div>
                </button>

                {/* Dark Theme Option Placeholder */}
                <button 
                  onClick={() => setTheme("dark")}
                  className={`relative p-4 rounded-lg border text-left flex flex-col items-center justify-center gap-4 transition-all ${
                    theme === "dark" 
                      ? "border-[#1F1A67] bg-[#F7F8FC] ring-1 ring-[#1F1A67]" 
                      : "border-[#EAEAEA] bg-white hover:bg-[#F7F8FC]"
                  }`}
                >
                  <div className="w-full h-24 bg-[#1F1A67] rounded flex items-center justify-center overflow-hidden">
                    <div className="w-[80%] h-[70%] bg-[#2B2B2B] rounded shadow-sm border border-[#3B3486] flex flex-col gap-2 p-2">
                      <div className="w-full h-2 bg-[#3B3486] rounded-sm"></div>
                      <div className="w-1/2 h-2 bg-[#3B3486] rounded-sm"></div>
                    </div>
                  </div>
                  <div className="flex items-center w-full justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <Moon className="w-4 h-4 text-[#6F6B7D]" />
                      <span className="text-sm font-semibold text-[#2B2B2B]">Dark Theme</span>
                    </div>
                    {theme === "dark" && <CheckCircle2 className="w-4 h-4 text-[#1F1A67]" />}
                  </div>
                </button>

              </div>
              <p className="text-xs text-[#6F6B7D] mt-4 italic">
                * Note: Dark mode availability depends on the current system configuration.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}