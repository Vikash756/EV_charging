import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import API from "../api/axios"

export default function Profile() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const [name, setName] = useState(user.name || "")
  const [message, setMessage] = useState("")

  const handleUpdate = async () => {
    try {
      // Future: API call to update profile
      const updated = { ...user, name }
      localStorage.setItem("user", JSON.stringify(updated))
      setMessage("Profile updated successfully! ✅")
    } catch (err) {
      setMessage("Update failed!")
    }
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar title="Profile" />
        <main style={{ flex: 1, padding: "28px" }}>

          <div style={{ maxWidth: "600px" }}>

            {/* Profile Card */}
            <div style={{
              background: "#fff", borderRadius: "14px",
              border: "1px solid #e8ecf0", padding: "32px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              marginBottom: "20px"
            }}>
              {/* Avatar */}
              <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "28px" }}>
                <div style={{
                  width: "72px", height: "72px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "28px", color: "#fff", fontWeight: "700",
                }}>
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "700", color: "#0f172a" }}>{user.name}</h2>
                  <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#94a3b8" }}>{user.email}</p>
                  <span style={{
                    display: "inline-block", marginTop: "6px",
                    padding: "3px 10px", borderRadius: "20px",
                    fontSize: "11px", fontWeight: "600",
                    background: user.role === "admin" ? "#eff6ff" : "#f0fdf4",
                    color: user.role === "admin" ? "#2563eb" : "#16a34a",
                  }}>{user.role === "admin" ? "👑 Admin" : "👤 User"}</span>
                </div>
              </div>

              {/* Edit Name */}
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#475569", display: "block", marginBottom: "6px" }}>
                Full Name
              </label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                style={{
                  width: "100%", padding: "11px 14px", borderRadius: "9px",
                  border: "1px solid #e2e8f0", fontSize: "13px",
                  outline: "none", boxSizing: "border-box", marginBottom: "16px"
                }}
                onFocus={e => e.target.style.border = "1.5px solid #0284c7"}
                onBlur={e => e.target.style.border = "1px solid #e2e8f0"}
              />

              <label style={{ fontSize: "12px", fontWeight: "600", color: "#475569", display: "block", marginBottom: "6px" }}>
                Email Address
              </label>
              <input
                value={user.email}
                disabled
                style={{
                  width: "100%", padding: "11px 14px", borderRadius: "9px",
                  border: "1px solid #e2e8f0", fontSize: "13px",
                  background: "#f8fafc", color: "#94a3b8",
                  boxSizing: "border-box", marginBottom: "16px"
                }}
              />

              <label style={{ fontSize: "12px", fontWeight: "600", color: "#475569", display: "block", marginBottom: "6px" }}>
                Role
              </label>
              <input
                value={user.role}
                disabled
                style={{
                  width: "100%", padding: "11px 14px", borderRadius: "9px",
                  border: "1px solid #e2e8f0", fontSize: "13px",
                  background: "#f8fafc", color: "#94a3b8",
                  boxSizing: "border-box", marginBottom: "24px"
                }}
              />

              {message && (
                <p style={{ color: "#16a34a", fontSize: "13px", marginBottom: "12px", fontWeight: "600" }}>{message}</p>
              )}

              <button onClick={handleUpdate} style={{
                padding: "11px 28px", borderRadius: "8px", border: "none",
                background: "linear-gradient(135deg, #0284c7, #0ea5e9)",
                color: "#fff", fontSize: "13px", fontWeight: "700", cursor: "pointer",
                boxShadow: "0 4px 12px rgba(2,132,199,0.3)",
              }}>
                Save Changes
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}