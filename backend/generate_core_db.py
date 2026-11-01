import pandas as pd
import os
import random
from datetime import datetime

os.makedirs("data", exist_ok=True)

# 1. FETCH REAL IDs FROM ML DATA
try:
    vitals_df = pd.read_csv("data/vitals_health_score.csv")
    real_uhids = vitals_df['patient_id'].unique()[:10].tolist()
    print(f"🔗 Linked to ML Data! Using UHIDs: {real_uhids[:3]}...")
except FileNotFoundError:
    print("⚠️ vitals_health_score.csv not found. Using fallback IDs.")
    real_uhids = [f"UHID-{1000+i}" for i in range(10)]

# 2. PATIENTS (Master Directory)
patients = {
    "uhid": real_uhids,
    "name": ["Emily Rodriguez", "Michael Chen", "Sarah Jenkins", "Robert Fox", "Jane Doe", "James Wilson", "Alice Miller", "John Smith", "Maria Garcia", "David Kim"],
    "age": [34, 42, 58, 65, 29, 45, 31, 55, 48, 39],
    "gender": ["Female", "Male", "Female", "Male", "Female", "Male", "Female", "Male", "Female", "Male"],
    "blood_group": ["O+", "B+", "A-", "O-", "AB+", "A+", "B-", "O+", "A+", "AB-"],
    "allergies": ["Penicillin", "None", "Dust", "Latex", "None", "Peanuts", "None", "Aspirin", "None", "Pollen"]
}
pd.DataFrame(patients).to_csv("data/patients.csv", index=False)

# 3. APPOINTMENTS (Doctor's Queue & Reception)
appointments = {
    "appointment_id": ["AP-001", "AP-002", "AP-003"],
    "uhid": [real_uhids[0], real_uhids[1], real_uhids[2]], 
    "doctor_id": ["DR_DOE", "DR_DOE", "DR_SMITH"],
    "type": ["FOLLOW-UP", "NEW PATIENT", "FOLLOW-UP"],
    "time": ["09:00 AM", "09:30 AM", "10:15 AM"],
    "status": ["IN_PROGRESS", "WAITING", "WAITING"]
}
pd.DataFrame(appointments).to_csv("data/appointments.csv", index=False)

# 4. WARD BEDS (Nurse Dashboard)
beds = {
    "bed_id": ["W1-B01", "W1-B02", "W1-B03", "W1-B04", "W1-B05", "W1-B06", "W1-B07", "W1-B08"],
    "status": ["OCCUPIED", "AVAILABLE", "CLEANING", "OCCUPIED", "AVAILABLE", "EMERGENCY", "OCCUPIED", "OCCUPIED"],
    "uhid": [real_uhids[0], "", "", real_uhids[1], "", real_uhids[4], real_uhids[2], real_uhids[3]],
    "info": ["ADM: 2 DAYS AGO", "READY", "EST: 15M", "ADM: TODAY", "READY", "IMMEDIATE", "ADM: YESTERDAY", "DISCHARGE: TODAY"]
}
pd.DataFrame(beds).to_csv("data/ward_beds.csv", index=False)

# 5. LAB REQUESTS (Laboratory & Doctor Alerts)
lab_requests = {
    "request_id": ["REQ-9012", "REQ-9013", "REQ-9014"],
    "uhid": [real_uhids[1], real_uhids[5], real_uhids[2]],
    "doctor": ["REQ: DR. DOE", "REQ: DR. DOE", "REQ: DR. SMITH"],
    "test_name": ["Complete Blood Count (CBC)", "Lipid Panel", "Chest X-Ray"],
    "category": ["Pathology", "Pathology", "Radiology"],
    "status": ["SAMPLE REQUIRED", "PROCESSING", "RESULT ENTRY"],
    "is_urgent": [False, False, True]
}
pd.DataFrame(lab_requests).to_csv("data/lab_requests.csv", index=False)

# 6. INVOICES (Billing Dashboard)
invoices = {
    "invoice_id": ["INV-2094", "INV-2093"],
    "uhid": [real_uhids[4], real_uhids[2]],
    "subtotal": [1200.00, 850.00],
    "tax": [60.00, 42.50],
    "total": [1260.00, 892.50],
    "status": ["PAID", "PENDING"],
    "date": [datetime.today().strftime("%d/%m/%Y")] * 2
}
pd.DataFrame(invoices).to_csv("data/invoices.csv", index=False)

# 7. NOTIFICATIONS (System-wide)
notifications = {
    "notif_id": ["NOTIF-001", "NOTIF-002", "NOTIF-003", "NOTIF-004"],
    "title": ["Critical Patient Alert", "Lab Result Available", "New Registration", "Prescription Ready"],
    "message": [f"Patient {real_uhids[0]} requires review.", "CBC results ready.", "New OPD walk-in.", "RX-1043 ready."],
    "source": ["Doctor", "Laboratory", "Reception", "Doctor"],
    "target": ["Nursing", "Doctor", "Admin", "Pharmacy"],
    "category": ["ALERTS", "CLINICAL", "OPERATIONS", "CLINICAL"],
    "priority": ["CRITICAL", "IMPORTANT", "NORMAL", "NORMAL"],
    "unread": [True, True, True, False]
}
pd.DataFrame(notifications).to_csv("data/notifications.csv", index=False)

print("✅ Unified Hospital Database generated successfully!")