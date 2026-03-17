import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

export default function ComingSoon({ title, icon = "🚧" }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar title={title} />
        <main style={{ flex: 1, padding: "28px" }}>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
            {[
              { label: "Total", value: "0", icon: "📊" },
              { label: "Active", value: "0", icon: "✅" },
              { label: "Pending", value: "0", icon: "⏳" },
            ].map((s) => (
              <div key={s.label} style={{
                background: "#fff", borderRadius: "14px",
                border: "1px solid #e8ecf0", padding: "22px 24px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}>
                <p style={{ fontSize: "12px", fontWeight: "600", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 10px" }}>{s.label}</p>
                <p style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", margin: 0 }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Main card */}
          <div style={{
            background: "#fff", borderRadius: "14px",
            border: "1px solid #e8ecf0", padding: "40px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            textAlign: "center",
          }}>
            <p style={{ fontSize: "60px", margin: "0 0 16px" }}>{icon}</p>
            <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#0f172a", margin: "0 0 8px" }}>{title} Module</h2>
            <p style={{ fontSize: "14px", color: "#94a3b8", margin: "0 0 28px" }}>
              This module is under development. Check back soon!
            </p>
            <button style={{
              padding: "10px 24px", borderRadius: "8px", border: "none",
              background: "linear-gradient(135deg, #0284c7, #0ea5e9)",
              color: "#fff", fontSize: "13px", fontWeight: "700", cursor: "pointer",
            }}>Notify Me</button>
          </div>

        </main>
      </div>
    </div>
  )
}