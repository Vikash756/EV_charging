import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api/axios"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", { email, password });
    // localStorage.setItem("token", res.data.data.token);
    // localStorage.setItem("user", JSON.stringify(res.data.data.user));
    // navigate("/dashboard");
  //   localStorage.setItem("token", "temp-token")
  // localStorage.setItem("user", JSON.stringify({
  //   name: "Admin",
  //   email: "admin@evcharging.com",
  //   role: "admin"
  // }))
  navigate("/dashboard")
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f8fafc 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    }}>
      <div style={{ display: "flex", width: "900px", maxWidth: "95vw", minHeight: "520px", borderRadius: "20px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>

        {/* Left panel */}
        <div style={{
          flex: 1,
          background: "linear-gradient(160deg, #0284c7, #0ea5e9, #38bdf8)",
          padding: "48px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "#fff",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px",
            }}>⚡</div>
            <span style={{ fontWeight: "800", fontSize: "16px", letterSpacing: "-0.3px" }}>EV CHARGING</span>
          </div>

          <div>
            <h2 style={{ fontSize: "32px", fontWeight: "800", margin: "0 0 14px", letterSpacing: "-0.5px" }}>
              Smart EV<br />Charging Network
            </h2>
            <p style={{ fontSize: "14px", opacity: 0.85, lineHeight: 1.6, margin: 0 }}>
              Monitor chargers, track sessions, manage revenue — all from one powerful dashboard.
            </p>

            <div style={{ marginTop: "36px", display: "flex", flexDirection: "column", gap: "14px" }}>
              {["18 Active Chargers", "805 kWh This Month", "$246 Revenue"].map((stat) => (
                <div key={stat} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.8)" }} />
                  <span style={{ fontSize: "13px", opacity: 0.9 }}>{stat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{
          flex: 1, background: "#ffffff",
          padding: "48px", display: "flex",
          flexDirection: "column", justifyContent: "center",
        }}>
          <h3 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a", margin: "0 0 6px", letterSpacing: "-0.3px" }}>Welcome back</h3>
          <p style={{ fontSize: "13px", color: "#94a3b8", margin: "0 0 32px" }}>Sign in to your admin account</p>

          <label style={{ fontSize: "12px", fontWeight: "600", color: "#475569", marginBottom: "6px", display: "block" }}>Email Address</label>
          <input
            type="email"
            placeholder="admin@evcharging.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              width: "100%", padding: "11px 14px",
              border: "1px solid #e2e8f0", borderRadius: "9px",
              fontSize: "13px", color: "#0f172a",
              outline: "none", marginBottom: "18px",
              boxSizing: "border-box",
              transition: "border 0.2s",
            }}
            onFocus={e => e.target.style.border = "1.5px solid #0284c7"}
            onBlur={e => e.target.style.border = "1px solid #e2e8f0"}
          />

          <label style={{ fontSize: "12px", fontWeight: "600", color: "#475569", marginBottom: "6px", display: "block" }}>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              width: "100%", padding: "11px 14px",
              border: "1px solid #e2e8f0", borderRadius: "9px",
              fontSize: "13px", color: "#0f172a",
              outline: "none", marginBottom: "28px",
              boxSizing: "border-box",
            }}
            onFocus={e => e.target.style.border = "1.5px solid #0284c7"}
            onBlur={e => e.target.style.border = "1px solid #e2e8f0"}
          />

          <button
            onClick={handleLogin}
            style={{
              width: "100%", padding: "12px",
              background: "linear-gradient(135deg, #0284c7, #0ea5e9)",
              color: "#fff", border: "none",
              borderRadius: "9px", fontSize: "14px",
              fontWeight: "700", cursor: "pointer",
              boxShadow: "0 4px 14px rgba(2,132,199,0.35)",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={e => e.target.style.opacity = "0.9"}
            onMouseLeave={e => e.target.style.opacity = "1"}
          >
            Sign In →
          </button>

          <p style={{ textAlign: "center", fontSize: "12px", color: "#94a3b8", marginTop: "20px" }}>
            Forgot password? <span style={{ color: "#0284c7", cursor: "pointer", fontWeight: "600" }}>Reset here</span>
          </p>
        </div>
      </div>
    </div>
  )
}
