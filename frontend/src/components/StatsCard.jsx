export default function StatsCard({ title, value, icon = "📊", trend, trendUp = true }) {
  return (
    <div style={{
      background: "#ffffff",
      border: "1px solid #e8ecf0",
      borderRadius: "14px",
      padding: "22px 24px",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      transition: "box-shadow 0.2s ease",
    }}
    onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"}
    onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)"}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{
            fontSize: "12px", fontWeight: "600",
            color: "#94a3b8", textTransform: "uppercase",
            letterSpacing: "0.8px", margin: "0 0 10px",
          }}>{title}</p>
          <p style={{
            fontSize: "28px", fontWeight: "800",
            color: "#0f172a", margin: 0,
            letterSpacing: "-0.5px",
          }}>{value}</p>
          {trend && (
            <p style={{
              fontSize: "12px", margin: "6px 0 0",
              color: trendUp ? "#16a34a" : "#dc2626",
              fontWeight: "600",
            }}>
              {trendUp ? "↑" : "↓"} {trend} vs last month
            </p>
          )}
        </div>
        <div style={{
          width: "44px", height: "44px", borderRadius: "12px",
          background: "#eff6ff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "20px",
        }}>{icon}</div>
      </div>
    </div>
  )
}
