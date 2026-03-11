function ChargerCard({station}){

return(

<div className="bg-white p-4 rounded-xl shadow">

<h3 className="font-bold text-lg">
{station.name}
</h3>

<p className="text-gray-500">
{station.location}
</p>

<p className="text-green-500 mt-2">
Status: {station.status}
</p>

</div>

)

}

export default ChargerCard