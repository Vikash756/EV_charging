const statusStyle = {
  Available: { bg: "#f0fdf4", color: "#16a34a" },
  Charging: { bg: "#eff6ff", color: "#2563eb" },
  Offline: { bg: "#fefce8", color: "#ca8a04" },
  "Out of order": { bg: "#fef2f2", color: "#dc2626" },
}

export default function ChargerCard({ station }) {
  const s = statusStyle[station.status] || { bg: "#f8fafc", color: "#64748b" }

  return (
    <div style={{
      background: "#fff", borderRadius: "14px",
      border: "1px solid #e8ecf0", padding: "22px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      transition: "box-shadow 0.2s",
      cursor: "pointer",
    }}
    onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)"}
    onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)"}
    >
      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div style={{
          width: "44px", height: "44px", borderRadius: "12px",
          background: "#eff6ff", display: "flex",
          alignItems: "center", justifyContent: "center", fontSize: "22px",
        }}>🔌</div>
        <span style={{
          padding: "4px 10px", borderRadius: "20px",
          fontSize: "11px", fontWeight: "600",
          background: s.bg, color: s.color,
        }}>{station.status}</span>
      </div>

      {/* Name & ID */}
      <h4 style={{ margin: "0 0 4px", fontSize: "15px", fontWeight: "700", color: "#0f172a" }}>
        {station.name}
      </h4>
      <p style={{ margin: "0 0 14px", fontSize: "12px", color: "#94a3b8" }}>
        {station.id || "N/A"}
      </p>

      {/* Details */}
      <div style={{ display: "flex", flexDirection: "column", gap: "7px", paddingTop: "14px", borderTop: "1px solid #f1f5f9" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "13px" }}>📍</span>
          <span style={{ fontSize: "12px", color: "#475569" }}>{station.location}</span>
        </div>
        {station.type && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "13px" }}>⚡</span>
            <span style={{ fontSize: "12px", color: "#475569" }}>{station.type} · {station.power}</span>
          </div>
        )}
        {station.lastUsed && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "13px" }}>🕐</span>
            <span style={{ fontSize: "12px", color: "#475569" }}>Last used: {station.lastUsed}</span>
          </div>
        )}
      </div>
    </div>
  )
}
