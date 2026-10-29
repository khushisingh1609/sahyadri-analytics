"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Stethoscope, CheckCircle } from "lucide-react";

interface ConsultationPadProps {
  patientName: string;
  patientId: string;
}

export function ConsultationPad({
  patientName,
  patientId,
}: ConsultationPadProps) {
  const router = useRouter();

  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    alert(`Consultation saved for ${patientName}`);

    // Go back to doctor dashboard
    router.push("/doctor");
  };

  return (
    <div className="bg-white border border-[#EAEAEA] rounded-lg shadow-sm p-6">

      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#EAEAEA] pb-4 mb-5">

        <div>
          <h2 className="text-lg font-bold text-[#1F1A67] flex items-center">
            <Stethoscope className="w-5 h-5 mr-2 text-[#00A3E0]" />
            Electronic Medical Record (EMR)
          </h2>

          <p className="text-xs text-[#6F6B7D] mt-1">
            Patient:{" "}
            <span className="font-semibold text-[#1F1A67]">
              {patientName}
            </span>{" "}
            ({patientId})
          </p>
        </div>

      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="space-y-5">

        {/* Diagnosis */}
        <div>
          <label className="block text-xs font-semibold text-[#6F6B7D] uppercase tracking-wider mb-2">
            Clinical Diagnosis & Notes
          </label>

          <textarea
            rows={4}
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="Enter symptoms, observations, and diagnosis..."
            className="w-full p-3 bg-white border border-[#D9DCE5] rounded-md text-sm text-[#2B2B2B] outline-none focus:border-[#1F1A67] focus:ring-1 focus:ring-[#1F1A67] transition-all resize-none"
          />
        </div>

        {/* Prescription */}
        <div>
          <label className="block text-xs font-semibold text-[#6F6B7D] uppercase tracking-wider mb-2">
            Prescription & Medications
          </label>

          <textarea
            rows={4}
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
            placeholder="e.g. Paracetamol 650mg - 1 tab twice a day for 5 days"
            className="w-full p-3 bg-white border border-[#D9DCE5] rounded-md text-sm text-[#2B2B2B] outline-none focus:border-[#1F1A67] focus:ring-1 focus:ring-[#1F1A67] transition-all resize-none"
          />
        </div>

        {/* Complete */}
        <button
          type="submit"
          className="w-full py-3 bg-[#1F1A67] text-white font-semibold rounded-md hover:bg-[#3B3486] transition-colors shadow-sm flex items-center justify-center"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Complete Consultation & Discharge
        </button>

      </form>

    </div>
  );
}