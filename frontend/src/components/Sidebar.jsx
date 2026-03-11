import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-60 h-screen bg-gray-900 text-white p-5">

      <h1 className="text-xl font-bold mb-8">
        ⚡ EV CHARGING
      </h1>

      <ul className="space-y-4">

        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/chargers">Chargers</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;