import Link from "next/link";

import {
  ArrowLeft,
  Save,
  AlertCircle,
  Activity,
  Heart,
  Thermometer,
  Droplets,
} from "lucide-react";

import { ConsultationPad } from "@/components/features/doctor/ConsultationPad";

interface ConsultationPageProps {
  params: Promise<{
    patientId: string;
  }>;
}

export default async function ConsultationPage({
  params,
}: ConsultationPageProps) {

  // Next.js 16: params is asynchronous
  const { patientId } = await params;

  // Mock patient data
  const patientData = {
    id: patientId,
    name: "Michael Chen",
    gender: "Male",
    age: "42 yrs",
    bloodGroup: "O+",
    allergies: "Allergic to Penicillin",
  };

  return (
    <div className="w-full px-6 py-6 md:px-8 max-w-[1400px] mx-auto space-y-6 text-[#2B2B2B]">

      {/* ================= TOP NAVIGATION ================= */}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

        <Link
          href="/doctor"
          className="flex items-center text-sm font-medium text-[#6F6B7D] hover:text-[#1F1A67] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Queue
        </Link>

        <Link
          href="/doctor"
          className="flex items-center px-5 py-2.5 bg-[#1F1A67] text-white text-sm font-medium rounded-md hover:bg-[#3B3486] transition-colors shadow-sm"
        >
          <Save className="w-4 h-4 mr-2" />
          Save & Complete
        </Link>

      </div>


      {/* ================= PATIENT HEADER ================= */}

      <div className="bg-white p-5 md:p-6 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

        <div>

          <h1 className="text-2xl font-bold text-[#1F1A67] tracking-tight">
            {patientData.name}
          </h1>

          <p className="text-[13px] font-medium text-[#6F6B7D] mt-1">

            ID: {patientData.id}

            <span className="mx-1.5">•</span>

            {patientData.gender}

            <span className="mx-1.5">•</span>

            {patientData.age}

            <span className="mx-1.5">•</span>

            Blood Group: {patientData.bloodGroup}

          </p>

        </div>


        {/* Allergy Warning */}

        <div className="px-3 py-2 bg-[#FDF0F4] text-[#C61A4C] rounded-md border border-[#FDF0F4] flex items-center text-sm font-bold tracking-wide">

          <AlertCircle className="w-4 h-4 mr-2 shrink-0" />

          {patientData.allergies}

        </div>

      </div>


      {/* ================= VITALS ================= */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">


        {/* Blood Pressure */}

        <div className="bg-white p-4 rounded-lg border border-[#EAEAEA] shadow-sm">

          <div className="flex justify-between items-start mb-2">

            <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider">
              Blood Pressure
            </span>

            <Activity className="w-4 h-4 text-[#1F1A67]" />

          </div>

          <p className="text-xl font-bold text-[#1F1A67] tracking-tight">

            120/80

            <span className="text-[13px] text-[#6F6B7D] font-medium ml-1">
              mmHg
            </span>

          </p>

        </div>


        {/* Heart Rate */}

        <div className="bg-white p-4 rounded-lg border border-[#EAEAEA] shadow-sm">

          <div className="flex justify-between items-start mb-2">

            <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider">
              Heart Rate
            </span>

            <Heart className="w-4 h-4 text-[#C61A4C]" />

          </div>

          <p className="text-xl font-bold text-[#1F1A67] tracking-tight">

            82

            <span className="text-[13px] text-[#6F6B7D] font-medium ml-1">
              bpm
            </span>

          </p>

        </div>


        {/* Temperature */}

        <div className="bg-white p-4 rounded-lg border border-[#EAEAEA] shadow-sm">

          <div className="flex justify-between items-start mb-2">

            <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider">
              Temperature
            </span>

            <Thermometer className="w-4 h-4 text-[#FFB81C]" />

          </div>

          <p className="text-xl font-bold text-[#1F1A67] tracking-tight">

            98.6

            <span className="text-[13px] text-[#6F6B7D] font-medium ml-1">
              °F
            </span>

          </p>

        </div>


        {/* SpO2 */}

        <div className="bg-white p-4 rounded-lg border border-[#EAEAEA] shadow-sm">

          <div className="flex justify-between items-start mb-2">

            <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider">
              SpO2
            </span>

            <Droplets className="w-4 h-4 text-[#00A3E0]" />

          </div>

          <p className="text-xl font-bold text-[#1F1A67] tracking-tight">

            98

            <span className="text-[13px] text-[#6F6B7D] font-medium ml-1">
              %
            </span>

          </p>

        </div>

      </div>


      {/* ================= CONSULTATION WORKBENCH ================= */}

      <ConsultationPad
        patientName={patientData.name}
        patientId={patientData.id}
      />

    </div>
  );
}