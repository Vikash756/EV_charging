import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Chargers from "./pages/Chargers"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute";

function App(){

  return(

    <BrowserRouter>

      <Routes>
        {/* redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/chargers" element={
          <ProtectedRoute><Chargers /></ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

    </BrowserRouter>

  )

}

export default App