import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Chargers from "./pages/Chargers"
import Login from "./pages/Login"

function App(){

  return(

    <BrowserRouter>

      <Routes>
        {/* redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/chargers" element={<Chargers/>}/>
        <Route path="/login" element={<Login />} />

        {/* catch all - could show 404 or redirect */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>

    </BrowserRouter>

  )

}

export default App