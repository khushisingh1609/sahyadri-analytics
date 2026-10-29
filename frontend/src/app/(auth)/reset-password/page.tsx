"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { KeyRound, ArrowLeft, ArrowRight, CheckCircle2, Mail, ShieldCheck } from "lucide-react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call to trigger password reset email
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FFFFFF] font-sans">
      
      {/* ================= LEFT / PRIMARY VISUAL AREA ================= */}
      <div className="w-full md:w-5/12 lg:w-4/12 bg-[#F4F0F8] flex flex-col justify-center px-8 md:px-12 py-12 md:py-0 border-b md:border-b-0 md:border-r border-[#EAEAEA]">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-8">
            <Image 
              src="/logo.png" 
              alt="Sahyadri Hospital Logo" 
              width={64} 
              height={64}
              className="w-16 h-16 object-contain mb-6"
            />
            <h1 className="text-3xl font-bold text-[#1F1A67] tracking-tight mb-2">
              Sahyadri Hospital
            </h1>
            <h2 className="text-xl text-[#3B3486] font-medium mb-6">
              Hospital Management Portal
            </h2>
            <div className="h-1 w-12 bg-[#C61A4C] mb-6"></div>
            <p className="text-[#2B2B2B] leading-relaxed text-lg">
              Secure account recovery for doctors, nurses, and hospital staff.
            </p>
            <div className="flex items-center gap-2 mt-8 text-[#6F6B7D]">
              <ShieldCheck className="w-5 h-5 text-[#00A3E0]" />
              <span className="text-sm font-medium">Secure account recovery</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= RIGHT / FORM AREA ================= */}
      <div className="w-full md:w-7/12 lg:w-8/12 flex items-center justify-center p-8 md:p-12 lg:p-24 bg-[#FFFFFF]">
        <div className="w-full max-w-[480px]">
          
          {isSuccess ? (
            /* --- SUCCESS STATE --- */
            <div className="animate-in fade-in duration-500">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#F4F0F8] text-[#1F1A67] mb-6 border border-[#EAEAEA]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-[#1F1A67] mb-3">Recovery link sent</h3>
              <p className="text-[#2B2B2B] leading-relaxed text-[15px] mb-8">
                If an account exists for <span className="font-semibold text-[#1F1A67]">{email}</span>, you will receive instructions to reset your password shortly.
              </p>
              
              <div className="pt-2">
                <Link 
                  href="/login" 
                  className="inline-flex items-center text-[15px] font-medium text-[#6F6B7D] hover:text-[#1F1A67] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Return to Login
                </Link>
              </div>
            </div>
          ) : (
            /* --- RESET PASSWORD FORM --- */
            <div className="animate-in fade-in duration-500">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#F4F0F8] text-[#1F1A67] mb-6 border border-[#EAEAEA]">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-[#1F1A67] mb-3">Reset your password</h3>
              <p className="text-[#6F6B7D] leading-relaxed mb-8">
                Enter your registered staff email and we'll send you instructions to securely reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-[#6F6B7D] uppercase tracking-wider mb-2">
                    Registered Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-5 h-5 text-[#6F6B7D] absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="staff@sahyadri.com"
                      className="w-full pl-10 pr-4 py-3 bg-[#FFFFFF] border border-[#EAEAEA] rounded-md text-[15px] text-[#2B2B2B] outline-none focus:border-[#1F1A67] focus:ring-1 focus:ring-[#1F1A67] transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="w-full py-3.5 bg-[#1F1A67] text-white font-medium text-[15px] rounded-md hover:bg-[#3B3486] transition-colors flex justify-center items-center group disabled:opacity-80 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <span className="flex items-center">
                      Send Reset Link 
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </button>

                <div className="pt-4">
                  <Link 
                    href="/login" 
                    className="inline-flex items-center text-[15px] font-medium text-[#6F6B7D] hover:text-[#1F1A67] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
                  </Link>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}