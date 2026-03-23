import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
import API from "../api/axios"
import useWindowSize from "../hooks/useWindowSize"

export default function Bookings() {
  const navigate = useNavigate()
  const [stations, setStations] = useState([])
  const [bookings, setBookings] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ stationId: "", date: "", startTime: "", duration: "1" })
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(true)
  const { isMobile } = useWindowSize()

  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const isAdmin = user.role === "admin"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stationsRes = await API.get("/stations")
        setStations(stationsRes.data.data || [])
        const bookingsRes = isAdmin ? await API.get("/bookings") : await API.get("/bookings/my")
        setBookings(bookingsRes.data.data || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const station = stations.find(s => s._id === form.stationId)
    if (station && form.duration) setAmount(station.pricePerHour * Number(form.duration))
  }, [form.stationId, form.duration, stations])

  const handleBooking = async () => {
    if (!localStorage.getItem("token")) { alert("Please login first!"); navigate("/login"); return }
    if (!form.stationId || !form.date || !form.startTime || !form.duration) { alert("Please fill all fields!"); return }
    const startTime = new Date(`${form.date}T${form.startTime}`)
    const endTime = new Date(startTime.getTime() + Number(form.duration) * 60 * 60 * 1000)
    try {
      await API.post("/bookings", { stationId: form.stationId, startTime, endTime, amount })
      alert("Booking successful! ✅")
      setShowForm(false)
      setForm({ stationId: "", date: "", startTime: "", duration: "1" })
      const res = isAdmin ? await API.get("/bookings") : await API.get("/bookings/my")
      setBookings(res.data.data || [])
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed")
    }
  }

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this booking?")) return
    try {
      await API.put(`/bookings/${id}/cancel`)
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status: "Cancelled" } : b))
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel")
    }
  }

  function statusBadge(status) {
    const styles = {
      Booked: { bg: "#fefce8", color: "#ca8a04" },
      Completed: { bg: "#f0fdf4", color: "#16a34a" },
      Cancelled: { bg: "#fef2f2", color: "#dc2626" },
    }
    const s = styles[status] || { bg: "#f8fafc", color: "#64748b" }
    return <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600", background: s.bg, color: s.color }}>{status}</span>
  }

  if (loading) return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}><p>Loading...</p></div>

  return (
    <Layout title="Bookings">

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "24px" }}>
        <button onClick={() => setShowForm(!showForm)} style={{
          padding: "9px 18px", borderRadius: "8px", border: "none",
          background: "linear-gradient(135deg, #0284c7, #0ea5e9)",
          color: "#fff", fontSize: "13px", fontWeight: "700", cursor: "pointer",
          boxShadow: "0 4px 12px rgba(2,132,199,0.3)",
        }}>{showForm ? "✕ Cancel" : "+ New Booking"}</button>
      </div>

      {/* Booking Form */}
      {showForm && (
        <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e8ecf0", padding: "24px", marginBottom: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <h3 style={{ margin: "0 0 20px", fontSize: "15px", fontWeight: "700", color: "#0f172a" }}>Book a Charging Slot</h3>
          {/* ✅ Form grid responsive */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#475569", display: "block", marginBottom: "6px" }}>Select Station</label>
              <select value={form.stationId} onChange={e => setForm(prev => ({ ...prev, stationId: e.target.value }))}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px", outline: "none", background: "#fff", boxSizing: "border-box" }}>
                <option value="">-- Select Station --</option>
                {stations.filter(s => s.isActive).map(s => (
                  <option key={s._id} value={s._id}>{s.name} — {s.location} (₹{s.pricePerHour}/hr)</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#475569", display: "block", marginBottom: "6px" }}>Date</label>
              <input type="date" value={form.date} min={new Date().toISOString().split("T")[0]}
                onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#475569", display: "block", marginBottom: "6px" }}>Start Time</label>
              <input type="time" value={form.startTime}
                onChange={e => setForm(prev => ({ ...prev, startTime: e.target.value }))}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#475569", display: "block", marginBottom: "6px" }}>Duration (Hours)</label>
              <select value={form.duration} onChange={e => setForm(prev => ({ ...prev, duration: e.target.value }))}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px", outline: "none", background: "#fff", boxSizing: "border-box" }}>
                {[1, 2, 3, 4, 5, 6].map(h => <option key={h} value={h}>{h} Hour{h > 1 ? "s" : ""}</option>)}
              </select>
            </div>
          </div>
          {amount > 0 && (
            <div style={{ marginTop: "16px", padding: "14px 18px", background: "#f0f9ff", borderRadius: "10px", border: "1px solid #bae6fd", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "13px", color: "#0284c7", fontWeight: "600" }}>Total Amount</span>
              <span style={{ fontSize: "22px", fontWeight: "800", color: "#0284c7" }}>₹{amount}</span>
            </div>
          )}
          <button onClick={handleBooking} style={{ marginTop: "20px", padding: "11px 28px", borderRadius: "8px", border: "none", background: "linear-gradient(135deg, #0284c7, #0ea5e9)", color: "#fff", fontSize: "13px", fontWeight: "700", cursor: "pointer", boxShadow: "0 4px 12px rgba(2,132,199,0.3)" }}>
            Confirm Booking ✓
          </button>
        </div>
      )}

      {/* ✅ Bookings Table with scroll on mobile */}
      <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e8ecf0", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <h3 style={{ margin: "0 0 20px", fontSize: "15px", fontWeight: "700", color: "#0f172a" }}>
          {isAdmin ? "All Bookings" : "My Bookings"}
        </h3>
        {bookings.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>
            <p style={{ fontSize: "40px" }}>📅</p>
            <p style={{ fontSize: "14px", fontWeight: "600" }}>No bookings yet</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                  {["Station", "Location", "Start Time", "End Time", "Amount", "Status", "Action"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.6px" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => (
                  <tr key={b._id} style={{ borderBottom: i < bookings.length - 1 ? "1px solid #f8fafc" : "none" }}>
                    <td style={{ padding: "13px 12px", fontSize: "13px", fontWeight: "600", color: "#0284c7" }}>{b.stationId?.name || "N/A"}</td>
                    <td style={{ padding: "13px 12px", fontSize: "13px", color: "#374151" }}>{b.stationId?.location || "N/A"}</td>
                    <td style={{ padding: "13px 12px", fontSize: "13px", color: "#64748b" }}>{new Date(b.startTime).toLocaleString()}</td>
                    <td style={{ padding: "13px 12px", fontSize: "13px", color: "#64748b" }}>{new Date(b.endTime).toLocaleString()}</td>
                    <td style={{ padding: "13px 12px", fontSize: "13px", fontWeight: "700", color: "#0f172a" }}>₹{b.amount}</td>
                    <td style={{ padding: "13px 12px" }}>{statusBadge(b.status)}</td>
                    <td style={{ padding: "13px 12px" }}>
                      {b.status === "Booked" && (
                        <button onClick={() => handleCancel(b._id)} style={{ padding: "5px 12px", borderRadius: "6px", border: "1px solid #fecaca", background: "#fef2f2", color: "#dc2626", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>Cancel</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </Layout>
  )
}