import os
import io
from datetime import datetime
import pandas as pd
import joblib

import matplotlib
matplotlib.use('Agg') # Required so Matplotlib runs smoothly in the background
import matplotlib.pyplot as plt

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

app = FastAPI()

# ==========================================
# 0. ML MODEL & CORS CONFIGURATION
# ==========================================

# Enable CORS so Next.js can talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained ML models globally once on startup
model = joblib.load("patient_health_model.pkl")
outbreak_model = joblib.load("outbreak_prediction_models.pkl")

# Define the expected ML input structure for Patient Health
class PatientData(BaseModel):
    systolic_bp: float
    diastolic_bp: float
    heart_rate: float
    temperature_f: float

# Define the expected ML input structure for Outbreak Prediction
class OutbreakData(BaseModel):
    cases_lag_1: float
    cases_lag_3: float
    cases_lag_7: float
    cases_mean_7: float
    beds_lag_1: float
    beds_lag_3: float
    beds_lag_7: float
    beds_mean_7: float
    day_of_week: int
    month: int
    disease_type_Gastroenteritis: int
    disease_type_Respiratory_Infection: int # Underscore for Python variable
    disease_type_Viral_Fever: int           # Underscore for Python variable

# Ensure a nurse vitals store exists
OS_VITALS_FILE = "data/nurse_vitals.csv"
if not os.path.exists(OS_VITALS_FILE):
    pd.DataFrame(columns=["uhid", "bp", "heart_rate", "temperature", "health_score"]).to_csv(OS_VITALS_FILE, index=False)

@app.get("/")
def read_root():
    return {"status": "Sahyadri Backend Running"}

# ==========================================
# AI / ML ENDPOINTS
# ==========================================

@app.post("/predict")
def predict(data: PatientData):
    try:
        patient = pd.DataFrame([{
            "systolic_bp": data.systolic_bp,
            "diastolic_bp": data.diastolic_bp,
            "heart_rate": data.heart_rate,
            "temperature_f": data.temperature_f
        }])

        prediction = model.predict(patient)

        return {
            "predicted_health_score": round(float(prediction[0]), 2)
        }
    except Exception as e:
        return {"error": str(e)}

@app.post("/predict-outbreak")
def predict_outbreak(data: OutbreakData):
    try:
        # Map the Pydantic data into a Pandas DataFrame.
        # Notice we map the Python underscores back to the exact string spaces the model expects.
        outbreak_df = pd.DataFrame([{
            "cases_lag_1": data.cases_lag_1,
            "cases_lag_3": data.cases_lag_3,
            "cases_lag_7": data.cases_lag_7,
            "cases_mean_7": data.cases_mean_7,
            "beds_lag_1": data.beds_lag_1,
            "beds_lag_3": data.beds_lag_3,
            "beds_lag_7": data.beds_lag_7,
            "beds_mean_7": data.beds_mean_7,
            "day_of_week": data.day_of_week,
            "month": data.month,
            "disease_type_Gastroenteritis": data.disease_type_Gastroenteritis,
            "disease_type_Respiratory Infection": data.disease_type_Respiratory_Infection,
            "disease_type_Viral Fever": data.disease_type_Viral_Fever
        }])

        prediction = outbreak_model.predict(outbreak_df)

        return {
            "predicted_cases": round(float(prediction[0]), 2)
        }
    except Exception as e:
        return {"error": str(e)}


# ==========================================
# HOSPITAL DASHBOARD ENDPOINTS
# ==========================================

# 1. DOCTOR QUEUE ENDPOINT
@app.get("/api/doctor/queue")
def get_doctor_queue():
    try:
        appointments = pd.read_csv("data/appointments.csv").fillna("")
        patients = pd.read_csv("data/patients.csv").fillna("")
        
        merged = pd.merge(appointments, patients, on="uhid", how="left")
        
        queue = []
        for _, row in merged.iterrows():
            queue.append({
                "id": str(row["uhid"]),
                "name": str(row["name"]) if row["name"] else f"Patient {row['uhid']}",
                "type": str(row["type"]),
                "time": str(row["time"])
            })
        return queue
    except Exception as e:
        return {"error": str(e)}

# 2. SINGLE PATIENT + LIVE NURSE VITALS + ML FALLBACK
@app.get("/api/patient/{uhid}")
def get_patient_details(uhid: str):
    try:
        patients = pd.read_csv("data/patients.csv").fillna("")
        vitals_ml = pd.read_csv("data/vitals_health_score.csv").fillna("")
        nurse_vitals_df = pd.read_csv(OS_VITALS_FILE).fillna("")
        
        patient_info = patients[patients["uhid"] == uhid]
        if not patient_info.empty:
            data = patient_info.iloc[0].to_dict()
        else:
            data = {
                "uhid": uhid,
                "name": f"Patient ({uhid})",
                "gender": "Not Specified",
                "age": "35",
                "blood_group": "O+",
                "allergies": "None"
            }
            
        n_match = nurse_vitals_df[nurse_vitals_df["uhid"] == uhid]
        if not n_match.empty:
            latest = n_match.iloc[-1]
            data["vitals"] = {
                "bp": str(latest["bp"]),
                "heartRate": str(latest["heart_rate"]),
                "temperature": str(latest["temperature"]),
                "healthScore": str(latest["health_score"])
            }
        else:
            patient_vitals = vitals_ml[vitals_ml["patient_id"] == uhid]
            if not patient_vitals.empty:
                live = patient_vitals.iloc[0]
                data["vitals"] = {
                    "bp": f"{live.get('systolic_bp', 120)}/{live.get('diastolic_bp', 80)}",
                    "heartRate": str(live.get('heart_rate', 75)),
                    "temperature": str(live.get('temperature_f', 98.6)),
                    "healthScore": str(live.get('health_score', 85))
                }
            else:
                data["vitals"] = {"bp": "120/80", "heartRate": "75", "temperature": "98.6", "healthScore": "88"}
                
        return data
    except Exception as e:
        return {"uhid": uhid, "name": f"Patient {uhid}", "vitals": {"bp": "120/80", "heartRate": "75", "temperature": "98.6", "healthScore": "85"}}

# 3. NURSE BED OCCUPANCY ENDPOINT
@app.get("/api/nurse/beds")
def get_ward_beds():
    try:
        beds = pd.read_csv("data/ward_beds.csv").fillna("")
        patients = pd.read_csv("data/patients.csv").fillna("")
        patient_dict = dict(zip(patients["uhid"], patients["name"]))
        
        bed_list = []
        for _, row in beds.iterrows():
            uhid = str(row["uhid"]).strip()
            patient_name = patient_dict.get(uhid, "—")
            if row["status"] == "AVAILABLE":
                patient_name = "NO PATIENT"
                
            bed_list.append({
                "id": str(row["bed_id"]),
                "status": str(row["status"]),
                "patient": patient_name,
                "info": str(row["info"]),
                "uhid": uhid
            })
        return bed_list
    except Exception as e:
        return {"error": str(e)}

# 4. LABORATORY REQUESTS ENDPOINT
@app.get("/api/lab/requests")
def get_lab_requests():
    try:
        requests = pd.read_csv("data/lab_requests.csv").fillna("")
        patients = pd.read_csv("data/patients.csv").fillna("")
        patient_dict = dict(zip(patients["uhid"], patients["name"]))
        
        lab_list = []
        for _, row in requests.iterrows():
            uhid = str(row["uhid"]).strip()
            lab_list.append({
                "id": str(row["request_id"]),
                "patient": patient_dict.get(uhid, "Unknown Patient"),
                "doctor": str(row["doctor"]),
                "details": str(row["test_name"]),
                "category": str(row["category"]),
                "status": str(row["status"]),
                "urgent": bool(row["is_urgent"])
            })
        return lab_list
    except Exception as e:
        return {"error": str(e)}

# 5. NURSE SAVE VITALS ENDPOINT
@app.post("/api/nurse/vitals")
async def save_nurse_vitals(payload: dict):
    try:
        uhid = payload.get("uhid")
        bp = payload.get("bp")
        hr = payload.get("heartRate")
        temp = payload.get("temperature")
        
        df = pd.read_csv(OS_VITALS_FILE)
        new_row = pd.DataFrame([{"uhid": uhid, "bp": bp, "heart_rate": hr, "temperature": temp, "health_score": 92}])
        df = pd.concat([df, new_row], ignore_index=True)
        df.to_csv(OS_VITALS_FILE, index=False)
        
        return {"status": "success", "message": "Vitals recorded successfully"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
        
# 6. PHARMACY PRESCRIPTIONS ENDPOINT
@app.get("/api/pharmacy/prescriptions")
def get_prescriptions():
    try:
        FILE_PATH = "data/prescriptions.csv"
        if not os.path.exists(FILE_PATH):
            pd.DataFrame(
                columns=["prescription_id", "uhid", "doctor", "medication", "dosage", "status", "date"]
            ).to_csv(FILE_PATH, index=False)
            
        prescriptions = pd.read_csv(FILE_PATH).fillna("")
        patients = pd.read_csv("data/patients.csv").fillna("")
        patient_dict = dict(zip(patients["uhid"], patients["name"]))
        
        rx_list = []
        for _, row in prescriptions.iterrows():
            uhid = str(row.get("uhid", "")).strip()
            rx_list.append({
                "id": str(row.get("prescription_id", "RX-000")),
                "patient": patient_dict.get(uhid, "Unknown Patient"),
                "doctor": str(row.get("doctor", "Unknown")),
                "medication": str(row.get("medication", "N/A")),
                "dosage": str(row.get("dosage", "N/A")),
                "status": str(row.get("status", "PENDING")),
                "date": str(row.get("date", "Today"))
            })
        return rx_list
    except Exception as e:
        return {"error": str(e)}
        
# 7. RECEPTION & BILLING ENDPOINT
@app.get("/api/reception/invoices")
def get_invoices():
    try:
        FILE_PATH = "data/invoices.csv"
        if not os.path.exists(FILE_PATH):
            pd.DataFrame(
                columns=["invoice_id", "uhid", "amount", "status", "date"]
            ).to_csv(FILE_PATH, index=False)
            
        invoices = pd.read_csv(FILE_PATH).fillna("")
        patients = pd.read_csv("data/patients.csv").fillna("")
        patient_dict = dict(zip(patients["uhid"], patients["name"]))
        
        invoice_list = []
        for _, row in invoices.iterrows():
            uhid = str(row.get("uhid", "")).strip()
            invoice_list.append({
                "id": str(row.get("invoice_id", "INV-000")),
                "patient": patient_dict.get(uhid, "Unknown Patient"),
                "amount": float(row.get("amount", 0)),
                "status": str(row.get("status", "UNPAID")),
                "date": str(row.get("date", "Today"))
            })
        return invoice_list
    except Exception as e:
        return {"error": str(e)}

# 8. CREATE NEW INVOICE ENDPOINT
@app.post("/api/reception/invoices")
async def create_invoice(payload: dict):
    try:
        uhid = payload.get("uhid")
        amount = payload.get("amount")
        
        FILE_PATH = "data/invoices.csv"
        df = pd.read_csv(FILE_PATH)
        
        # Generate new ID based on current row count
        new_id = f"INV-{len(df) + 9001}"
        date_str = datetime.now().strftime("%Y-%m-%d")
        
        new_row = pd.DataFrame([{
            "invoice_id": new_id, 
            "uhid": uhid, 
            "amount": amount, 
            "status": "PAID", 
            "date": date_str
        }])
        
        df = pd.concat([df, new_row], ignore_index=True)
        df.to_csv(FILE_PATH, index=False)
        
        return {"status": "success", "invoice_id": new_id}
    except Exception as e:
        return {"status": "error", "message": str(e)}

# ==========================================
# CHART GENERATION ENDPOINTS
# ==========================================

# 10. MATPLOTLIB FINANCIAL BAR CHART (For Admin Dashboard)
@app.get("/api/admin/charts/finance")
def get_finance_chart():
    try:
        months = ["APR", "MAY", "JUN", "JUL", "AUG", "SEP"]
        revenue = [25, 32, 28, 35, 30, 42] # represented in Lakhs

        plt.figure(figsize=(8, 4))
        plt.bar(months, revenue, color='#1F1A67', width=0.45, zorder=2)
        
        plt.grid(axis='y', linestyle='--', alpha=0.3, zorder=1)
        plt.gca().spines['top'].set_visible(False)
        plt.gca().spines['right'].set_visible(False)
        plt.gca().spines['left'].set_color('#EAEAEA')
        plt.gca().spines['bottom'].set_color('#EAEAEA')
        plt.gca().tick_params(colors='#6F6B7D', labelsize=10)
        plt.tight_layout()
        
        buf = io.BytesIO()
        plt.savefig(buf, format="png", dpi=300, transparent=True)
        buf.seek(0)
        plt.close()
        
        return StreamingResponse(buf, media_type="image/png")
    except Exception as e:
        return {"error": str(e)}

# 12. MATPLOTLIB ML HEALTH SCORE (Donut Chart)
@app.get("/api/doctor/charts/health-score/{score}")
def get_health_score_chart(score: int):
    try:
        if score >= 80:
            color = '#16A34A'  # Healthy Green
        elif score >= 60:
            color = '#F59E0B'  # Warning Orange
        else:
            color = '#C61A4C'  # Critical Red
            
        fig, ax = plt.subplots(figsize=(2.5, 2.5))
        
        wedges, _ = ax.pie(
            [score, 100 - score], 
            colors=[color, '#F4F0F8'], 
            startangle=90, 
            counterclock=False, 
            wedgeprops=dict(width=0.35, edgecolor='none')
        )
        
        plt.text(0, 0.1, f"{score}", ha='center', va='center', fontsize=32, fontweight='bold', color='#1F1A67')
        plt.text(0, -0.35, "OUT OF 100", ha='center', va='center', fontsize=9, fontweight='bold', color='#6F6B7D')
        
        ax.axis('equal') 
        plt.tight_layout()
        
        buf = io.BytesIO()
        plt.savefig(buf, format="png", dpi=200, transparent=True, bbox_inches='tight', pad_inches=0)
        buf.seek(0)
        plt.close()
        
        return StreamingResponse(buf, media_type="image/png")
    except Exception as e:
        return {"error": str(e)}
   # 11. MATPLOTLIB ML OUTBREAK TRENDS (Line Chart)
@app.get("/api/admin/charts/outbreak")
def get_outbreak_chart():
    try:
        # 1. Prepare the exact features your model expects
        outbreak_df = pd.DataFrame([{
            "cases_lag_1": 45.0, "cases_lag_3": 40.0, "cases_lag_7": 35.0, "cases_mean_7": 38.5,
            "beds_lag_1": 120.0, "beds_lag_3": 115.0, "beds_lag_7": 110.0, "beds_mean_7": 115.2,
            "day_of_week": 2, "month": 10,
            "disease_type_Gastroenteritis": 0,
            "disease_type_Respiratory Infection": 1,
            "disease_type_Viral Fever": 0
        }])
        
        # THE FIX: Select the "case_model" from the dictionary before calling predict!
        predicted_cases = outbreak_model["case_model"].predict(outbreak_df)[0]
        
        # 2. Prepare data for the chart
        days = ["Day -5", "Day -4", "Day -3", "Day -2", "Yesterday", "Today", "Tomorrow"]
        cases = [25, 30, 28, 35, 40, 45, predicted_cases]
        
        # 3. Draw the Matplotlib Line Chart
        plt.figure(figsize=(9, 3.5))
        
        plt.plot(days[:-1], cases[:-1], marker='o', color='#1F1A67', linewidth=2.5, label='Actual Cases')
        plt.plot(days[-2:], cases[-2:], marker='o', color='#C61A4C', linewidth=2.5, linestyle='--', label='AI Forecast')
        plt.fill_between(days[-2:], cases[-2:], alpha=0.1, color='#C61A4C')
        
        plt.grid(axis='y', linestyle='--', alpha=0.3)
        plt.gca().spines['top'].set_visible(False)
        plt.gca().spines['right'].set_visible(False)
        plt.gca().spines['left'].set_color('#EAEAEA')
        plt.gca().spines['bottom'].set_color('#EAEAEA')
        plt.gca().tick_params(colors='#6F6B7D', labelsize=9)
        plt.legend(frameon=False, fontsize=9, loc='upper left')
        plt.tight_layout()
        
        buf = io.BytesIO()
        plt.savefig(buf, format="png", dpi=300, transparent=True)
        buf.seek(0)
        plt.close()
        
        return StreamingResponse(buf, media_type="image/png")
    except Exception as e:
        # Print the error to your terminal so we can see it if it fails again
        print(f"Chart Generation Error: {str(e)}") 
        return {"error": str(e)}