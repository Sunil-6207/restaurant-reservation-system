import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function DashboardLayout({ children }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Navbar */}
            <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    Restaurant Reservation System
                </h1>

                <div className="flex items-center gap-4">
                    <span>
                        Welcome, {user?.name}
                    </span>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex">

                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-md min-h-screen p-5">

                    <ul className="space-y-4">

                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>

                        <li>
                            <Link to="/tables">Tables</Link>
                        </li>

                        <li>
                            <Link to="/reservations">Reservations</Link>
                        </li>

                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>

                    </ul>

                </aside>

                {/* Page Content */}
                <main className="flex-1 p-6">
                    {children}
                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;