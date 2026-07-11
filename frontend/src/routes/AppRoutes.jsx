import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../pages/NotFound";

// Customer Pages
import Dashboard from "../pages/customer/Dashboard";
import Tables from "../pages/customer/Tables";
import Reservations from "../pages/customer/Reservations";
import Profile from "../pages/customer/Profile";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import AdminTables from "../pages/admin/Tables";
import AdminReservations from "../pages/admin/Reservations";

// Protected Route
import ProtectedRoute from "../components/common/ProtectedRoute";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* ==========================
                    Public Routes
                ========================== */}

                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* ==========================
                    Customer Routes
                ========================== */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/tables"
                    element={
                        <ProtectedRoute>
                            <Tables />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/reservations"
                    element={
                        <ProtectedRoute>
                            <Reservations />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                {/* ==========================
                    Admin Routes
                ========================== */}

                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute role="admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/tables"
                    element={
                        <ProtectedRoute role="admin">
                            <AdminTables />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/reservations"
                    element={
                        <ProtectedRoute role="admin">
                            <AdminReservations />
                        </ProtectedRoute>
                    }
                />

                {/* ==========================
                    404 Route
                ========================== */}

                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;