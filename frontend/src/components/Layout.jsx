import { useState } from "react"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import useWindowSize from "../hooks/useWindowSize"

export default function Layout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isMobile } = useWindowSize()

  return (
    <div style={{
      display: "flex", height: "100vh",
      background: "#f8fafc",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      overflow: "hidden"
    }}>
      {/* Desktop — normal sidebar */}
      {!isMobile && <Sidebar />}

      {/* Mobile — overlay sidebar */}
      {isMobile && sidebarOpen && (
        <>
          <div onClick={() => setSidebarOpen(false)} style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.4)", zIndex: 199,
          }} />
          <div style={{ position: "fixed", left: 0, top: 0, zIndex: 200, height: "100vh" }}>
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </>
      )}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Navbar
          title={title}
          onMenuClick={() => setSidebarOpen(true)}
          showMenuButton={isMobile}
        />
        <main style={{ flex: 1, padding: isMobile ? "16px" : "28px", overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  )
}