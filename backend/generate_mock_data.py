import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import os

os.makedirs('data', exist_ok=True)
np.random.seed(42)

# --- Model 1: Vitals & Health Trajectory ---
vitals_data = []
for _ in range(5000):
    is_stable = np.random.choice([True, False], p=[0.7, 0.3])
    if is_stable:
        sys_bp, dia_bp, hr = np.random.randint(110, 130), np.random.randint(70, 85), np.random.randint(65, 85)
        temp, health_score = round(np.random.uniform(97.5, 99.0), 1), np.random.randint(80, 100)
    else:
        sys_bp, dia_bp, hr = np.random.randint(140, 180), np.random.randint(90, 110), np.random.randint(100, 130)
        temp, health_score = round(np.random.uniform(99.5, 103.5), 1), np.random.randint(30, 65)

    vitals_data.append({
        "patient_id": f"UHID-{np.random.randint(1000, 9999)}",
        "systolic_bp": sys_bp, "diastolic_bp": dia_bp,
        "heart_rate": hr, "temperature_f": temp, "health_score": health_score 
    })
pd.DataFrame(vitals_data).to_csv('data/vitals_health_score.csv', index=False)

# --- Model 2: Outbreak Detection ---
outbreak_data = []
diseases = ["Viral Fever", "Gastroenteritis", "Respiratory Infection"]
start_date = datetime.today() - timedelta(days=180)

for day in range(180):
    current_date = start_date + timedelta(days=day)
    is_outbreak_period = 60 < day < 75 
    
    for disease in diseases:
        cases = np.random.randint(15, 35) if (is_outbreak_period and disease == "Viral Fever") else np.random.randint(1, 8)
        outbreak_data.append({
            "date": current_date.strftime("%Y-%m-%d"), "disease_type": disease,
            "daily_cases": cases, "ward_beds_occupied": min(42, cases + np.random.randint(10, 25)), 
            "outbreak_detected": 1 if (is_outbreak_period and disease == "Viral Fever") else 0
        })
pd.DataFrame(outbreak_data).to_csv('data/outbreak_trends.csv', index=False)