import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminLayout({ children }) {

    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/");

    };

    return (

        <div className="min-h-screen bg-gray-100">

            {/* Navbar */}

            <nav className="bg-red-600 text-white p-4 flex justify-between">

                <h1 className="text-2xl font-bold">

                    Admin Panel

                </h1>

                <div className="flex items-center gap-4">

                    <span>

                        {user?.name}

                    </span>

                    <button
                        onClick={handleLogout}
                        className="bg-white text-red-600 px-4 py-2 rounded"
                    >
                        Logout
                    </button>

                </div>

            </nav>

            <div className="flex">

                <aside className="w-64 bg-white min-h-screen shadow">

                    <ul className="p-5 space-y-5">

                        <li>

                            <Link to="/admin/dashboard">

                                Dashboard

                            </Link>

                        </li>

                        <li>

                            <Link to="/admin/tables">

                                Tables

                            </Link>

                        </li>

                        <li>

                            <Link to="/admin/reservations">

                                Reservations

                            </Link>

                        </li>

                    </ul>

                </aside>

                <main className="flex-1 p-6">

                    {children}

                </main>

            </div>

        </div>

    );

}

export default AdminLayout;