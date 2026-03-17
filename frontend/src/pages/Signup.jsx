import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api/axios"

export default function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", { name, email, password })
      alert("Account created! Please login.")
      navigate("/login")
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed")
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f8fafc 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    }}>
      <div style={{ display: "flex", width: "900px", maxWidth: "95vw", minHeight: "520px", borderRadius: "20px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>

        {/* Left panel - same as Login */}
        <div style={{
          flex: 1,
          background: "linear-gradient(160deg, #0284c7, #0ea5e9, #38bdf8)",
          padding: "48px", display: "flex", flexDirection: "column",
          justifyContent: "space-between", color: "#fff",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",
            }}>⚡</div>
            <span style={{ fontWeight: "800", fontSize: "16px", letterSpacing: "-0.3px" }}>EV CHARGING</span>
          </div>
          <div>
            <h2 style={{ fontSize: "32px", fontWeight: "800", margin: "0 0 14px", letterSpacing: "-0.5px" }}>
              Join the Smart<br />Charging Network
            </h2>
            <p style={{ fontSize: "14px", opacity: 0.85, lineHeight: 1.6, margin: 0 }}>
              Create your account and start managing EV charging stations today.
            </p>
          </div>
        </div>

        {/* Right panel */}
        <div style={{
          flex: 1, background: "#ffffff", padding: "48px",
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          <h3 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a", margin: "0 0 6px", letterSpacing: "-0.3px" }}>Create Account</h3>
          <p style={{ fontSize: "13px", color: "#94a3b8", margin: "0 0 28px" }}>Sign up for a new account</p>

          <label style={{ fontSize: "12px", fontWeight: "600", color: "#475569", marginBottom: "6px", display: "block" }}>Full Name</label>
          <input
            type="text" placeholder="Your Name" value={name}
            onChange={e => setName(e.target.value)}
            style={{ width: "100%", padding: "11px 14px", border: "1px solid #e2e8f0", borderRadius: "9px", fontSize: "13px", color: "#0f172a", outline: "none", marginBottom: "18px", boxSizing: "border-box" }}
            onFocus={e => e.target.style.border = "1.5px solid #0284c7"}
            onBlur={e => e.target.style.border = "1px solid #e2e8f0"}
          />

          <label style={{ fontSize: "12px", fontWeight: "600", color: "#475569", marginBottom: "6px", display: "block" }}>Email Address</label>
          <input
            type="email" placeholder="you@example.com" value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: "100%", padding: "11px 14px", border: "1px solid #e2e8f0", borderRadius: "9px", fontSize: "13px", color: "#0f172a", outline: "none", marginBottom: "18px", boxSizing: "border-box" }}
            onFocus={e => e.target.style.border = "1.5px solid #0284c7"}
            onBlur={e => e.target.style.border = "1px solid #e2e8f0"}
          />

          <label style={{ fontSize: "12px", fontWeight: "600", color: "#475569", marginBottom: "6px", display: "block" }}>Password</label>
          <input
            type="password" placeholder="Min 6 characters" value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: "100%", padding: "11px 14px", border: "1px solid #e2e8f0", borderRadius: "9px", fontSize: "13px", color: "#0f172a", outline: "none", marginBottom: "28px", boxSizing: "border-box" }}
            onFocus={e => e.target.style.border = "1.5px solid #0284c7"}
            onBlur={e => e.target.style.border = "1px solid #e2e8f0"}
          />

          <button onClick={handleSignup} style={{
            width: "100%", padding: "12px",
            background: "linear-gradient(135deg, #0284c7, #0ea5e9)",
            color: "#fff", border: "none", borderRadius: "9px",
            fontSize: "14px", fontWeight: "700", cursor: "pointer",
            boxShadow: "0 4px 14px rgba(2,132,199,0.35)",
          }}
          onMouseEnter={e => e.target.style.opacity = "0.9"}
          onMouseLeave={e => e.target.style.opacity = "1"}
          >
            Create Account →
          </button>

          <p style={{ textAlign: "center", fontSize: "12px", color: "#94a3b8", marginTop: "20px" }}>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} style={{ color: "#0284c7", cursor: "pointer", fontWeight: "600" }}>Sign in</span>
          </p>
        </div>
      </div>
    </div>
  )
}