import { useState } from "react"
import ChargerCard from "../components/ChargerCard"
import Layout from "../components/Layout"
import API from "../api/axios"
import useWindowSize from "../hooks/useWindowSize"

const chargers = [
  { id: "CHR-A1", name: "Charger A1", location: "Sector 5, Jaipur", type: "DC Fast", power: "50 kW", status: "Available", lastUsed: "2 hrs ago" },
  { id: "CHR-B3", name: "Charger B3", location: "Mall Road, Delhi", type: "AC Level 2", power: "22 kW", status: "Charging", lastUsed: "Active now" },
  { id: "CHR-C2", name: "Charger C2", location: "Koramangala, Bangalore", type: "DC Fast", power: "100 kW", status: "Available", lastUsed: "5 hrs ago" },
  { id: "CHR-D1", name: "Charger D1", location: "Andheri, Mumbai", type: "AC Level 2", power: "22 kW", status: "Out of order", lastUsed: "3 days ago" },
  { id: "CHR-E4", name: "Charger E4", location: "Sector 18, Noida", type: "DC Fast", power: "50 kW", status: "Offline", lastUsed: "1 day ago" },
  { id: "CHR-F2", name: "Charger F2", location: "Banjara Hills, Hyderabad", type: "DC Fast", power: "150 kW", status: "Available", lastUsed: "30 min ago" },
]

const filters = ["All", "Available", "Charging", "Offline", "Out of order"]

export default function Chargers() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: "", location: "", latitude: "", longitude: "", availableSlots: "", totalSlots: "", pricePerHour: "", chargerType: "Fast" })
  const { isMobile, isTablet } = useWindowSize()

  const filtered = activeFilter === "All" ? chargers : chargers.filter(c => c.status === activeFilter)

  const handleAddStation = async () => {
    try {
      await API.post("/stations", {
        ...form,
        latitude: Number(form.latitude),
        longitude: Number(form.longitude),
        availableSlots: Number(form.availableSlots),
        totalSlots: Number(form.totalSlots),
        pricePerHour: Number(form.pricePerHour),
      })
      alert("Station added successfully!")
      setShowForm(false)
      setForm({ name: "", location: "", latitude: "", longitude: "", availableSlots: "", totalSlots: "", pricePerHour: "", chargerType: "Fast" })
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add station")
    }
  }

  return (
    <Layout title="Chargers">

      {/* ✅ Filter + Add Button responsive */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {filters.map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{
              padding: "7px 14px", borderRadius: "8px",
              border: activeFilter === f ? "none" : "1px solid #e2e8f0",
              cursor: "pointer", fontSize: "12px", fontWeight: "600",
              background: activeFilter === f ? "#0f172a" : "#fff",
              color: activeFilter === f ? "#fff" : "#64748b",
              transition: "all 0.15s ease",
            }}>{f}</button>
          ))}
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{
          padding: "9px 18px", borderRadius: "8px", border: "none",
          background: "linear-gradient(135deg, #0284c7, #0ea5e9)",
          color: "#fff", fontSize: "13px", fontWeight: "700", cursor: "pointer",
          boxShadow: "0 4px 12px rgba(2,132,199,0.3)",
        }}>{showForm ? "✕ Cancel" : "+ Add Charger"}</button>
      </div>

      {/* Add Station Form */}
      {showForm && (
        <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e8ecf0", padding: "24px", marginBottom: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <h3 style={{ margin: "0 0 20px", fontSize: "15px", fontWeight: "700", color: "#0f172a" }}>Add New Station</h3>
          {/* ✅ Form grid responsive */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "12px" }}>
            {[
              { key: "name", placeholder: "Station Name", label: "Name" },
              { key: "location", placeholder: "City, Area", label: "Location" },
              { key: "latitude", placeholder: "e.g. 26.9124", label: "Latitude" },
              { key: "longitude", placeholder: "e.g. 75.7873", label: "Longitude" },
              { key: "availableSlots", placeholder: "e.g. 5", label: "Available Slots" },
              { key: "totalSlots", placeholder: "e.g. 10", label: "Total Slots" },
              { key: "pricePerHour", placeholder: "e.g. 50", label: "Price/Hour (₹)" },
            ].map(({ key, placeholder, label }) => (
              <div key={key}>
                <label style={{ fontSize: "12px", fontWeight: "600", color: "#475569", display: "block", marginBottom: "6px" }}>{label}</label>
                <input placeholder={placeholder} value={form[key]}
                  onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                  onFocus={e => e.target.style.border = "1.5px solid #0284c7"}
                  onBlur={e => e.target.style.border = "1px solid #e2e8f0"}
                />
              </div>
            ))}
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#475569", display: "block", marginBottom: "6px" }}>Charger Type</label>
              <select value={form.chargerType} onChange={e => setForm(prev => ({ ...prev, chargerType: e.target.value }))}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px", outline: "none", background: "#fff", boxSizing: "border-box" }}>
                <option>Fast</option>
                <option>Slow</option>
                <option>Ultra-Fast</option>
              </select>
            </div>
          </div>
          <button onClick={handleAddStation} style={{ marginTop: "20px", padding: "11px 28px", borderRadius: "8px", border: "none", background: "linear-gradient(135deg, #0284c7, #0ea5e9)", color: "#fff", fontSize: "13px", fontWeight: "700", cursor: "pointer", boxShadow: "0 4px 12px rgba(2,132,199,0.3)" }}>
            Add Station ✓
          </button>
        </div>
      )}

      {/* ✅ Cards grid responsive */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)", gap: "18px" }}>
        {filtered.map((c) => (
          <ChargerCard key={c.id} station={c} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>
          <p style={{ fontSize: "40px" }}>🔌</p>
          <p style={{ fontSize: "15px", fontWeight: "600", marginTop: "12px" }}>No chargers found</p>
        </div>
      )}

    </Layout>
  )
}