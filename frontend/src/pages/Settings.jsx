import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

export default function Settings() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("English")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar title="Settings" />
        <main style={{ flex: 1, padding: "28px" }}>
          <div style={{ maxWidth: "600px" }}>

            {/* Preferences */}
            <div style={{
              background: "#fff", borderRadius: "14px",
              border: "1px solid #e8ecf0", padding: "28px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              marginBottom: "20px"
            }}>
              <h3 style={{ margin: "0 0 20px", fontSize: "15px", fontWeight: "700", color: "#0f172a" }}>
                Preferences
              </h3>

              {/* Notifications Toggle */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #f1f5f9" }}>
                <div>
                  <p style={{ margin: 0, fontSize: "13px", fontWeight: "600", color: "#0f172a" }}>🔔 Notifications</p>
                  <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#94a3b8" }}>Receive booking alerts</p>
                </div>
                <div
                  onClick={() => setNotifications(!notifications)}
                  style={{
                    width: "44px", height: "24px", borderRadius: "12px",
                    background: notifications ? "#0284c7" : "#e2e8f0",
                    cursor: "pointer", position: "relative", transition: "background 0.2s"
                  }}
                >
                  <div style={{
                    position: "absolute", top: "3px",
                    left: notifications ? "23px" : "3px",
                    width: "18px", height: "18px",
                    borderRadius: "50%", background: "#fff",
                    transition: "left 0.2s",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
                  }} />
                </div>
              </div>

              {/* Dark Mode Toggle */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #f1f5f9" }}>
                <div>
                  <p style={{ margin: 0, fontSize: "13px", fontWeight: "600", color: "#0f172a" }}>🌙 Dark Mode</p>
                  <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#94a3b8" }}>Toggle dark theme</p>
                </div>
                <div
                  onClick={() => setDarkMode(!darkMode)}
                  style={{
                    width: "44px", height: "24px", borderRadius: "12px",
                    background: darkMode ? "#0284c7" : "#e2e8f0",
                    cursor: "pointer", position: "relative", transition: "background 0.2s"
                  }}
                >
                  <div style={{
                    position: "absolute", top: "3px",
                    left: darkMode ? "23px" : "3px",
                    width: "18px", height: "18px",
                    borderRadius: "50%", background: "#fff",
                    transition: "left 0.2s",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
                  }} />
                </div>
              </div>

              {/* Language */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0" }}>
                <div>
                  <p style={{ margin: 0, fontSize: "13px", fontWeight: "600", color: "#0f172a" }}>🌐 Language</p>
                  <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#94a3b8" }}>Select your language</p>
                </div>
                <select
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                  style={{
                    padding: "7px 12px", borderRadius: "8px",
                    border: "1px solid #e2e8f0", fontSize: "13px",
                    outline: "none", background: "#fff"
                  }}
                >
                  <option>English</option>
                  <option>Hindi</option>
                </select>
              </div>
            </div>

            {/* Danger Zone */}
            <div style={{
              background: "#fff", borderRadius: "14px",
              border: "1px solid #fecaca", padding: "28px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              marginBottom: "20px"
            }}>
              <h3 style={{ margin: "0 0 16px", fontSize: "15px", fontWeight: "700", color: "#dc2626" }}>
                ⚠️ Danger Zone
              </h3>
              <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 16px" }}>
                Once you delete your account, there is no going back.
              </p>
              <button style={{
                padding: "9px 20px", borderRadius: "8px",
                border: "1px solid #fecaca", background: "#fef2f2",
                color: "#dc2626", fontSize: "13px", fontWeight: "600", cursor: "pointer"
              }}>
                Delete Account
              </button>
            </div>

            {saved && (
              <p style={{ color: "#16a34a", fontWeight: "600", fontSize: "13px" }}>✅ Settings saved!</p>
            )}

            <button onClick={handleSave} style={{
              padding: "11px 28px", borderRadius: "8px", border: "none",
              background: "linear-gradient(135deg, #0284c7, #0ea5e9)",
              color: "#fff", fontSize: "13px", fontWeight: "700", cursor: "pointer",
              boxShadow: "0 4px 12px rgba(2,132,199,0.3)",
            }}>
              Save Settings
            </button>

          </div>
        </main>
      </div>
    </div>
  )
}