import Link from "next/link";
import { ArrowLeft, Save, AlertCircle, Activity, Heart, Thermometer, Droplets } from "lucide-react";
import { ConsultationPad } from "@/components/features/doctor/ConsultationPad";
import { fetchPatientWithVitals } from "@/services/api";

interface ConsultationPageProps {
  params: Promise<{ patientId: string }>;
}

export default async function ConsultationPage({ params }: ConsultationPageProps) {
  const { patientId } = await params;
  const liveData = await fetchPatientWithVitals(patientId);

  const patientData = {
    id: patientId,
    name: liveData?.name || "Unknown Patient",
    gender: liveData?.gender || "N/A",
    age: liveData?.age ? `${liveData.age} yrs` : "N/A",
    bloodGroup: liveData?.blood_group || "N/A",
    allergies: liveData?.allergies || "None",
    vitals: liveData?.vitals || { bp: "120/80", heartRate: "75", temperature: "98.6", healthScore: "85" }
  };

  // ==========================================
  // SERVER-SIDE AI PREDICTION FETCH
  // ==========================================
  let mlScore = 85; // Fallback score
  try {
    const [sys, dia] = patientData.vitals.bp.split("/");
    const payload = {
      systolic_bp: parseFloat(sys) || 120,
      diastolic_bp: parseFloat(dia) || 80,
      heart_rate: parseFloat(patientData.vitals.heartRate) || 75,
      temperature_f: parseFloat(patientData.vitals.temperature) || 98.6
    };

    // Ask your FastAPI ML endpoint for the live prediction
    const res = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store" // Ensure it always gets fresh data
    });

    if (res.ok) {
      const data = await res.json();
      if (data.predicted_health_score) {
        mlScore = Math.round(data.predicted_health_score);
      }
    }
  } catch (error) {
    console.error("AI Prediction Server Fetch Failed:", error);
  }

  return (
    <div className="w-full px-6 py-6 md:px-8 max-w-[1400px] mx-auto space-y-6 text-[#2B2B2B]">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Link href="/doctor" className="flex items-center text-sm font-medium text-[#6F6B7D] hover:text-[#1F1A67] transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Queue
        </Link>
        <button className="flex items-center px-5 py-2.5 bg-[#1F1A67] text-white text-sm font-medium rounded-md hover:bg-[#3B3486] transition-colors shadow-sm">
          <Save className="w-4 h-4 mr-2" />
          Save & Complete
        </button>
      </div>

      {/* PATIENT INFO CARD */}
      <div className="bg-white p-5 md:p-6 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1F1A67] tracking-tight">{patientData.name}</h1>
          <p className="text-[13px] font-medium text-[#6F6B7D] mt-1">
            ID: {patientData.id} <span className="mx-1.5">•</span> {patientData.gender} <span className="mx-1.5">•</span> {patientData.age} <span className="mx-1.5">•</span> Blood Group: {patientData.bloodGroup}
          </p>
        </div>
        {patientData.allergies !== "None" && (
          <div className="px-3 py-2 bg-[#FDF0F4] text-[#C61A4C] rounded-md border border-[#FDF0F4] flex items-center text-sm font-bold tracking-wide">
            <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
            Allergic to {patientData.allergies}
          </div>
        )}
      </div>

      {/* VITALS & AI GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* BLOOD PRESSURE */}
        <div className="bg-white p-4 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider">Blood Pressure</span>
            <Activity className="w-4 h-4 text-[#1F1A67]" />
          </div>
          <p className="text-xl font-bold text-[#1F1A67] tracking-tight mt-2">{patientData.vitals.bp} <span className="text-[13px] text-[#6F6B7D] font-medium ml-1">mmHg</span></p>
        </div>

        {/* HEART RATE */}
        <div className="bg-white p-4 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider">Heart Rate</span>
            <Heart className="w-4 h-4 text-[#C61A4C]" />
          </div>
          <p className="text-xl font-bold text-[#1F1A67] tracking-tight mt-2">{patientData.vitals.heartRate} <span className="text-[13px] text-[#6F6B7D] font-medium ml-1">bpm</span></p>
        </div>

        {/* TEMPERATURE */}
        <div className="bg-white p-4 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-bold text-[#6F6B7D] uppercase tracking-wider">Temperature</span>
            <Thermometer className="w-4 h-4 text-[#FFB81C]" />
          </div>
          <p className="text-xl font-bold text-[#1F1A67] tracking-tight mt-2">{patientData.vitals.temperature} <span className="text-[13px] text-[#6F6B7D] font-medium ml-1">°F</span></p>
        </div>

        {/* LIVE ML HEALTH SCORE CHART */}
        <div className="bg-[#FFFFFF] p-4 rounded-lg border border-[#EAEAEA] shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start w-full">
            <span className="text-[11px] font-bold text-[#00A3E0] uppercase tracking-wider">ML Health Score</span>
            <Droplets className="w-4 h-4 text-[#00A3E0]" />
          </div>
          <div className="flex-grow flex items-center justify-center mt-2">
            {/* The image URL now injects the live AI prediction score! */}
            <img 
              src={`http://127.0.0.1:8000/api/doctor/charts/health-score/${mlScore}`} 
              alt="Live ML Health Score Chart" 
              className="h-[70px] w-auto object-contain drop-shadow-sm"
            />
          </div>
        </div>

      </div>

      <ConsultationPad patientName={patientData.name} patientId={patientData.id} />
    </div>
  );
}