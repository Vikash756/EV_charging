import { Link, useLocation } from "react-router-dom"

const navSections = [
  {
    label: "MAIN",
    items: [
      { to: "/dashboard", icon: "⊞", label: "Overview" },
      { to: "/chargers", icon: "⚡", label: "Chargers" },
      { to: "/bookings", icon: "📅", label: "Bookings" },
    ],
  },
  {
    label: "CHARGER MANAGEMENT",
    items: [
      { to: "/pricing", icon: "💲", label: "Pricing" },
      { to: "/access", icon: "🔒", label: "Access" },
    ],
  },
  {
    label: "ADMIN",
    items: [
      { to: "/company", icon: "🏢", label: "Company" },
      { to: "/payouts", icon: "💳", label: "Payouts" },
      { to: "/rfid", icon: "📋", label: "RFID Cards" },
    ],
  },
  {
    label: "RESOURCES",
    items: [
      { to: "/learning", icon: "📚", label: "Learning" },
    ],
  },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside style={{
      width: "220px",
      minHeight: "100vh",
      position: "sticky",
      top: 0,
      height: "100vh",
      overflowY: "auto",
      background: "#ffffff",
      borderRight: "1px solid #e8ecf0",
      display: "flex",
      flexDirection: "column",
      padding: "0",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{
        padding: "24px 20px 20px",
        borderBottom: "1px solid #f0f2f5",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}>
        <div style={{
          width: "32px", height: "32px",
          background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
          borderRadius: "8px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "16px",
        }}>⚡</div>
        <span style={{
          fontWeight: "800",
          fontSize: "15px",
          color: "#0f172a",
          letterSpacing: "-0.3px",
        }}>EV CHARGING</span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
        {navSections.map((section) => (
          <div key={section.label} style={{ marginBottom: "24px" }}>
            <p style={{
              fontSize: "10px",
              fontWeight: "700",
              color: "#94a3b8",
              letterSpacing: "1px",
              padding: "0 8px",
              marginBottom: "6px",
            }}>{section.label}</p>
            {section.items.map((item) => {
              const active = location.pathname === item.to
              return (
                <Link key={item.to} to={item.to} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "9px 10px",
                  borderRadius: "8px",
                  marginBottom: "2px",
                  textDecoration: "none",
                  fontSize: "13.5px",
                  fontWeight: active ? "600" : "400",
                  color: active ? "#0284c7" : "#475569",
                  background: active ? "#eff6ff" : "transparent",
                  transition: "all 0.15s ease",
                }}>
                  <span style={{ fontSize: "15px" }}>{item.icon}</span>
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Bottom user
      <div style={{
        padding: "16px 20px",
        borderTop: "1px solid #f0f2f5",
        display: "flex", alignItems: "center", gap: "10px",
      }}>
        <div style={{
          width: "32px", height: "32px", borderRadius: "50%",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "13px", color: "#fff", fontWeight: "700",
        }}>EV</div>
        <div>
          <p style={{ fontSize: "12px", fontWeight: "600", color: "#0f172a", margin: 0 }}>Admin User</p>
          <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>admin@ev.com</p>
        </div>
      </div> */}
    </aside>
  )
}
