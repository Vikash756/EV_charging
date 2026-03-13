import { useState } from "react"                          
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import ChargerCard from "../components/ChargerCard" 
import API from "../api/axios"       

// In a real app, this data would come from the backend via API calls. For this demo, we're using hardcoded data.
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
  // const [stations, setStations] = useState([])
  // const [loading, setLoading] = useState(true)
  // const [showForm, setShowForm] = useState(false)
  

  const filtered = activeFilter === "All"                  
    ? chargers
    : chargers.filter(c => c.status === activeFilter)

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar title="Chargers" />
        <main style={{ flex: 1, padding: "28px" }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              {filters.map((f) => (
                <button key={f}
                  onClick={() => setActiveFilter(f)}      
                  style={{
                    padding: "7px 14px", borderRadius: "8px",
                    border: activeFilter === f ? "none" : "1px solid #e2e8f0",
                    cursor: "pointer", fontSize: "12px", fontWeight: "600",
                    background: activeFilter === f ? "#0f172a" : "#fff",
                    color: activeFilter === f ? "#fff" : "#64748b",
                    transition: "all 0.15s ease",
                  }}
                >{f}</button>
              ))}
            </div>
            <button style={{
              padding: "9px 18px", borderRadius: "8px", border: "none",
              background: "linear-gradient(135deg, #0284c7, #0ea5e9)",
              color: "#fff", fontSize: "13px", fontWeight: "700", cursor: "pointer",
              boxShadow: "0 4px 12px rgba(2,132,199,0.3)",
            }}>+ Add Charger</button>
          </div>

          {/* Cards grid - ChargerCard use ho raha hai yahan ↓ */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "18px" }}>
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

        </main>
      </div>
    </div>
  )
}
