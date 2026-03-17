import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Chargers from "./pages/Chargers"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ComingSoon from "./pages/ComingSoon"
import Bookings from "./pages/Bookings"
import Profile from "./pages/Profile"
import Settings from "./pages/Settings"

// ✅ Simple ProtectedRoute
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token")
  return token ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/chargers" element={<ProtectedRoute><Chargers /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/learning" element={<ProtectedRoute><ComingSoon title="Learning" icon="📚" /></ProtectedRoute>} />
        <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />


        <Route path="/pricing" element={<ProtectedRoute><ComingSoon title="Pricing" icon="💲" /></ProtectedRoute>} />
        <Route path="/access" element={<ProtectedRoute><ComingSoon title="Access Control" icon="🔒" /></ProtectedRoute>} />
        <Route path="/company" element={<ProtectedRoute><ComingSoon title="Company" icon="🏢" /></ProtectedRoute>} />
        <Route path="/payouts" element={<ProtectedRoute><ComingSoon title="Payouts" icon="💳" /></ProtectedRoute>} />
        <Route path="/rfid" element={<ProtectedRoute><ComingSoon title="RFID Cards" icon="📋" /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App