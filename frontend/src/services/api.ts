const API_BASE = "http://127.0.0.1:8000/api";

export async function fetchDoctorQueue() {
  try {
    const res = await fetch(`${API_BASE}/doctor/queue`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch queue:", error);
    return [];
  }
}

export async function fetchPatientWithVitals(uhid: string) {
  try {
    const res = await fetch(`${API_BASE}/patient/${uhid}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch patient:", error);
    return null;
  }
}
export async function fetchNurseBeds() {
  try {
    const res = await fetch(`${API_BASE}/nurse/beds`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch beds:", error);
    return [];
  }
}
export async function fetchLabRequests() {
  try {
    const res = await fetch(`${API_BASE}/lab/requests`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch lab requests:", error);
    return [];
  }
}
export async function saveNurseVitals(data: { uhid: string; bp: string; heartRate: string; temperature: string }) {
  try {
    const res = await fetch(`${API_BASE}/nurse/vitals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    console.error("Failed to save vitals:", error);
    return { status: "error" };
  }
}
export async function fetchPrescriptions() {
  try {
    const res = await fetch(`${API_BASE}/pharmacy/prescriptions`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch prescriptions:", error);
    return [];
  }
}
export async function fetchInvoices() {
  try {
    const res = await fetch(`${API_BASE}/reception/invoices`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch invoices:", error);
    return [];
  }
}export async function createInvoice(data: { uhid: string; amount: number }) {
  try {
    const res = await fetch(`${API_BASE}/reception/invoices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    console.error("Failed to create invoice:", error);
    return { status: "error" };
  }
}
