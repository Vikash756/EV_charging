import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import useWindowSize from "../hooks/useWindowSize";

export default function Navbar({ title = "Dashboard", onMenuClick, showMenuButton }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [notifCount, setNotifCount] = useState(0);
  const { isMobile } = useWindowSize();

  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const initials = user.name ? user.name.charAt(0).toUpperCase() : "U"

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    socket.on("newBooking", () => setNotifCount(prev => prev + 1))
    socket.on("bookingCancelled", () => setNotifCount(prev => prev + 1))
    return () => {
      socket.off("newBooking")
      socket.off("bookingCancelled")
    }
  }, [])

  return (
    <header style={{
      height: "60px",
      background: "#ffffff",
      borderBottom: "1px solid #e8ecf0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 16px",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      position: "sticky",
      top: 0,
      zIndex: 10,
    }}>

      {/* ✅ Left side — hamburger + title */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {showMenuButton && (
          <button onClick={onMenuClick} style={{
            background: "none", border: "none",
            fontSize: "22px", cursor: "pointer", color: "#0f172a",
            padding: "4px",
          }}>☰</button>
        )}
        <h1 style={{
          fontSize: isMobile ? "16px" : "20px",
          fontWeight: "700",
          color: "#0f172a",
          margin: 0,
          letterSpacing: "-0.3px",
        }}>{title}</h1>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "8px" : "16px" }}>

        {/* Search — mobile mein hide */}
        {!isMobile && (
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "#f8fafc", border: "1px solid #e2e8f0",
            borderRadius: "8px", padding: "7px 14px",
          }}>
            <span style={{ color: "#94a3b8", fontSize: "14px" }}>🔍</span>
            <input placeholder="Search..." style={{
              border: "none", background: "transparent",
              fontSize: "13px", color: "#475569", outline: "none", width: "160px",
            }} />
          </div>
        )}

        {/* Notification */}
        <div onClick={() => setNotifCount(0)} style={{ position: "relative", cursor: "pointer" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "50%",
            background: "#f8fafc", border: "1px solid #e2e8f0",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "16px",
          }}>🔔</div>
          {notifCount > 0 && (
            <span style={{
              position: "absolute", top: "-2px", right: "-2px",
              width: "16px", height: "16px", borderRadius: "50%",
              background: "#ef4444", color: "#fff",
              fontSize: "9px", fontWeight: "700",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>{notifCount > 9 ? "9+" : notifCount}</span>
          )}
        </div>

        {/* Avatar + Dropdown */}
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <div onClick={() => setOpen(!open)} style={{
            width: "36px", height: "36px", borderRadius: "50%",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "13px", color: "#fff", fontWeight: "700", cursor: "pointer",
          }}>{initials}</div>

          {open && (
            <div style={{
              position: "absolute", top: "44px", right: 0,
              width: "200px", background: "#fff",
              border: "1px solid #e2e8f0", borderRadius: "12px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              overflow: "hidden", zIndex: 100,
            }}>
              <div style={{ padding: "12px 14px", borderBottom: "1px solid #e2e8f0" }}>
                <p style={{ margin: 0, fontSize: "13px", fontWeight: "600", color: "#0f172a" }}>{user.name || "User"}</p>
                <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#94a3b8" }}>{user.email || ""}</p>
              </div>
              <MenuItem label="👤 Profile" onClick={() => { setOpen(false); navigate("/profile") }} />
              <MenuItem label="⚙️ Settings" onClick={() => { setOpen(false); navigate("/settings") }} />
              <div style={{ height: "1px", background: "#e2e8f0", margin: "4px 0" }} />
              <MenuItem label="🚪 Logout" onClick={() => {
                setOpen(false);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
              }} color="#ef4444" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function MenuItem({ label, onClick, color = "#334155" }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "10px 14px", cursor: "pointer", fontSize: "13px",
        color, background: hovered ? "#f8fafc" : "transparent",
        transition: "background 0.15s",
      }}
    >{label}</div>
  );
}