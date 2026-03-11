import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import StatsCard from "../components/StatsCard"

function Dashboard(){

return(

<div className="flex">

<Sidebar/>

<div className="flex-1 bg-gray-100 min-h-screen">

<Navbar/>

<div className="p-6 grid grid-cols-3 gap-6">

<StatsCard
title="Energy Used"
value="805 kWh"
/>

<StatsCard
title="Sessions"
value="48"
/>

<StatsCard
title="Revenue"
value="$246"
/>

</div>

</div>

</div>

)

}

export default Dashboard