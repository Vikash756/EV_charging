import {useEffect,useState} from "react"
import API from "../api/axios"
import ChargerCard from "../components/ChargerCard"

function Chargers(){

const [stations,setStations] = useState([])
const [loading,setLoading] = useState(true)
const [error,setError] = useState(null)

useEffect(()=>{
  fetchStations()
},[])

const fetchStations = async()=>{
  try {
    const res = await API.get("/stations")
    setStations(res.data)
  } catch (err) {
    setError(err.message || "Failed to load stations")
  } finally {
    setLoading(false)
  }
}

if (loading) return <p className="p-6">Loading chargers…</p>
if (error) return <p className="p-6 text-red-500">{error}</p>

return(
  <div className="p-6 grid grid-cols-3 gap-6">
    {stations.map((station)=>(
      <ChargerCard
        key={station._id}
        station={station}
      />
    ))}
  </div>
)

}

export default Chargers