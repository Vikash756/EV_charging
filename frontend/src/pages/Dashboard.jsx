import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import StatsCard from "../components/StatsCard"

const recentSessions = [
  { id: "CS-001", location: "Sector 5, Jaipur", charger: "CHR-A1", time: "Today, 10:32 AM", status: "Completed", energy: "24.5 kWh", cost: "$7.35" },
  { id: "CS-002", location: "Mall Road, Delhi", charger: "CHR-B3", time: "Today, 09:15 AM", status: "Active", energy: "12.1 kWh", cost: "$3.63" },
  { id: "CS-003", location: "Koramangala, Bangalore", charger: "CHR-C2", time: "Yesterday, 8:45 PM", status: "Completed", energy: "40.0 kWh", cost: "$12.00" },
  { id: "CS-004", location: "Andheri, Mumbai", charger: "CHR-D1", time: "Yesterday, 6:20 PM", status: "Failed", energy: "0 kWh", cost: "$0.00" },
  { id: "CS-005", location: "Sector 18, Noida", charger: "CHR-E4", time: "Mar 10, 4:10 PM", status: "Completed", energy: "18.7 kWh", cost: "$5.61" },
]

const chargerStatus = [
  { label: "Available", count: 10, color: "#22c55e" },
  { label: "Charging", count: 2, color: "#3b82f6" },
  { label: "Offline", count: 2, color: "#f59e0b" },
  { label: "Out of order", count: 2, color: "#ef4444" },
  { label: "Scheduled", count: 2, color: "#8b5cf6" },
]

const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]
const barData = [240, 220, 290, 340, 300, 230, 250, 270, 260, 300, 320, 270]
const maxBar = Math.max(...barData)


function statusBadge(status) {
  const styles = {
    Completed: { bg: "#f0fdf4", color: "#16a34a" },
    Active: { bg: "#eff6ff", color: "#2563eb" },
    Failed: { bg: "#fef2f2", color: "#dc2626" },
  }
  const s = styles[status] || { bg: "#f8fafc", color: "#64748b" }
  return (
    <span style={{
      padding: "3px 10px", borderRadius: "20px",
      fontSize: "11px", fontWeight: "600",
      background: s.bg, color: s.color,
    }}>{status}</span>
  )
}

export default function Dashboard() {
  const total = chargerStatus.reduce((a, b) => a + b.count, 0)

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f8fafc", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", overflow: "hidden" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Navbar title="Overview" />

        <main style={{ flex: 1, padding: "28px", overflowY: "auto" }}>

          {/* Location selector */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <select style={{
              padding: "8px 16px", borderRadius: "8px",
              border: "1px solid #e2e8f0", background: "#fff",
              fontSize: "13px", color: "#374151", fontWeight: "600",
              cursor: "pointer", outline: "none",
            }}>
              <option>All Locations</option>
              <option>Jaipur Hub</option>
              <option>Delhi Hub</option>
            </select>
            <select style={{
              padding: "8px 16px", borderRadius: "8px",
              border: "1px solid #e2e8f0", background: "#fff",
              fontSize: "13px", color: "#374151", fontWeight: "600",
              cursor: "pointer", outline: "none",
            }}>
              <option>Mar 2026</option>
              <option>Feb 2026</option>
              <option>Jan 2026</option>
            </select>
          </div>

          {/* Top row: Charger status + Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px", marginBottom: "20px" }}>

            {/* Charger Status Donut */}
            <div style={{
              background: "#fff", borderRadius: "14px",
              border: "1px solid #e8ecf0", padding: "24px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "700", color: "#0f172a" }}>Charger Status</h3>
                <button style={{
                  padding: "6px 14px", borderRadius: "7px",
                  border: "1px solid #e2e8f0", background: "#f8fafc",
                  fontSize: "12px", color: "#374151", cursor: "pointer", fontWeight: "600",
                }}>View chargers</button>
              </div>

              {/* Donut chart (CSS-only) */}
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{ position: "relative", width: "100px", height: "100px", flexShrink: 0 }}>
                  <svg viewBox="0 0 36 36" style={{ transform: "rotate(-90deg)", width: "100px", height: "100px" }}>
                    {(() => {
                      let offset = 0
                      return chargerStatus.map((s, i) => {
                        const pct = (s.count / total) * 100
                        const el = (
                          <circle key={i} cx="18" cy="18" r="14"
                            fill="none" stroke={s.color} strokeWidth="4"
                            strokeDasharray={`${pct * 0.879} 87.9`}
                            strokeDashoffset={-offset * 0.879}
                          />
                        )
                        offset += pct
                        return el
                      })
                    })()}
                  </svg>
                  <div style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                  }}>
                    <p style={{ margin: 0, fontSize: "18px", fontWeight: "800", color: "#0f172a" }}>{total}</p>
                    <p style={{ margin: 0, fontSize: "9px", color: "#94a3b8", fontWeight: "600" }}>TOTAL</p>
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  {chargerStatus.map((s) => (
                    <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "7px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: s.color }} />
                        <span style={{ fontSize: "12px", color: "#475569" }}>{s.label}</span>
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: "700", color: "#0f172a" }}>({s.count})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
              <StatsCard title="Fees Collected" value="$246.20" icon="💰" trend="12%" trendUp={true} />
              <StatsCard title="Energy Used" value="805 kWh" icon="⚡" trend="8%" trendUp={true} />
              <StatsCard title="Sessions" value="48" icon="🔌" trend="5%" trendUp={false} />
            </div>
          </div>

          {/* Bar Chart */}
          <div style={{
            background: "#fff", borderRadius: "14px",
            border: "1px solid #e8ecf0", padding: "24px",
            marginBottom: "20px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                {["Fees collected", "Energy used", "Sessions"].map((tab, i) => (
                  <button key={tab} style={{
                    padding: "6px 14px", borderRadius: "7px", border: "none",
                    cursor: "pointer", fontSize: "12px", fontWeight: "600",
                    background: i === 0 ? "#0f172a" : "#f8fafc",
                    color: i === 0 ? "#fff" : "#64748b",
                  }}>{tab}</button>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "12px", color: "#64748b", fontWeight: "500" }}>Apr 2025 – Mar 2026</span>
                <button style={{
                  padding: "6px 14px", borderRadius: "7px",
                  border: "1px solid #e2e8f0", background: "#f8fafc",
                  fontSize: "12px", fontWeight: "600", color: "#374151", cursor: "pointer",
                }}>Export CSV</button>
              </div>
            </div>

            {/* Bars */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "160px" }}>
              {barData.map((val, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", height: "100%" }}>
                  <div style={{
                    width: "100%", borderRadius: "6px 6px 0 0",
                    background: "linear-gradient(180deg, #38bdf8, #0284c7)",
                    height: `${(val / maxBar) * 100}%`,
                    transition: "opacity 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                  title={`$${val}`}
                  />
                  <span style={{ fontSize: "10px", color: "#94a3b8" }}>{months[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Sessions Table */}
          <div style={{
            background: "#fff", borderRadius: "14px",
            border: "1px solid #e8ecf0", padding: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "700", color: "#0f172a" }}>Recent Sessions</h3>
              <div style={{ display: "flex", gap: "8px" }}>
                <select style={{
                  padding: "6px 12px", borderRadius: "7px",
                  border: "1px solid #e2e8f0", background: "#f8fafc",
                  fontSize: "12px", color: "#374151", cursor: "pointer", fontWeight: "600",
                }}>
                  <option>All Chargers</option>
                </select>
                <select style={{
                  padding: "6px 12px", borderRadius: "7px",
                  border: "1px solid #e2e8f0", background: "#f8fafc",
                  fontSize: "12px", color: "#374151", cursor: "pointer", fontWeight: "600",
                }}>
                  <option>Last week</option>
                  <option>Last month</option>
                </select>
                <button style={{
                  padding: "6px 14px", borderRadius: "7px",
                  border: "1px solid #e2e8f0", background: "#f8fafc",
                  fontSize: "12px", fontWeight: "600", color: "#374151", cursor: "pointer",
                }}>Export CSV</button>
              </div>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                  {["Session ID", "Location", "Charger", "Start Time", "Status", "Energy Used", "Cost"].map((h) => (
                    <th key={h} style={{
                      textAlign: "left", padding: "10px 12px",
                      fontSize: "11px", fontWeight: "700",
                      color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.6px",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentSessions.map((s, i) => (
                  <tr key={s.id} style={{
                    borderBottom: i < recentSessions.length - 1 ? "1px solid #f8fafc" : "none",
                  }}>
                    <td style={{ padding: "13px 12px", fontSize: "13px", fontWeight: "600", color: "#0284c7" }}>{s.id}</td>
                    <td style={{ padding: "13px 12px", fontSize: "13px", color: "#374151" }}>{s.location}</td>
                    <td style={{ padding: "13px 12px", fontSize: "13px", color: "#374151" }}>{s.charger}</td>
                    <td style={{ padding: "13px 12px", fontSize: "13px", color: "#64748b" }}>{s.time}</td>
                    <td style={{ padding: "13px 12px" }}>{statusBadge(s.status)}</td>
                    <td style={{ padding: "13px 12px", fontSize: "13px", color: "#374151", fontWeight: "600" }}>{s.energy}</td>
                    <td style={{ padding: "13px 12px", fontSize: "13px", fontWeight: "700", color: "#0f172a" }}>{s.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </div>
  )
}
