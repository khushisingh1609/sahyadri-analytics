"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const normalizedEmail = email.trim().toLowerCase();
    const emailPrefix = normalizedEmail.split('@')[0];
    
    // Scalable Role Routing Dictionary
    const roleMap: Record<string, { role: string; route: string; mockId: string; mockName: string }> = {
      staff: { role: "admin", route: "/admin", mockId: "ADM-1001", mockName: "Hospital Administration" },
      admin: { role: "admin", route: "/admin", mockId: "ADM-1002", mockName: "System Administrator" },
      dr: { role: "doctor", route: "/doctor", mockId: "DOC-10492", mockName: "Dr. James Wilson" },
      nurse: { role: "nurse", route: "/nurse", mockId: "NUR-2084", mockName: "Nurse Sarah Jenkins" },
      reception: { role: "reception", route: "/reception", mockId: "REC-3012", mockName: "Front Desk Reception" },
      pharmacist: { role: "pharmacist", route: "/pharmacy", mockId: "PHA-4055", mockName: "Pharmacy Department" },
      lab: { role: "lab", route: "/laboratory", mockId: "LAB-5099", mockName: "Laboratory Technician" }
    };

    const targetUser = roleMap[emailPrefix];

    if (!targetUser) {
      setError("Unrecognized hospital role. Please use your registered staff email.");
      setIsLoading(false);
      return;
    }

    // Authentication Flow
    setTimeout(() => {
      login("mock-jwt-token-123", {
        id: targetUser.mockId,
        name: targetUser.mockName,
        role: targetUser.role
      });
      
      router.replace(targetUser.route);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FAF9FC] font-sans">
      
      {/* ================= LEFT / PRIMARY VISUAL AREA ================= */}
      <div className="w-full md:w-5/12 lg:w-4/12 bg-[#F4F0F8] flex flex-col justify-center px-8 md:px-12 py-12 md:py-0 border-b md:border-b-0 md:border-r border-[#EAEAEA]">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-8">
            <Image 
              src="/logo.png" 
              alt="Sahyadri Hospital Logo" 
              width={100} 
              height={100}
              className="w-20 h-20 object-contain mb-6"
            />
            <h1 className="text-3xl font-bold text-[#1F1A67] tracking-tight mb-2">
              Sahyadri Hospital
            </h1>
            <h2 className="text-xl text-[#3B3486] font-medium mb-6">
              Hospital Management Portal
            </h2>
            <div className="h-1 w-12 bg-[#C61A4C] mb-6"></div>
            <p className="text-[#25233A] leading-relaxed text-lg">
              Secure access for doctors, nurses, and hospital staff.
            </p>
            <div className="flex items-center gap-2 mt-8 text-[#6F6B7D]">
              <ShieldCheck className="w-5 h-5 text-[#00A3E0]" />
              <span className="text-sm font-medium">Enterprise Security Encrypted</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= RIGHT / LOGIN AREA ================= */}
      <div className="w-full md:w-7/12 lg:w-8/12 flex items-center justify-center p-8 md:p-12 lg:p-24 bg-white">
        <div className="w-full max-w-md">
          
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-[#1F1A67] mb-2">Sign In</h3>
            <p className="text-[#6F6B7D]">Access your workspace securely.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-md text-red-600 text-sm font-medium">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#25233A] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-[#6F6B7D] absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(""); // Clear error on typing
                  }}
                  placeholder="name@sahyadri.com"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[#EAEAEA] rounded-md text-[15px] text-[#25233A] outline-none focus:border-[#1F1A67] focus:ring-1 focus:ring-[#1F1A67] transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-[#25233A]">
                  Password
                </label>
                <a 
                  href="/reset-password" 
                  className="text-sm font-medium text-[#1F1A67] hover:text-[#C61A4C] transition-colors"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 text-[#6F6B7D] absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 bg-white border border-[#EAEAEA] rounded-md text-[15px] text-[#25233A] outline-none focus:border-[#1F1A67] focus:ring-1 focus:ring-[#1F1A67] transition-all placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6F6B7D] hover:text-[#1F1A67] transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#1F1A67] text-white font-medium text-[15px] rounded-md hover:bg-[#3B3486] transition-colors flex justify-center items-center group disabled:opacity-80 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <Loader2 className="animate-spin -ml-1 mr-2 w-5 h-5 text-white" />
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center">
                  Sign In 
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </form>
          
          {/* Demo Credentials Section */}
          <div className="mt-12 pt-8 border-t border-[#EAEAEA]">
            <h4 className="text-xs font-semibold text-[#6F6B7D] uppercase tracking-wider mb-4">
              Demo Access (Any Password)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-[#FAF9FC] rounded border border-[#EAEAEA]">
                <span className="block text-[#25233A] font-medium mb-1">Doctors</span>
                <span className="text-[#6F6B7D]">dr@</span>
              </div>
              <div className="p-3 bg-[#FAF9FC] rounded border border-[#EAEAEA]">
                <span className="block text-[#25233A] font-medium mb-1">Nurses</span>
                <span className="text-[#6F6B7D]">nurse@</span>
              </div>
              <div className="p-3 bg-[#FAF9FC] rounded border border-[#EAEAEA]">
                <span className="block text-[#25233A] font-medium mb-1">Reception</span>
                <span className="text-[#6F6B7D]">reception@</span>
              </div>
              <div className="p-3 bg-[#FAF9FC] rounded border border-[#EAEAEA]">
                <span className="block text-[#25233A] font-medium mb-1">Admin</span>
                <span className="text-[#6F6B7D]">admin@</span>
              </div>
              <div className="p-3 bg-[#FAF9FC] rounded border border-[#EAEAEA]">
                <span className="block text-[#25233A] font-medium mb-1">Pharmacist</span>
                <span className="text-[#6F6B7D]">pharmacist@</span>
              </div>
              <div className="p-3 bg-[#FAF9FC] rounded border border-[#EAEAEA]">
                <span className="block text-[#25233A] font-medium mb-1">Laboratory</span>
                <span className="text-[#6F6B7D]">lab@</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}