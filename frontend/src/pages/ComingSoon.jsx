import Layout from "../components/Layout"
import useWindowSize from "../hooks/useWindowSize"

export default function ComingSoon({ title, icon = "🚧" }) {
  const { isMobile } = useWindowSize()

  return (
    <Layout title={title}>

      {/* ✅ Stats row responsive */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Total", value: "0" },
          { label: "Active", value: "0" },
          { label: "Pending", value: "0" },
        ].map((s) => (
          <div key={s.label} style={{
            background: "#fff", borderRadius: "14px",
            border: "1px solid #e8ecf0", padding: "22px 24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}>
            <p style={{ fontSize: "12px", fontWeight: "600", color: "#94a3b8", textTransform: "uppercase", margin: "0 0 10px" }}>{s.label}</p>
            <p style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", margin: 0 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Main card */}
      <div style={{
        background: "#fff", borderRadius: "14px",
        border: "1px solid #e8ecf0",
        padding: isMobile ? "28px 20px" : "40px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        textAlign: "center",
      }}>
        <p style={{ fontSize: isMobile ? "48px" : "60px", margin: "0 0 16px" }}>{icon}</p>
        <h2 style={{ fontSize: isMobile ? "18px" : "22px", fontWeight: "700", color: "#0f172a", margin: "0 0 8px" }}>{title} Module</h2>
        <p style={{ fontSize: "14px", color: "#94a3b8", margin: "0 0 28px" }}>
          This module is under development. Check back soon!
        </p>
        <button style={{
          padding: "10px 24px", borderRadius: "8px", border: "none",
          background: "linear-gradient(135deg, #0284c7, #0ea5e9)",
          color: "#fff", fontSize: "13px", fontWeight: "700", cursor: "pointer",
          width: isMobile ? "100%" : "auto",
        }}>Notify Me</button>
      </div>

    </Layout>
  )
}